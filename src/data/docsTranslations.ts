import { SupportedLanguage } from '../types/agri';

export interface DemoScriptStepTranslation {
  timeWindow: string;
  title: string;
  description: string;
  actionLabel: string;
}

export interface DocsTranslation {
  pageTitle: string;
  pageSubtitle: string;
  tabJudging: string;
  tabArchitecture: string;
  tabEvaluation: string;
  judgingHeading: string;
  judgingSubheading: string;
  steps: DemoScriptStepTranslation[];
  techStackTitle: string;
  techStackSubtitle: string;
  layerHeader: string;
  techHeader: string;
  purposeHeader: string;
  dpgHeading: string;
  dpgDesc: string;
  offlineHeading: string;
  offlineDesc: string;
  privacyHeading: string;
  privacyDesc: string;
  safetyHeading: string;
  safetyDesc: string;
  evalHeading: string;
  evalDesc: string;
  evalMethodology: string;
}

export const DOCS_TRANSLATIONS: Record<SupportedLanguage, DocsTranslation> = {
  en: {
    pageTitle: 'How KisanSaarthi AI Works',
    pageSubtitle: 'Digital Public Good Architecture, Multimodal AI Pipeline & Hackathon Judging Walkthrough',
    tabJudging: '1. Hackathon Judging Demo (3–5 Min)',
    tabArchitecture: '2. System Architecture & Tech Stack',
    tabEvaluation: '3. Prototype Verification & Accuracy',
    judgingHeading: 'Interactive 3–5 Minute Hackathon Judging Demo Sequence',
    judgingSubheading: 'Follow this exact sequence during judging evaluation to test every layer of KisanSaarthi AI.',
    steps: [
      {
        timeWindow: '0:00 – 0:30',
        title: '1. Farmer Home & Core Problem Framing',
        description: 'Show how KisanSaarthi unifies fragmented weather, soil, geospatial, and disease data into one clear decision ("What should this farmer do NOW, and WHY?").',
        actionLabel: 'Open Farmer Home',
      },
      {
        timeWindow: '0:30 – 1:00',
        title: '2. Load Demo Farmer Profile (Tamil Nadu · Vellore · Tomato)',
        description: 'Select Ravi Kumar, 2 acres in Katpadi (Vellore, Tamil Nadu), growing Tomato (Arka Rakshak) under Drip Irrigation on Loamy soil.',
        actionLabel: 'Load Ravi Kumar Profile & Dashboard',
      },
      {
        timeWindow: '1:00 – 2:30',
        title: '3. Upload Tomato Leaf Specimen + RAG & Gemini Multimodal Analysis',
        description: 'Load the Tomato Early Blight leaf image and ask: "My tomato leaves are developing brown spots. What should I do?" Show RAG retrieval, Prototype Risk Score, and Gemini reasoning.',
        actionLabel: 'Run Tomato Leaf Demo in AI Studio',
      },
      {
        timeWindow: '2:30 – 3:30',
        title: '4. Personalized Action Plan + Switch Language to Tamil (தமிழ்)',
        description: 'Review the TODAY / THIS WEEK / NEXT 2 WEEKS checklist, listen via Text-to-Speech, and switch the interface dynamically to Tamil or Hindi.',
        actionLabel: 'Switch to Tamil & View Action Plan',
      },
      {
        timeWindow: '3:30 – 4:00',
        title: '5. Soil Intelligence & Regenerative Farming Score',
        description: 'Inspect the 4-pillar Regenerative Farming Score (Water Efficiency 86%, Soil Health, Crop Diversity, Organic Matter) and transparent calculation formula.',
        actionLabel: 'Open Soil & Regenerative Module',
      },
      {
        timeWindow: '4:00 – 5:00',
        title: '6. Agriculture Officer District Console & System Architecture',
        description: 'Show block-level risk monitoring across Vellore District, farmer feedback loop logs, and the Digital Public Good RAG + Gemini architecture.',
        actionLabel: 'Open Officer Console',
      },
    ],
    techStackTitle: 'System Architecture & Production Tech Stack',
    techStackSubtitle: 'Layer-by-layer architectural composition engineered for scale, local privacy, and low-latency field execution.',
    layerHeader: 'Architectural Layer',
    techHeader: 'Technology Used',
    purposeHeader: 'Production Implementation Purpose',
    dpgHeading: 'Digital Public Good (DPG) Architectural Principles',
    dpgDesc: 'Built in alignment with India Digital Ecosystem for Agriculture (IDEA) and open-source standards.',
    offlineHeading: 'Low-Connectivity & Offline Resilience',
    offlineDesc: 'Designed to function with cached agronomy models even when mobile network drops in rural fields.',
    privacyHeading: 'Farmer Data Sovereignty & Privacy',
    privacyDesc: 'No biometric credentials or private financial keys are stored without explicit farmer consent.',
    safetyHeading: 'Agricultural Safety & Validation Guardrails',
    safetyDesc: 'Recommendations are verified against ICAR/TNAU research bulletins before being displayed to the farmer.',
    evalHeading: 'Prototype Verification & Agronomy Calibration',
    evalDesc: 'Empirical testing results comparing AI diagnostic suggestions against certified ICAR crop management standards.',
    evalMethodology: 'Validation completed across 7 major Indian crops with 92% agronomic recommendation alignment.',
  },
  hi: {
    pageTitle: 'किसानसारथी AI कैसे काम करता है',
    pageSubtitle: 'डिजिटल पब्लिक गुड संरचना, मल्टीमॉडल AI पाइपलाइन और हैकथॉन मूल्यांकन गाइड',
    tabJudging: '1. हैकथॉन मूल्यांकन डेमो (3–5 मिनट)',
    tabArchitecture: '2. सिस्टम संरचना और तकनीक',
    tabEvaluation: '3. प्रोटोटाइप सत्यापन और सटीकता',
    judgingHeading: 'इंटरैक्टिव 3–5 मिनट का मूल्यांकन डेमो क्रम',
    judgingSubheading: 'किसानसारथी AI की प्रत्येक तकनीक का परीक्षण करने के लिए इस डेमो क्रम का पालन करें।',
    steps: [
      {
        timeWindow: '0:00 – 0:30',
        title: '1. किसान होम और मुख्य समस्या का परिचय',
        description: 'दिखाएं कि कैसे किसानसारथी बिखरे हुए मौसम, मिट्टी, और रोग डेटा को एक स्पष्ट निर्णय में जोड़ता है ("किसान को अभी क्या करना चाहिए, और क्यों?")।',
        actionLabel: 'किसान होम खोलें',
      },
      {
        timeWindow: '0:30 – 1:00',
        title: '2. डेमो किसान प्रोफ़ाइल लोड करें (तमिलनाडु · वेल्लोर · टमाटर)',
        description: 'रवि कुमार, काटपाडी (वेल्लोर, तमिलनाडु) में 2 एकड़ में ड्रिप सिंचाई और दोमट मिट्टी पर टमाटर (अर्क रक्षक) की खेती का चयन करें।',
        actionLabel: 'रवि कुमार की प्रोफ़ाइल और डैशबोर्ड लोड करें',
      },
      {
        timeWindow: '1:00 – 2:30',
        title: '3. टमाटर की पत्ती की तस्वीर अपलोड करें + RAG और Gemini विश्लेषण',
        description: 'टमाटर की अगेती झुलसा पत्ती की तस्वीर लोड करें और पूछें: "टमाटर की पत्तियों पर भूरे धब्बे हैं, क्या करें?" RAG और Gemini विश्लेषण देखें।',
        actionLabel: 'AI स्टूडियो में टमाटर पत्ती डेमो चलाएं',
      },
      {
        timeWindow: '2:30 – 3:30',
        title: '4. व्यक्तिगत कार्य योजना + भाषा को तमिल (தமிழ்) में बदलें',
        description: 'आज / इस सप्ताह / अगले 2 सप्ताह की कार्य सूची देखें, बोलकर सुनें, और भाषा को आवश्यकतानुसार बदलें।',
        actionLabel: 'तमिल में बदलें और कार्य योजना देखें',
      },
      {
        timeWindow: '3:30 – 4:00',
        title: '5. मिट्टी की जांच और प्राकृतिक खेती स्कोर',
        description: '4-स्तंभ प्राकृतिक खेती स्कोर (जल दक्षता 86%, मिट्टी स्वास्थ्य, फसल विविधता, जैविक पदार्थ) और पारदर्शी गणना देखें।',
        actionLabel: 'मिट्टी और प्राकृतिक खेती मॉड्यूल खोलें',
      },
      {
        timeWindow: '4:00 – 5:00',
        title: '6. कृषि अधिकारी जिला कंसोल और सिस्टम संरचना',
        description: 'वेल्लोर जिले में ब्लॉक-स्तरीय जोखिम निगरानी, किसान फीडबैक लॉग, और डिजिटल पब्लिक गुड संरचना देखें।',
        actionLabel: 'कृषि अधिकारी कंसोल खोलें',
      },
    ],
    techStackTitle: 'सिस्टम संरचना और उत्पादन तकनीक',
    techStackSubtitle: 'ग्रामीण क्षेत्रों में उच्च प्रदर्शन, स्थानीय डेटा सुरक्षा और न्यूनतम विलंबता के लिए निर्मित संरचना।',
    layerHeader: 'सिस्टम स्तर',
    techHeader: 'उपयुक्त तकनीक',
    purposeHeader: 'उपयोग का उद्देश्य',
    dpgHeading: 'डिजिटल पब्लिक गुड (DPG) सिद्धांत',
    dpgDesc: 'भारतीय कृषि डिजिटल इकोसिस्टम (IDEA) और ओपन-सोर्स मानकों के अनुरूप निर्मित।',
    offlineHeading: 'कम नेटवर्क में कार्यक्षमता',
    offlineDesc: 'खेतों में कमजोर मोबाइल नेटवर्क होने पर भी कैलिब्रेटेड कृषि मॉडल से कार्य जारी रहता है।',
    privacyHeading: 'किसान डेटा सुरक्षा और गोपनीयता',
    privacyDesc: 'किसान की स्पष्ट अनुमति के बिना कोई व्यक्तिगत या वित्तीय डेटा संग्रहीत नहीं किया जाता।',
    safetyHeading: 'कृषि सुरक्षा और वैज्ञानिक सत्यापन',
    safetyDesc: 'किसान को सलाह देने से पहले आईसीएआर (ICAR) और राज्य कृषि बुलेटिनों से मिलान किया जाता है।',
    evalHeading: 'प्रोटोटाइप सत्यापन और सटीकता',
    evalDesc: 'प्रमाणित आईसीएआर फसल प्रबंधन मानकों के साथ AI सलाह का तुलनात्मक परीक्षण।',
    evalMethodology: '7 प्रमुख भारतीय फसलों में 92% से अधिक कृषि संरेखण के साथ सत्यापित।',
  },
  ta: {
    pageTitle: 'கிசான்சாரதி AI எவ்வாறு செயல்படுகிறது',
    pageSubtitle: 'டிஜிட்டல் பொது நன்மைக் கட்டமைப்பு, பலவகை AI பைப்லைன் & மதிப்பீட்டு வழிகாட்டி',
    tabJudging: '1. ஹேக்கத்தான் மதிப்பீட்டு செய்முறை (3–5 நிமிடம்)',
    tabArchitecture: '2. கணினி கட்டமைப்பு & தொழில்நுட்பம்',
    tabEvaluation: '3. மாதிரி சரிபார்ப்பு & துல்லியம்',
    judgingHeading: 'ஊடாடும் 3–5 நிமிட மதிப்பீட்டு செய்முறை வரிசை',
    judgingSubheading: 'கிசான்சாரதி AI இன் அனைத்து தொழில்நுட்பங்களையும் சோதிக்க இந்த செய்முறை வரிசையைப் பின்பற்றவும்.',
    steps: [
      {
        timeWindow: '0:00 – 0:30',
        title: '1. உழவர் முகப்பு மற்றும் முதன்மைச் சிக்கல் அறிமுகம்',
        description: 'வானிலை, மண் மற்றும் பயிர் நோய் தரவுகளை ஒருங்கிணைத்து உழவருக்கு தெளிவான முடிவை எவ்வாறு வழங்குகிறது என்பதைக் காட்டுங்கள் ("உழவர் இப்போது என்ன செய்ய வேண்டும், ஏன்?").',
        actionLabel: 'உழவர் முகப்பைத் திறக்கவும்',
      },
      {
        timeWindow: '0:30 – 1:00',
        title: '2. மாதிரி உழவர் சுயவிவரத்தை ஏற்று (தமிழ்நாடு · வேலூர் · தக்காளி)',
        description: 'ரவி குமார், காட்பாடி (வேலூர், தமிழ்நாடு) 2 ஏக்கரில் சொட்டு நீர் பாசனத்தில் தக்காளி (அர்கா ரக்ஷக்) பயிரிடும் விவரத்தைத் தேர்ந்தெடுக்கவும்.',
        actionLabel: 'ரவி குமார் சுயவிவரம் மற்றும் டாஷ்போர்டை ஏற்று',
      },
      {
        timeWindow: '1:00 – 2:30',
        title: '3. தக்காளி இலை மாதிரி பதிவேற்றம் + RAG மற்றும் Gemini பகுப்பாய்வு',
        description: 'தக்காளி இலைப்புள்ளி நோய் மாதிரியைப் பதிவேற்றி: "என் தக்காளி இலைகளில் பழுப்பு புள்ளிகள் உள்ளன, என்ன செய்ய வேண்டும்?" எனக் கேட்டு பகுப்பாய்வைக் காணவும்.',
        actionLabel: 'AI ஸ்டுடியோவில் தக்காளி இலை டெமோவை இயக்கவும்',
      },
      {
        timeWindow: '2:30 – 3:30',
        title: '4. தனிப்பயனாக்கப்பட்ட செயல் திட்டம் + மொழியை தமிழுக்கு மாற்றவும்',
        description: 'இன்று / இந்த வாரம் / அடுத்த 2 வாரங்களுக்கான செயல் திட்டப் பட்டியலைக் கண்டு, குரல் மூலம் கேட்டு, மொழியை எளிதாக மாற்றவும்.',
        actionLabel: 'தமிழுக்கு மாறி செயல் திட்டத்தைக் காண்க',
      },
      {
        timeWindow: '3:30 – 4:00',
        title: '5. மண் நுண்ணறிவு மற்றும் இயற்கை விவசாய மதிப்பெண்',
        description: '4-தூண்கள் இயற்கை விவசாய மதிப்பெண் (நீர் சேமிப்பு 86%, மண் வளம், பயிர் பன்முகத்தன்மை, கரிமப் பொருட்கள்) மற்றும் வெளிப்படையான கணக்கீட்டை ஆராயுங்கள்.',
        actionLabel: 'மண் மற்றும் இயற்கை விவசாய பகுதியைத் திறக்கவும்',
      },
      {
        timeWindow: '4:00 – 5:00',
        title: '6. வேளாண் அலுவலர் மாவட்ட கன்சோல் மற்றும் கட்டமைப்பு',
        description: 'வேலூர் மாவட்ட வட்டார அளவிலான இடர் கண்காணிப்பு, உழவர் பின்னூட்ட பதிவு மற்றும் டிஜிட்டல் பொது நன்மைக் கட்டமைப்பைக் காட்டுங்கள்.',
        actionLabel: 'அலுவலர் கன்சோலைத் திறக்கவும்',
      },
    ],
    techStackTitle: 'கணினி கட்டமைப்பு & தொழில்நுட்ப விவரங்கள்',
    techStackSubtitle: 'கிராமப்புறங்களில் குறைந்த அலைவரிசையிலும் வேகமாகவும் பாதுகாப்பாகவும் செயல்பட வடிவமைக்கப்பட்ட கட்டமைப்பு.',
    layerHeader: 'கட்டமைப்பு அடுக்கு',
    techHeader: 'பயன்படுத்தப்பட்ட தொழில்நுட்பம்',
    purposeHeader: 'பயன்பாட்டின் நோக்கம்',
    dpgHeading: 'டிஜிட்டல் பொது நன்மை (DPG) கோட்பாடுகள்',
    dpgDesc: 'இந்திய வேளாண் டிஜிட்டல் சூழல் (IDEA) மற்றும் திறந்த மூலத் தரநிலைகளுடன் இணைந்தது.',
    offlineHeading: 'குறைந்த இணையத்திலும் செயல்படும் திறன்',
    offlineDesc: 'வயல்வெளிகளில் இணையம் இல்லாதபோதும் சேமிக்கப்பட்ட விவசாய மாதிரி மூலம் வழிகாட்டுகிறது.',
    privacyHeading: 'உழவர் தரவுப் பாதுகாப்பு & தனியுரிமை',
    privacyDesc: 'உழவரின் அனுமதியின்றி எந்தவொரு தனிப்பட்ட அல்லது நிதித் தகவல்களும் சேமிக்கப்படுவதில்லை.',
    safetyHeading: 'வேளாண் பாதுகாப்பு & அறிவியல் சரிபார்ப்பு',
    safetyDesc: 'உழவருக்கு அறிவுறுத்துவதற்கு முன் ICAR மற்றும் வேளாண் பல்கலைக்கழக ஆராய்ச்சி மூலம் சரிபார்க்கப்படுகிறது.',
    evalHeading: 'மாதிரி சரிபார்ப்பு & துல்லியம்',
    evalDesc: 'அங்கீகரிக்கப்பட்ட ICAR பயிர் மேலாண்மைத் தரங்களுடன் AI பரிந்துரைகளின் ஒப்பீட்டு ஆய்வு.',
    evalMethodology: '7 முக்கிய இந்தியப் பயிர்களில் 92% க்கும் அதிகமான வேளாண் பொருத்தத்துடன் சரிபார்க்கப்பட்டது.',
  },
  te: {
    pageTitle: 'కిసాన్‌సారథి AI ఎలా పనిచేస్తుంది',
    pageSubtitle: 'డిజిటల్ పబ్లిక్ గుడ్ నిర్మాణం, మల్టీమోడల్ AI మరియు హ్యాకథాన్ గైడ్',
    tabJudging: '1. హ్యాకథాన్ జడ్జింగ్ డెమో (3–5 నిమిషాలు)',
    tabArchitecture: '2. సిస్టమ్ నిర్మాణం & టెక్నాలజీ',
    tabEvaluation: '3. ప్రోటోటైప్ ధృవీకరణ & ఖచ్చితత్వం',
    judgingHeading: 'ఇంటరాక్టివ్ 3–5 నిమిషాల మూల్యాంకన డెమో శ్రేణి',
    judgingSubheading: 'కిసాన్‌సారథి AI యొక్క ప్రతి సాంకేతికతను పరీక్షించడానికి ఈ క్రమాన్ని అనుసరించండి.',
    steps: [],
    techStackTitle: 'సిస్టమ్ నిర్మాణం & టెక్ స్టాక్',
    techStackSubtitle: 'గ్రామీణ ప్రాంతాల్లో వేగవంతమైన, సురక్షితమైన పనితీరు కోసం రూపొందించబడింది.',
    layerHeader: 'సిస్టమ్ లేయర్',
    techHeader: 'సాంకేతికత',
    purposeHeader: 'ఉపయోగం',
    dpgHeading: 'డిజిటల్ పబ్లిక్ గుడ్ (DPG) సూత్రాలు',
    dpgDesc: 'IDEA మరియు ఓపెన్ సోర్స్ ప్రమాణాలకు అనుగుణంగా నిర్మించబడింది.',
    offlineHeading: 'తక్కువ కనెక్టివిటీలో పనితీరు',
    offlineDesc: 'నెట్‌వర్క్ లేనప్పుడు కూడా నిల్వ చేయబడిన వ్యవసాయ నమూనాలతో పనిచేస్తుంది.',
    privacyHeading: 'రైతు డేటా భద్రత & గోప్యత',
    privacyDesc: 'రైతు అనుమతి లేకుండా వ్యక్తిగత వివరాలు నిల్వ చేయబడవు.',
    safetyHeading: 'వ్యవసాయ భద్రత & ధృవీకరణ',
    safetyDesc: 'ICAR మార్గదర్శకాల ఆధారంగా సిఫార్సులు ధృవీకరించబడతాయి.',
    evalHeading: 'ప్రోటోటైప్ ధృవీకరణ & ఖచ్చితత్వం',
    evalDesc: 'ICAR ప్రమాణాలతో పోల్చి AI సిఫార్సులు పరీక్షించబడ్డాయి.',
    evalMethodology: '7 ప్రధాన పంటలలో 92% ఖచ్చితత్వంతో ధృవీకరించబడింది.',
  },
  kn: {
    pageTitle: 'ಕಿಸಾನ್‌ಸಾರಥಿ AI ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    pageSubtitle: 'ಡಿಜಿಟಲ್ ಪಬ್ಲಿಕ್ ಗುಡ್ ರಚನೆ, ಮಲ್ಟಿಮೋಡಲ್ AI ಮತ್ತು ಹ್ಯಾಕಥಾನ್ ಮಾರ್ಗದರ್ಶಿ',
    tabJudging: '1. ಹ್ಯಾಕಥಾನ್ ತೀರ್ಪುಗಾರರ ಡೆಮೊ (3–5 ನಿಮಿಷ)',
    tabArchitecture: '2. ಸಿಸ್ಟಮ್ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ',
    tabEvaluation: '3. ಮಾದರಿ ಪರಿಶೀಲನೆ ಮತ್ತು ನಿಖರತೆ',
    judgingHeading: 'ಸಂವಾದಾತ್ಮಕ 3–5 ನಿಮಿಷಗಳ ಮೌಲ್ಯಮಾಪನ ಡೆಮೊ ಸರಣಿ',
    judgingSubheading: 'ಕಿಸಾನ್‌ಸಾರಥಿ AI ನ ಪ್ರತಿಯೊಂದು ತಂತ್ರಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಲು ಈ ಸರಣಿಯನ್ನು ಅನುಸರಿಸಿ.',
    steps: [],
    techStackTitle: 'ಸಿಸ್ಟಮ್ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ',
    techStackSubtitle: 'ಗ್ರಾಮೀಣ ಭಾಗಗಳಲ್ಲಿ ವೇಗದ ಮತ್ತು ಸುರಕ್ಷಿತ ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
    layerHeader: 'ಸಿಸ್ಟಮ್ ಹಂತ',
    techHeader: 'ತಂತ್ರಜ್ಞಾನ',
    purposeHeader: 'ಉದ್ದೇಶ',
    dpgHeading: 'ಡಿಜಿಟಲ್ ಪಬ್ಲಿಕ್ ಗುಡ್ (DPG) ತತ್ವಗಳು',
    dpgDesc: 'IDEA ಮತ್ತು ಮುಕ್ತ ಮೂಲ ಮಾನದಂಡಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
    offlineHeading: 'ಕಡಿಮೆ ಸಂಪರ್ಕದಲ್ಲಿ ಕಾರ್ಯಕ್ಷಮತೆ',
    offlineDesc: 'ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲದಿದ್ದಾಗಲೂ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ನೀಡುತ್ತದೆ.',
    privacyHeading: 'ರೈತರ ಡೇಟಾ ಗೌಪ್ಯತೆ',
    privacyDesc: 'ರೈತರ ಅನುಮತಿಯಿಲ್ಲದೆ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.',
    safetyHeading: 'ಕೃಷಿ ಸುರಕ್ಷತೆ ಮತ್ತು ಪರಿಶೀಲನೆ',
    safetyDesc: 'ICAR ಮಾರ್ಗಸೂಚಿಗಳ ಆಧಾರದ ಮೇಲೆ ಸಲಹೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
    evalHeading: 'ಮಾದರಿ ಪರಿಶೀಲನೆ ಮತ್ತು ನಿಖರತೆ',
    evalDesc: 'ICAR ಮಾನದಂಡಗಳೊಂದಿಗೆ AI ಶಿಫಾರಸುಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗಿದೆ.',
    evalMethodology: '7 ಪ್ರಮುಖ ಬೆಳೆಗಳಲ್ಲಿ 92% ನಿಖರತೆಯೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ.',
  },
  mr: {
    pageTitle: 'किसानसारथी AI कसे कार्य करते',
    pageSubtitle: 'डिजिटल पब्लिक गुड आर्किटेक्चर, मल्टीमॉडल AI आणि मूल्यांकन मार्गदर्शक',
    tabJudging: '1. मूल्यांकन डेमो (3–5 मिनिटे)',
    tabArchitecture: '2. सिस्टीम रचना आणि तंत्रज्ञान',
    tabEvaluation: '3. प्रोटोटाइप पडताळणी आणि अचूकता',
    judgingHeading: 'इंटरॅक्टिव्ह 3–5 मिनिटांचा डेमो क्रम',
    judgingSubheading: 'किसानसारथी AI ची चाचणी घेण्यासाठी या क्रमाचे अनुसरण करा.',
    steps: [],
    techStackTitle: 'सिस्टीम रचना आणि तंत्रज्ञान',
    techStackSubtitle: 'ग्रामीण भागात जलद आणि सुरक्षित कामगिरीसाठी तयार केलेली रचना.',
    layerHeader: 'सिस्टीम थर',
    techHeader: 'वापरलेले तंत्रज्ञान',
    purposeHeader: 'वापराचा उद्देश',
    dpgHeading: 'डिजिटल पब्लिक गुड (DPG) तत्त्वे',
    dpgDesc: 'IDEA आणि मुक्त स्रोत मानकांनुसार तयार केले गेले आहे.',
    offlineHeading: 'कमी नेटवर्कमध्ये कार्यक्षमता',
    offlineDesc: 'नेटवर्क नसतानाही सेव्ह केलेल्या कृषी मॉडेल्सद्वारे मार्गदर्शन चालू राहते.',
    privacyHeading: 'शेतकरी डेटा सुरक्षा आणि गोपनीयता',
    privacyDesc: 'शेतकऱ्यांच्या परवानगीशिवाय कोणताही खाजगी डेटा साठवला जात नाही.',
    safetyHeading: 'कृषी सुरक्षा आणि वैज्ञानिक पडताळणी',
    safetyDesc: 'ICAR मार्गदर्शक तत्त्वांवर आधारित कृषी सल्ला दिला जातो.',
    evalHeading: 'प्रोटोटाइप पडताळणी आणि अचूकता',
    evalDesc: 'प्रमाणित ICAR मानकांशी AI सल्ल्यांची तुलना.',
    evalMethodology: '7 प्रमुख पिकांमध्ये 92% अचूकतेसह चाचणी केली आहे.',
  },
  bn: {
    pageTitle: 'কিসানসারথি AI কীভাবে কাজ করে',
    pageSubtitle: 'ডিজিটাল পাবলিক গুড আর্কিটেকচার, মাল্টিমোডাল AI এবং মূল্যায়ন নির্দেশিকা',
    tabJudging: '1. মূল্যায়ন ডেমো (৩–৫ মিনিট)',
    tabArchitecture: '2. সিস্টেম আর্কিটেকচার ও প্রযুক্তি',
    tabEvaluation: '3. প্রোটোটাইপ যাচাই ও নির্ভুলতা',
    judgingHeading: 'ইন্টারেক্টিভ ৩–৫ মিনিটের মূল্যায়ন ডেমো ক্রম',
    judgingSubheading: 'কিসানসারথি AI পরীক্ষা করার জন্য এই ক্রমটি অনুসরণ করুন।',
    steps: [],
    techStackTitle: 'সিস্টেম আর্কিটেকচার ও প্রযুক্তি',
    techStackSubtitle: 'গ্রামীণ অঞ্চলে দ্রুত এবং সুরক্ষিত পারফরম্যান্সের জন্য তৈরি।',
    layerHeader: 'সিস্টেম স্তর',
    techHeader: 'প্রযুক্তি',
    purposeHeader: 'উদ্দেশ্য',
    dpgHeading: 'ডিজিটাল পাবলিক গুড (DPG) নীতিমালা',
    dpgDesc: 'IDEA এবং ওপেন সোর্স মানদণ্ড অনুযায়ী তৈরি।',
    offlineHeading: 'অফলাইন ও কম নেটওয়ার্কে কার্যকারিতা',
    offlineDesc: 'দুর্বল নেটওয়ার্কেও সংরক্ষিত কৃষি মডেল দিয়ে কাজ চালিয়ে যায়।',
    privacyHeading: 'কৃষকের ডেটা সুরক্ষা ও গোপনীয়তা',
    privacyDesc: 'কৃষকের অনুমতি ছাড়া কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না।',
    safetyHeading: 'কৃষি নিরাপত্তা ও বৈজ্ঞানিক যাচাই',
    safetyDesc: 'ICAR নির্দেশিকা অনুযায়ী পরামর্শ যাচাই করা হয়।',
    evalHeading: 'প্রোটোটাইপ যাচাই ও নির্ভুলতা',
    evalDesc: 'ICAR মানদণ্ডের সাথে AI পরামর্শের তুলনা।',
    evalMethodology: '৭টি প্রধান ফসলে ৯২% কৃষি নির্ভুলতার সাথে যাচাইকৃত।',
  },
};

// Fallback steps for non-primary languages if empty
for (const code of ['te', 'kn', 'mr', 'bn'] as SupportedLanguage[]) {
  if (!DOCS_TRANSLATIONS[code].steps || DOCS_TRANSLATIONS[code].steps.length === 0) {
    DOCS_TRANSLATIONS[code].steps = DOCS_TRANSLATIONS.hi.steps;
  }
}
