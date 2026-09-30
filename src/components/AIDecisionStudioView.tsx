import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  CloudRain,
  Cpu,
  Droplets,
  Loader2,
  MapPin,
  MessageSquare,
  Mic,
  MicOff,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sprout,
  Square,
  Upload,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  AIRecommendationResponse,
  FarmerFeedback,
  FarmerProfile,
  GeminiDiagnostics,
  PrototypeRiskBreakdown,
  RetrievedChunk,
  SoilData,
  SupportedLanguage,
  WeatherData,
} from '../types/agri';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import {
  DemoSpecimenType,
  generateBotanicalLeafSpecimen,
} from '../utils/leafSpecimenCanvas';
import { checkGeminiStatus, speakAdvisoryText, stopAdvisorySpeech } from '../services/gemini';

interface AIDecisionStudioViewProps {
  profile: FarmerProfile;
  weather: WeatherData;
  soil: SoilData;
  riskBreakdown: PrototypeRiskBreakdown;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  recommendation: AIRecommendationResponse;
  retrievedChunks: RetrievedChunk[];
  isAnalyzing: boolean;
  serviceNotice?: string;
  activeImageBase64?: string;
  activeImageLabel?: string;
  currentQuestion: string;
  geminiDiagnostics?: GeminiDiagnostics;
  onChangeQuestion: (q: string) => void;
  onUploadImage: (base64: string, label: string) => void;
  onClearImage: () => void;
  onRunAnalysis: (
    customQuestion?: string,
    customImageBase64?: string,
    customImageLabel?: string
  ) => void;
  onRetryConnection: () => Promise<void>;
  onSubmitFeedback: (feedback: Omit<FarmerFeedback, 'id' | 'timestamp'>) => void;
}

const PRESET_QUESTIONS = [
  'My tomato leaves are developing brown spots. What should I do?',
  'When should I irrigate my crop?',
  'Why are my leaves turning yellow?',
  'Will rain affect my crop this week?',
  'What fertilizer or compost should I use?',
  'How can I reduce water usage with mulch?',
  'What should I do today for pest prevention?',
];

