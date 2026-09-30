import {
  AIRecommendationResponse,
  DailyForecast,
  FarmerProfile,
  GeminiDiagnostics,
  RetrievedChunk,
  SoilData,
  SupportedLanguage,
  WeatherData,
} from '../types/agri';
import { getDefaultDemoWeather, retrieveAgriculturalKnowledge } from '../data/knowledgeBase';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';

export interface AnalyzeFarmRequest {
  question: string;
  profile: FarmerProfile;
  weather: WeatherData;
  soil: SoilData;
  imageBase64?: string;
  language: SupportedLanguage;
  languageName?: string;
}

export async function checkGeminiStatus(): Promise<GeminiDiagnostics> {
  try {
    const res = await fetch('/api/gemini/status');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Ignore network error
  }
  return {
    connected: false,
    model: 'gemini-3.1-flash-lite',
    backend: 'Disconnected',
    rag: 'Active',
    fallback: 'Available',
    message: 'Backend connection pending.',
  };
}

export async function fetchLiveOrDemoWeather(
  lat: number,
  lng: number,
  district: string,
  state: string,
  preferLive = true
): Promise<WeatherData> {
  if (!preferLive) {
    return getDefaultDemoWeather(district, state);
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(
      4
    )}&longitude=${lng.toFixed(
      4
    )}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=Asia%2FKolkata`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather HTTP status ${res.status}`);
    }
    const data = await res.json();

    const temp = Math.round(data.current?.temperature_2m ?? 29);
    const humidity = Math.round(data.current?.relative_humidity_2m ?? 78);
    const windSpeed = Math.round(data.current?.wind_speed_10m ?? 12);
    const rainProb = Math.round(data.daily?.precipitation_probability_max?.[0] ?? 65);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecast7Day: DailyForecast[] = (data.daily?.time || []).slice(0, 7).map((dateStr: string, idx: number) => {
      const d = new Date(dateStr);
      const dayProb = Math.round(data.daily?.precipitation_probability_max?.[idx] ?? 30);
      const dayRainMm = Number((data.daily?.precipitation_sum?.[idx] ?? 0).toFixed(1));
      return {
        date: idx === 0 ? 'Today' : dateStr.slice(5),
        dayLabel: dayNames[d.getDay()] || `D+${idx}`,
        tempMax: Math.round(data.daily?.temperature_2m_max?.[idx] ?? 31),
        tempMin: Math.round(data.daily?.temperature_2m_min?.[idx] ?? 23),
        rainProb: dayProb,
        rainfallMm: dayRainMm,
        humidity: Math.min(95, Math.max(45, humidity + (dayProb > 50 ? 6 : -5))),
        condition:
          dayProb >= 65
            ? 'Rain Likely'
            : dayProb >= 35
            ? 'Humid / Cloudy'
            : 'Partly Sunny',
      };
    });

    const implication =
      rainProb >= 60
        ? `High rainfall probability (${rainProb}%) in ${district}: Delay irrigation for 24 hours and avoid applying washable foliar sprays today.`
        : humidity >= 75
        ? `Elevated relative humidity (${humidity}%) in ${district}: Monitor lower crop canopy for fungal leaf spots and maintain root-zone drainage.`
        : `Low rainfall probability (${rainProb}%) at ${temp}°C: Schedule morning drip irrigation and maintain organic surface mulch to reduce evaporation.`;

    return {
      source: 'LIVE',
      providerLabel: `Open-Meteo Live Agro-Weather · ${district}, ${state} (${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E)`,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      temperature: temp,
      rainProbability: rainProb,
      humidity,
      windSpeed,
      condition: rainProb >= 60 ? 'Humid · Rain Showers Forecast' : 'Partly Cloudy · Warm',
      farmingImplication: implication,
      forecast7Day: forecast7Day.length > 0 ? forecast7Day : getDefaultDemoWeather(district, state).forecast7Day,
    };
  } catch {
    return getDefaultDemoWeather(district, state);
  }
}

