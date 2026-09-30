import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
  Cpu,
  Globe,
  Home,
  Layers,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  MessageSquare,
  Play,
  Recycle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  Sun,
  User,
  UserCheck,
  Volume2,
  X,
} from 'lucide-react';
import {
  AIRecommendationResponse,
  FarmerAuthUser,
  FarmerFeedback,
  FarmerProfile,
  GeminiDiagnostics,
  SoilData,
  SupportedLanguage,
  WeatherData,
} from './types/agri';
import {
  calculatePrototypeRisk,
  getDefaultDemoWeather,
  retrieveAgriculturalKnowledge,
} from './data/knowledgeBase';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from './data/translations';
import {
  analyzeFarmContextWithGemini,
  buildDemoFallbackRecommendation,
  checkGeminiStatus,
  fetchLiveOrDemoWeather,
  speakAdvisoryText,
  stopAdvisorySpeech,
} from './services/gemini';
import { generateBotanicalLeafSpecimen } from './utils/leafSpecimenCanvas';
import { FarmerHomeView } from './components/FarmerHomeView';
import { FarmerWelcomeGate } from './components/FarmerWelcomeGate';
import { FarmDashboardView } from './components/FarmDashboardView';
import { AIDecisionStudioView } from './components/AIDecisionStudioView';
import { SoilRegenerativeView } from './components/SoilRegenerativeView';
import { OfficerDashboardView } from './components/OfficerDashboardView';
import { DocumentationView } from './components/DocumentationView';
import { AuthModal } from './components/AuthModal';
import { FarmerProfileModal } from './components/FarmerProfileModal';
import {
  getFarmerProfileFromFirestore,
  signOutFarmer,
  subscribeToFarmerAuth,
} from './services/firebase';

type ActiveTab = 'home' | 'dashboard' | 'assistant' | 'soil' | 'officer' | 'docs';

const INITIAL_FARMER_PROFILE: FarmerProfile = {
  id: 'FARMER-TN-VEL-01',
  uid: 'FARMER-TN-VEL-01',
  name: 'Ravi Kumar',
  phoneNumber: '+91 98765 43210',
  state: 'Tamil Nadu',
  district: 'Vellore',
  village: 'Katpadi',
  farmSize: 2,
  crop: 'Tomato',
  variety: 'Arka Rakshak (F1 Triple Resistant)',
  sowingDate: '2026-08-15',
  soilType: 'Loamy',
  irrigationType: 'Drip',
  language: 'en',
  farmerIdMasked: 'XXXX-XXXX-1234',
  coordinates: {
    lat: 12.9165,
    lng: 79.1325,
    source: 'district-centroid',
  },
};

const INITIAL_SOIL_DATA: SoilData = {
  soilType: 'Loamy',
  ph: 6.5,
  nitrogen: 245,
  phosphorus: 21,
  potassium: 215,
  organicCarbon: 0.58,
  moisture: 64,
  isSampleProfile: true,
};