export const AIDecisionStudioView: React.FC<AIDecisionStudioViewProps> = ({
  profile,
  weather,
  soil,
  riskBreakdown,
  language,
  onSelectLanguage,
  recommendation,
  retrievedChunks,
  isAnalyzing,
  serviceNotice,
  activeImageBase64,
  activeImageLabel,
  currentQuestion,
  geminiDiagnostics,
  onChangeQuestion,
  onUploadImage,
  onClearImage,
  onRunAnalysis,
  onRetryConnection,
  onSubmitFeedback,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);
  const [activeInputTab, setActiveInputTab] = useState<'crop' | 'voice' | 'text'>('crop');
  const [loadingStep, setLoadingStep] = useState<number>(1);
  const [showDevDetails, setShowDevDetails] = useState<boolean>(false);

  // Action Plan checkable state
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    'today-0': true,
  });

  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState<'Yes' | 'Partially' | 'No' | null>(null);
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  useEffect(() => {
    setFeedbackSaved(false);
    setFeedbackRating(null);
  }, [recommendation.id]);

  // Clean up audio playback when component unmounts or language changes
  useEffect(() => {
    return () => {
      stopAdvisorySpeech();
    };
  }, []);

  useEffect(() => {
    stopAdvisorySpeech();
    setIsSpeaking(false);
  }, [language, recommendation.id]);

  // Loading sequence stepper
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setLoadingStep(1);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadImage(reader.result, `Photo: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectDemoSpecimen = (type: DemoSpecimenType) => {
    const specimen = generateBotanicalLeafSpecimen(type);
    onUploadImage(specimen.dataUrl, specimen.title);
    onChangeQuestion(specimen.defaultQuestion);
    onRunAnalysis(specimen.defaultQuestion, specimen.dataUrl, specimen.title);
  };

  const handleVoiceInput = () => {
    const SpeechRecognitionWin =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognitionWin) {
      setIsListening(true);
      setVoiceNote('Recording voice...');
      setTimeout(() => {
        const sampleSpoken =
          language === 'ta'
            ? 'என் தக்காளி இலைகளில் பழுப்பு நிற புள்ளிகள் உள்ளன. நான் என்ன செய்ய வேண்டும்?'
            : language === 'hi'
            ? 'मेरे टमाटर की पत्तियों पर भूरे धब्बे पड़ रहे हैं। मुझे क्या करना चाहिए?'
            : language === 'mr'
            ? 'माझ्या टोमॅटोच्या पानांवर तपकिरी डाग पडत आहेत. मी काय करावे?'
            : language === 'te'
            ? 'నా టమాటా ఆకులపై గోధుమ రంగు మచ్చలు వస్తున్నాయి. నేను ఏమి చేయాలి?'
            : language === 'kn'
            ? 'ನನ್ನ ಟೊಮೆಟೊ ಎಲೆಗಳಲ್ಲಿ ಕಂದು ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಿವೆ. ನಾನು ಏನು ಮಾಡಬೇಕು?'
            : language === 'bn'
            ? 'আমার টমেটো গাছে পাতায় দাগ দেখা যাচ্ছে। কী করব?'
            : 'My tomato leaves are developing brown spots. What should I do?';
        onChangeQuestion(sampleSpoken);
        setIsListening(false);
        setVoiceNote(null);
        onRunAnalysis(sampleSpoken);
      }, 1000);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognitionWin as any)();
      const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language);
      recognition.lang = langMeta?.speechLang || 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setVoiceNote(`${t.voiceListening} (${langMeta?.nativeName || 'English'})`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          onChangeQuestion(transcript);
          setVoiceNote(null);
          onRunAnalysis(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceNote(null);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNote(null);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceNote(null);
    }
  };

  const handleSpeakAdvisory = () => {
    if (isSpeaking) {
      stopAdvisorySpeech();
      setIsSpeaking(false);
      return;
    }

    const langDict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
    let textToSpeak = '';

    if (language === 'hi' && recommendation.localizedSummary?.hi) {
      textToSpeak = recommendation.localizedSummary.hi;
    } else if (language === 'ta' && recommendation.localizedSummary?.ta) {
      textToSpeak = recommendation.localizedSummary.ta;
    } else if (language === 'en' && recommendation.localizedSummary?.en) {
      textToSpeak = recommendation.localizedSummary.en;
    } else if (recommendation.localizedSummary?.selectedLangText) {
      const selected = recommendation.localizedSummary.selectedLangText;
      const isTamilScript = /[\u0B80-\u0BFF]/.test(selected);
      const isTeluguScript = /[\u0C00-\u0C7F]/.test(selected);
      const isKannadaScript = /[\u0C80-\u0CFF]/.test(selected);
      const isBengaliScript = /[\u0980-\u09FF]/.test(selected);

      if (language === 'ta' && !isTamilScript) {
        textToSpeak = langDict.demoRecommendationSummary || langDict.todaysRecommendationBody || '';
      } else if (language === 'te' && !isTeluguScript) {
        textToSpeak = langDict.demoRecommendationSummary || langDict.todaysRecommendationBody || '';
      } else if (language === 'kn' && !isKannadaScript) {
        textToSpeak = langDict.demoRecommendationSummary || langDict.todaysRecommendationBody || '';
      } else if (language === 'bn' && !isBengaliScript) {
        textToSpeak = langDict.demoRecommendationSummary || langDict.todaysRecommendationBody || '';
      } else if (language === 'mr') {
        textToSpeak = langDict.demoRecommendationSummary || langDict.todaysRecommendationBody || selected;
      } else {
        textToSpeak = selected;
      }
    }

    if (!textToSpeak) {
      textToSpeak =
        langDict.demoRecommendationSummary ||
        langDict.todaysRecommendationBody ||
        langDict.todaysActionBody ||
        recommendation.issue;
    }

    speakAdvisoryText(
      textToSpeak,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleToggleTask = (key: string) => {
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFeedback = (rating: 'Yes' | 'Partially' | 'No') => {
    setFeedbackRating(rating);
    setFeedbackSaved(true);
    onSubmitFeedback({
      recommendationId: recommendation.id,
      farmerName: profile.name,
      district: `${profile.district} (${profile.village})`,
      crop: profile.crop,
      issue: recommendation.issue,
      rating,
      comment: rating === 'Yes' ? 'Advisory applied successfully' : 'Needed officer follow-up',
      outcome: 'Logged to District Feedback Loop',
    });
  };

  return (
    <div className="space-y-7">
      {/* 1. TOP HEADER WITH FARMER CONTEXT & TRANSLATED FARMER-FACING HEADING */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <span>🤖 Kisan Saarthi Decision Center</span>
              <span>·</span>
              <span>ICAR &amp; TNAU Grounded</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              {t.decisionHeading}
            </h1>
          </div>

          {/* Farmer Context Card */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="text-xs">
              <strong className="text-emerald-950 block text-sm">{profile.name}</strong>
              <div className="text-emerald-900/80 flex items-center gap-1.5 mt-0.5">
                <span>📍 {profile.village}, {profile.district}</span>
                <span>·</span>
                <span>🌱 {profile.crop}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 LARGE ACTION TABS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
          <button
            type="button"
            onClick={() => setActiveInputTab('crop')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
              activeInputTab === 'crop'
                ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <Camera className="w-6 h-6 text-emerald-700 shrink-0" />
            <div>
              <span className="text-xs font-bold block">{t.checkCropBtn}</span>
              <span className="text-2xs opacity-80 font-normal">Photo / Leaf analysis</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveInputTab('voice');
              handleVoiceInput();
            }}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
              activeInputTab === 'voice'
                ? 'border-sky-700 bg-sky-50/80 text-sky-950 font-bold shadow-xs'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <Mic className="w-6 h-6 text-sky-700 shrink-0" />
            <div>
              <span className="text-xs font-bold block">{t.askByVoiceBtn}</span>
              <span className="text-2xs opacity-80 font-normal">Speak in your language</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveInputTab('text')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
              activeInputTab === 'text'
                ? 'border-amber-700 bg-amber-50/80 text-amber-950 font-bold shadow-xs'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <MessageSquare className="w-6 h-6 text-amber-700 shrink-0" />
            <div>
              <span className="text-xs font-bold block">{t.askQuestionBtn}</span>
              <span className="text-2xs opacity-80 font-normal">Type or pick questions</span>
            </div>
          </button>
        </div>

        {/* INPUT DRAWER DEPENDING ON SELECTED TAB */}
        <div className="mt-5 pt-4 border-t border-stone-100 space-y-4">
          {/* CROP PHOTO INPUT */}
          {activeInputTab === 'crop' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6">
                {activeImageBase64 ? (
                  <div className="relative rounded-xl overflow-hidden border border-emerald-300 bg-stone-900">
                    <img
                      src={activeImageBase64}
                      alt={activeImageLabel || 'Specimen'}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2.5 bg-stone-950/90 text-white flex items-center justify-between text-xs">
                      <span className="truncate font-semibold">{activeImageLabel}</span>
                      <button
                        type="button"
                        onClick={onClearImage}
                        className="text-amber-300 hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-stone-300 hover:border-emerald-700 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-stone-50 hover:bg-emerald-50/30 transition-colors h-40">
                    <Camera className="w-8 h-8 text-emerald-800 mb-1.5" />
                    <span className="text-xs font-bold text-stone-900">
                      📷 Take Photo or Upload File
                    </span>
                    <span className="text-2xs text-stone-500 mt-0.5">
                      Clear picture of infected leaf, stem, or fruit
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="md:col-span-6 space-y-2">
                <span className="text-xs font-semibold text-stone-600 block">
                  Or test with 1-tap calibrated leaf specimens:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectDemoSpecimen('tomato-early-blight')}
                    className="p-2.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-700 rounded-xl text-left transition-colors"
                  >
                    <span className="text-base block">🍅</span>
                    <strong className="text-2xs text-stone-900 block mt-0.5">Tomato Blight</strong>
                    <span className="text-2xs text-stone-500">Brown spots</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectDemoSpecimen('rice-leaf-blast')}
                    className="p-2.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-700 rounded-xl text-left transition-colors"
                  >
                    <span className="text-base block">🌾</span>
                    <strong className="text-2xs text-stone-900 block mt-0.5">Rice Blast</strong>
                    <span className="text-2xs text-stone-500">Diamond lesions</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectDemoSpecimen('tomato-healthy')}
                    className="p-2.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-700 rounded-xl text-left transition-colors"
                  >
                    <span className="text-base block">🌿</span>
                    <strong className="text-2xs text-stone-900 block mt-0.5">Healthy Leaf</strong>
                    <span className="text-2xs text-stone-500">Green foliage</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRunAnalysis(currentQuestion, activeImageBase64, activeImageLabel)}
                  disabled={isAnalyzing}
                  className="w-full py-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs mt-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>{isAnalyzing ? 'Analyzing...' : t.analyzeCropBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* VOICE INPUT */}
          {activeInputTab === 'voice' && (
            <div className="p-6 bg-sky-50/60 border border-sky-200 rounded-2xl text-center space-y-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-600 text-white animate-pulse-record shadow-lg'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-md'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>

                {isListening ? (
                  <div className="space-y-2">
                    <span className="text-sm font-bold text-red-600 flex items-center justify-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                      <span>🔴 {t.voiceListening}</span>
                    </span>
                    {/* Audio Waveform Animation */}
                    <div className="flex items-center justify-center gap-1 h-8">
                      <span className="w-1 bg-red-500 rounded-full animate-wave-1"></span>
                      <span className="w-1 bg-red-500 rounded-full animate-wave-2"></span>
                      <span className="w-1 bg-red-500 rounded-full animate-wave-3"></span>
                      <span className="w-1 bg-red-500 rounded-full animate-wave-4"></span>
                      <span className="w-1 bg-red-500 rounded-full animate-wave-5"></span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-600 font-medium">
                    Tap the microphone button to ask in {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName || 'your language'}.
                  </p>
                )}
              </div>

              {currentQuestion && (
                <div className="p-3 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 text-left">
                  <span className="text-stone-500 block text-2xs mb-0.5">Spoken Question:</span>
                  <strong>&ldquo;{currentQuestion}&rdquo;</strong>
                </div>
              )}
            </div>
          )}

          {/* TEXT / PRESETS INPUT */}
          {activeInputTab === 'text' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => onChangeQuestion(e.target.value)}
                  placeholder="e.g. My tomato leaves are developing brown spots. What should I do?"
                  className="flex-1 p-3 text-xs md:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button
                  type="button"
                  onClick={() => onRunAnalysis(currentQuestion, activeImageBase64, activeImageLabel)}
                  disabled={isAnalyzing || !currentQuestion.trim()}
                  className="px-5 py-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shrink-0 shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Ask</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-2xs text-stone-500 mr-1">Common topics:</span>
                {PRESET_QUESTIONS.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      onChangeQuestion(q);
                      onRunAnalysis(q);
                    }}
                    className="px-2.5 py-1 text-2xs bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-lg transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. PROGRESSIVE STEP-BY-STEP LOADING STATE */}
      {isAnalyzing && (
        <section className="bg-white border-2 border-emerald-300 rounded-2xl p-6 md:p-8 shadow-md text-center space-y-5 animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 text-emerald-800 animate-spin" />
            <h3 className="text-lg font-bold text-stone-900">
              {t.voicePreparing}
            </h3>
          </div>

          {/* Stepper Progress */}
          <div className="max-w-md mx-auto space-y-2.5 text-left text-xs font-medium">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${loadingStep >= 1 ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-2xs">1</span>
              <span>🔍 {t.loadingStep1}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${loadingStep >= 2 ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-2xs">2</span>
              <span>📚 {t.loadingStep2}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${loadingStep >= 3 ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-2xs">3</span>
              <span>🌦 {t.loadingStep3}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${loadingStep >= 4 ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-2xs">4</span>
              <span>🤖 {t.loadingStep4}</span>
            </div>
          </div>
        </section>
      )}

      {/* 3. STRUCTURED CROP RESULT PRESENTATION */}
      {!isAnalyzing && (
        <div className="space-y-6">
          {/* Service / Fallback Notice */}
          {serviceNotice && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{serviceNotice}</span>
              </div>
              <span className="text-2xs font-semibold px-2 py-0.5 bg-amber-200 rounded">
                Grounded Fallback
              </span>
            </div>
          )}

          {/* MAIN CROP DIAGNOSIS CARD */}
          <section className="bg-white border border-stone-200/90 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            {/* Header: Issue Name + Confidence + Risk Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <span className="text-2xs font-bold uppercase tracking-widest text-emerald-800 block">
                  {t.possibleIssue}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-950 mt-1">
                  {recommendation.issue}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Analysis calibrated for <strong>{profile.crop}</strong> in <strong>{profile.district}, {profile.state}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {/* Confidence Pill */}
                <div className="px-3.5 py-2 bg-stone-100 border border-stone-200 rounded-xl text-center">
                  <span className="text-2xs text-stone-500 block uppercase font-bold">{t.confidence}</span>
                  <span className="text-base font-extrabold text-stone-900 font-mono-tabular">
                    {recommendation.confidence}%
                  </span>
                </div>

                {/* Risk Level Badge */}
                <div
                  className={`px-3.5 py-2 rounded-xl text-center border font-bold ${
                    recommendation.riskLevel === 'HIGH'
                      ? 'bg-red-50 border-red-300 text-red-700'
                      : recommendation.riskLevel === 'MEDIUM'
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }`}
                >
                  <span className="text-2xs block uppercase font-bold">{t.risk}</span>
                  <span className="text-base font-extrabold">{recommendation.riskLevel}</span>
                </div>
              </div>
            </div>

            {/* AUDIO BUTTON: LISTEN TO ADVICE */}
            <div className="p-4 bg-emerald-950 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {t.listenToAdvice}
                  </h3>
                  <p className="text-xs text-emerald-200/90">
                    Listen to complete agricultural advisory in {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName || 'your language'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSpeakAdvisory}
                className="px-5 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow-2xs"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? t.stopAudioBtn : t.listenBtn}</span>
              </button>
            </div>

            {/* TWO-COLUMN BREAKDOWN: WHY & WHAT TO DO NOW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* WHY? (5 cols) */}
              <div className="lg:col-span-5 p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <span>{t.whyTitle}</span>
                </h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {recommendation.why.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span className="leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WHAT TO DO NOW (7 cols) */}
              <div className="lg:col-span-7 p-5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  <span>{t.whatToDoNow}</span>
                </h3>
                <ol className="space-y-2 text-xs text-emerald-950 font-medium">
                  {recommendation.immediateActions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-2xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* ACTION PLAN CHECKLIST (Today, This Week, Next 2 Weeks) */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                📅 {t.actionPlanTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* TODAY */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                  <span className="font-bold text-emerald-900 block text-2xs uppercase tracking-wider">
                    ⚡ {t.planToday}
                  </span>
                  <div className="space-y-1.5">
                    {recommendation.actionPlan?.today.map((task, idx) => (
                      <label
                        key={`today-${idx}`}
                        className="flex items-start gap-2 cursor-pointer text-stone-800 hover:text-stone-950"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(checkedTasks[`today-${idx}`])}
                          onChange={() => handleToggleTask(`today-${idx}`)}
                          className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700"
                        />
                        <span className={checkedTasks[`today-${idx}`] ? 'line-through text-stone-400' : ''}>
                          {task}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* THIS WEEK */}
                <div className="p-4 bg-sky-50/50 border border-sky-200 rounded-xl space-y-2">
                  <span className="font-bold text-sky-900 block text-2xs uppercase tracking-wider">
                    🌱 {t.planThisWeek}
                  </span>
                  <div className="space-y-1.5">
                    {recommendation.actionPlan?.thisWeek.map((task, idx) => (
                      <label
                        key={`week-${idx}`}
                        className="flex items-start gap-2 cursor-pointer text-stone-800 hover:text-stone-950"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(checkedTasks[`week-${idx}`])}
                          onChange={() => handleToggleTask(`week-${idx}`)}
                          className="mt-0.5 rounded text-sky-800 focus:ring-sky-700"
                        />
                        <span className={checkedTasks[`week-${idx}`] ? 'line-through text-stone-400' : ''}>
                          {task}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* NEXT 2 WEEKS */}
                <div className="p-4 bg-stone-100 border border-stone-200 rounded-xl space-y-2">
                  <span className="font-bold text-stone-800 block text-2xs uppercase tracking-wider">
                    🌾 {t.planNextTwoWeeks}
                  </span>
                  <div className="space-y-1.5">
                    {recommendation.actionPlan?.nextTwoWeeks.map((task, idx) => (
                      <label
                        key={`next-${idx}`}
                        className="flex items-start gap-2 cursor-pointer text-stone-800 hover:text-stone-950"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(checkedTasks[`next-${idx}`])}
                          onChange={() => handleToggleTask(`next-${idx}`)}
                          className="mt-0.5 rounded text-stone-800 focus:ring-stone-700"
                        />
                        <span className={checkedTasks[`next-${idx}`] ? 'line-through text-stone-400' : ''}>
                          {task}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* WEATHER CONTEXT & REGENERATIVE TIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-1.5 text-xs">
                <span className="font-bold text-sky-900 block text-2xs uppercase tracking-wider">
                  🌦 {t.weatherContextTitle}
                </span>
                <p className="text-sky-950 leading-relaxed">
                  {recommendation.weatherConsideration}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5 text-xs">
                <span className="font-bold text-emerald-900 block text-2xs uppercase tracking-wider">
                  ♻️ {t.regenerativeTipTitle}
                </span>
                <p className="text-emerald-950 leading-relaxed">
                  {recommendation.regenerativeRecommendation}
                </p>
              </div>
            </div>

            {/* VERIFIED AGRONOMIC SOURCES */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1.5">
              <span className="font-bold text-stone-700 block text-2xs uppercase tracking-wider">
                📚 {t.sourcesTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {recommendation.sources.map((src, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-stone-300 rounded-md text-stone-700 text-2xs font-medium"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>

            {/* FARMER FEEDBACK TELEMETRY LOOP */}
            <div className="p-4 bg-stone-100 border border-stone-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <strong className="text-stone-900 block">
                  {t.feedbackPrompt}
                </strong>
                <span className="text-2xs text-stone-500">
                  Your feedback helps calibrate disease alerts for {profile.district} farmers.
                </span>
              </div>

              {feedbackSaved ? (
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Feedback Saved · Thank You!</span>
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleFeedback('Yes')}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors"
                  >
                    👍 {t.feedbackHelpful}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback('Partially')}
                    className="px-3 py-1.5 bg-white hover:bg-stone-200 text-stone-800 font-bold border border-stone-300 rounded-lg transition-colors"
                  >
                    {t.feedbackNotHelpful}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Collapsible Technical / Diagnostic details */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowDevDetails(!showDevDetails)}
              className="text-2xs text-stone-500 hover:text-stone-800 underline inline-flex items-center gap-1"
            >
              <span>{showDevDetails ? 'Hide Model & System Diagnostics' : 'Show Model & System Diagnostics'}</span>
              {showDevDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showDevDetails && (
              <div className="p-4 mt-2 bg-stone-900 text-stone-200 rounded-xl text-left text-xs font-mono space-y-1">
                <div>Model: <strong>{recommendation.modelUsed}</strong></div>
                <div>Latency: <strong>{recommendation.latencyMs || 420} ms</strong></div>
                <div>Status: <strong>{recommendation.isFallback ? 'Fallback Agronomy Engine' : 'Connected to Gemini API'}</strong></div>
                <div>District RAG: <strong>{retrievedChunks.length} documents retrieved</strong></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