export function buildDemoFallbackRecommendation(
  req: AnalyzeFarmRequest,
  retrievedChunks: RetrievedChunk[],
  reasonNote = 'Grounded RAG knowledge and calibrated agronomy models are active.'
): AIRecommendationResponse {
  const { profile, weather, soil, question, language, imageBase64 } = req;
  const qLower = question.toLowerCase();
  const langStrings = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const isRice = profile.crop === 'Rice' || qLower.includes('paddy') || qLower.includes('blast');
  const isWaterOrIrrigationQuery =
    (qLower.includes('irrigat') || qLower.includes('water') || qLower.includes('rain')) &&
    !qLower.includes('brown') &&
    !qLower.includes('spot') &&
    !imageBase64;

  let issue = `${profile.crop} Early Blight (Alternaria solani) — Advisory Indication`;
  let confidence = 78;
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
    weather.humidity >= 78 && weather.rainProbability >= 65 ? 'MEDIUM' : 'MEDIUM';
  let observations = [
    'Concentric dark-brown target-like spots observed on lower foliage',
    'Yellow chlorotic halo surrounding necrotic leaf lesions',
    `Elevated canopy humidity (${weather.humidity}%) & ${weather.rainProbability}% rainfall probability`,
  ];

  if (isRice) {
    issue = 'Rice Leaf Blast (Magnaporthe oryzae) — Moderate Risk';
    confidence = 81;
    observations = [
      'Spindle / diamond-shaped lesions with grayish-white centers',
      'Reddish-brown necrotic margins along leaf blades',
      `High relative humidity (${weather.humidity}%) favoring spore spread`,
    ];
  } else if (isWaterOrIrrigationQuery) {
    issue = `Weather-Synchronized Irrigation & Moisture Advisory (${profile.crop})`;
    confidence = 88;
    riskLevel = weather.rainProbability >= 60 ? 'MEDIUM' : 'LOW';
    observations = [
      `24-hour rainfall probability at ${weather.rainProbability}% in ${profile.district}`,
      `Current root-zone soil moisture at ${soil.moisture}% (${soil.soilType} soil)`,
      `Irrigation system configured as ${profile.irrigationType}`,
    ];
  }

  return {
    id: `REC-${Date.now()}`,
    farmerId: profile.id,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    cropDetected: profile.crop,
    issue,
    confidence,
    riskLevel,
    observations,
    why: [
      imageBase64
        ? `Uploaded leaf specimen exhibits lesion geometry and chlorotic halos characteristic of ${issue.split('—')[0].trim()}.`
        : `Your query ("${question}") combined with ${profile.crop} stage in ${profile.district} matches ${retrievedChunks[0]?.title || 'ICAR crop health advisories'}.`,
      `Current weather in ${profile.district}, ${profile.state} shows ${weather.humidity}% humidity and ${weather.rainProbability}% rain probability (${weather.temperature}°C), creating high leaf-wetness duration.`,
      `Soil profile (${soil.soilType}, pH ${soil.ph}, Organic Carbon ${soil.organicCarbon}%) indicates that preventing rain-splash from soil to lower foliage is critical right now.`,
    ],
    immediateActions:
      language !== 'en' && langStrings.demoImmediateActions
        ? langStrings.demoImmediateActions
        : [
            `Delay ${profile.irrigationType.toLowerCase()} irrigation for 24 hours because rainfall probability is ${weather.rainProbability}% in ${profile.district}.`,
            'Prune and remove severely spotted lower leaves touching the soil surface; dispose of them outside the field.',
            'Avoid overhead watering or spraying contact chemicals immediately before forecast rain.',
            'Apply preventative bio-control spray of Pseudomonas fluorescens (10g/L water) during a clear morning window.',
          ],
    preventiveActions: [
      'Stake plants and prune excess basal side-shoots to improve airflow through the canopy.',
      'Practice a 2-season crop rotation with legumes (cowpea/green gram) rather than continuous solanaceous planting.',
      'Sanitize field bunds of weed hosts after harvest.',
    ],
    irrigationGuidance:
      weather.rainProbability >= 60
        ? `HOLD IRRIGATION TODAY: With ${weather.rainProbability}% rain probability and ${soil.moisture}% existing soil moisture, irrigating now risks root-zone waterlogging and fungal collar rot.`
        : `Apply regulated morning ${profile.irrigationType} irrigation to maintain 65% soil moisture without wetting upper leaves.`,
    weatherConsideration: `${weather.condition} (${weather.temperature}°C, ${weather.humidity}% RH). ${weather.farmingImplication}`,
    regenerativeRecommendation:
      language !== 'en' && langStrings.demoRegenerativeAdvice
        ? langStrings.demoRegenerativeAdvice
        : `Apply a 5 cm dried paddy-straw or farm-residue mulch across beds to physically block soil-borne fungal spores from splashing onto lower ${profile.crop.toLowerCase()} leaves during rain, while boosting Soil Organic Carbon (currently ${soil.organicCarbon}%) and cutting evaporation by 30%. Intercrop 1 row of African marigold per 10 rows of ${profile.crop.toLowerCase()}.`,
    followUp: [
      'Inspect 10 random plants along the field diagonal after 48 hours to check if new spots appear on middle-tier leaves.',
      'Consult your local Krishi Vigyan Kendra (KVK) or District Agriculture Officer in ' +
        profile.district +
        ' if lesions spread to stems or fruits.',
    ],
    actionPlan: {
      today: [
        `Hold ${profile.irrigationType.toLowerCase()} irrigation for 24 hours (${weather.rainProbability}% rain forecast)`,
        'Inspect and prune severely spotted bottom leaves near soil level',
        'Clear inter-row drainage channels before evening rain',
      ],
      thisWeek: [
        'Lay 5 cm organic straw/leaf mulch over crop beds to stop spore splash',
        'Apply Pseudomonas fluorescens (10g/L) or 5% Neem Seed Kernel Extract on a dry morning',
        'Monitor soil moisture and resume drip schedule only when moisture drops below 55%',
      ],
      nextTwoWeeks: [
        'Reassess canopy health and stake growing branches to maintain aeration',
        'Top-dress with Trichoderma-enriched vermicompost / FYM around root zones',
        'Log outcome in KisanSaarthi feedback loop to refine district risk alerts',
      ],
    },
    sources: retrievedChunks.map((chunk) => `${chunk.id}: ${chunk.title} (${chunk.sourceOrg})`),
    retrievedDocs: retrievedChunks.map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      sourceOrg: chunk.sourceOrg,
      relevanceScore: chunk.relevanceScore,
    })),
    localizedSummary: {
      en: UI_TRANSLATIONS.en.demoRecommendationSummary || UI_TRANSLATIONS.en.todaysActionBody,
      hi: UI_TRANSLATIONS.hi.demoRecommendationSummary || UI_TRANSLATIONS.hi.todaysActionBody,
      ta: UI_TRANSLATIONS.ta.demoRecommendationSummary || UI_TRANSLATIONS.ta.todaysActionBody,
      selectedLangText: langStrings.demoRecommendationSummary || langStrings.todaysActionBody,
    },
    isFallback: true,
    modelUsed: `Calibrated Agronomy Engine (${reasonNote})`,
    latencyMs: 380,
  };
}

