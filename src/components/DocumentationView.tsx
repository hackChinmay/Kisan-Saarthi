import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { SupportedLanguage } from '../types/agri';
import { DOCS_TRANSLATIONS } from '../data/docsTranslations';

interface DocumentationViewProps {
  language: SupportedLanguage;
  onTriggerJudgeStep: (stepIndex: number) => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

const getTechStackRows = (language: SupportedLanguage) => {
  if (language === 'hi') {
    return [
      {
        layer: 'फ्रंटएंड (Frontend)',
        technology: 'React.js + TypeScript + Tailwind CSS',
        purpose: 'मोबाइल-प्रथम किसान निर्णय इंटरफ़ेस और जिला कृषि अधिकारी कंसोल का निर्माण।',
      },
      {
        layer: 'बैकएंड (Backend)',
        technology: 'Node.js / Express (TypeScript)',
        purpose: 'API ऑर्केस्ट्रेशन, सुरक्षित सर्वर-साइड Gemini निष्पादन और टेलीमेट्री रूटिंग।',
      },
      {
        layer: 'AI इंजन (AI)',
        technology: 'Google Gemini API (@google/genai · gemini-3.8-flash / gemini-3.1-flash-lite)',
        purpose: 'मल्टीमॉडल फसल पत्ती दृष्टि विश्लेषण, प्रासंगिक तर्क, संरचित JSON कार्य योजना और बहुभाषी संश्लेषण।',
      },
      {
        layer: 'RAG नॉलेज लेयर',
        technology: 'Structured Vector/Lexical Knowledge Retrieval Layer',
        purpose: 'सुझावों को प्रामाणिक बनाने के लिए LLM से पहले ICAR, TNAU और NMSA कृषि परामर्श प्राप्त करना।',
      },
      {
        layer: 'डेटाबेस / स्थिति (State)',
        technology: 'Firestore-compatible Schema + Persistent Local Storage',
        purpose: 'किसान प्रोफ़ाइल, टिप्पणियां, सुझाव और किसान फीडबैक को सुरक्षित रूप से सहेजना।',
      },
      {
        layer: 'भू-स्थानिक (Geospatial)',
        technology: 'Browser Geolocation API + District Agro-Climatic Block Mapping',
        purpose: 'स्थान का पता लगाना और ब्लॉक-स्तरीय जोखिम का दृश्यीकरण।',
      },
      {
        layer: 'मौसम टेलीमेट्री (Weather)',
        technology: 'Open-Meteo Live Agro-Weather API + Calibrated Demo Mode',
        purpose: 'वास्तविक समय का तापमान, आर्द्रता, 7-दिवसीय वर्षा संभावना और सिंचाई नियंत्रण।',
      },
      {
        layer: 'आवाज़ / ऑडियो (Voice)',
        technology: 'Web Speech API + Gemini Multilingual TTS',
        purpose: '7 भारतीय भाषाओं में हैंड्स-फ्री वाक् पहचान और स्थानीय ऑडियो उच्चारण।',
      },
    ];
  }
  if (language === 'ta') {
    return [
      {
        layer: 'முகப்பு (Frontend)',
        technology: 'React.js + TypeScript + Tailwind CSS',
        purpose: 'உழவர் இடைமுகம் மற்றும் மாவட்ட வேளாண் அலுவலர் கன்சோல் உருவாக்கம்.',
      },
      {
        layer: 'பின்னணி (Backend)',
        technology: 'Node.js / Express (TypeScript)',
        purpose: 'API ஒருங்கிணைப்பு, பாதுகாப்பான சேவையக Gemini SDK இயக்கம்.',
      },
      {
        layer: 'AI இயந்திரம் (AI)',
        technology: 'Google Gemini API (@google/genai · gemini-3.8-flash / gemini-3.1-flash-lite)',
        purpose: 'பலவகை பயிர் இலை பார்வை பகுப்பாய்வு, சூழ்நிலை சார்ந்த முடிவெடுத்தல், தனிப்பயனாக்கப்பட்ட செயல் திட்டம்.',
      },
      {
        layer: 'RAG அறிவு அடுக்கு',
        technology: 'Structured Vector/Lexical Knowledge Retrieval Layer',
        purpose: 'பரிந்துரைகளை உறுதிப்படுத்த ICAR, TNAU மற்றும் NMSA விவசாய ஆலோசனைகளை மீட்டெடுத்தல்.',
      },
      {
        layer: 'தரவுத்தளம் / நிலை',
        technology: 'Firestore-compatible Schema + Persistent Local Storage',
        purpose: 'உழவர் சுயவிவரங்கள், பரிந்துரைகள் மற்றும் உழவர் பின்னூட்டங்களைப் பாதுகாப்பாக சேமித்தல்.',
      },
      {
        layer: 'புவிசார் மேப்பிங் (Geospatial)',
        technology: 'Browser Geolocation API + District Agro-Climatic Block Mapping',
        purpose: 'இருப்பிடத்தைக் கண்டறிதல் மற்றும் வட்டார அளவிலான இடர் கண்காணிப்பு.',
      },
      {
        layer: 'வானிலை தரவு (Weather)',
        technology: 'Open-Meteo Live Agro-Weather API + Calibrated Demo Mode',
        purpose: 'நிகழ்நேர வெப்பநிலை, ஈரப்பதம், 7-நாள் மழை நிகழ்தகவு மற்றும் பாசன மேலாண்மை.',
      },
      {
        layer: 'குரல் / ஆடியோ (Voice)',
        technology: 'Web Speech API + Gemini Multilingual TTS',
        purpose: '7 இந்திய மொழிகளில் குரல் அறிதல் மற்றும் பிராந்திய ஆடியோ வாசிப்பு.',
      },
    ];
  }
  return [
    {
      layer: 'Frontend',
      technology: 'React.js + TypeScript + Tailwind CSS',
      purpose: 'Build the mobile-first farmer decision interface and district officer console.',
    },
    {
      layer: 'Backend',
      technology: 'Node.js / Express (TypeScript)',
      purpose: 'API orchestration, secure server-side Gemini SDK execution, and telemetry routing.',
    },
    {
      layer: 'AI',
      technology: 'Google Gemini API (@google/genai · gemini-3.8-flash / gemini-3.1-flash-lite)',
      purpose: 'Multimodal crop leaf vision analysis, contextual reasoning, structured JSON action plans, and multilingual synthesis.',
    },
    {
      layer: 'RAG',
      technology: 'Structured Vector/Lexical Knowledge Retrieval Layer',
      purpose: 'Retrieve crop-specific ICAR, TNAU, and NMSA advisories prior to LLM generation to ground recommendations.',
    },
    {
      layer: 'Database / State',
      technology: 'Firestore-compatible Schema + Persistent Local Storage',
      purpose: 'Store farmer profiles, field observations, generated recommendations, and closed-loop farmer feedback.',
    },
    {
      layer: 'Geospatial',
      technology: 'Browser Geolocation API + District Agro-Climatic Block Mapping',
      purpose: 'Location detection and district/block-level risk visualization.',
    },
    {
      layer: 'Weather',
      technology: 'Open-Meteo Live Agro-Weather API + Calibrated Demo Mode',
      purpose: 'Real-time temperature, humidity, 7-day rain probability, and irrigation withholding rules.',
    },
    {
      layer: 'Voice / Audio',
      technology: 'Web Speech API + Gemini Multilingual TTS',
      purpose: 'Hands-free voice recognition and localized audio readout in 7 Indian languages.',
    },
  ];
};

const getEvaluationRows = (language: SupportedLanguage) => {
  if (language === 'hi') {
    return [
      {
        metric: 'सत्यापित कृषि स्रोत',
        target: '100% ICAR-ट्रेसेबल',
        methodology: 'प्रत्येक AI परिणाम सत्यापित कृषि बुलेटिन आईडी और स्रोतों को संदर्भित करता है।',
      },
      {
        metric: 'बहुभाषी सटीकता',
        target: '7 भारतीय भाषाएं',
        methodology: 'TNAU और ICAR क्षेत्रीय पोर्टलों के विरुद्ध सत्यापित स्थानीय शब्दावली।',
      },
      {
        metric: 'विश्वसनीयता',
        target: '< 2.5s प्रतिक्रिया समय',
        methodology: 'नेटवर्क आउटेज के दौरान स्थानीय कृषि इंजन पर सहज फॉलबैक।',
      },
      {
        metric: 'किसान उपयोगिता',
        target: 'आज / सप्ताह / 2 सप्ताह',
        methodology: 'निदान संबंधी तर्कों को सत्यापन योग्य समय-आधारित कार्यों में परिवर्तित करता है।',
      },
      {
        metric: 'विस्तार क्षमता',
        target: 'बहु-जिला संरचना',
        methodology: 'राज्य/जिला विस्तार और एफपीओ एकत्रीकरण का समर्थन करने वाला मॉड्यूलर आर्किटेक्चर।',
      },
    ];
  }
  if (language === 'ta') {
    return [
      {
        metric: 'அறிவியல் சரிபார்ப்பு',
        target: '100% ICAR சரிபார்க்கப்பட்டது',
        methodology: 'ஒவ்வொரு AI முடிவும் சரிபார்க்கப்பட்ட விவசாய புல்லட்டின் குறிப்புகளைக் காட்டுகிறது.',
      },
      {
        metric: 'பன்மொழித் துல்லியம்',
        target: '7 இந்திய மொழிகள்',
        methodology: 'TNAU மற்றும் ICAR வேளாண் சொற்களஞ்சியத்தின்படி சரிபார்க்கப்பட்டது.',
      },
      {
        metric: 'இயக்க நம்பகத்தன்மை',
        target: '< 2.5 வினாடி பதில் நேரம்',
        methodology: 'இணைய இணைப்பு இல்லாத போதும் உள்ளூர் விவசாய இயந்திரம் மூலம் சீராக இயங்கும்.',
      },
      {
        metric: 'உழவர் பயன்பாடு',
        target: 'இன்று / இந்த வாரம் / 2 வாரங்கள்',
        methodology: 'பரிந்துரைகளை எளிதாக சரிபார்க்கக்கூடிய நேர-அடிப்படையிலான பணிகளாக மாற்றுகிறது.',
      },
      {
        metric: 'அளவிடக்கூடிய தன்மை',
        target: 'பல மாவட்ட கட்டமைப்பு',
        methodology: 'மாநில மற்றும் மாவட்ட அளவிலான விரிவாக்கத்தை ஆதரிக்கும் கட்டமைப்பு.',
      },
    ];
  }
  return [
    {
      metric: 'Diagnostic Grounding',
      target: '100% ICAR-traceable',
      methodology: 'Every AI output cites verified agricultural bulletin IDs and sources.',
    },
    {
      metric: 'Multilingual Accuracy',
      target: '7 Indian Languages',
      methodology: 'Localized terminology validated against TNAU and ICAR regional portals.',
    },
    {
      metric: 'Execution Reliability',
      target: '< 2.5s Response Latency',
      methodology: 'Seamless offline fallback to calibrated agronomy engine during network outage.',
    },
    {
      metric: 'Farmer Usability',
      target: 'End-to-end (Today / Week / 2 Weeks)',
      methodology: 'Converts diagnostic reasoning into checkable time-horizon tasks.',
    },
    {
      metric: 'Scalability',
      target: 'Multi-district architecture',
      methodology: 'Modular agro-climatic zone registry supporting state/district expansion and FPO aggregation.',
    },
  ];
};

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  language,
  onTriggerJudgeStep,
  onSelectLanguage,
}) => {
  const doc = DOCS_TRANSLATIONS[language] || DOCS_TRANSLATIONS.en;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
          {doc.tabJudging} · {doc.tabArchitecture} · {doc.tabEvaluation}
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-stone-900 mt-1">
          {doc.pageTitle}
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          {doc.pageSubtitle}
        </p>
      </div>

      {/* 3–5 Minute Hackathon Judging Demo Sequence */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4 mb-5">
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              {doc.judgingHeading}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {doc.judgingSubheading}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onTriggerJudgeStep(2)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1.5 self-start whitespace-nowrap shadow-2xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{doc.steps[2]?.actionLabel || 'Run Demo'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doc.steps.map((step, index) => (
            <div
              key={index}
              className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono-tabular font-semibold text-emerald-800">
                  {step.timeWindow}
                </div>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">{step.title}</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (index === 3) {
                    onSelectLanguage('ta');
                  }
                  onTriggerJudgeStep(index);
                }}
                className="mt-4 w-full py-2 px-3 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>{step.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack & System Architecture */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-base font-semibold text-stone-900">
            {doc.techStackTitle}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {doc.techStackSubtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-700">
                <th className="p-3 font-semibold w-1/4">{doc.layerHeader}</th>
                <th className="p-3 font-semibold w-1/3">{doc.techHeader}</th>
                <th className="p-3 font-semibold">{doc.purposeHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {getTechStackRows(language).map((row) => (
                <tr key={row.layer} className="hover:bg-stone-50/50">
                  <td className="p-3 font-semibold text-emerald-900">{row.layer}</td>
                  <td className="p-3 font-mono text-stone-800">{row.technology}</td>
                  <td className="p-3 text-stone-600 leading-relaxed">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Digital Public Good (DPG) Principles */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-base font-semibold text-stone-900">
            {doc.dpgHeading}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {doc.dpgDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>{doc.offlineHeading}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {doc.offlineDesc}
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{doc.privacyHeading}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {doc.privacyDesc}
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{doc.safetyHeading}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {doc.safetyDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Verification & Accuracy */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-base font-semibold text-stone-900">
            {doc.evalHeading}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {doc.evalDesc} · {doc.evalMethodology}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {getEvaluationRows(language).map((ev) => (
            <div key={ev.metric} className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
              <span className="text-stone-500 block">{ev.metric}</span>
              <strong className="text-emerald-900 block font-semibold">{ev.target}</strong>
              <p className="text-2xs text-stone-600 leading-relaxed">{ev.methodology}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
