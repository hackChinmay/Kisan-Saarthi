import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CloudRain,
  CloudSun,
  Droplets,
  HelpCircle,
  LocateFixed,
  MapPin,
  MessageSquare,
  Mic,
  Phone,
  Play,
  Recycle,
  RefreshCw,
  Sliders,
  Sparkles,
  Sprout,
  Upload,
  UserCheck,
  Volume2,
} from 'lucide-react';
import {
  CropType,
  FarmerProfile,
  IrrigationType,
  PrototypeRiskBreakdown,
  SoilData,
  SoilType,
  SupportedLanguage,
  WeatherData,
} from '../types/agri';
import {
  CROP_VARIETIES,
  INDIAN_STATES_DISTRICTS,
} from '../data/knowledgeBase';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { generateBotanicalLeafSpecimen, DemoSpecimenType } from '../utils/leafSpecimenCanvas';
import { speakAdvisoryText, stopAdvisorySpeech } from '../services/gemini';

interface FarmerHomeViewProps {
  profile: FarmerProfile;
  weather: WeatherData;
  soil: SoilData;
  riskBreakdown: PrototypeRiskBreakdown;
  language: SupportedLanguage;
  onUpdateProfile: (nextProfile: FarmerProfile) => void;
  onStartAssistant: () => void;
  onUploadCropImageAction: () => void;
  onAskByVoiceAction: () => void;
  onOpenDashboard: () => void;
  onOpenSoilView: () => void;
  onRunAnalysisWithCustom: (question: string, imageBase64?: string, imageLabel?: string) => void;
}

const COMMON_CROPS: { name: CropType; icon: string }[] = [
  { name: 'Tomato', icon: '🍅' },
  { name: 'Rice', icon: '🌾' },
  { name: 'Wheat', icon: '🌾' },
  { name: 'Cotton', icon: '🌱' },
  { name: 'Sugarcane', icon: '🎋' },
  { name: 'Groundnut', icon: '🥜' },
  { name: 'Banana', icon: '🍌' },
];

const PROBLEM_CHOICES = [
  { id: 'spots', label: 'Spots on leaves', prompt: 'My crop leaves are developing brown spots. What should I do?' },
  { id: 'yellowing', label: 'Leaves changing color', prompt: 'My leaves are turning yellow and pale. What is the cause and treatment?' },
  { id: 'insects', label: 'Insects or pests', prompt: 'I see insects and caterpillars on my crop. How can I control them safely?' },
  { id: 'growth', label: 'Poor growth / stunting', prompt: 'My crop growth has stunted and leaves are small. What fertilizer or soil care is needed?' },
  { id: 'water', label: 'Drying / wilting', prompt: 'Plants are wilting during midday. When and how much should I irrigate?' },
];

