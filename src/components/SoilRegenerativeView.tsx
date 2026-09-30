import React, { useState } from 'react';
import {
  CheckCircle2,
  Droplets,
  FlaskConical,
  HelpCircle,
  Info,
  Leaf,
  RefreshCw,
  Sliders,
  Sparkles,
  Sprout,
} from 'lucide-react';
import { SupportedLanguage, FarmerProfile, SoilData, SoilType } from '../types/agri';
import { SOIL_OFFICER_TRANSLATIONS } from '../data/soilOfficerTranslations';

interface SoilRegenerativeViewProps {
  profile: FarmerProfile;
  soil: SoilData;
  language: SupportedLanguage;
  onUpdateSoil: (nextSoil: SoilData) => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

const SOIL_TYPES: SoilType[] = [
  'Loamy',
  'Red Lateritic',
  'Black Cotton (Vertisol)',
  'Alluvial',
  'Sandy Loam',
  'Clay Loam',
];

interface RegenerativePracticeToggle {
  id: string;
  title: string;
  icon: string;
  pillar: 'Water Efficiency' | 'Soil Health' | 'Crop Diversity' | 'Organic Matter';
  impactDescription: string;
  scoreBoost: number;
  enabled: boolean;
}

export const SoilRegenerativeView: React.FC<SoilRegenerativeViewProps> = ({
  profile,
  soil,
  language,
  onUpdateSoil,
  onNavigateToAssistantWithPrompt,
}) => {
  const t = SOIL_OFFICER_TRANSLATIONS[language] || SOIL_OFFICER_TRANSLATIONS.en;

  const [practices, setPractices] = useState<RegenerativePracticeToggle[]>([
    {
      id: 'mulch',
      icon: '🌱',
      title: 'Organic Surface Mulching (5 cm Paddy Straw / Crop Residue)',
      pillar: 'Organic Matter',
      impactDescription:
        'Reduces topsoil evaporation by ~25–30%, suppresses weeds without herbicides, and blocks soil-borne fungal splash onto lower leaves.',
      scoreBoost: 12,
      enabled: true,
    },
    {
      id: 'intercrop',
      icon: '🌾',
      title: 'Trap & Legume Intercropping (Marigold 1:10 + Cowpea Bunds)',
      pillar: 'Crop Diversity',
      impactDescription:
        'Attracts Helicoverpa fruit borers away from primary crop, fixes atmospheric nitrogen, and hosts beneficial predator insects.',
      scoreBoost: 14,
      enabled: true,
    },
    {
      id: 'bioinput',
      icon: '♻️',
      title: 'Bio-Enriched FYM & Vermicompost (Trichoderma + PSB)',
      pillar: 'Soil Health',
      impactDescription:
        'Improves rhizosphere microbial diversity, solubilizes locked soil phosphorus, and builds drought resilience.',
      scoreBoost: 10,
      enabled: true,
    },
    {
      id: 'drip',
      icon: '💧',
      title: 'Micro-Irrigation Precision Scheduling (Drip / Sensor)',
      pillar: 'Water Efficiency',
      impactDescription:
        'Saves 40–50% water compared to flood irrigation and avoids leaf wetness that triggers fungal diseases.',
      scoreBoost: 11,
      enabled: true,
    },
  ]);

  const togglePractice = (id: string) => {
    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const loadSampleLoamyProfile = () => {
    onUpdateSoil({
      soilType: 'Loamy',
      ph: 6.5,
      nitrogen: 245,
      phosphorus: 21,
      potassium: 215,
      organicCarbon: 0.62,
      moisture: 64,
      isSampleProfile: true,
    });
  };

  const loadDegradedRedSoilProfile = () => {
    onUpdateSoil({
      soilType: 'Red Lateritic',
      ph: 5.4,
      nitrogen: 155,
      phosphorus: 11,
      potassium: 130,
      organicCarbon: 0.36,
      moisture: 41,
      isSampleProfile: true,
    });
  };

  const waterEfficiencyScore = Math.min(
    96,
    (profile.irrigationType === 'Drip'
      ? 68
      : profile.irrigationType === 'Sprinkler'
      ? 58
      : 42) +
      (practices.find((p) => p.id === 'drip')?.enabled ? 10 : 0) +
      (practices.find((p) => p.id === 'mulch')?.enabled ? 8 : 0)
  );

  const soilHealthScore = Math.min(
    95,
    Math.round(
      (soil.organicCarbon >= 0.6 ? 52 : soil.organicCarbon >= 0.45 ? 38 : 26) +
        (soil.ph >= 6.0 && soil.ph <= 7.3 ? 13 : 5) +
        (practices.find((p) => p.id === 'bioinput')?.enabled ? 10 : 0)
    )
  );

  const cropDiversityScore = Math.min(
    95,
    46 + (practices.find((p) => p.id === 'intercrop')?.enabled ? 19 : 0)
  );

  const organicMatterScore = Math.min(
    95,
    Math.round(
      48 +
        (practices.find((p) => p.id === 'mulch')?.enabled ? 14 : 0) +
        (practices.find((p) => p.id === 'bioinput')?.enabled ? 8 : 0)
    )
  );

  const overallRegenScore = Math.round(
    (waterEfficiencyScore + soilHealthScore + cropDiversityScore + organicMatterScore) / 4
  );

  const getNutrientStatus = (val: number, low: number, high: number) => {
    if (val < low) return { label: 'Deficient (Low)', tone: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val > high) return { label: 'Excess (High)', tone: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Optimal Range', tone: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
  };

  const nStatus = getNutrientStatus(soil.nitrogen, 200, 320);
  const pStatus = getNutrientStatus(soil.phosphorus, 16, 35);
  const kStatus = getNutrientStatus(soil.potassium, 170, 300);
  const socStatus = getNutrientStatus(soil.organicCarbon, 0.55, 1.2);
  const phStatus = getNutrientStatus(soil.ph, 6.0, 7.5);

  return (
    <div className="space-y-7">
      {/* 1. HEADER WITH DISCLAIMER BADGE */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <span>♻️ {t.soilTitle}</span>
              <span>·</span>
              <span>NMSA &amp; ICAR Calibrated</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              Soil Intelligence &amp; Regenerative Farming
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {t.soilSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadSampleLoamyProfile}
              className="px-3 py-2 text-xs font-bold text-emerald-950 bg-emerald-50 border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              🌱 Loamy (Optimal)
            </button>
            <button
              type="button"
              onClick={loadDegradedRedSoilProfile}
              className="px-3 py-2 text-xs font-bold text-stone-700 bg-stone-100 border border-stone-300 rounded-xl hover:bg-stone-200 transition-colors"
            >
              ⚠️ Red Soil (Degraded)
            </button>
          </div>
        </div>

        {/* Prototype Heuristic Disclaimer */}
        <div className="p-3.5 mt-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>PROTOTYPE HEURISTIC SCORES:</strong> These metrics represent simulated agronomic heuristics for decision-support, not clinical laboratory assays.
          </span>
        </div>
      </section>

      {/* 2. 4-PILLAR REGENERATIVE SCORE CARDS */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              {t.regenScoreHeading}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {t.regenScoreSubtitle}
            </p>
          </div>

          {/* Overall Score Badge */}
          <div className="px-5 py-3 bg-[#14532D] text-white rounded-2xl text-center shrink-0 shadow-xs">
            <span className="text-2xs font-bold uppercase tracking-widest text-emerald-300 block">Overall Score</span>
            <div className="text-3xl font-extrabold font-mono-tabular">
              {overallRegenScore}<span className="text-sm font-normal text-emerald-200">/100</span>
            </div>
          </div>
        </div>

        {/* The 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1: Water Efficiency */}
          <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">
                💧 {t.waterEfficiency}
              </span>
              <span className="text-base font-extrabold text-sky-950 font-mono-tabular">
                {waterEfficiencyScore}%
              </span>
            </div>
            <div className="w-full bg-sky-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-sky-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${waterEfficiencyScore}%` }}
              ></div>
            </div>
            <p className="text-2xs text-sky-800">
              Drip scheduling &amp; evaporation suppression
            </p>
          </div>

          {/* Pillar 2: Soil Health */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                🌱 {t.soilHealth}
              </span>
              <span className="text-base font-extrabold text-emerald-950 font-mono-tabular">
                {soilHealthScore}%
              </span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-700 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${soilHealthScore}%` }}
              ></div>
            </div>
            <p className="text-2xs text-emerald-800">
              Microbial biomass &amp; balanced pH ({soil.ph})
            </p>
          </div>

          {/* Pillar 3: Crop Diversity */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                🌾 {t.cropDiversity}
              </span>
              <span className="text-base font-extrabold text-amber-950 font-mono-tabular">
                {cropDiversityScore}%
              </span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${cropDiversityScore}%` }}
              ></div>
            </div>
            <p className="text-2xs text-amber-800">
              Trap-crop &amp; legume nitrogen fixing
            </p>
          </div>

          {/* Pillar 4: Organic Matter */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                ♻️ {t.organicMatter}
              </span>
              <span className="text-base font-extrabold text-teal-950 font-mono-tabular">
                {organicMatterScore}%
              </span>
            </div>
            <div className="w-full bg-teal-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${organicMatterScore}%` }}
              ></div>
            </div>
            <p className="text-2xs text-teal-800">
              Soil Organic Carbon: {soil.organicCarbon}%
            </p>
          </div>
        </div>

        {/* Formula */}
        <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 font-mono">
          <strong>{t.formulaHeading}:</strong> {t.formulaDesc}
        </div>
      </section>

      {/* 3. RECOMMENDED REGENERATIVE PRACTICES WITH TOGGLES */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-lg md:text-xl font-bold text-stone-900">
            {t.practicesHeading}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.practicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practices.map((prac) => (
            <div
              key={prac.id}
              onClick={() => togglePractice(prac.id)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                prac.enabled
                  ? 'border-emerald-700 bg-emerald-50/60 shadow-xs'
                  : 'border-stone-200 bg-stone-50 opacity-70'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{prac.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                      {prac.pillar}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-2xs font-bold rounded-lg ${
                      prac.enabled
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {prac.enabled ? '✓ Active (+12 pts)' : 'Disabled'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900">{prac.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{prac.impactDescription}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-2xs font-semibold text-emerald-900">
                <span>Tap card to toggle practice</span>
                <span>Impact: +{prac.scoreBoost} score</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOIL HEALTH CARD PARAMETERS */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-stone-900">
              {t.soilSummaryHeading}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Laboratory &amp; field calibrated soil telemetry
            </p>
          </div>
          <span className="px-3 py-1 text-2xs font-bold bg-stone-100 text-stone-700 rounded-lg border border-stone-300 self-start">
            Texture: {soil.soilType}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
            <span className="text-2xs text-stone-500 block uppercase font-bold">Nitrogen (N)</span>
            <div className="text-xl font-bold text-stone-900 mt-1 font-mono-tabular">
              {soil.nitrogen} <span className="text-xs font-normal">kg/ha</span>
            </div>
            <span className={`text-2xs px-2 py-0.5 rounded mt-1.5 inline-block font-semibold border ${nStatus.tone}`}>
              {nStatus.label}
            </span>
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
            <span className="text-2xs text-stone-500 block uppercase font-bold">Phosphorus (P)</span>
            <div className="text-xl font-bold text-stone-900 mt-1 font-mono-tabular">
              {soil.phosphorus} <span className="text-xs font-normal">kg/ha</span>
            </div>
            <span className={`text-2xs px-2 py-0.5 rounded mt-1.5 inline-block font-semibold border ${pStatus.tone}`}>
              {pStatus.label}
            </span>
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
            <span className="text-2xs text-stone-500 block uppercase font-bold">Potassium (K)</span>
            <div className="text-xl font-bold text-stone-900 mt-1 font-mono-tabular">
              {soil.potassium} <span className="text-xs font-normal">kg/ha</span>
            </div>
            <span className={`text-2xs px-2 py-0.5 rounded mt-1.5 inline-block font-semibold border ${kStatus.tone}`}>
              {kStatus.label}
            </span>
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
            <span className="text-2xs text-stone-500 block uppercase font-bold">Organic Carbon (SOC)</span>
            <div className="text-xl font-bold text-stone-900 mt-1 font-mono-tabular">
              {soil.organicCarbon}%
            </div>
            <span className={`text-2xs px-2 py-0.5 rounded mt-1.5 inline-block font-semibold border ${socStatus.tone}`}>
              {socStatus.label}
            </span>
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
            <span className="text-2xs text-stone-500 block uppercase font-bold">Soil pH</span>
            <div className="text-xl font-bold text-stone-900 mt-1 font-mono-tabular">
              {soil.ph}
            </div>
            <span className={`text-2xs px-2 py-0.5 rounded mt-1.5 inline-block font-semibold border ${phStatus.tone}`}>
              {phStatus.label}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
