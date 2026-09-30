import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  CloudRain,
  Globe,
  Leaf,
  Phone,
  Recycle,
  ShieldCheck,
  Sprout,
  UserCheck,
  Volume2,
} from 'lucide-react';
import { SupportedLanguage } from '../types/agri';
import { SUPPORTED_LANGUAGES } from '../data/translations';

interface FarmerWelcomeGateProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

interface WelcomeContent {
  badge: string;
  heading: string;
  subheading: string;
  loginBtn: string;
  signupBtn: string;
  chooseLang: string;
  featuresHeading: string;
  weatherTitle: string;
  weatherDesc: string;
  cropTitle: string;
  cropDesc: string;
  soilTitle: string;
  soilDesc: string;
  voiceTitle: string;
  voiceDesc: string;
  helpline: string;
  footerTagline: string;
}

const WELCOME_DICTIONARY: Record<SupportedLanguage, WelcomeContent> = {
  en: {
    badge: 'ICAR & TNAU Grounded Agronomy System',
    heading: 'Intelligent Agricultural Decision Support for Indian Farmers',
    subheading: 'Get real-time weather telemetry, AI-powered multimodal crop disease diagnosis, and regenerative soil advisories in your native language.',
    loginBtn: 'Farmer Sign In',
    signupBtn: 'Register Farm Profile',
    chooseLang: 'Choose Your Preferred Language',
    featuresHeading: 'What Kisan Saarthi Delivers to Every Farmer',
    weatherTitle: 'Live Agro-Met Telemetry',
    weatherDesc: 'Hyper-local temperature, rainfall probability, humidity, and 7-day operational spray/irrigation windows.',
    cropTitle: 'Multimodal Crop Diagnosis',
    cropDesc: 'Instant botanical vision analysis identifying leaf blights, fungal rusts, and nutrient deficiencies.',
    soilTitle: 'Regenerative Soil Health',
    soilDesc: 'Root-zone soil organic carbon (SOC), bio-fertilizers, organic mulch, and water conservation practices.',
    voiceTitle: '100% Native Voice In/Out',
    voiceDesc: 'Farmers can speak questions and listen to complete advisories read aloud in all 7 Indian languages.',
    helpline: 'Kisan Call Centre: 1800-180-1551 (Toll-Free)',
    footerTagline: 'Agricultural Decision-Support System',
  },
  hi: {
    badge: 'आईसीएआर और टीएनएयू प्रमाणित कृषि मॉडल',
    heading: 'भारतीय किसानों के लिए आधुनिक एवं सटीक कृषि सलाहकार प्रणाली',
    subheading: 'अपनी भाषा में वास्तविक समय मौसम पूर्वानुमान, पत्ती रोग पहचान और जैविक मृदा पोषण सलाह प्राप्त करें।',
    loginBtn: 'किसान प्रवेश',
    signupBtn: 'नया किसान पंजीकरण',
    chooseLang: 'अपनी पसंदीदा भाषा चुनें',
    featuresHeading: 'किसान सारथी से मिलने वाली मुख्य सुविधाएं',
    weatherTitle: 'सटीक मौसम व 7-दिवसीय पूर्वानुमान',
    weatherDesc: 'स्थानीय तापमान, वर्षा की संभावना, नमी और छिड़काव/सिंचाई के सबसे उपयुक्त समय की जानकारी।',
    cropTitle: 'फसल रोग व पत्ती जांच',
    cropDesc: 'पत्ती की फोटो से झुलसा, फफूंद और पोषक तत्वों की कमी का तुरंत वैज्ञानिक निदान।',
    soilTitle: 'जैविक मिट्टी व प्राकृतिक पोषण',
    soilDesc: 'मिट्टी में जैविक कार्बन (SOC), प्राकृतिक खाद, जीवामृत, मल्चिंग और जल संरक्षण की सटीक सलाह।',
    voiceTitle: 'मातृभाषा में बोलकर पूछें व सुनें',
    voiceDesc: 'किसान बोलकर सवाल पूछ सकते हैं और पूरी कृषि सलाह अपनी भाषा में सुन सकते हैं।',
    helpline: 'किसान कॉल सेंटर: 1800-180-1551 (निःशुल्क हेल्पलाइन)',
    footerTagline: 'कृषि सलाहकार एवं निर्णय सहायता प्रणाली',
  },
  ta: {
    badge: 'TNAU & ICAR வழிகாட்டுதல் முறைமை',
    heading: 'தமிழ்நாடு & இந்திய விவசாயிகளுக்கான நுண்ணறிவு வேளாண் ஆலோசனை தளம்',
    subheading: 'நேரலை வானிலை முன்னறிவிப்பு, இலை நோய் கண்டறிதல் மற்றும் இயற்கை மண்வள ஆலோசனைகளை உங்கள் தாய்மொழியில் பெறுங்கள்.',
    loginBtn: 'விவசாயி உள்நுழைவு',
    signupBtn: 'புதிய விவசாயி பதிவு',
    chooseLang: 'உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்',
    featuresHeading: 'கிசான் சாரதி வழங்கும் முக்கிய சேவைகள்',
    weatherTitle: 'நேரலை வானிலை & 7-நாள் முன்னறிவிப்பு',
    weatherDesc: 'மழை வாய்ப்பு, வெப்பநிலை, காற்றில் ஈரப்பதம் மற்றும் பாசன மேலாண்மைக்கான உடனடி வழிகாட்டுதல்.',
    cropTitle: 'பயிர் நோய் & இலை பரிசோதனை',
    cropDesc: 'இலை புகைப்படத்தை ஆய்வு செய்து பூஞ்சை நோய், கருகல் மற்றும் சத்து குறைபாடுகளை உடனே கண்டறியும்.',
    soilTitle: 'இயற்கை மண்வளம் & நீர் மேலாண்மை',
    soilDesc: 'மண்ணின் கரிம சத்து, நுண்ணுயிர் உரம், வைக்கோல் மூடாக்கு மற்றும் வேர்ப்பகுதி ஈரப்பத பராமரிப்பு.',
    voiceTitle: 'முழுமையான தமிழ் குரல் வழி சேவை',
    voiceDesc: 'தமிழில் கேள்விகளை பேசவும், முழு வேளாண் ஆலோசனைகளையும் தமிழில் கேட்டு பயன்பெறவும்.',
    helpline: 'உழவர் உதவி மையம்: 1800-180-1551 (கட்டணமில்லா எண்)',
    footerTagline: 'வேளாண் நுண்ணறிவு & முடிவெடுக்கும் ஆலோசனை முறைமை',
  },
  te: {
    badge: 'ICAR ప్రామాణిక వ్యవసాయ వ్యవస్థ',
    heading: 'భారతీయ రైతుల కోసం స్మార్ట్ వ్యవసాయ నిర్ణయ సహాయక వ్యవస్థ',
    subheading: 'మీ మాతృభాషలో నిజ-సమయ వాతావరణ సమాచారం, పంట తెగుళ్ల గుర్తింపు మరియు సేంద్రీయ నేల సంరక్షణ సలహాలు పొందండి.',
    loginBtn: 'రైతు ప్రవేశం',
    signupBtn: 'కొత్త రైతు నమోదు',
    chooseLang: 'మీ ప్రాధాన్య భాషను ఎంచుకోండి',
    featuresHeading: 'కిసాన్ సారథి అందించే ముఖ్య సేవలు',
    weatherTitle: 'ప్రత్యక్ష వాతావరణం & 7 రోజుల సమాచారం',
    weatherDesc: 'వర్షపాతం, ఉష్ణోగ్రత మరియు పంటలకు నీటి తడి/పిచికారీ చేయడానికి అనువైన సమయాల సూచనలు.',
    cropTitle: 'పంట తెగుళ్ల & ఆకు పరిశీలన',
    cropDesc: 'ఆకు ఫోటో ద్వారా తెగుళ్లు, బూజు మరియు పోషకాల లోపాలను వెంటనే శాస్త్రీయంగా గుర్తించండి.',
    soilTitle: 'సేంద్రీయ నేల సంరక్షణ & తేమ',
    soilDesc: 'నేల సేంద్రీయ కార్బన్, సహజ ఎరువులు, మల్చింగ్ మరియు నీటి సంరక్షణ పద్ధతుల వివరాలు.',
    voiceTitle: 'తెలుగు వాయిస్ సంభాషణ',
    voiceDesc: 'మీ సొంత భాషలో మాట్లాడి అడగండి మరియు వ్యవసాయ సలహాలను వినండి.',
    helpline: 'కిసాన్ కాల్ సెంటర్: 1800-180-1551 (ఉచిత హెల్ప్‌లైన్)',
    footerTagline: 'వ్యవసాయ నిర్ణయ సహాయక వ్యవస్థ',
  },
  kn: {
    badge: 'ICAR ಮಾನ್ಯತೆ ಪಡೆದ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ',
    heading: 'ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ',
    subheading: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಮಾಹಿತಿ, ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಸುಸ್ಥಿರ ಮಣ್ಣಿನ ಪೋಷಣೆ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    loginBtn: 'ರೈತರ ಪ್ರವೇಶ',
    signupBtn: 'ಹೊಸ ರೈತರ ನೋಂದಣಿ',
    chooseLang: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    featuresHeading: 'ಕಿಸಾನ್ ಸಾರಥಿ ಒದಗಿಸುವ ಪ್ರಮುಖ ಸೇವೆಗಳು',
    weatherTitle: 'ನೈಜ ಹವಾಮಾನ ಮತ್ತು 7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ',
    weatherDesc: 'ಮಳೆ ಸಂಭವನೀಯತೆ, ತಾಪಮಾನ, ತೇವಾಂಶ ಮತ್ತು ಸರಿಯಾದ ನೀರಾವರಿ ಸಮಯದ ಮಾಹಿತಿ.',
    cropTitle: 'ಬೆಳೆ ರೋಗ ಮತ್ತು ಎಲೆ ಪರೀಕ್ಷೆ',
    cropDesc: 'ಎಲೆಯ ಫೋಟೋ ಪರಿಶೀಲಿಸಿ ರೋಗಗಳು, ಕೀಟಬಾಧೆ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಯನ್ನು ಪತ್ತೆಹಚ್ಚಿ.',
    soilTitle: 'ಸುಸ್ಥಿರ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಸಾವಯವ ಪೋಷಣೆ',
    soilDesc: 'ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲ, ಜೈವಿಕ ಗೊಬ್ಬರ, ಹೊದಿಕೆ ಮತ್ತು ನೀರು ಸಂರಕ್ಷಣಾ ಪದ್ಧತಿಗಳು.',
    voiceTitle: 'ಕನ್ನಡ ಧ್ವನಿ ಸೌಲಭ್ಯ',
    voiceDesc: 'ರೈತರು ಮಾತನಾಡಿ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು ಮತ್ತು ಸಂಪೂರ್ಣ ಸಲಹೆಯನ್ನು ಕನ್ನಡದಲ್ಲೇ ಆಲಿಸಬಹುದು.',
    helpline: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1800-180-1551 (ಉಚಿತ ಸಹಾಯವಾಣಿ)',
    footerTagline: 'ಕೃಷಿ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ',
  },
  mr: {
    badge: 'ICAR प्रमाणित कृषी प्रणाली',
    heading: 'भारतीय शेतकरी बांधवांसाठी आधुनिक व विश्वासार्ह कृषी सल्लागार प्रणाली',
    subheading: 'तुमच्या स्वतःच्या भाषेत थेट हवामान अंदाज, पीक रोग निदान आणि सेंद्रिय जमीन संवर्धन मार्गदर्शन मिळवा.',
    loginBtn: 'शेतकरी प्रवेश',
    signupBtn: 'नवीन शेतकरी नोंदणी',
    chooseLang: 'आपली पसंतीची भाषा निवडा',
    featuresHeading: 'किसान सारथीकडून मिळणाऱ्या प्रमुख सुविधा',
    weatherTitle: 'थेट हवामान व ७ दिवसांचा अंदाज',
    weatherDesc: 'स्थानिक तापमान, पाऊस अंदाज, हवेतील ओलावा आणि फवारणी/पाणी देण्याची अचूक वेळ.',
    cropTitle: 'पीक रोग व पान तपासणी',
    cropDesc: 'पानाच्या फोटोवरून करपा, बुरशी आणि अन्नद्रव्यांची कमतरता यांचे झटपट निदान.',
    soilTitle: 'सेंद्रिय मृदा व जल संवर्धन',
    soilDesc: 'मातीतील सेंद्रिय कर्ब (SOC), जिवाणू खते, आच्छादन आणि पाणी बचतीचे योग्य नियोजन.',
    voiceTitle: 'मातृभाषेत बोला आणि ऐका',
    voiceDesc: 'शेतकरी बोलून प्रश्न विचारू शकतात आणि संपूर्ण कृषी सल्ला मराठीत ऐकू शकतात.',
    helpline: 'किसान कॉल सेंटर: १८००-१८०-१५५१ (टोल-फ्री)',
    footerTagline: 'कृषी सल्लागार व निर्णय साहाय्य प्रणाली',
  },
  bn: {
    badge: 'ICAR অনুমোদিত কৃষি প্রযুক্তি',
    heading: 'ভারতীয় কৃষকদের জন্য বুদ্ধিমান কৃষি সিদ্ধান্ত সহায়তা ব্যবস্থা',
    subheading: 'আপনার মাতৃভাষায় রিয়েল-টাইম আবহাওয়া পূর্বাভাস, ফসলের রোগ নির্ণয় এবং মাটির পুষ্টি সংক্রান্ত পরামর্শ পান।',
    loginBtn: 'কৃষক প্রবেশ',
    signupBtn: 'নতুন কৃষক নিবন্ধন',
    chooseLang: 'আপনার পছন্দের ভাষা নির্বাচন করুন',
    featuresHeading: 'কিসান সারথির প্রধান পরিষেবা সমূহ',
    weatherTitle: 'সরাসরি আবহাওয়া ও ৭ দিনের পূর্বাভাস',
    weatherDesc: 'স্থানীয় তাপমাত্রা, বৃষ্টির সম্ভাবনা, আর্দ্রতা এবং সেচ/কীটনাশক স্প্রে করার সঠিক সময়।',
    cropTitle: 'ফসলের রোগ ও পাতা পরীক্ষা',
    cropDesc: 'পাতার ছবি বিশ্লেষণ করে ছত্রাক, ব্লাইট এবং পুষ্টির ঘাটতি দ্রুত সনাক্তকরণ।',
    soilTitle: 'জৈব মাটি ও প্রাকৃতিক পুষ্টি',
    soilDesc: 'মাটির জৈব কার্বন (SOC), জৈব সার, মালচিং এবং জল সংরক্ষণের বৈজ্ঞানিক পরামর্শ।',
    voiceTitle: 'বাংলায় ভয়েস সহায়তা',
    voiceDesc: 'কৃষকেরা মুখে কথা বলে প্রশ্ন করতে পারেন এবং বাংলায় সম্পূর্ণ পরামর্শ শুনতে পারেন।',
    helpline: 'কৃষক কল সেন্টার: ১৮০০-১৮০-১৫৫১ (টোল-ফ্রি)',
    footerTagline: 'কৃষি সিদ্ধান্ত সহায়তা ব্যবস্থা',
  },
};