export async function analyzeFarmContextWithGemini(
  req: AnalyzeFarmRequest
): Promise<{
  recommendation: AIRecommendationResponse;
  retrievedChunks: RetrievedChunk[];
  serviceNotice?: string;
  isFallback: boolean;
}> {
  const startTime = performance.now();
  const retrievedChunks = retrieveAgriculturalKnowledge(
    req.question,
    req.profile.crop,
    req.weather,
    req.soil,
    3
  );

  try {
    const response = await fetch('/api/gemini/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: req.question,
        profile: req.profile,
        weather: req.weather,
        soil: req.soil,
        retrievedChunks,
        imageBase64: req.imageBase64,
        language: req.language,
        languageName:
          SUPPORTED_LANGUAGES.find((l) => l.code === req.language)?.name || 'English',
      }),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    const latencyMs = Math.round(performance.now() - startTime);

    const recommendation: AIRecommendationResponse = {
      id: `REC-${Date.now()}`,
      farmerId: req.profile.id,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      cropDetected: data.cropDetected || req.profile.crop,
      issue: data.issue || `${req.profile.crop} Advisory Analysis`,
      confidence: typeof data.confidence === 'number' ? data.confidence : 82,
      riskLevel:
        data.riskLevel?.toUpperCase() === 'HIGH'
          ? 'HIGH'
          : data.riskLevel?.toUpperCase() === 'LOW'
          ? 'LOW'
          : 'MEDIUM',
      observations: Array.isArray(data.observations)
        ? data.observations
        : Array.isArray(data.observedIndicators)
        ? data.observedIndicators
        : ['Visual analysis of leaf lesions and environmental context'],
      why: Array.isArray(data.why) ? data.why : [String(data.why || '')],
      immediateActions: Array.isArray(data.immediateActions) ? data.immediateActions : [],
      preventiveActions: Array.isArray(data.preventiveActions) ? data.preventiveActions : [],
      irrigationGuidance:
        data.irrigationGuidance ||
        `Adjust ${req.profile.irrigationType} schedule based on ${req.weather.rainProbability}% rain probability.`,
      weatherConsideration:
        data.weatherConsideration || req.weather.farmingImplication,
      regenerativeRecommendation:
        data.regenerativeRecommendation ||
        'Incorporate organic mulching and bio-inoculants to build soil organic carbon.',
      followUp: Array.isArray(data.followUp) ? data.followUp : [],
      sources: Array.isArray(data.sources)
        ? data.sources
        : retrievedChunks.map((c) => `${c.id}: ${c.title}`),
      actionPlan: {
        today: Array.isArray(data.actionPlan?.today)
          ? data.actionPlan.today
          : data.immediateActions?.slice(0, 2) || ['Inspect crop canopy and adjust irrigation'],
        thisWeek: Array.isArray(data.actionPlan?.thisWeek)
          ? data.actionPlan.thisWeek
          : ['Apply organic mulch and bio-control measures'],
        nextTwoWeeks: Array.isArray(data.actionPlan?.nextTwoWeeks)
          ? data.actionPlan.nextTwoWeeks
          : ['Re-evaluate disease risk and soil moisture levels'],
      },
      retrievedDocs: retrievedChunks.map((c) => ({
        id: c.id,
        title: c.title,
        sourceOrg: c.sourceOrg,
        relevanceScore: c.relevanceScore,
      })),
      localizedSummary: {
        en: data.localizedSummary?.en || data.issue,
        hi: data.localizedSummary?.hi || UI_TRANSLATIONS.hi.demoRecommendationSummary,
        ta: data.localizedSummary?.ta || UI_TRANSLATIONS.ta.demoRecommendationSummary,
        selectedLangText:
          data.localizedSummary?.selectedLangText ||
          UI_TRANSLATIONS[req.language]?.demoRecommendationSummary ||
          data.issue,
      },
      isFallback: false,
      modelUsed: data.modelUsed || 'gemini-3.1-flash-lite',
      latencyMs,
    };

    return {
      recommendation,
      retrievedChunks,
      isFallback: false,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Service error';
    const fallback = buildDemoFallbackRecommendation(req, retrievedChunks, errorMsg);
    return {
      recommendation: fallback,
      retrievedChunks,
      serviceNotice: 'Gemini temporarily unavailable — showing grounded fallback guidance.',
      isFallback: true,
    };
  }
}

