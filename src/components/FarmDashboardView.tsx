import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CloudRain,
  Compass,
  Droplets,
  HelpCircle,
  Leaf,
  MapPin,
  Radio,
  RefreshCw,
  ShieldAlert,
  Sprout,
  Thermometer,
  Volume2,
  Wind,
} from 'lucide-react';
import {
  AIRecommendationResponse,
  FarmAlert,
  FarmerProfile,
  PrototypeRiskBreakdown,
  SoilData,
  SupportedLanguage,
  WeatherData,
} from '../types/agri';
import { UI_TRANSLATIONS } from '../data/translations';

interface FarmDashboardViewProps {
  profile: FarmerProfile;
  weather: WeatherData;
  soil: SoilData;
  riskBreakdown: PrototypeRiskBreakdown;
  recommendation: AIRecommendationResponse;
  language: SupportedLanguage;
  preferLiveWeather: boolean;
  onToggleWeatherMode: (preferLive: boolean) => void;
  onNavigateToAssistant: (initialPrompt?: string) => void;
  onNavigateToSoil: () => void;
  onSpeakTodayAction: () => void;
}

export const FarmDashboardView: React.FC<FarmDashboardViewProps> = ({
  profile,
  weather,
  soil,
  riskBreakdown,
  recommendation,
  language,
  preferLiveWeather,
  onToggleWeatherMode,
  onNavigateToAssistant,
  onNavigateToSoil,
  onSpeakTodayAction,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const sowingDateObj = new Date(profile.sowingDate);
  const nowObj = new Date('2026-09-30');
  const daysAfterSowing = Math.max(
    12,
    Math.round((nowObj.getTime() - sowingDateObj.getTime()) / (1000 * 60 * 60 * 24))
  );

  const cropStage =
    daysAfterSowing < 25
      ? `Seedling / Early Establishment (Day ${daysAfterSowing})`
      : daysAfterSowing < 55
      ? `Vegetative & Early Flowering (Day ${daysAfterSowing})`
      : `Fruiting / Boll & Pod Fill (Day ${daysAfterSowing})`;

  const alerts: FarmAlert[] = [
    {
      id: 'ALT-1',
      severity: weather.rainProbability >= 60 ? 'HIGH' : 'INFO',
      category: 'Weather',
      title:
        weather.rainProbability >= 60
          ? `Rain likely tomorrow (${weather.rainProbability}%) in ${profile.district}`
          : `Moderate weather window (${weather.temperature}°C) in ${profile.district}`,
      reason: `${weather.condition}. Relative humidity is at ${weather.humidity}%.`,
      recommendedAction:
        weather.rainProbability >= 60
          ? `Delay ${profile.irrigationType.toLowerCase()} irrigation for 24 hours and inspect field drainage.`
          : 'Maintain regular morning drip irrigation schedule.',
    },
    {
      id: 'ALT-2',
      severity: riskBreakdown.diseaseRisk === 'HIGH' ? 'HIGH' : 'MEDIUM',
      category: 'Disease',
      title: `Moderate ${profile.crop} foliar disease risk (${riskBreakdown.diseaseRisk})`,
      reason: `82% canopy humidity + warm temperature (${weather.temperature}°C) favor fungal leaf spot spore spread.`,
      recommendedAction:
        'Inspect bottom leaves for brown concentric spots; prune infected foliage touching the soil.',
    },
    {
      id: 'ALT-3',
      severity: soil.moisture < 45 ? 'MEDIUM' : 'INFO',
      category: 'Soil & Water',
      title: `Root-zone soil moisture at ${soil.moisture}% (${soil.soilType})`,
      reason: `Soil pH is ${soil.ph} and Organic Carbon is ${soil.organicCarbon}%.`,
      recommendedAction:
        soil.moisture >= 55 && weather.rainProbability >= 60
          ? 'Root zone has sufficient moisture; skip irrigation cycle today.'
          : 'Monitor root-zone moisture at 15 cm depth before next irrigation.',
    },
    {
      id: 'ALT-4',
      severity: 'REGENERATIVE',
      category: 'Regenerative',
      title: 'Regenerative Mulching & Moisture Retention',
      reason:
        'Unmulched soil between beds increases rain-splash of fungal pathogens and water evaporation.',
      recommendedAction:
        'Apply 5 cm dried organic paddy-straw mulch around plants to conserve 30% soil moisture.',
    },
  ];

  return (
    <div className="space-y-7">
      {/* 1. DOMINANT TODAY'S ACTION BANNER */}
      <section className="bg-[#14532D] text-white rounded-2xl p-6 md:p-7 border border-[#166534] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-300 font-semibold">
              <span className="uppercase tracking-widest">🌱 TODAY&apos;S RECOMMENDATION</span>
              <span>·</span>
              <span>
                {profile.name} ({profile.farmSize} Acres · {profile.crop})
              </span>
              <span>·</span>
              <span>
                📍 {profile.village}, {profile.district}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {language !== 'en'
                ? t.todaysRecommendationBody
                : `Delay ${profile.irrigationType.toLowerCase()} irrigation for 24 hours because rainfall probability is ${weather.rainProbability}% in ${profile.district}, and inspect lower ${profile.crop.toLowerCase()} leaves for early blight spots.`}
            </h1>

            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              <strong>Why now:</strong> {weather.farmingImplication}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onSpeakTodayAction}
              className="px-4 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2 whitespace-nowrap shadow-2xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen ({language.toUpperCase()})</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToAssistant()}
              className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-800 border border-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap shadow-2xs"
            >
              <span>{t.decisionHeading}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN 12-COL GRID: Weather (7 cols) + Crop Health & Risk (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* WEATHER INTELLIGENCE MODULE (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-sky-700" />
                <h2 className="text-base font-bold text-stone-900">
                  Weather Intelligence &amp; 7-Day Outlook
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{weather.providerLabel}</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold self-start sm:self-auto shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>Live Agro-Met Telemetry</span>
              <button
                type="button"
                onClick={() => onToggleWeatherMode(true)}
                title="Refresh Live Weather Data"
                className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-colors inline-flex items-center justify-center"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Weather Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-sky-50/70 border border-sky-200/80 rounded-xl">
              <span className="text-2xs font-bold uppercase text-sky-800 block">Temperature</span>
              <div className="text-2xl font-bold text-sky-950 mt-1 font-mono-tabular">
                {weather.temperature}°C
              </div>
              <span className="text-2xs text-sky-800 mt-0.5 block">{weather.condition}</span>
            </div>

            <div className="p-3.5 bg-sky-50/70 border border-sky-200/80 rounded-xl">
              <span className="text-2xs font-bold uppercase text-sky-800 block">Rain Probability</span>
              <div className="text-2xl font-bold text-sky-950 mt-1 font-mono-tabular">
                {weather.rainProbability}%
              </div>
              <span className="text-2xs text-sky-800 mt-0.5 block">Next 24 Hours</span>
            </div>

            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
              <span className="text-2xs font-bold uppercase text-stone-600 block">Humidity</span>
              <div className="text-2xl font-bold text-stone-900 mt-1 font-mono-tabular">
                {weather.humidity}%
              </div>
              <span className="text-2xs text-stone-500 mt-0.5 block">Relative Canopy</span>
            </div>

            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
              <span className="text-2xs font-bold uppercase text-stone-600 block">Wind Speed</span>
              <div className="text-2xl font-bold text-stone-900 mt-1 font-mono-tabular">
                {weather.windSpeed} <span className="text-xs font-normal">km/h</span>
              </div>
              <span className="text-2xs text-stone-500 mt-0.5 block">Light Breeze</span>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
              📅 7-Day Agricultural Forecast
            </h3>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {weather.forecast7Day.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border text-xs ${
                    idx === 0
                      ? 'bg-sky-100/70 border-sky-300 font-bold text-sky-950'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <span className="text-2xs font-bold block">{day.dayLabel}</span>
                  <span className="text-sm font-bold block my-1 font-mono-tabular">{day.tempMax}°</span>
                  <span className="text-2xs text-sky-800 block font-semibold">{day.rainProb}% rain</span>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Impact Box */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
            <strong className="text-emerald-950 block font-bold">🌾 FARMING IMPACT:</strong>
            <p className="text-emerald-900 leading-relaxed">{weather.farmingImplication}</p>
          </div>
        </div>

        {/* CROP STATUS & PROTOTYPE RISK BREAKDOWN (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 space-y-5 shadow-xs">
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-800" />
              <h2 className="text-base font-bold text-stone-900">
                Crop Health &amp; Prototype Risk
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {profile.crop} ({profile.variety}) · {cropStage}
            </p>
          </div>

          {/* Risk Factors */}
          <div className="space-y-3">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-950 block">Disease Risk: Alternaria Blight</span>
                <span className="text-2xs text-amber-800">Warm temperatures + high leaf humidity</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-extrabold bg-amber-200 text-amber-950 rounded-lg">
                MEDIUM
              </span>
            </div>

            <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-950 block">Weather Risk: Rain Influx</span>
                <span className="text-2xs text-sky-800">Rainfall forecast requires delaying irrigation</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-extrabold bg-sky-200 text-sky-950 rounded-lg">
                {weather.rainProbability >= 60 ? 'HIGH' : 'LOW'}
              </span>
            </div>

            <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal-950 block">Soil Moisture Stress: None</span>
                <span className="text-2xs text-teal-800">Root-zone moisture is healthy at {soil.moisture}%</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-extrabold bg-teal-200 text-teal-950 rounded-lg">
                SAFE
              </span>
            </div>
          </div>

          {/* Soil Quick Link */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
            <div>
              <strong className="text-stone-900 block font-bold">Soil Intelligence</strong>
              <span className="text-2xs text-stone-500">{soil.soilType} · pH {soil.ph} · Organic Carbon {soil.organicCarbon}%</span>
            </div>
            <button
              type="button"
              onClick={onNavigateToSoil}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>View Soil Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. ALERT CENTER */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          <h2 className="text-base font-bold text-stone-900">
            Active Farm Advisory &amp; Alert Center
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded-xl border space-y-2 ${
                alt.severity === 'HIGH'
                  ? 'bg-red-50/80 border-red-200 text-red-950'
                  : alt.severity === 'MEDIUM'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : alt.severity === 'REGENERATIVE'
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-sky-50/80 border-sky-200 text-sky-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80">
                  {alt.category} Alert
                </span>
                <span className="text-xs font-bold">{alt.severity}</span>
              </div>
              <h3 className="text-sm font-bold">{alt.title}</h3>
              <p className="text-xs opacity-90 leading-relaxed">{alt.recommendedAction}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
