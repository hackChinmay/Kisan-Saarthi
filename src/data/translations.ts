import { SupportedLanguage } from '../types/agri';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechLang: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLang: 'hi-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechLang: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLang: 'te-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLang: 'kn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLang: 'mr-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLang: 'bn-IN' },
];

export interface UITranslationStrings {
  appTitle: string;
  homeGreeting: string;
  homeSubtitle: string;
  checkCropBtn: string;
  askByVoiceBtn: string;
  askQuestionBtn: string;
  checkWeatherBtn: string;
  todaysActionTitle: string;
  todaysActionBody: string;
  viewRecommendation: string;
  listenBtn: string;
  listeningAudio: string;
  stopAudioBtn: string;

  // Nav
  navHome: string;
  navDashboard: string;
  navAssistant: string;
  navSoil: string;
  navOfficer: string;
  navDocs: string;
  navLanguage: string;
  navProfile: string;
  navLogin: string;
  navLogout: string;

  // 4 Summary cards
  summaryWeatherTitle: string;
  summaryWeatherSub: string;
  summaryCropHealthTitle: string;
  summaryCropHealthSub: string;
  summarySoilTitle: string;
  summarySoilSub: string;
  summaryRegenTitle: string;
  summaryRegenSub: string;

  // Decision Center
  decisionHeading: string;
  farmerContextTitle: string;
  possibleIssue: string;
  confidence: string;
  risk: string;
  whyTitle: string;
  whatToDoNow: string;
  preventionTitle: string;
  weatherContextTitle: string;
  regenerativeTipTitle: string;
  sourcesTitle: string;
  actionPlanTitle: string;
  planToday: string;
  planThisWeek: string;
  planNextTwoWeeks: string;
  listenToAdvice: string;
  feedbackPrompt: string;
  feedbackHelpful: string;
  feedbackNotHelpful: string;

  // Guided Flow
  guidedStep1Title: string;
  guidedStep2Title: string;
  guidedStep3Title: string;
  guidedStep4Title: string;
  guidedStep5Title: string;
  analyzeCropBtn: string;
  loadingStep1: string;
  loadingStep2: string;
  loadingStep3: string;
  loadingStep4: string;
  loadingReady: string;
  humanErrorText: string;
  tryAgainBtn: string;
  fallbackNotice: string;

  // Voice
  voiceListening: string;
  voicePreparing: string;

  // Auth & Profile
  loginTitle: string;
  loginSubtitle: string;
  signupTitle: string;
  signupSubtitle: string;
  mobileNumber: string;
  sendOtp: string;
  enterOtp: string;
  verifyOtp: string;
  resendOtp: string;
  fullName: string;
  preferredLanguage: string;
  state: string;
  district: string;
  village: string;
  primaryCrop: string;
  farmSize: string;
  irrigationType: string;
  soilType: string;
  optionalAadhaar: string;
  maskedId: string;
  editProfile: string;
  changeLanguage: string;
  saveProfile: string;
  profileUpdated: string;
  invalidOtp: string;
  invalidPhone: string;
  otpSent: string;
  quickDemoLogin: string;
  callCenterText: string;
  callCenterBtn: string;

  // Status
  geminiActive: string;
  geminiFallback: string;

  // Extras
  todaysRecommendationBody?: string;
  demoRecommendationSummary?: string;
  demoImmediateActions?: string[];
  demoRegenerativeAdvice?: string;
}