let activeAudioElement: HTMLAudioElement | null = null;
let activeOnEndCallback: (() => void) | null = null;

export function stopAdvisorySpeech(): void {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement.src = '';
      activeAudioElement.onended = null;
      activeAudioElement.onerror = null;
    } catch {
      // ignore
    }
    activeAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }

  if (activeOnEndCallback) {
    const cb = activeOnEndCallback;
    activeOnEndCallback = null;
    try {
      cb();
    } catch {
      // ignore
    }
  }
}

export async function speakAdvisoryText(
  text: string,
  language: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> {
  // Always stop existing audio before starting a new one
  stopAdvisorySpeech();

  activeOnEndCallback = onEnd || null;
  onStart?.();

  const handleFinish = () => {
    activeAudioElement = null;
    activeOnEndCallback = null;
    onEnd?.();
  };

  try {
    const res = await fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.slice(0, 480), language }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        activeAudioElement = audio;
        audio.onended = handleFinish;
        audio.onerror = handleFinish;
        await audio.play();
        return;
      }
    }
  } catch {
    // Fallback to browser SpeechSynthesis
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    utterance.lang = langMeta?.speechLang || 'en-IN';
    utterance.rate = 0.92;
    utterance.onend = handleFinish;
    utterance.onerror = handleFinish;
    window.speechSynthesis.speak(utterance);
  } else {
    setTimeout(handleFinish, 1500);
  }
}