const INITIAL_FEEDBACK_LIST: FarmerFeedback[] = [
  {
    id: 'FB-101',
    recommendationId: 'REC-DEMO-01',
    farmerName: 'Ravi Kumar',
    district: 'Vellore (Katpadi)',
    crop: 'Tomato',
    issue: 'Early Blight (Alternaria solani) — 78% Confidence',
    rating: 'Yes',
    comment: 'Skipped drip irrigation before evening rain and pruned spotted basal leaves.',
    outcome: 'Disease spread slowed across neighbouring plants',
    timestamp: 'Today, 09:15 IST',
  },
  {
    id: 'FB-102',
    recommendationId: 'REC-DEMO-02',
    farmerName: 'Lakshmi Narayanan',
    district: 'Vellore (Anaicut)',
    crop: 'Rice',
    issue: 'Rice Leaf Blast Watch — 81% Confidence',
    rating: 'Yes',
    comment: 'Paused urea top-dressing and drained excess standing water.',
    outcome: 'Applied 5cm organic straw mulch & bio-fungicide',
    timestamp: 'Yesterday, 17:40 IST',
  },
  {
    id: 'FB-103',
    recommendationId: 'REC-DEMO-03',
    farmerName: 'Muthuvel S.',
    district: 'Vellore (Gudiyatham)',
    crop: 'Tomato',
    issue: 'High Humidity Canopy Blight Advisory',
    rating: 'Partially',
    comment: 'Needed KVK officer confirmation for Pseudomonas dosage.',
    outcome: 'Escalated to local KVK / Agriculture Officer for field visit',
    timestamp: '2 days ago',
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('language');
      const valid: SupportedLanguage[] = ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'bn'];
      if (saved && valid.includes(saved as SupportedLanguage)) {
        return saved as SupportedLanguage;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const [profile, setProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('language');
      const valid: SupportedLanguage[] = ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'bn'];
      if (saved && valid.includes(saved as SupportedLanguage)) {
        return { ...INITIAL_FARMER_PROFILE, language: saved as SupportedLanguage };
      }
    } catch {
      // ignore
    }
    return INITIAL_FARMER_PROFILE;
  });

  const [authUser, setAuthUser] = useState<FarmerAuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const [soil, setSoil] = useState<SoilData>(INITIAL_SOIL_DATA);
  const [preferLiveWeather, setPreferLiveWeather] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherData>(() =>
    getDefaultDemoWeather(INITIAL_FARMER_PROFILE.district, INITIAL_FARMER_PROFILE.state)
  );

  const [currentQuestion, setCurrentQuestion] = useState<string>(
    'My tomato leaves are developing brown spots. What should I do?'
  );
  const [activeImageBase64, setActiveImageBase64] = useState<string | undefined>(undefined);
  const [activeImageLabel, setActiveImageLabel] = useState<string | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [serviceNotice, setServiceNotice] = useState<string | undefined>(undefined);
  const [geminiDiagnostics, setGeminiDiagnostics] = useState<GeminiDiagnostics | undefined>(
    undefined
  );
  const [feedbackList, setFeedbackList] = useState<FarmerFeedback[]>(INITIAL_FEEDBACK_LIST);

  // Sync language data-lang attribute on body for typography
  useEffect(() => {
    document.body.setAttribute('data-lang', language);
  }, [language]);

  // Subscribe to Firebase Phone Auth State
  useEffect(() => {
    const unsubscribe = subscribeToFarmerAuth(async (user) => {
      setAuthUser(user);
      if (user) {
        const firestoreProfile = await getFarmerProfileFromFirestore(user.uid);
        if (firestoreProfile) {
          setProfile(firestoreProfile);
          if (firestoreProfile.preferredLanguage) {
            handleLanguageChange(firestoreProfile.preferredLanguage);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Initialize leaf specimen and check Gemini API status on mount
  useEffect(() => {
    const spec = generateBotanicalLeafSpecimen('tomato-early-blight');
    setActiveImageBase64(spec.dataUrl);
    setActiveImageLabel(spec.title);

    checkGeminiStatus().then((status) => {
      setGeminiDiagnostics(status);
      if (status.connected) {
        handleRunAnalysis(spec.defaultQuestion, spec.dataUrl, spec.title);
      }
    });
  }, []);

  // Sync weather when district or Live/Demo toggle changes
  useEffect(() => {
    let cancelled = false;
    const lat = profile.coordinates?.lat ?? 12.9165;
    const lng = profile.coordinates?.lng ?? 79.1325;

    fetchLiveOrDemoWeather(lat, lng, profile.district, profile.state, preferLiveWeather).then(
      (nextWeather) => {
        if (!cancelled) {
          setWeather(nextWeather);
        }
      }
    );

    return () => {
      cancelled = true;
    };
  }, [profile.district, profile.state, profile.coordinates, preferLiveWeather]);

  const retrievedChunks = useMemo(
    () => retrieveAgriculturalKnowledge(currentQuestion, profile.crop, weather, soil, 3),
    [currentQuestion, profile.crop, weather, soil]
  );

  const riskBreakdown = useMemo(
    () =>
      calculatePrototypeRisk(
        profile,
        weather,
        soil,
        Boolean(activeImageBase64) ||
          currentQuestion.toLowerCase().includes('brown') ||
          currentQuestion.toLowerCase().includes('spot') ||
          currentQuestion.toLowerCase().includes('yellow')
      ),
    [profile, weather, soil, activeImageBase64, currentQuestion]
  );

  const [recommendation, setRecommendation] = useState<AIRecommendationResponse>(() =>
    buildDemoFallbackRecommendation(
      {
        question: 'My tomato leaves are developing brown spots. What should I do?',
        profile: INITIAL_FARMER_PROFILE,
        weather: getDefaultDemoWeather(
          INITIAL_FARMER_PROFILE.district,
          INITIAL_FARMER_PROFILE.state
        ),
        soil: INITIAL_SOIL_DATA,
        language: 'en',
      },
      retrieveAgriculturalKnowledge(
        'My tomato leaves are developing brown spots. What should I do?',
        INITIAL_FARMER_PROFILE.crop,
        getDefaultDemoWeather(INITIAL_FARMER_PROFILE.district, INITIAL_FARMER_PROFILE.state),
        INITIAL_SOIL_DATA,
        3
      ),
      'Initial Calibrated Context'
    )
  );

  const handleLanguageChange = (nextLang: SupportedLanguage) => {
    stopAdvisorySpeech();
    setLanguage(nextLang);
    const updatedProfile = { ...profile, language: nextLang };
    setProfile(updatedProfile);
    try {
      localStorage.setItem('language', nextLang);
    } catch {
      // ignore
    }

    // Instantly provide fallback recommendation in the selected language
    const immediateFallback = buildDemoFallbackRecommendation(
      {
        question: currentQuestion,
        profile: updatedProfile,
        weather,
        soil,
        language: nextLang,
        imageBase64: activeImageBase64,
      },
      retrievedChunks,
      `Language switched to ${nextLang}`
    );
    setRecommendation(immediateFallback);

    // If active, query Gemini to generate full response in nextLang
    analyzeFarmContextWithGemini({
      question: currentQuestion,
      profile: updatedProfile,
      weather,
      soil,
      imageBase64: activeImageBase64,
      language: nextLang,
      languageName: SUPPORTED_LANGUAGES.find((l) => l.code === nextLang)?.name || 'English',
    }).then((res) => {
      if (res && res.recommendation && !res.isFallback) {
        setRecommendation(res.recommendation);
      }
    });
  };

  const handleUpdateProfile = (nextProfile: FarmerProfile) => {
    setProfile(nextProfile);
    if (nextProfile.soilType !== soil.soilType) {
      setSoil((prev) => ({ ...prev, soilType: nextProfile.soilType }));
    }
  };

  const handleRefreshGeminiStatus = async () => {
    const status = await checkGeminiStatus();
    setGeminiDiagnostics(status);
  };

  const handleRunAnalysis = async (
    customQuestion?: string,
    customImageBase64?: string,
    customImageLabel?: string
  ) => {
    const qToUse = customQuestion !== undefined ? customQuestion : currentQuestion;
    const imgToUse = customImageBase64 !== undefined ? customImageBase64 : activeImageBase64;
    if (customImageLabel !== undefined) {
      setActiveImageLabel(customImageLabel);
    }

    setIsAnalyzing(true);
    setServiceNotice(undefined);

    const result = await analyzeFarmContextWithGemini({
      question: qToUse,
      profile,
      weather,
      soil,
      imageBase64: imgToUse,
      language,
    });

    setRecommendation(result.recommendation);
    setServiceNotice(result.serviceNotice);
    setIsAnalyzing(false);

    handleRefreshGeminiStatus();
  };

  const handleRunAnalysisWithCustom = (
    question: string,
    imageBase64?: string,
    imageLabel?: string
  ) => {
    setCurrentQuestion(question);
    if (imageBase64) {
      setActiveImageBase64(imageBase64);
    }
    if (imageLabel) {
      setActiveImageLabel(imageLabel);
    }
    setActiveTab('assistant');
    handleRunAnalysis(question, imageBase64, imageLabel);
  };

  const handleRunCompleteJudgeDemo = () => {
    const spec = generateBotanicalLeafSpecimen('tomato-early-blight');
    setProfile({
      ...INITIAL_FARMER_PROFILE,
      language,
    });
    setSoil(INITIAL_SOIL_DATA);
    setActiveImageBase64(spec.dataUrl);
    setActiveImageLabel(spec.title);
    setCurrentQuestion(spec.defaultQuestion);
    setActiveTab('assistant');
    handleRunAnalysis(spec.defaultQuestion, spec.dataUrl, spec.title);
  };

  const handleSubmitFeedback = (newFb: Omit<FarmerFeedback, 'id' | 'timestamp'>) => {
    const entry: FarmerFeedback = {
      ...newFb,
      id: `FB-${Date.now()}`,
      timestamp: 'Just now',
    };
    setFeedbackList((prev) => [entry, ...prev]);
  };

  const handleTriggerJudgeStep = (stepIndex: number) => {
    if (stepIndex === 0) {
      setActiveTab('home');
    } else if (stepIndex === 1) {
      setProfile({ ...INITIAL_FARMER_PROFILE, language });
      setActiveTab('dashboard');
    } else if (stepIndex === 2 || stepIndex === 3) {
      handleRunCompleteJudgeDemo();
    } else if (stepIndex === 4) {
      setActiveTab('soil');
    } else if (stepIndex === 5) {
      setActiveTab('officer');
    }
  };

  const handleLogout = async () => {
    try {
      await signOutFarmer();
    } catch {
      // ignore
    }
    setAuthUser(null);
    setProfile(INITIAL_FARMER_PROFILE);
  };

  const handleAuthSuccess = (user: FarmerAuthUser, nextProfile: FarmerProfile) => {
    setAuthUser(user);
    setProfile(nextProfile);
    if (nextProfile.preferredLanguage) {
      handleLanguageChange(nextProfile.preferredLanguage);
    }
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const NAV_ITEMS: { id: ActiveTab; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home className="w-4 h-4 shrink-0" />, label: t.navHome },
    { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" />, label: t.navDashboard },
    { id: 'assistant', icon: <Sparkles className="w-4 h-4 shrink-0" />, label: t.navAssistant },
    { id: 'soil', icon: <Recycle className="w-4 h-4 shrink-0" />, label: t.navSoil },
    { id: 'officer', icon: <Building2 className="w-4 h-4 shrink-0" />, label: t.navOfficer },
    { id: 'docs', icon: <BookOpen className="w-4 h-4 shrink-0" />, label: t.navDocs },
  ];

  // If not signed in, show Multilingual Farmer Welcome Landing Gate
  if (!authUser) {
    return (
      <div className="min-h-screen bg-[#F6F8F5] text-[#111C14] antialiased w-full max-w-full overflow-x-hidden">
        <FarmerWelcomeGate
          language={language}
          onLanguageChange={handleLanguageChange}
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onOpenSignup={() => setIsAuthModalOpen(true)}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          language={language}
          currentProfile={profile}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F5] text-[#111C14] antialiased w-full max-w-full overflow-x-hidden">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 px-3 sm:px-6 lg:px-8 py-2.5 shadow-2xs w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1360px] w-full mx-auto flex items-center justify-between gap-2 lg:gap-3">
          {/* Left: App Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 text-base md:text-lg font-bold tracking-tight text-[#14532D] hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <Sprout className="w-5 h-5 md:w-6 md:h-6 text-emerald-700 shrink-0" />
            <span className="font-extrabold">{t.appTitle}</span>
          </button>

          {/* Center: Desktop Navigation items */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs font-semibold text-stone-700">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap text-xs ${
                  activeTab === item.id
                    ? 'bg-[#14532D] text-white font-bold shadow-2xs'
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Zone: Status + Language + Profile/Auth + 1-Click Demo */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Real-time Gemini Status Badge */}
            {!recommendation.isFallback ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-2xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="hidden 2xl:inline">{t.geminiActive}</span>
                <span className="2xl:hidden">Gemini AI</span>
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-2xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300/80 rounded-full whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="hidden 2xl:inline">{t.geminiFallback}</span>
                <span className="2xl:hidden">RAG Active</span>
              </span>
            )}

            {/* Language Selector */}
            <div className="relative flex items-center shrink-0">
              <select
                aria-label={t.navLanguage}
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="px-2 py-1.5 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200/80 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    🌐 {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Farmer Profile / Auth Button */}
            {authUser ? (
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="px-2.5 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs shrink-0 whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span>{profile.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-2.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span>{t.navLogin}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sub-Header Navigation Scroll Strip */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pt-2 mt-2 border-t border-stone-100 text-xs font-medium text-stone-600">
          {NAV_ITEMS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 text-xs font-bold ${
                activeTab === tab.id
                  ? 'bg-[#14532D] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 md:px-8 py-7 pb-24 lg:pb-12">
        {activeTab === 'home' && (
          <FarmerHomeView
            profile={profile}
            weather={weather}
            soil={soil}
            riskBreakdown={riskBreakdown}
            language={language}
            onUpdateProfile={handleUpdateProfile}
            onStartAssistant={() => setActiveTab('assistant')}
            onUploadCropImageAction={() => {
              const spec = generateBotanicalLeafSpecimen('tomato-early-blight');
              setActiveImageBase64(spec.dataUrl);
              setActiveImageLabel(spec.title);
              setActiveTab('assistant');
            }}
            onAskByVoiceAction={() => setActiveTab('assistant')}
            onOpenDashboard={() => setActiveTab('dashboard')}
            onOpenSoilView={() => setActiveTab('soil')}
            onRunAnalysisWithCustom={handleRunAnalysisWithCustom}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmDashboardView
            profile={profile}
            weather={weather}
            soil={soil}
            riskBreakdown={riskBreakdown}
            recommendation={recommendation}
            language={language}
            preferLiveWeather={preferLiveWeather}
            onToggleWeatherMode={setPreferLiveWeather}
            onNavigateToAssistant={(prompt) => {
              if (prompt) setCurrentQuestion(prompt);
              setActiveTab('assistant');
            }}
            onNavigateToSoil={() => setActiveTab('soil')}
            onSpeakTodayAction={() =>
              speakAdvisoryText(
                language !== 'en'
                  ? (t.todaysRecommendationBody || t.todaysActionBody)
                  : `Delay ${profile.irrigationType} irrigation for 24 hours because rainfall probability is ${weather.rainProbability}% in ${profile.district}, and inspect lower ${profile.crop} leaves for early blight spots.`,
                language
              )
            }
          />
        )}

        {activeTab === 'assistant' && (
          <AIDecisionStudioView
            profile={profile}
            weather={weather}
            soil={soil}
            riskBreakdown={riskBreakdown}
            language={language}
            onSelectLanguage={handleLanguageChange}
            recommendation={recommendation}
            retrievedChunks={retrievedChunks}
            isAnalyzing={isAnalyzing}
            serviceNotice={serviceNotice}
            activeImageBase64={activeImageBase64}
            activeImageLabel={activeImageLabel}
            currentQuestion={currentQuestion}
            geminiDiagnostics={geminiDiagnostics}
            onChangeQuestion={setCurrentQuestion}
            onUploadImage={(b64, label) => {
              setActiveImageBase64(b64);
              setActiveImageLabel(label);
            }}
            onClearImage={() => {
              setActiveImageBase64(undefined);
              setActiveImageLabel(undefined);
            }}
            onRunAnalysis={handleRunAnalysis}
            onRetryConnection={handleRefreshGeminiStatus}
            onSubmitFeedback={handleSubmitFeedback}
          />
        )}

        {activeTab === 'soil' && (
          <SoilRegenerativeView
            profile={profile}
            soil={soil}
            language={language}
            onUpdateSoil={setSoil}
            onNavigateToAssistantWithPrompt={(prompt) => {
              setCurrentQuestion(prompt);
              setActiveTab('assistant');
              handleRunAnalysis(prompt);
            }}
          />
        )}

        {activeTab === 'officer' && (
          <OfficerDashboardView
            currentFarmer={profile}
            feedbackList={feedbackList}
            language={language}
          />
        )}

        {activeTab === 'docs' && (
          <DocumentationView
            language={language}
            onTriggerJudgeStep={handleTriggerJudgeStep}
            onSelectLanguage={handleLanguageChange}
          />
        )}
      </main>

      {/* 3. MOBILE COMPACT BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-2xs font-bold transition-colors ${
            activeTab === 'home' ? 'text-[#14532D]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{t.navHome}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('assistant')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-2xs font-bold transition-colors ${
            activeTab === 'assistant' ? 'text-[#14532D]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>{t.navAssistant}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-2xs font-bold transition-colors ${
            activeTab === 'dashboard' ? 'text-[#14532D]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>{t.navDashboard}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('soil')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-2xs font-bold transition-colors ${
            activeTab === 'soil' ? 'text-[#14532D]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Recycle className="w-5 h-5 mb-0.5" />
          <span>{t.navSoil}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsProfileModalOpen(true)}
          className="flex flex-col items-center py-1 px-2 rounded-lg text-2xs font-bold text-stone-500 hover:text-stone-900"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>{t.navProfile}</span>
        </button>
      </div>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-stone-200 px-4 md:px-8 py-5 mt-auto">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <strong className="text-stone-900">Kisan Saarthi</strong> · {language === 'hi' ? 'ट्रैक 4: AgriN और प्राकृतिक कृषि बुद्धिमत्ता · सलाहकार निर्णय सहायता प्रोटोटाइप' : language === 'ta' ? 'ட்ராக் 4: AgriN & இயற்கை வேளாண் நுண்ணறிவு · ஆலோசனை முடிவெடுக்கும் மாதிரி' : 'Track 4: AgriN & Regenerative Agricultural Intelligence · Advisory Decision-Support Prototype'}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className="hover:text-stone-900 underline font-semibold"
            >
              {language === 'hi' ? 'सिस्टम संरचना और 3-5 मिनट जज गाइड' : language === 'ta' ? 'கணினி கட்டமைப்பு & 3-5 நிமிட நடுவர் வழிகாட்டி' : 'System Architecture & 3–5 Min Judge Guide'}
            </button>
            <span>·</span>
            <span>{language === 'hi' ? 'स्थानीय केवीके / कृषि अधिकारियों से महत्वपूर्ण कृषि कार्यों की पुष्टि करें' : language === 'ta' ? 'முக்கிய கள நடவடிக்கைகளை உள்ளூர் KVK / வேளாண் அதிகாரிகளுடன் சரிபார்க்கவும்' : 'Verify critical field interventions with local KVK / Agriculture Officers'}</span>
          </div>
        </div>
      </footer>

      {/* 5. MODALS */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        currentProfile={profile}
        onAuthSuccess={(user, nextProfile) => {
          setAuthUser(user);
          setProfile(nextProfile);
          if (nextProfile.preferredLanguage) {
            handleLanguageChange(nextProfile.preferredLanguage);
          }
        }}
      />

      <FarmerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        authUser={authUser}
        language={language}
        onUpdateProfile={handleUpdateProfile}
        onLanguageChange={handleLanguageChange}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