export const UI_TRANSLATIONS: Record<SupportedLanguage, UITranslationStrings> = {
  en: {
    appTitle: 'Kisan Saarthi',
    homeGreeting: 'What do you want help with today?',
    homeSubtitle: 'Simple farming guidance for your crop, weather, and soil.',
    checkCropBtn: 'Check My Crop',
    askByVoiceBtn: 'Ask by Voice',
    askQuestionBtn: 'Ask KisanSaarthi',
    checkWeatherBtn: "Check Weather",
    todaysActionTitle: "TODAY'S FARM ACTION",
    todaysActionBody: 'Rain is likely tomorrow. Consider delaying irrigation today.',
    viewRecommendation: 'View Recommendation',
    listenBtn: 'Listen to Advice',
    listeningAudio: 'Playing advice in English...',
    stopAudioBtn: 'Pause Audio',

    navHome: 'Home',
    navDashboard: 'Dashboard',
    navAssistant: 'AI Decision',
    navSoil: 'Soil & Water',
    navOfficer: 'Officer',
    navDocs: 'Guide',
    navLanguage: 'Language',
    navProfile: 'Profile',
    navLogin: 'Login / Sign Up',
    navLogout: 'Logout',

    summaryWeatherTitle: 'Weather',
    summaryWeatherSub: 'Rain probability & temp',
    summaryCropHealthTitle: 'Crop Health',
    summaryCropHealthSub: 'Field disease risk',
    summarySoilTitle: 'Soil Moisture',
    summarySoilSub: 'Root-zone moisture',
    summaryRegenTitle: 'Regenerative Score',
    summaryRegenSub: 'Soil & water practices',

    decisionHeading: 'What should the farmer do now, and why?',
    farmerContextTitle: 'Farmer Context',
    possibleIssue: 'POSSIBLE ISSUE',
    confidence: 'Confidence',
    risk: 'Risk',
    whyTitle: 'WHY?',
    whatToDoNow: 'WHAT TO DO NOW',
    preventionTitle: 'PREVENTION & LONG-TERM CARE',
    weatherContextTitle: 'WEATHER CONTEXT',
    regenerativeTipTitle: 'REGENERATIVE PRACTICE',
    sourcesTitle: 'VERIFIED AGRONOMIC SOURCES',
    actionPlanTitle: 'PERSONALIZED ACTION PLAN',
    planToday: 'TODAY',
    planThisWeek: 'THIS WEEK',
    planNextTwoWeeks: 'NEXT 2 WEEKS',
    listenToAdvice: 'Listen to Advice',
    feedbackPrompt: 'Was this guidance helpful for your farm?',
    feedbackHelpful: 'Helpful',
    feedbackNotHelpful: 'Needs Adjustment',

    guidedStep1Title: 'What crop are you growing?',
    guidedStep2Title: 'What is the problem?',
    guidedStep3Title: 'Show us the problem',
    guidedStep4Title: 'Tell us anything else',
    guidedStep5Title: "Let's check your crop",
    analyzeCropBtn: 'Analyze My Crop',
    loadingStep1: 'Looking at your crop...',
    loadingStep2: 'Checking agricultural guidance...',
    loadingStep3: 'Checking weather conditions...',
    loadingStep4: 'Preparing recommendation...',
    loadingReady: 'Your recommendation is ready.',
    humanErrorText: "Sorry, we couldn't analyze the crop right now.",
    tryAgainBtn: 'Try Again',
    fallbackNotice: "We're showing grounded agricultural guidance instead.",

    voiceListening: 'Listening...',
    voicePreparing: 'Preparing your answer...',

    loginTitle: 'Welcome back, Farmer',
    loginSubtitle: 'Get personalized farming guidance in your language.',
    signupTitle: 'Create Your Farmer Profile',
    signupSubtitle: 'Join thousands of farmers receiving intelligent daily agronomy advisories.',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Send OTP',
    enterOtp: 'Enter 6-Digit OTP',
    verifyOtp: 'Verify OTP',
    resendOtp: 'Resend OTP',
    fullName: 'Full Name',
    preferredLanguage: 'Preferred Language',
    state: 'State',
    district: 'District',
    village: 'Village / Taluk',
    primaryCrop: 'Primary Crop',
    farmSize: 'Farm Size (Acres)',
    irrigationType: 'Irrigation System',
    soilType: 'Soil Type',
    optionalAadhaar: 'Farmer ID / Aadhaar (Optional)',
    maskedId: 'Farmer ID',
    editProfile: 'Edit Profile',
    changeLanguage: 'Change Language',
    saveProfile: 'Save Profile',
    profileUpdated: 'Profile updated successfully!',
    invalidOtp: 'Invalid OTP. Please check the code and try again.',
    invalidPhone: 'Please enter a valid 10-digit mobile number.',
    otpSent: 'OTP sent successfully to your mobile number.',
    quickDemoLogin: '1-Click Demo Profile Login',
    callCenterText: 'Kisan Call Center: 1800-180-1551 (Toll-Free · All Indian Languages)',
    callCenterBtn: 'Call Kisan Helpline',

    geminiActive: '✓ Gemini AI Active',
    geminiFallback: '🛡️ RAG Agronomy Intelligence (Active)',

    todaysRecommendationBody: 'Delay irrigation for 24 hours because rain is likely tomorrow. Inspect bottom leaves for early blight spots.',
    demoRecommendationSummary: 'Delay irrigation for 24 hours because rain is likely. Prune severely spotted lower leaves.',
    demoImmediateActions: [
      'Delay irrigation for 24 hours due to forecast rain.',
      'Prune and discard spotted lower leaves touching soil.',
      'Apply preventative bio-control spray (Pseudomonas fluorescens 10g/L).',
    ],
    demoRegenerativeAdvice: 'Apply a 5 cm dried organic straw mulch over crop beds to stop soil splash pathogens and save water.',
  },

  hi: {
    appTitle: 'किसान सारथी',
    homeGreeting: 'आज आप किस बारे में मदद चाहते हैं?',
    homeSubtitle: 'आपकी फसल, मौसम और मिट्टी के लिए सरल कृषि सलाह।',
    checkCropBtn: 'फसल की जांच करें',
    askByVoiceBtn: 'बोलकर पूछें',
    askQuestionBtn: 'किसानसारथी से पूछें',
    checkWeatherBtn: 'मौसम देखें',
    todaysActionTitle: 'आज का जरूरी काम',
    todaysActionBody: 'कल बारिश की संभावना है। आज सिंचाई टालने पर विचार करें।',
    viewRecommendation: 'सलाह देखें',
    listenBtn: 'सलाह सुनें',
    listeningAudio: 'हिन्दी में सलाह सुनाई जा रही है...',
    stopAudioBtn: 'रोकें',

    navHome: 'मुख्य पृष्ठ',
    navDashboard: 'खेत डैशबोर्ड',
    navAssistant: 'निर्णय केंद्र',
    navSoil: 'मिट्टी व जल',
    navOfficer: 'अधिकारी',
    navDocs: 'मार्गदर्शिका',
    navLanguage: 'भाषा',
    navProfile: 'किसान प्रोफ़ाइल',
    navLogin: 'किसान प्रवेश',
    navLogout: 'बाहर निकलें',

    summaryWeatherTitle: 'मौसम',
    summaryWeatherSub: 'तापमान व वर्षा संभावना',
    summaryCropHealthTitle: 'फसल स्वास्थ्य',
    summaryCropHealthSub: 'खेत में रोग का खतरा',
    summarySoilTitle: 'मिट्टी में नमी',
    summarySoilSub: 'जड़ क्षेत्र में नमी',
    summaryRegenTitle: 'प्राकृतिक स्कोर',
    summaryRegenSub: 'जल व मृदा संरक्षण',

    decisionHeading: 'किसान को अभी क्या करना चाहिए, और क्यों?',
    farmerContextTitle: 'किसान का विवरण',
    possibleIssue: 'संभावित समस्या',
    confidence: 'विश्वसनीयता',
    risk: 'जोखिम स्तर',
    whyTitle: 'ऐसा क्यों है?',
    whatToDoNow: 'अब क्या करें',
    preventionTitle: 'रोकथाम और दीर्घकालिक देखभाल',
    weatherContextTitle: 'मौसम की स्थिति',
    regenerativeTipTitle: 'प्राकृतिक खेती उपाय',
    sourcesTitle: 'प्रमाणित कृषि अनुसंधान स्रोत',
    actionPlanTitle: 'व्यक्तिगत कार्य योजना',
    planToday: 'आज',
    planThisWeek: 'इस सप्ताह',
    planNextTwoWeeks: 'अगले २ सप्ताह',
    listenToAdvice: 'सलाह सुनें',
    feedbackPrompt: 'क्या यह सलाह आपके खेत के लिए उपयोगी रही?',
    feedbackHelpful: 'उपयोगी है',
    feedbackNotHelpful: 'सुधार चाहिए',

    guidedStep1Title: 'आप कौन सी फसल उगा रहे हैं?',
    guidedStep2Title: 'फसल में क्या समस्या है?',
    guidedStep3Title: 'समस्या की फोटो दिखाएं',
    guidedStep4Title: 'क्या आप कुछ और बताना चाहते हैं?',
    guidedStep5Title: 'आइए आपकी फसल की जांच करें',
    analyzeCropBtn: 'मेरी फसल की जांच करें',
    loadingStep1: 'आपकी फसल देखी जा रही है...',
    loadingStep2: 'कृषि सलाह जांची जा रही है...',
    loadingStep3: 'मौसम की स्थिति देखी जा रही है...',
    loadingStep4: 'सलाह तैयार की जा रही है...',
    loadingReady: 'आपकी सलाह तैयार है।',
    humanErrorText: 'माफ कीजिए, अभी फसल की जांच नहीं हो पाई।',
    tryAgainBtn: 'दोबारा कोशिश करें',
    fallbackNotice: 'हम अभी सुरक्षित कृषि ज्ञान के आधार पर सलाह दिखा रहे हैं।',

    voiceListening: 'सुन रहे हैं...',
    voicePreparing: 'आपका उत्तर तैयार किया जा रहा है...',

    loginTitle: 'स्वागत है, किसान भाई',
    loginSubtitle: 'अपनी भाषा में व्यक्तिगत कृषि सलाह प्राप्त करें।',
    signupTitle: 'किसान प्रोफाइल बनाएं',
    signupSubtitle: 'हजारों किसानों के साथ जुड़ें और प्रतिदिन सटीक कृषि मार्गदर्शन पाएं।',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'ओटीपी (OTP) भेजें',
    enterOtp: '६ अंकों का ओटीपी दर्ज करें',
    verifyOtp: 'ओटीपी सत्यापित करें',
    resendOtp: 'ओटीपी पुनः भेजें',
    fullName: 'पूरा नाम',
    preferredLanguage: 'पसंदीदा भाषा',
    state: 'राज्य',
    district: 'जिला',
    village: 'गांव / तालुक',
    primaryCrop: 'मुख्य फसल',
    farmSize: 'खेत का आकार (एकड़)',
    irrigationType: 'सिंचाई प्रणाली',
    soilType: 'मिट्टी का प्रकार',
    optionalAadhaar: 'किसान पहचान पत्र / आधार (वैकल्पिक)',
    maskedId: 'किसान आईडी',
    editProfile: 'प्रोफाइल बदलें',
    changeLanguage: 'भाषा बदलें',
    saveProfile: 'प्रोफाइल सहेजें',
    profileUpdated: 'प्रोफाइल सफलतापूर्वक अपडेट हो गया!',
    invalidOtp: 'गलत ओटीपी। कृपया सही ६ अंकों का कोड दर्ज करें।',
    invalidPhone: 'कृपया १० अंकों का वैध मोबाइल नंबर दर्ज करें।',
    otpSent: 'आपके मोबाइल नंबर पर ओटीपी भेज दिया गया है।',
    quickDemoLogin: '१-क्लिक डेमो प्रोफाइल से प्रवेश',
    callCenterText: 'किसान कॉल सेंटर: 1800-180-1551 (टोल-फ्री · सभी भारतीय भाषाएं)',
    callCenterBtn: 'किसान हेल्पलाइन कॉल करें',

    geminiActive: '✓ Gemini AI सक्रिय',
    geminiFallback: '🛡️ RAG कृषि सलाहकार मोड सक्रिय',

    todaysRecommendationBody: 'कल बारिश की संभावना है। आज सिंचाई टालें और निचली पत्तियों पर भूरे धब्बों की जांच करें।',
    demoRecommendationSummary: 'बारिश की संभावना के कारण २४ घंटे सिंचाई रोकें। रोगग्रस्त पत्तों को हटा दें।',
    demoImmediateActions: [
      'बारिश की संभावना के कारण अगले २४ घंटे सिंचाई रोकें।',
      'मिट्टी को छू रहे धब्बेदार पत्तों को काटकर खेत से दूर फेंकें।',
      'साफ मौसम में स्यूडोमोनास फ्लोरोसेंस (१० ग्राम/लीटर) का छिड़काव करें।',
    ],
    demoRegenerativeAdvice: 'फसल की क्यारियों पर ५ सेमी धान के पुआल की मल्चिंग करें ताकि मिट्टी के फंगल छींटे पत्तों पर न पड़ें।',
  },

  ta: {
    appTitle: 'கிசான் சாரதி',
    homeGreeting: 'இன்று உங்களுக்கு என்ன உதவி வேண்டும்?',
    homeSubtitle: 'உங்கள் பயிர், வானிலை மற்றும் மண்ணிற்கான எளிய விவசாய வழிகாட்டுதல்.',
    checkCropBtn: 'பயிரை ஆய்வு செய்',
    askByVoiceBtn: 'குரல் மூலம் கேள்',
    askQuestionBtn: 'கிசான்சாரதியிடம் கேள்',
    checkWeatherBtn: 'வானிலை பார்',
    todaysActionTitle: 'இன்றைய பண்ணை நடவடிக்கை',
    todaysActionBody: 'நாளை மழை பெய்ய வாய்ப்புள்ளது. இன்று தண்ணீர் பாய்ச்சுவதை ஒத்திவையுங்கள்.',
    viewRecommendation: 'பரிந்துரையைப் பார்',
    listenBtn: 'ஆலோசனையைக் கேளுங்கள்',
    listeningAudio: 'தமிழில் ஆலோசனை ஒலிக்கிறது...',
    stopAudioBtn: 'நிறுத்து',

    navHome: 'முகப்பு',
    navDashboard: 'பண்ணை பலகை',
    navAssistant: 'ஆலோசனை மையம்',
    navSoil: 'மண் & நீர்',
    navOfficer: 'அதிகாரி',
    navDocs: 'வழிகாட்டி',
    navLanguage: 'மொழி',
    navProfile: 'சுயவிவரம்',
    navLogin: 'விவசாயி உள்நுழைவு',
    navLogout: 'வெளியேறு',

    summaryWeatherTitle: 'வானிலை',
    summaryWeatherSub: 'மழை வாய்ப்பு & வெப்பநிலை',
    summaryCropHealthTitle: 'பயிர் நலம்',
    summaryCropHealthSub: 'நோய் ஆபத்து நிலை',
    summarySoilTitle: 'மண் ஈரப்பதம்',
    summarySoilSub: 'வேர் மண்டல ஈரப்பதம்',
    summaryRegenTitle: 'இயற்கை மதிப்பெண்',
    summaryRegenSub: 'மண் & நீர் பாதுகாப்பு',

    decisionHeading: 'விவசாயி இப்போது என்ன செய்ய வேண்டும், ஏன்?',
    farmerContextTitle: 'விவசாயி விபரம்',
    possibleIssue: 'சாத்தியமான பிரச்சனை',
    confidence: 'நம்பகத்தன்மை',
    risk: 'ஆபத்து நிலை',
    whyTitle: 'ஏன்?',
    whatToDoNow: 'இப்போது என்ன செய்ய வேண்டும்',
    preventionTitle: 'தடுப்பு & நீண்டகால பராமரிப்பு',
    weatherContextTitle: 'வானிலை சூழல்',
    regenerativeTipTitle: 'இயற்கை விவசாய முறை',
    sourcesTitle: 'சரிபார்க்கப்பட்ட வேளாண் ஆராய்ச்சி ஆதாரங்கள்',
    actionPlanTitle: 'தனிப்பயனாக்கப்பட்ட செயல் திட்டம்',
    planToday: 'இன்று',
    planThisWeek: 'இந்த வாரம்',
    planNextTwoWeeks: 'அடுத்த 2 வாரங்கள்',
    listenToAdvice: 'ஆலோசனையைக் கேளுங்கள்',
    feedbackPrompt: 'இந்த ஆலோசனை உங்கள் பண்ணைக்குப் பயனுள்ளதாக இருந்ததா?',
    feedbackHelpful: 'பயனுள்ளது',
    feedbackNotHelpful: 'மாற்றம் தேவை',

    guidedStep1Title: 'நீங்கள் என்ன பயிர் வளர்க்கிறீர்கள்?',
    guidedStep2Title: 'பயிரில் என்ன பிரச்சனை?',
    guidedStep3Title: 'பாதிக்கப்பட்ட இலையின் படம் காட்டுங்கள்',
    guidedStep4Title: 'வேறு ஏதேனும் சொல்ல விரும்புகிறீர்களா?',
    guidedStep5Title: 'உங்கள் பயிரை ஆய்வு செய்வோம்',
    analyzeCropBtn: 'பயிரை ஆய்வு செய்',
    loadingStep1: 'உங்கள் பயிரைப் பார்க்கிறோம்...',
    loadingStep2: 'விவசாய ஆலோசனைகளைச் சரிபார்க்கிறோம்...',
    loadingStep3: 'வானிலை நிலவரத்தைப் பார்க்கிறோம்...',
    loadingStep4: 'பரிந்துரையைத் தயார் செய்கிறோம்...',
    loadingReady: 'உங்கள் ஆலோசனை தயாராகிவிட்டது.',
    humanErrorText: 'மன்னிக்கவும், இப்போது பயிரை ஆய்வு செய்ய முடியவில்லை.',
    tryAgainBtn: 'மீண்டும் முயற்சி செய்',
    fallbackNotice: 'சேமிக்கப்பட்ட விவசாய அறிவுரை தற்போது காட்டப்படுகிறது.',

    voiceListening: 'கேட்கிறோம்...',
    voicePreparing: 'பதில் தயாராகிறது...',

    loginTitle: 'வணக்கம், விவசாய நண்பரே',
    loginSubtitle: 'உங்கள் தாய்மொழியில் தனிப்பயனாக்கப்பட்ட வேளாண் வழிகாட்டுதலைப் பெறுங்கள்.',
    signupTitle: 'விவசாயி கணக்கை உருவாக்கவும்',
    signupSubtitle: 'தினசரி விவசாய வழிகாட்டலைப் பெற ஆயிரக்கணக்கான விவசாயிகளுடன் இணையுங்கள்.',
    mobileNumber: 'கைபேசி எண்',
    sendOtp: 'OTP அனுப்புக',
    enterOtp: '6-இலக்க OTP ஐ உள்ளிடவும்',
    verifyOtp: 'OTP சரிபார்க்கவும்',
    resendOtp: 'OTP மீண்டும் அனுப்புக',
    fullName: 'முழு பெயர்',
    preferredLanguage: 'விருப்ப மொழி',
    state: 'மாநிலம்',
    district: 'மாவட்டம்',
    village: 'கிராமம் / தாலுகா',
    primaryCrop: 'முதன்மை பயிர்',
    farmSize: 'பண்ணை அளவு (ஏக்கர்)',
    irrigationType: 'பாசன முறை',
    soilType: 'மண் வகை',
    optionalAadhaar: 'விவசாயி அடையாள அட்டை / ஆதார் (விருப்பத்தேர்வு)',
    maskedId: 'விவசாயி ஐடி',
    editProfile: 'சுயவிவரத்தை மாற்று',
    changeLanguage: 'மொழியை மாற்று',
    saveProfile: 'சேமிக்கவும்',
    profileUpdated: 'சுயவிவரம் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது!',
    invalidOtp: 'தவறான OTP. சரியான 6-இலக்க குறியீட்டை உள்ளிடவும்.',
    invalidPhone: 'சரியான 10-இலக்க கைபேசி எண்ணை உள்ளிடவும்.',
    otpSent: 'உங்கள் கைபேசி எண்ணிற்கு OTP அனுப்பப்பட்டது.',
    quickDemoLogin: '1-கிளிக் டெமோ சுயவிவர நுழைவு',
    callCenterText: 'கிசான் கால் சென்டர்: 1800-180-1551 (கட்டணமில்லா எண் · அனைத்து இந்திய மொழிகள்)',
    callCenterBtn: 'உதவி மையத்தை அழைக்கவும்',

    geminiActive: '✓ Gemini AI செயல்படுகிறது',
    geminiFallback: '🛡️ RAG வேளாண் நுண்ணறிவு (இயங்குகிறது)',

    todaysRecommendationBody: 'நாளை மழை பெய்ய வாய்ப்புள்ளதால் 24 மணி நேரத்திற்கு தண்ணீர் பாய்ச்ச வேண்டாம். தக்காளி கீழ் இலைகளில் கரும்புள்ளி உள்ளதா என பாருங்கள்.',
    demoRecommendationSummary: 'மழை வாய்ப்பு உள்ளதால் தண்ணீர் பாய்ச்சுவதை ஒத்திவைக்கவும். பாதிக்கப்பட்ட இலைகளை அகற்றவும்.',
    demoImmediateActions: [
      'மழை வாய்ப்பு உள்ளதால் அடுத்த 24 மணி நேரத்திற்கு பாசனத்தை நிறுத்துங்கள்.',
      'மண்ணைத் தொடும் பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி அகற்றவும்.',
      'சூடோமோனாஸ் புளோரசன்ஸ் (10 கிராம்/லிட்டர்) தெளிக்கவும்.',
    ],
    demoRegenerativeAdvice: 'மண்ணிலிருந்து கிருமிகள் இலைகளில் தெறிப்பதைத் தடுக்க 5 செ.மீ வைக்கோல் மூடாக்கு இடுங்கள்.',
  },

  te: {
    appTitle: 'కిసాన్ సారథి',
    homeGreeting: 'ఈరోజు మీకు ఏ సహాయం కావాలి?',
    homeSubtitle: 'మీ పంట, వాతావరణం మరియు నేలకు సులభమైన వ్యవసాయ సలహా.',
    checkCropBtn: 'పంటను తనిఖీ చేయండి',
    askByVoiceBtn: 'వాయిస్‌తో అడగండి',
    askQuestionBtn: 'కిసాన్‌సారథిని అడగండి',
    checkWeatherBtn: 'వాతావరణం చూడండి',
    todaysActionTitle: 'నేటి ముఖ్యమైన పని',
    todaysActionBody: 'రేపు వర్షం పడే అవకాశం ఉంది. ఈరోజు నీటి తడి ఆపడం మంచిది.',
    viewRecommendation: 'సలహా చూడండి',
    listenBtn: 'సలహా వినండి',
    listeningAudio: 'తెలుగులో సలహా వినిపిస్తోంది...',
    stopAudioBtn: 'ఆపండి',

    navHome: 'ప్రధాన పేజీ',
    navDashboard: 'సాగు సమాచారం',
    navAssistant: 'నిర్ణయ కేంద్రం',
    navSoil: 'నేల & నీరు',
    navOfficer: 'వ్యవసాయ అధికారి',
    navDocs: 'మార్గదర్శి',
    navLanguage: 'భాష',
    navProfile: 'రైతు ప్రొఫైల్',
    navLogin: 'రైతు ప్రవేశం',
    navLogout: 'నిష్క్రమించు',

    summaryWeatherTitle: 'వాతావరణం',
    summaryWeatherSub: 'వర్షం & ఉష్ణోగ్రత',
    summaryCropHealthTitle: 'పంట ఆరోగ్యం',
    summaryCropHealthSub: 'తెగుళ్ల ప్రమాదం',
    summarySoilTitle: 'నేలలో తేమ',
    summarySoilSub: 'వేరు మండల తేమ',
    summaryRegenTitle: 'సేంద్రీయ స్కోరు',
    summaryRegenSub: 'మట్టి & నీటి సంరక్షణ',

    decisionHeading: 'రైతు ఇప్పుడు ఏమి చేయాలి, మరియు ఎందుకు?',
    farmerContextTitle: 'రైతు వివరాలు',
    possibleIssue: 'సాధ్యమైన సమస్య',
    confidence: 'ఖచ్చితత్వం',
    risk: 'ప్రమాద స్థాయి',
    whyTitle: 'ఎందుకు?',
    whatToDoNow: 'ఇప్పుడు ఏమి చేయాలి',
    preventionTitle: 'నివారణ చర్యలు',
    weatherContextTitle: 'వాతావరణం',
    regenerativeTipTitle: 'సేంద్రీయ పద్ధతి',
    sourcesTitle: 'ప్రామాణిక వ్యవసాయ పరిశోధన ఆధారాలు',
    actionPlanTitle: 'వ్యక్తిగత కార్యాచరణ ప్రణాళిక',
    planToday: 'ఈరోజు',
    planThisWeek: 'ఈ వారం',
    planNextTwoWeeks: 'తదుపరి 2 వారాలు',
    listenToAdvice: 'సలహా వినండి',
    feedbackPrompt: 'ఈ సలహా మీ పొలానికి ఉపయోగపడిందా?',
    feedbackHelpful: 'ఉపయోగకరం',
    feedbackNotHelpful: 'సరిపోలేదు',

    guidedStep1Title: 'మీరు ఏ పంట పండిస్తున్నారు?',
    guidedStep2Title: 'సమస్య ఏమిటి?',
    guidedStep3Title: 'సమస్య ఫోటో చూపించండి',
    guidedStep4Title: 'ఇంకేమైనా చెప్పాలనుకుంటున్నారా?',
    guidedStep5Title: 'మీ పంటను తనిఖీ చేద్దాం',
    analyzeCropBtn: 'నా పంటను తనిఖీ చేయండి',
    loadingStep1: 'మీ పంటను పరిశీలిస్తున్నాము...',
    loadingStep2: 'వ్యవసాయ మార్గదర్శకాలను తనిఖీ చేస్తున్నాము...',
    loadingStep3: 'వాతావరణ పరిస్థితులను చూస్తున్నాము...',
    loadingStep4: 'సలహాను సిద్ధం చేస్తున్నాము...',
    loadingReady: 'మీ సలహా సిద్ధంగా ఉంది.',
    humanErrorText: 'క్షమించండి, ప్రస్తుతం పంటను విశ్లేషించలేకపోయాము.',
    tryAgainBtn: 'మళ్ళీ ప్రయత్నించండి',
    fallbackNotice: 'భద్రపరిచిన వ్యవసాయ సూచనలు చూపబడుతున్నాయి.',

    voiceListening: 'వింటున్నాము...',
    voicePreparing: 'సమాధానం సిద్ధం అవుతోంది...',

    loginTitle: 'స్వాగతం, రైతు మిత్రమా',
    loginSubtitle: 'మీ భాషలో వ్యక్తిగత వ్యవసాయ సలహాలను పొందండి.',
    signupTitle: 'రైతు ఖాతా సృష్టించండి',
    signupSubtitle: 'రోజువారీ నిపుణుల మార్గదర్శకత్వం పొందడానికి వేలాది మంది రైతులతో చేరండి.',
    mobileNumber: 'మొబైల్ నంబర్',
    sendOtp: 'OTP పంపండి',
    enterOtp: '6 అంకెల OTP నమోదు చేయండి',
    verifyOtp: 'OTP ధృవీకరించండి',
    resendOtp: 'OTP మళ్ళీ పంపండి',
    fullName: 'పూర్తి పేరు',
    preferredLanguage: 'ప్రాధాన్య భాష',
    state: 'రాష్ట్రం',
    district: 'జిల్లా',
    village: 'గ్రామం / మండలం',
    primaryCrop: 'ప్రధాన పంట',
    farmSize: 'పొలం పరిమాణం (ఎకరాలు)',
    irrigationType: 'నీటిపారుదల పద్ధతి',
    soilType: 'నేల రకం',
    optionalAadhaar: 'రైతు ఐడీ / ఆధార్ (ఐచ్ఛికం)',
    maskedId: 'రైతు ఐడీ',
    editProfile: 'ప్రొఫైల్ మార్చు',
    changeLanguage: 'భాష మార్చు',
    saveProfile: 'సేవ్ చేయండి',
    profileUpdated: 'ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!',
    invalidOtp: 'చెల్లని OTP. దయచేసి సరైన కోడ్ నమోదు చేయండి.',
    invalidPhone: 'దయచేసి 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',
    otpSent: 'మీ మొబైల్ నంబర్‌కు OTP పంపబడింది.',
    quickDemoLogin: '1-క్లిక్ ద్వారా ప్రత్యక్ష ప్రవేశం',
    callCenterText: 'కిసాన్ కాల్ సెంటర్: 1800-180-1551 (టోల్-ఫ్రీ · అన్ని భారతీయ భాషలు)',
    callCenterBtn: 'హెల్ప్‌లైన్‌కు కాల్ చేయండి',

    geminiActive: '✓ Gemini AI పనిచేస్తోంది',
    geminiFallback: '🛡️ RAG వ్యవసాయ సలహా మోడ్ (క్రియాశీలం)',

    todaysRecommendationBody: 'వర్షం పడే అవకాశం ఉన్నందున 24 గంటలు నీటి తడి ఆపండి. టమాటా కింది ఆకులను పరిశీలించండి.',
    demoRecommendationSummary: 'వర్ష సూచన ఉన్నందున నీటి తడి ఆపండి. వ్యాధి సోకిన ఆకులను తొలగించండి.',
    demoImmediateActions: [
      'వర్ష సూచన వల్ల 24 గంటలు నీటి తడి ఆపండి.',
      'నేలను తాకే మచ్చల ఆకులను కత్తిరించి తీసివేయండి.',
      'సూడోమోనాస్ ద్రావణాన్ని పిచికారీ చేయండి.',
    ],
    demoRegenerativeAdvice: 'నేల నుండి తెగుళ్లు వ్యాపించకుండా 5 సెం.మీ గడ్డితో మల్చింగ్ చేయండి.',
  },

  kn: {
    appTitle: 'ಕಿಸಾನ್ ಸಾರಥಿ',
    homeGreeting: 'ಇಂದು ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು?',
    homeSubtitle: 'ನಿಮ್ಮ ಬೆಳೆ, ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿಗೆ ಸರಳ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ.',
    checkCropBtn: 'ಬೆಳೆ ಪರಿಶೀಲಿಸಿ',
    askByVoiceBtn: 'ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ',
    askQuestionBtn: 'ಕಿಸಾನ್‌ಸಾರಥಿಯನ್ನು ಕೇಳಿ',
    checkWeatherBtn: 'ಹವಾಮಾನ ನೋಡಿ',
    todaysActionTitle: 'ಇಂದಿನ ಮುಖ್ಯ ಕೆಲಸ',
    todaysActionBody: 'ನಾಳೆ ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆ ಇದೆ. ಇಂದು ನೀರು ಹಾಯಿಸುವುದನ್ನು ಮುಂದೂಡಿ.',
    viewRecommendation: 'ಸಲಹೆ ನೋಡಿ',
    listenBtn: 'ಸಲಹೆ ಆಲಿಸಿ',
    listeningAudio: 'ಕನ್ನಡದಲ್ಲಿ ಸಲಹೆ ಕೇಳಿಸುತ್ತಿದೆ...',
    stopAudioBtn: 'ನಿಲ್ಲಿಸಿ',

    navHome: 'ಮುಖಪುಟ',
    navDashboard: 'ಕೃಷಿ ಮಾಹಿತಿ',
    navAssistant: 'ನಿರ್ಧಾರ ಕೇಂದ್ರ',
    navSoil: 'ಮಣ್ಣು & ನೀರು',
    navOfficer: 'ಕೃಷಿ ಅಧಿಕಾರಿ',
    navDocs: 'ಮಾರ್ಗದರ್ಶಿ',
    navLanguage: 'ಭಾಷೆ',
    navProfile: 'ರೈತರ ವಿವರ',
    navLogin: 'ರೈತರ ಪ್ರವೇಶ',
    navLogout: 'ನಿರ್ಗಮಿಸಿ',

    summaryWeatherTitle: 'ಹವಾಮಾನ',
    summaryWeatherSub: 'ಮಳೆ ಸಂಭವನೀಯತೆ',
    summaryCropHealthTitle: 'ಬೆಳೆ ಆರೋಗ್ಯ',
    summaryCropHealthSub: 'ರೋಗದ ಅಪಾಯ',
    summarySoilTitle: 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
    summarySoilSub: 'ಬೇರಿನ ತೇವಾಂಶ',
    summaryRegenTitle: 'ಸುಸ್ಥಿರ ಸ್ಕೋರ್',
    summaryRegenSub: 'ಮಣ್ಣು & ನೀರು ಸಂರಕ್ಷಣೆ',

    decisionHeading: 'ರೈತರು ಈಗ ಏನು ಮಾಡಬೇಕು, ಮತ್ತು ಏಕೆ?',
    farmerContextTitle: 'ರೈತರ ವಿವರ',
    possibleIssue: 'ಸಂಭಾವ್ಯ ಸಮಸ್ಯೆ',
    confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
    risk: 'ಅಪಾಯದ ಮಟ್ಟ',
    whyTitle: 'ಏಕೆ?',
    whatToDoNow: 'ಈಗ ಏನು ಮಾಡಬೇಕು',
    preventionTitle: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು',
    weatherContextTitle: 'ಹವಾಮಾನ ಮಾಹಿತಿ',
    regenerativeTipTitle: 'ಸುಸ್ಥಿರ ಪದ್ಧತಿ',
    sourcesTitle: 'ದೃಢೀಕೃತ ಕೃಷಿ ಸಂಶೋಧನಾ ಮೂಲಗಳು',
    actionPlanTitle: 'ವೈಯಕ್ತಿಕ ಕ್ರಿಯಾ ಯೋಜನೆ',
    planToday: 'ಇಂದು',
    planThisWeek: 'ಈ ವಾರ',
    planNextTwoWeeks: 'ಮುಂದಿನ 2 ವಾರಗಳು',
    listenToAdvice: 'ಸಲಹೆ ಆಲಿಸಿ',
    feedbackPrompt: 'ಈ ಸಲಹೆ ನಿಮ್ಮ ಜಮೀನಿಗೆ ಉಪಯುಕ್ತವಾಗಿದೆಯೇ?',
    feedbackHelpful: 'ಉಪಯುಕ್ತ',
    feedbackNotHelpful: 'ಬದಲಾವಣೆ ಬೇಕು',

    guidedStep1Title: 'ನೀವು ಯಾವ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ?',
    guidedStep2Title: 'ಸಮಸ್ಯೆ ಏನು?',
    guidedStep3Title: 'ಸಮಸ್ಯೆಯ ಫೋಟೋ ತೋರಿಸಿ',
    guidedStep4Title: 'ಇನ್ನೇನಾದರೂ ಹೇಳಲು ಬಯಸುವಿರಾ?',
    guidedStep5Title: 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪರೀಕ್ಷಿಸೋಣ',
    analyzeCropBtn: 'ಬೆಳೆ ಪರಿಶೀಲಿಸಿ',
    loadingStep1: 'ಬೆಳೆಯನ್ನು ನೋಡುತ್ತಿದ್ದೇವೆ...',
    loadingStep2: 'ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    loadingStep3: 'ಹವಾಮಾನ ಸ್ಥಿತಿ ನೋಡುತ್ತಿದ್ದೇವೆ...',
    loadingStep4: 'ಸಲಹೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    loadingReady: 'ನಿಮ್ಮ ಸಲಹೆ ಸಿದ್ಧವಾಗಿದೆ.',
    humanErrorText: 'ಕ್ಷಮಿಸಿ, ಈ ಸಮಯದಲ್ಲಿ ಬೆಳೆ ಪರಿಶೀಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
    tryAgainBtn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    fallbackNotice: 'ದಾಖಲಿತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.',

    voiceListening: 'ಕೇಳುತ್ತಿದ್ದೇವೆ...',
    voicePreparing: 'ಉತ್ತರ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...',

    loginTitle: 'ಸ್ವಾಗತ, ರೈತ ಮಿತ್ರರೇ',
    loginSubtitle: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    signupTitle: 'ರೈತರ ಖಾತೆ ರಚಿಸಿ',
    signupSubtitle: 'ದೈನಂದಿನ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.',
    mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    sendOtp: 'OTP ಕಳುಹಿಸಿ',
    enterOtp: '6 ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
    verifyOtp: 'OTP ದೃಢೀಕರಿಸಿ',
    resendOtp: 'OTP ಮರುಕಳುಹಿಸಿ',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    preferredLanguage: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
    state: 'ರಾಜ್ಯ',
    district: 'ಜಿಲ್ಲೆ',
    village: 'ಗ್ರಾಮ / ತಾಲೂಕು',
    primaryCrop: 'ಮುಖ್ಯ ಬೆಳೆ',
    farmSize: 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)',
    irrigationType: 'ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ',
    soilType: 'ಮಣ್ಣಿನ ವಿಧ',
    optionalAadhaar: 'ರೈತ ಗುರುತಿನ ಚೀಟಿ / ಆಧಾರ್ (ಐಚ್ಛಿಕ)',
    maskedId: 'ರೈತ ಐಡಿ',
    editProfile: 'ಪ್ರೊಫೈಲ್ ಬದಲಾಯಿಸಿ',
    changeLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    saveProfile: 'ಉಳಿಸಿ',
    profileUpdated: 'ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!',
    invalidOtp: 'ತಪ್ಪಾದ OTP. ದಯವಿಟ್ಟು ಸರಿಯಾದ ಕೋಡ್ ನಮೂದಿಸಿ.',
    invalidPhone: 'ದಯವಿಟ್ಟು 10 ಅಂಕಿಯ ಮಾನ್ಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
    otpSent: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ OTP ಕಳುಹಿಸಲಾಗಿದೆ.',
    quickDemoLogin: '1-ಕ್ಲಿಕ್ ಮೂಲಕ ನೇರ ಪ್ರವೇಶ',
    callCenterText: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1800-180-1551 (ಟೋಲ್-ಫ್ರೀ · ಎಲ್ಲಾ ಭಾರತೀಯ ಭಾಷೆಗಳು)',
    callCenterBtn: 'ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ',

    geminiActive: '✓ Gemini AI ಸಕ್ರಿಯವಾಗಿದೆ',
    geminiFallback: '🛡️ RAG ಕೃಷಿ ಸಲಹಾ ಮೋಡ್ (ಸಕ್ರಿಯ)',

    todaysRecommendationBody: 'ಮಳೆ ಸಾಧ್ಯತೆ ಇರುವುದರಿಂದ ಮುಂದಿನ 24 ಗಂಟೆ ನೀರು ಹಾಕಬೇಡಿ. ಟೊಮೆಟೊ ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಕಂದು ಚುಕ್ಕೆಗಳಿವೆಯೇ ನೋಡಿ.',
    demoRecommendationSummary: 'ಮಳೆ ಮುನ್ಸೂಚನೆ ಇರುವ ಕಾರಣ ನೀರಾವರಿ ಮುಂದೂಡಿ. ರೋಗಗ್ರಸ್ತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.',
    demoImmediateActions: [
      'ಮಳೆ ಸಾಧ್ಯತೆಯಿರುವುದರಿಂದ 24 ಗಂಟೆ ನೀರು ಹಾಕಬೇಡಿ.',
      'ಮಣ್ಣಿಗೆ ತಾಗುತ್ತಿರುವ ಕಂದು ಚುಕ್ಕೆಯುಳ್ಳ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೆಗೆಯಿರಿ.',
      'ಸ್ಯೂಡೋಮೊನಾಸ್ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.',
    ],
    demoRegenerativeAdvice: 'ಮಣ್ಣಿನಿಂದ ರೋಗಾಣುಗಳು ಹರಡುವುದನ್ನು ತಡೆಯಲು 5 ಸೆಂ.ಮೀ ಒಣಹುಲ್ಲಿನ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಮಾಡಿ.',
  },

  mr: {
    appTitle: 'किसान सारथी',
    homeGreeting: 'आज तुम्हाला कशाबद्दल मदत हवी आहे?',
    homeSubtitle: 'तुमचे पीक, हवामान आणि मातीसाठी सोपे कृषी मार्गदर्शन.',
    checkCropBtn: 'पीक तपासा',
    askByVoiceBtn: 'आवाजाने विचारा',
    askQuestionBtn: 'किसानसारथीला विचारा',
    checkWeatherBtn: 'हवामान पहा',
    todaysActionTitle: 'आजचे मुख्य काम',
    todaysActionBody: 'उद्या पावसाची शक्यता आहे. आज पाणी देणे टाळण्याचा विचार करा.',
    viewRecommendation: 'सल्ला पहा',
    listenBtn: 'सल्ला ऐका',
    listeningAudio: 'मराठीत सल्ला ऐकवला जात आहे...',
    stopAudioBtn: 'थांबवा',

    navHome: 'मुख्य पान',
    navDashboard: 'शेत डॅशबोर्ड',
    navAssistant: 'निर्णय केंद्र',
    navSoil: 'माती व जल',
    navOfficer: 'कृषी अधिकारी',
    navDocs: 'मार्गदर्शिका',
    navLanguage: 'भाषा',
    navProfile: 'शेतकरी प्रोफाइल',
    navLogin: 'शेतकरी प्रवेश',
    navLogout: 'बाहेर पडा',

    summaryWeatherTitle: 'हवामान',
    summaryWeatherSub: 'तापमान व पाऊस अंदाज',
    summaryCropHealthTitle: 'पीक आरोग्य',
    summaryCropHealthSub: 'रोगाचा धोका पातळी',
    summarySoilTitle: 'मातीतील ओलावा',
    summarySoilSub: 'मुळांच्या भागातील ओलावा',
    summaryRegenTitle: 'शाश्वत स्कोअर',
    summaryRegenSub: 'जल व मृदा संवर्धन',

    decisionHeading: 'शेतकऱ्याने आता काय करावे, आणि का?',
    farmerContextTitle: 'शेतकऱ्याची माहिती',
    possibleIssue: 'संभाव्य समस्या',
    confidence: 'विश्वसनीयता',
    risk: 'धोका पातळी',
    whyTitle: 'का?',
    whatToDoNow: 'आता काय करावे',
    preventionTitle: 'प्रतिबंधात्मक उपाय',
    weatherContextTitle: 'हवामान परिस्थिती',
    regenerativeTipTitle: 'शाश्वत सेंद्रिय पद्धत',
    sourcesTitle: 'प्रमाणित कृषी संशोधन स्रोत',
    actionPlanTitle: 'वैयक्तिक कृती योजना',
    planToday: 'आज',
    planThisWeek: 'या आठवड्यात',
    planNextTwoWeeks: 'पुढील २ आठवडे',
    listenToAdvice: 'सल्ला ऐका',
    feedbackPrompt: 'हा सल्ला तुमच्या शेतासाठी उपयुक्त ठरला का?',
    feedbackHelpful: 'उपयुक्त',
    feedbackNotHelpful: 'सुधारणा हवी',

    guidedStep1Title: 'तुम्ही कोणते पीक घेत आहात?',
    guidedStep2Title: 'पिकात काय समस्या आहे?',
    guidedStep3Title: 'समस्येचा फोटो दाखवा',
    guidedStep4Title: 'अजून काही सांगायचे आहे का?',
    guidedStep5Title: 'चला तुमचे पीक तपासूया',
    analyzeCropBtn: 'माझे पीक तपासा',
    loadingStep1: 'तुमचे पीक पाहत आहोत...',
    loadingStep2: 'कृषी सल्ला तपासत आहोत...',
    loadingStep3: 'हवामानाचा अंदाज घेत आहोत...',
    loadingStep4: 'सल्ला तयार करत आहोत...',
    loadingReady: 'तुमचा सल्ला तयार आहे.',
    humanErrorText: 'क्षमस्व, आता पिकाची तपासणी होऊ शकली नाही.',
    tryAgainBtn: 'पुन्हा प्रयत्न करा',
    fallbackNotice: 'सुरक्षित कृषी सल्ल्याच्या आधारे माहिती दाखवत आहोत.',

    voiceListening: 'ऐकत आहोत...',
    voicePreparing: 'उत्तर तयार केले जात आहे...',

    loginTitle: 'स्वागत आहे, शेतकरी बांधवांनो',
    loginSubtitle: 'तुमच्या स्वतःच्या भाषेत कृषी मार्गदर्शन मिळवा.',
    signupTitle: 'शेतकरी नोंदणी करा',
    signupSubtitle: 'दररोज अचूक सल्ला मिळवण्यासाठी हजारो शेतकऱ्यांशी जोडा.',
    mobileNumber: 'मोबाईल नंबर',
    sendOtp: 'OTP पाठवा',
    enterOtp: '६ अंकी OTP प्रविष्ट करा',
    verifyOtp: 'OTP सत्यापित करा',
    resendOtp: 'OTP पुन्हा पाठवा',
    fullName: 'पूर्ण नाव',
    preferredLanguage: 'पसंतीची भाषा',
    state: 'राज्य',
    district: 'जिल्हा',
    village: 'गाव / तालुका',
    primaryCrop: 'मुख्य पीक',
    farmSize: 'शेताचा आकार (एकर)',
    irrigationType: 'सिंचन पद्धत',
    soilType: 'मातीचा प्रकार',
    optionalAadhaar: 'शेतकरी आयडी / आधार (ऐच्छिक)',
    maskedId: 'शेतकरी आयडी',
    editProfile: 'प्रोफाइल बदला',
    changeLanguage: 'भाषा बदला',
    saveProfile: 'जतन करा',
    profileUpdated: 'प्रोफाइल यशस्वीरित्या अद्यतनित केले!',
    invalidOtp: 'चुकीचा OTP. कृपया योग्य ६ अंकी कोड प्रविष्ट करा.',
    invalidPhone: 'कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.',
    otpSent: 'तुमच्या मोबाईलवर OTP पाठवला आहे.',
    quickDemoLogin: '१-क्लिक थेट शेतकरी प्रवेश',
    callCenterText: 'किसान कॉल सेंटर: 1800-180-1551 (टोल-फ्री · सर्व भारतीय भाषा)',
    callCenterBtn: 'किसान हेल्पलाईनवर कॉल करा',

    geminiActive: '✓ Gemini AI सक्रिय आहे',
    geminiFallback: '🛡️ RAG कृषी सल्लागार मोड सक्रिय',

    todaysRecommendationBody: 'पावसाची शक्यता असल्याने पुढील २४ तास पाणी देणे टाळा. टोमॅटोच्या खालच्या पानांवर डाग आहेत का ते पहा.',
    demoRecommendationSummary: 'पावसाच्या शक्यतेमुळे २४ तास पाणी देणे टाळा. रोगट पाने काढून टाका.',
    demoImmediateActions: [
      'पावसाच्या शक्यतेमुळे पुढील २४ तास सिंचन थांबवा.',
      'मातीला स्पर्श करणारी डाग असलेली पाने काढून टाका.',
      'स्यूडोमोनास फ्लोरोसेन्सची फवारणी करा.',
    ],
    demoRegenerativeAdvice: 'मातीतील बुरशी पानांवर उडू नये म्हणून ५ सेंमी पेंढ्याचे आच्छादन (मल्चिंग) करा.',
  },

  bn: {
    appTitle: 'কিসান সারথি',
    homeGreeting: 'আজ আপনি কী বিষয়ে সাহায্য চান?',
    homeSubtitle: 'আপনার ফসল, আবহাওয়া এবং মাটির জন্য সহজ কৃষি পরামর্শ।',
    checkCropBtn: 'ফসল পরীক্ষা করুন',
    askByVoiceBtn: 'কথা বলে জিজ্ঞাসা করুন',
    askQuestionBtn: 'কিসানসারথীকে জিজ্ঞাসা করুন',
    checkWeatherBtn: 'আবহাওয়া দেখুন',
    todaysActionTitle: 'আজকের প্রধান কাজ',
    todaysActionBody: 'আগামীকাল বৃষ্টির সম্ভাবনা রয়েছে। আজ সেচ দেওয়া স্থগিত রাখার কথা বিবেচনা করুন।',
    viewRecommendation: 'পরামর্শ দেখুন',
    listenBtn: 'পরামর্শ শুনুন',
    listeningAudio: 'বাংলায় পরামর্শ শোনানো হচ্ছে...',
    stopAudioBtn: 'থামুন',

    navHome: 'মূল পাতা',
    navDashboard: 'খামার তথ্য',
    navAssistant: 'সিদ্ধান্ত কেন্দ্র',
    navSoil: 'মাটি ও জল',
    navOfficer: 'কৃষি আধিকারিক',
    navDocs: 'নির্দেশিকাপত্র',
    navLanguage: 'ভাষা',
    navProfile: 'কৃষক তথ্য',
    navLogin: 'কৃষক প্রবেশ',
    navLogout: 'প্রস্থান',

    summaryWeatherTitle: 'আবহাওয়া',
    summaryWeatherSub: 'বৃষ্টির সম্ভাবনা ও তাপমাত্রা',
    summaryCropHealthTitle: 'ফসলের স্বাস্থ্য',
    summaryCropHealthSub: 'রোগের ঝুঁকি মাত্রা',
    summarySoilTitle: 'মাটির আর্দ্রতা',
    summarySoilSub: 'শিকড় অঞ্চলের আর্দ্রতা',
    summaryRegenTitle: 'প্রাকৃতিক স্কোর',
    summaryRegenSub: 'মাটি ও জল সংরক্ষণ',

    decisionHeading: 'কৃষকের এখন কী করা উচিত, এবং কেন?',
    farmerContextTitle: 'কৃষকের বিবরণ',
    possibleIssue: 'সম্ভাব্য সমস্যা',
    confidence: 'নির্ভরযোগ্যতা',
    risk: 'ঝুঁকির মাত্রা',
    whyTitle: 'কেন?',
    whatToDoNow: 'এখন কী করতে হবে',
    preventionTitle: 'প্রতিরোধমূলক ব্যবস্থা',
    weatherContextTitle: 'আবহাওয়ার পরিস্থিতি',
    regenerativeTipTitle: 'প্রাকৃতিক চাষের পদ্ধতি',
    sourcesTitle: 'যাচাইকৃত কৃষি গবেষণা উৎস',
    actionPlanTitle: 'ব্যক্তিগত কর্মপরিকল্পনা',
    planToday: 'আজ',
    planThisWeek: 'এই সপ্তাহে',
    planNextTwoWeeks: 'পরবর্তী ২ সপ্তাহ',
    listenToAdvice: 'পরামর্শ শুনুন',
    feedbackPrompt: 'এই পরামর্শটি কি আপনার খামারের জন্য দরকারী ছিল?',
    feedbackHelpful: 'উপকারী',
    feedbackNotHelpful: 'উন্নতি দরকার',

    guidedStep1Title: 'আপনি কোন ফসল চাষ করছেন?',
    guidedStep2Title: 'সমস্যা কী?',
    guidedStep3Title: 'সমস্যার ছবি দেখান',
    guidedStep4Title: 'আর কিছু জানাতে চান?',
    guidedStep5Title: 'আসুন আপনার ফসল পরীক্ষা করি',
    analyzeCropBtn: 'আমার ফসল পরীক্ষা করুন',
    loadingStep1: 'আপনার ফসল দেখা হচ্ছে...',
    loadingStep2: 'কৃষি পরামর্শ যাচাই করা হচ্ছে...',
    loadingStep3: 'আবহাওয়া পরীক্ষা করা হচ্ছে...',
    loadingStep4: 'পরামর্শ প্রস্তুত করা হচ্ছে...',
    loadingReady: 'আপনার পরামর্শ প্রস্তুত।',
    humanErrorText: 'দুঃখিত, এই মুহূর্তে ফসল পরীক্ষা করা যায়নি।',
    tryAgainBtn: 'আবার চেষ্টা করুন',
    fallbackNotice: 'সংরক্ষিত কৃষি নির্দেশিকা দেখানো হচ্ছে।',

    voiceListening: 'শুনছি...',
    voicePreparing: 'উত্তর প্রস্তুত করা হচ্ছে...',

    loginTitle: 'স্বাগতম, কৃষক বন্ধু',
    loginSubtitle: 'আপনার নিজের ভাষায় ব্যক্তিগত কৃষি পরামর্শ পান।',
    signupTitle: 'কৃষক অ্যাকাউন্ট খুলুন',
    signupSubtitle: 'প্রতিদিন সঠিক কৃষি নির্দেশনা পেতে হাজার হাজার কৃষকের সাথে যুক্ত হন।',
    mobileNumber: 'মোবাইল নম্বর',
    sendOtp: 'OTP পাঠান',
    enterOtp: '৬ সংখ্যার OTP লিখুন',
    verifyOtp: 'OTP যাচাই করুন',
    resendOtp: 'OTP পুনরায় পাঠান',
    fullName: 'পুরো নাম',
    preferredLanguage: 'পছন্দের ভাষা',
    state: 'রাজ্য',
    district: 'জেলা',
    village: 'গ্রাম / ব্লক',
    primaryCrop: 'প্রধান ফসল',
    farmSize: 'জমির পরিমাণ (একর)',
    irrigationType: 'সেচ পদ্ধতি',
    soilType: 'মাটির ধরন',
    optionalAadhaar: 'কৃষক আইডি / আধার (ঐচ্ছিক)',
    maskedId: 'কৃষক আইডি',
    editProfile: 'প্রোফাইল পরিবর্তন',
    changeLanguage: 'ভাষা পরিবর্তন',
    saveProfile: 'সংরক্ষণ করুন',
    profileUpdated: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!',
    invalidOtp: 'ভুল OTP। অনুগ্রহ করে সঠিক ৬ সংখ্যার কোড লিখুন।',
    invalidPhone: 'অনুগ্রহ করে একটি বৈধ ১০ সংখ্যার মোবাইল নম্বর লিখুন।',
    otpSent: 'আপনার মোবাইল নম্বরে OTP পাঠানো হয়েছে।',
    quickDemoLogin: '১-ক্লিক সরাসরি কৃষক প্রবেশ',
    callCenterText: 'কিসান কল সেন্টার: 1800-180-1551 (টোল-ফ্রি · সকল ভারতীয় ভাষা)',
    callCenterBtn: 'হেল্পলাইনে কল করুন',

    geminiActive: '✓ Gemini AI সক্রিয় রয়েছে',
    geminiFallback: '🛡️ RAG কৃষি বুদ্ধিমত্তা (সক্রিয়)',

    todaysRecommendationBody: 'বৃষ্টির সম্ভাবনার কারণে আগামী ২৪ ঘণ্টা সেচ দেওয়া বন্ধ রাখুন। টমেটো গাছের নিচের পাতায় দাগ আছে কি না দেখুন।',
    demoRecommendationSummary: 'বৃষ্টির সম্ভাবনার কারণে ২৪ ঘণ্টা সেচ দেওয়া বন্ধ রাখুন। আক্রান্ত পাতা কেটে ফেলুন।',
    demoImmediateActions: [
      'বৃষ্টির সম্ভাবনার কারণে আগামী ২৪ ঘণ্টা সেচ বন্ধ রাখুন।',
      'মাটি স্পর্শ করা দাগযুক্ত নিচের পাতাগুলো ছাঁটাই করে ফেলুন।',
      'সিউডোমোনাস ফ্লুরোসেন্স স্প্রে করুন।',
    ],
    demoRegenerativeAdvice: 'মাটির রোগজীবাণু পাতায় ছড়ানো রোধ করতে ৫ সেমি ধানের খড়ের মালচিং করুন।',
  },
};