export const FarmerHomeView: React.FC<FarmerHomeViewProps> = ({
  profile,
  weather,
  soil,
  riskBreakdown,
  language,
  onUpdateProfile,
  onStartAssistant,
  onUploadCropImageAction,
  onAskByVoiceAction,
  onOpenDashboard,
  onOpenSoilView,
  onRunAnalysisWithCustom,
}) => {
  const [geoStatus, setGeoStatus] = useState<string | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false);
  const [isPlayingActionAudio, setIsPlayingActionAudio] = useState<boolean>(false);

  // Guided Flow Wizard State
  const [selectedCrop, setSelectedCrop] = useState<CropType>(profile.crop);
  const [selectedProblem, setSelectedProblem] = useState<string>('spots');
  const [customQuestionText, setCustomQuestionText] = useState<string>(
    'My tomato leaves are developing brown spots. What should I do?'
  );
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | undefined>(undefined);
  const [selectedImageLabel, setSelectedImageLabel] = useState<string | undefined>(undefined);
  const [isGuidedListening, setIsGuidedListening] = useState<boolean>(false);

  // Audio lifecycle cleanup
  React.useEffect(() => {
    return () => {
      stopAdvisorySpeech();
    };
  }, []);

  React.useEffect(() => {
    stopAdvisorySpeech();
    setIsPlayingActionAudio(false);
  }, [language]);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Personalized time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = profile.name ? profile.name.split(' ')[0] : 'Farmer';
    if (language === 'hi') {
      if (hour < 12) return `शुभ प्रभात, ${name} 👋`;
      if (hour < 17) return `नमस्ते, ${name} 👋`;
      return `शुभ संध्या, ${name} 👋`;
    }
    if (language === 'ta') {
      if (hour < 12) return `காலை வணக்கம், ${name} 👋`;
      if (hour < 17) return `மதிய வணக்கம், ${name} 👋`;
      return `மாலை வணக்கம், ${name} 👋`;
    }
    if (language === 'te') {
      return `నమస్కారం, ${name} 👋`;
    }
    if (language === 'kn') {
      return `ಶುಭೋದಯ, ${name} 👋`;
    }
    if (language === 'mr') {
      return `शुभ सकाळ, ${name} 👋`;
    }
    if (language === 'bn') {
      return `সুপ্রভাত, ${name} 👋`;
    }
    if (hour < 12) return `Good morning, ${name} 👋`;
    if (hour < 17) return `Good afternoon, ${name} 👋`;
    return `Good evening, ${name} 👋`;
  };

  const availableStates = Object.keys(INDIAN_STATES_DISTRICTS);
  const currentStateObj =
    INDIAN_STATES_DISTRICTS[profile.state] || INDIAN_STATES_DISTRICTS['Tamil Nadu'];
  const availableDistricts = currentStateObj.districts;

  const handleStateChange = (newState: string) => {
    const firstDist = INDIAN_STATES_DISTRICTS[newState]?.districts[0];
    if (firstDist) {
      onUpdateProfile({
        ...profile,
        state: newState,
        district: firstDist.name,
        village: firstDist.defaultVillage,
        coordinates: {
          lat: firstDist.lat,
          lng: firstDist.lng,
          source: 'district-centroid',
        },
      });
    }
  };

  const handleDistrictChange = (newDistrict: string) => {
    const found = availableDistricts.find((d) => d.name === newDistrict);
    onUpdateProfile({
      ...profile,
      district: newDistrict,
      village: found?.defaultVillage || profile.village,
      coordinates: found
        ? { lat: found.lat, lng: found.lng, source: 'district-centroid' }
        : profile.coordinates,
    });
  };

  const handleDetectLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('Using Vellore, Tamil Nadu default location.');
      return;
    }
    setGeoStatus('Detecting GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onUpdateProfile({
          ...profile,
          coordinates: {
            lat: Number(latitude.toFixed(4)),
            lng: Number(longitude.toFixed(4)),
            source: 'browser-gps',
          },
        });
        setGeoStatus(`Location found (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`);
      },
      () => {
        setGeoStatus('Using Katpadi, Vellore, Tamil Nadu (Default)');
      },
      { timeout: 5000 }
    );
  };

  const handleSelectGuidedSpecimen = (type: DemoSpecimenType) => {
    const spec = generateBotanicalLeafSpecimen(type);
    setSelectedImageBase64(spec.dataUrl);
    setSelectedImageLabel(spec.title);
    if (type === 'tomato-early-blight') {
      setSelectedCrop('Tomato');
      setCustomQuestionText('My tomato leaves are developing brown spots. What should I do?');
    } else if (type === 'rice-leaf-blast') {
      setSelectedCrop('Rice');
      setCustomQuestionText('My rice leaves have diamond lesions. What should I do?');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImageBase64(reader.result);
        setSelectedImageLabel(`Photo: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGuidedVoiceInput = () => {
    const SpeechRecognitionWin =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognitionWin) {
      setIsGuidedListening(true);
      setTimeout(() => {
        const sample =
          language === 'ta'
            ? 'என் தக்காளி இலைகளில் பழுப்பு நிற புள்ளிகள் உள்ளன. நான் என்ன செய்ய வேண்டும்?'
            : language === 'hi'
            ? 'मेरे टमाटर की पत्तियों पर भूरे धब्बे हैं। मुझे क्या करना चाहिए?'
            : 'My tomato leaves are developing brown spots. What should I do?';
        setCustomQuestionText(sample);
        setIsGuidedListening(false);
      }, 900);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognitionWin as any)();
      const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language);
      recognition.lang = langMeta?.speechLang || 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsGuidedListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setCustomQuestionText(transcript);
        }
        setIsGuidedListening(false);
      };
      recognition.onerror = () => {
        setIsGuidedListening(false);
      };
      recognition.onend = () => {
        setIsGuidedListening(false);
      };
      recognition.start();
    } catch {
      setIsGuidedListening(false);
    }
  };

  const handlePlayTodaysActionVoice = () => {
    if (isPlayingActionAudio) {
      stopAdvisorySpeech();
      setIsPlayingActionAudio(false);
      return;
    }

    const textToSpeak =
      t.todaysRecommendationBody ||
      t.todaysActionBody ||
      `Today's Farm Action: Rain is likely tomorrow. Consider delaying irrigation today.`;

    speakAdvisoryText(
      textToSpeak,
      language,
      () => setIsPlayingActionAudio(true),
      () => setIsPlayingActionAudio(false)
    );
  };

  const handleRunGuidedAnalysis = () => {
    if (selectedCrop !== profile.crop) {
      onUpdateProfile({ ...profile, crop: selectedCrop });
    }
    const finalImage = selectedImageBase64 || generateBotanicalLeafSpecimen('tomato-early-blight').dataUrl;
    const finalLabel = selectedImageLabel || 'Tomato Leaf Specimen (Early Blight)';
    onRunAnalysisWithCustom(customQuestionText, finalImage, finalLabel);
  };

  return (
    <div className="space-y-7">
      {/* 1. TOP GREETING & LOCATION HEADER */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
              {getGreeting()}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>📍 {profile.village}, {profile.district} ({profile.state})</span>
              </span>
              <span className="flex items-center gap-1 text-stone-800 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>🌱 {profile.crop} ({profile.farmSize} Acres · {profile.irrigationType})</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5 border border-stone-300/80"
            >
              <Sliders className="w-3.5 h-3.5 text-stone-600" />
              <span>{showProfileDrawer ? 'Hide Details' : 'Change Location / Crop'}</span>
              {showProfileDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Location/Crop Quick Switcher */}
        {showProfileDrawer && (
          <div className="p-4 mt-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 border-b border-stone-200 pb-2">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                Quick Farm Location Context
              </span>
              <button
                type="button"
                onClick={handleDetectLocation}
                className="text-emerald-800 hover:underline flex items-center gap-1 font-semibold"
              >
                <LocateFixed className="w-3.5 h-3.5" />
                {geoStatus || 'Detect GPS'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-stone-600 block mb-1 font-medium">State</label>
                <select
                  value={profile.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded-lg"
                >
                  {availableStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-stone-600 block mb-1 font-medium">District</label>
                <select
                  value={profile.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded-lg"
                >
                  {availableDistricts.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-stone-600 block mb-1 font-medium">Primary Crop</label>
                <select
                  value={profile.crop}
                  onChange={(e) => onUpdateProfile({ ...profile, crop: e.target.value as CropType })}
                  className="w-full p-2 bg-white border border-stone-300 rounded-lg font-medium"
                >
                  {COMMON_CROPS.map((c) => (
                    <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-stone-600 block mb-1 font-medium">Irrigation System</label>
                <select
                  value={profile.irrigationType}
                  onChange={(e) => onUpdateProfile({ ...profile, irrigationType: e.target.value as IrrigationType })}
                  className="w-full p-2 bg-white border border-stone-300 rounded-lg"
                >
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler Irrigation</option>
                  <option value="Flood / Furrow">Flood / Furrow</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. LARGE PRIMARY CARD: TODAY'S FARM ACTION */}
      <section className="bg-[#14532D] text-white rounded-2xl p-6 md:p-7 border border-[#166534] shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                {t.todaysActionTitle}
              </span>
              <span className="text-2xs px-2 py-0.5 bg-emerald-800/90 text-emerald-200 rounded font-semibold">
                {profile.village}, {profile.district}
              </span>
            </div>
            <p className="text-lg md:text-xl font-bold text-white leading-snug">
              {t.todaysActionBody}
            </p>
            <p className="text-xs text-emerald-100/80">
              High humidity ({weather.humidity}%) &amp; {weather.rainProbability}% rain forecast. Adjusting your irrigation prevents fungal collar rot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePlayTodaysActionVoice}
              className="px-4 py-3 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <Volume2 className="w-4 h-4 text-emerald-300" />
              <span>{isPlayingActionAudio ? t.stopAudioBtn : t.listenBtn}</span>
            </button>

            <button
              type="button"
              onClick={onStartAssistant}
              className="px-5 py-3 text-xs font-bold bg-white text-emerald-950 hover:bg-stone-100 rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap active:scale-[0.99]"
            >
              <span>{t.viewRecommendation}</span>
              <ArrowRight className="w-4 h-4 text-emerald-800" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOUR DISTINCT SUMMARY CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Summary Card 1: Weather (Sky Blue) */}
        <button
          type="button"
          onClick={onOpenDashboard}
          className="p-5 bg-sky-50/80 hover:bg-sky-100/90 border-2 border-sky-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between shadow-xs active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <CloudSun className="w-6 h-6 text-sky-600" />
            <span className="text-2xs font-bold px-2 py-0.5 bg-sky-200 text-sky-900 rounded-full">
              {weather.source === 'LIVE' ? 'LIVE' : 'STATION'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-800 block">
              {t.summaryWeatherTitle}
            </span>
            <div className="text-2xl font-bold text-sky-950 mt-0.5 font-mono-tabular">
              {weather.temperature}°C
            </div>
            <div className="text-xs text-sky-900/90 mt-1 font-medium">
              {weather.rainProbability}% rain probability
            </div>
          </div>
        </button>

        {/* Summary Card 2: Crop Health (Amber / Warning) */}
        <button
          type="button"
          onClick={onStartAssistant}
          className="p-5 bg-amber-50/80 hover:bg-amber-100/90 border-2 border-amber-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between shadow-xs active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <span className="text-2xs font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
              {riskBreakdown.diseaseRisk} RISK
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block">
              {t.summaryCropHealthTitle}
            </span>
            <div className="text-xl font-bold text-amber-950 mt-0.5">
              Moderate Risk
            </div>
            <div className="text-xs text-amber-900/90 mt-1 font-medium">
              Alternaria blight alert
            </div>
          </div>
        </button>

        {/* Summary Card 3: Soil Moisture (Teal / Emerald) */}
        <button
          type="button"
          onClick={onOpenSoilView}
          className="p-5 bg-teal-50/80 hover:bg-teal-100/90 border-2 border-teal-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between shadow-xs active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <Droplets className="w-6 h-6 text-teal-600" />
            <span className="text-2xs font-bold px-2 py-0.5 bg-teal-200 text-teal-900 rounded-full font-mono-tabular">
              {soil.moisture}% MOISTURE
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block">
              {t.summarySoilTitle}
            </span>
            <div className="text-xl font-bold text-teal-950 mt-0.5">
              Healthy Moisture
            </div>
            <div className="text-xs text-teal-900/90 mt-1 font-medium">
              {soil.soilType} · pH {soil.ph}
            </div>
          </div>
        </button>

        {/* Summary Card 4: Regenerative Score (Leaf Green) */}
        <button
          type="button"
          onClick={onOpenSoilView}
          className="p-5 bg-emerald-50/80 hover:bg-emerald-100/90 border-2 border-emerald-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between shadow-xs active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <Recycle className="w-6 h-6 text-emerald-600" />
            <span className="text-2xs font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full">
              4 PILLARS
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">
              {t.summaryRegenTitle}
            </span>
            <div className="text-2xl font-bold text-emerald-950 mt-0.5 font-mono-tabular">
              72<span className="text-sm font-normal text-emerald-800">/100</span>
            </div>
            <div className="text-xs text-emerald-900/90 mt-1 font-medium">
              Mulch &amp; Intercropping
            </div>
          </div>
        </button>
      </section>

      {/* 4. SIMPLE MAIN FARMER ACTION BUTTONS */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-lg md:text-xl font-bold text-stone-900">
            {t.homeGreeting}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.homeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Button 1: Check My Crop */}
          <button
            type="button"
            onClick={() => {
              const element = document.getElementById('guided-flow-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-5 bg-emerald-50/80 hover:bg-emerald-100 border-2 border-emerald-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between min-h-[140px] shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <Camera className="w-7 h-7 text-emerald-700" />
              <span className="text-2xs font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full">
                Step-by-Step
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-1.5 mt-2">
                <span>{t.checkCropBtn}</span>
                <ArrowRight className="w-4 h-4 text-emerald-800 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-xs text-emerald-900/80 mt-0.5">
                Take photo of leaf spots, yellowing, or pests
              </p>
            </div>
          </button>

          {/* Button 2: Ask by Voice */}
          <button
            type="button"
            onClick={onAskByVoiceAction}
            className="p-5 bg-sky-50/80 hover:bg-sky-100 border-2 border-sky-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between min-h-[140px] shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <Mic className="w-7 h-7 text-sky-700" />
              <span className="text-2xs font-bold px-2 py-0.5 bg-sky-200 text-sky-900 rounded-full">
                7 Languages
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-sky-950 flex items-center gap-1.5 mt-2">
                <span>{t.askByVoiceBtn}</span>
                <ArrowRight className="w-4 h-4 text-sky-800 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-xs text-sky-900/80 mt-0.5">
                Speak in Hindi, Tamil, Telugu, Kannada, English...
              </p>
            </div>
          </button>

          {/* Button 3: Ask KisanSaarthi */}
          <button
            type="button"
            onClick={onStartAssistant}
            className="p-5 bg-amber-50/80 hover:bg-amber-100 border-2 border-amber-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between min-h-[140px] shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <MessageSquare className="w-7 h-7 text-amber-700" />
              <span className="text-2xs font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
                Instant AI
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5 mt-2">
                <span>{t.askQuestionBtn}</span>
                <ArrowRight className="w-4 h-4 text-amber-800 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-xs text-amber-900/80 mt-0.5">
                Type question or pick common farming solutions
              </p>
            </div>
          </button>

          {/* Button 4: Check Weather */}
          <button
            type="button"
            onClick={onOpenDashboard}
            className="p-5 bg-stone-100 hover:bg-stone-200/90 border-2 border-stone-300/80 rounded-2xl text-left transition-all group flex flex-col justify-between min-h-[140px] shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <CloudRain className="w-7 h-7 text-stone-700" />
              <span className="text-2xs font-bold px-2 py-0.5 bg-stone-200 text-stone-800 rounded-full font-mono-tabular">
                {weather.temperature}°C · {weather.rainProbability}% Rain
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5 mt-2">
                <span>{t.checkWeatherBtn}</span>
                <ArrowRight className="w-4 h-4 text-stone-700 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Rain alerts and water-saving advice for today
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 5. GUIDED STEP-BY-STEP CROP CHECKER */}
      <section id="guided-flow-section" className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
            <span>📷 Guided Crop Check</span>
            <span>·</span>
            <span>5 Simple Steps</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-1">
            Check Your Crop in 5 Simple Steps
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Answer a few simple questions or pick a sample photo to receive clear agricultural advice.
          </p>
        </div>

        {/* STEP 1: What crop are you growing? */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-bold text-stone-900">
              {t.guidedStep1Title}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {COMMON_CROPS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCrop(c.name)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  selectedCrop === c.name
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-700/20 shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-xs">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: What is the problem? */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm font-bold text-stone-900">
              {t.guidedStep2Title}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {PROBLEM_CHOICES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedProblem(p.id);
                  setCustomQuestionText(p.prompt);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedProblem === p.id
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-700/20 shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="text-xs font-semibold">{p.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3: Show us the problem */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm font-bold text-stone-900">
                {t.guidedStep3Title}
              </h3>
            </div>
            <span className="text-xs text-stone-500">Take photo or tap sample</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Upload Box / Image Preview */}
            <div className="md:col-span-6">
              {selectedImageBase64 ? (
                <div className="relative rounded-xl overflow-hidden border border-emerald-300 bg-stone-900">
                  <img
                    src={selectedImageBase64}
                    alt={selectedImageLabel || 'Crop photo'}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2.5 bg-stone-950/90 text-white flex items-center justify-between text-xs">
                    <span className="truncate font-medium">{selectedImageLabel}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImageBase64(undefined);
                        setSelectedImageLabel(undefined);
                      }}
                      className="text-amber-300 hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-stone-300 hover:border-emerald-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-stone-50 hover:bg-emerald-50/40 transition-colors h-44">
                  <Camera className="w-8 h-8 text-emerald-800 mb-2" />
                  <span className="text-xs font-bold text-stone-900">
                    📷 Take Photo or Upload File
                  </span>
                  <span className="text-2xs text-stone-500 mt-1">
                    Tap to use camera on mobile phone
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Quick Demo Test Samples */}
            <div className="md:col-span-6 space-y-2">
              <div className="text-xs font-medium text-stone-600">
                Or tap a calibrated demo test specimen (1-Tap):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectGuidedSpecimen('tomato-early-blight')}
                  className="p-3 bg-white border border-stone-300 hover:border-emerald-700 rounded-xl text-left transition-colors group"
                >
                  <span className="text-lg block">🍅</span>
                  <strong className="text-xs text-stone-900 block mt-1">Tomato Blight</strong>
                  <span className="text-2xs text-stone-500">Brown leaf spots</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGuidedSpecimen('rice-leaf-blast')}
                  className="p-3 bg-white border border-stone-300 hover:border-emerald-700 rounded-xl text-left transition-colors group"
                >
                  <span className="text-lg block">🌾</span>
                  <strong className="text-xs text-stone-900 block mt-1">Rice Blast</strong>
                  <span className="text-2xs text-stone-500">Diamond spots</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGuidedSpecimen('tomato-healthy')}
                  className="p-3 bg-white border border-stone-300 hover:border-emerald-700 rounded-xl text-left transition-colors group"
                >
                  <span className="text-lg block">🌿</span>
                  <strong className="text-xs text-stone-900 block mt-1">Healthy Leaf</strong>
                  <span className="text-2xs text-stone-500">Green foliage</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: Tell us anything else */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="text-sm font-bold text-stone-900">
                {t.guidedStep4Title}
              </h3>
            </div>
            <span className="text-xs text-stone-500">Optional</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customQuestionText}
              onChange={(e) => setCustomQuestionText(e.target.value)}
              placeholder="e.g. My tomato leaves are developing brown spots. What should I do?"
              className="flex-1 p-3 text-xs md:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />

            <button
              type="button"
              onClick={handleGuidedVoiceInput}
              className={`px-4 py-3 text-xs font-bold rounded-xl border transition-colors flex items-center justify-center gap-2 whitespace-nowrap ${
                isGuidedListening
                  ? 'bg-red-600 text-white border-red-600 animate-pulse'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
              }`}
            >
              <Mic className="w-4 h-4 text-emerald-800" />
              <span>{isGuidedListening ? t.voiceListening : '🎙 Speak'}</span>
            </button>
          </div>
        </div>

        {/* STEP 5: Check My Crop Button */}
        <div className="pt-4 border-t border-stone-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              <span className="font-bold text-emerald-900">Step 5: </span>
              {t.guidedStep5Title}
            </div>

            <button
              type="button"
              onClick={handleRunGuidedAnalysis}
              className="px-6 py-3.5 text-sm md:text-base font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5 text-emerald-200" />
              <span>{t.analyzeCropBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. TOLL-FREE KISAN CALL CENTER HELPER */}
      <section className="p-5 bg-stone-100 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Free Government Agricultural Support
            </h4>
            <p className="text-sm font-bold text-stone-900">
              {t.callCenterText}
            </p>
          </div>
        </div>

        <a
          href="tel:18001801551"
          className="px-4 py-2.5 text-xs font-bold text-emerald-950 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors text-center shrink-0 shadow-2xs"
        >
          📞 {t.callCenterBtn}
        </a>
      </section>
    </div>
  );
};