export const FarmerWelcomeGate: React.FC<FarmerWelcomeGateProps> = ({
  language,
  onLanguageChange,
  onOpenLogin,
  onOpenSignup,
}) => {
  const content = WELCOME_DICTIONARY[language] || WELCOME_DICTIONARY.en;

  return (
    <div className="min-h-screen bg-[#F6F8F5] text-[#111C14] flex flex-col justify-between w-full overflow-x-hidden">
      {/* 1. TOP HEADER */}
      <header className="bg-white border-b border-stone-200/90 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg md:text-xl font-extrabold text-[#14532D]">
            <Sprout className="w-6 h-6 md:w-7 md:h-7 text-emerald-700 shrink-0" />
            <span>Kisan Saarthi</span>
          </div>

          {/* Quick Language Dropdown */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-stone-500" />
            <select
              aria-label={content.chooseLang}
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="px-3 py-1.5 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200/80 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 w-full">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#065F46] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-lg text-center relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-2xs md:text-xs font-bold bg-white/15 text-emerald-100 backdrop-blur-md rounded-full border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{content.badge}</span>
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              {content.heading}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 font-medium max-w-2xl mx-auto leading-relaxed">
              {content.subheading}
            </p>

            {/* Main Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <button
                type="button"
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-emerald-50 text-[#064E3B] font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>{content.loginBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenSignup}
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-900/80 hover:bg-emerald-950 text-white font-bold text-sm rounded-xl border border-emerald-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Sprout className="w-4 h-4 text-emerald-300" />
                <span>{content.signupBtn}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. MULTILINGUAL SELECTOR GRID */}
        <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900">
            <Globe className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold">
              {content.chooseLang}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {SUPPORTED_LANGUAGES.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => onLanguageChange(l.code)}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs font-bold ring-2 ring-emerald-700/30 scale-[1.02]'
                      : 'bg-stone-50 hover:bg-emerald-50/60 border-stone-200 text-stone-800 font-medium'
                  }`}
                >
                  <span className="text-base font-bold">{l.nativeName}</span>
                  <span className={`text-2xs ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                    {l.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. KEY CAPABILITIES PREVIEW */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-600">
            {content.featuresHeading}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Weather */}
            <div className="p-5 bg-white border border-stone-200/80 rounded-2xl space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <CloudRain className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{content.weatherTitle}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {content.weatherDesc}
              </p>
            </div>

            {/* Card 2: Multimodal Leaf Doctor */}
            <div className="p-5 bg-white border border-stone-200/80 rounded-2xl space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{content.cropTitle}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {content.cropDesc}
              </p>
            </div>

            {/* Card 3: Soil & Regenerative */}
            <div className="p-5 bg-white border border-stone-200/80 rounded-2xl space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Recycle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{content.soilTitle}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {content.soilDesc}
              </p>
            </div>

            {/* Card 4: Native Voice */}
            <div className="p-5 bg-white border border-stone-200/80 rounded-2xl space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">{content.voiceTitle}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {content.voiceDesc}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-stone-200 px-4 md:px-8 py-5 mt-auto">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <strong className="text-stone-900">Kisan Saarthi</strong> · {content.footerTagline}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="font-semibold text-stone-700">{content.helpline}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
