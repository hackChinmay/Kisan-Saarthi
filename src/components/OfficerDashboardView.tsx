import React, { useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Info,
  MapPin,
  MessageSquare,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { CropType, FarmerFeedback, FarmerProfile, SupportedLanguage } from '../types/agri';
import { SOIL_OFFICER_TRANSLATIONS } from '../data/soilOfficerTranslations';

interface OfficerDashboardViewProps {
  currentFarmer: FarmerProfile;
  feedbackList: FarmerFeedback[];
  language: SupportedLanguage;
}

interface DistrictBlockTelemetry {
  blockName: string;
  farmersRegistered: number;
  dominantCrop: CropType;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  activeDiseaseAlert: string;
  weatherAlert: string;
  avgRegenAdoption: number;
  healthyPct: number;
  atRiskPct: number;
  x: number;
  y: number;
}

const VELLORE_BLOCKS: DistrictBlockTelemetry[] = [
  {
    blockName: 'Katpadi',
    farmersRegistered: 1420,
    dominantCrop: 'Tomato',
    riskLevel: 'MEDIUM',
    activeDiseaseAlert: 'Early Blight (Alternaria) — 18 plots',
    weatherAlert: '76% Rain Probability (Hold Irrigation)',
    avgRegenAdoption: 68,
    healthyPct: 74,
    atRiskPct: 26,
    x: 240,
    y: 110,
  },
  {
    blockName: 'Gudiyatham',
    farmersRegistered: 1890,
    dominantCrop: 'Tomato',
    riskLevel: 'HIGH',
    activeDiseaseAlert: 'Early Blight & Leaf Curl — 34 plots',
    weatherAlert: '84% Humidity + Afternoon Showers',
    avgRegenAdoption: 54,
    healthyPct: 62,
    atRiskPct: 38,
    x: 135,
    y: 135,
  },
  {
    blockName: 'Anaicut',
    farmersRegistered: 1150,
    dominantCrop: 'Rice',
    riskLevel: 'MEDIUM',
    activeDiseaseAlert: 'Paddy Leaf Blast — 11 plots',
    weatherAlert: 'High Night Humidity (82%)',
    avgRegenAdoption: 61,
    healthyPct: 79,
    atRiskPct: 21,
    x: 195,
    y: 195,
  },
  {
    blockName: 'Kaniyambadi',
    farmersRegistered: 980,
    dominantCrop: 'Banana',
    riskLevel: 'LOW',
    activeDiseaseAlert: 'Minor Sigatoka Leaf Spot — 4 plots',
    weatherAlert: 'Moderate Breeze (14 km/h)',
    avgRegenAdoption: 73,
    healthyPct: 88,
    atRiskPct: 12,
    x: 285,
    y: 200,
  },
  {
    blockName: 'Pernambut',
    farmersRegistered: 1310,
    dominantCrop: 'Groundnut',
    riskLevel: 'MEDIUM',
    activeDiseaseAlert: 'Tikka Leaf Spot Watch — 9 plots',
    weatherAlert: 'Moist Subsoil · Avoid Foliar Wash',
    avgRegenAdoption: 64,
    healthyPct: 81,
    atRiskPct: 19,
    x: 75,
    y: 185,
  },
  {
    blockName: 'Walajapet / Arcot',
    farmersRegistered: 1640,
    dominantCrop: 'Sugarcane',
    riskLevel: 'LOW',
    activeDiseaseAlert: 'Routine Shoot Borer Monitoring',
    weatherAlert: 'Favorable Soil Moisture',
    avgRegenAdoption: 71,
    healthyPct: 86,
    atRiskPct: 14,
    x: 355,
    y: 145,
  },
];

export const OfficerDashboardView: React.FC<OfficerDashboardViewProps> = ({
  currentFarmer,
  feedbackList,
  language,
}) => {
  const t = SOIL_OFFICER_TRANSLATIONS[language] || SOIL_OFFICER_TRANSLATIONS.en;
  const [selectedBlock, setSelectedBlock] = useState<DistrictBlockTelemetry>(VELLORE_BLOCKS[0]);
  const [cropFilter, setCropFilter] = useState<string>('ALL');

  const filteredBlocks =
    cropFilter === 'ALL'
      ? VELLORE_BLOCKS
      : VELLORE_BLOCKS.filter((b) => b.dominantCrop === cropFilter);

  const totalFarmers = VELLORE_BLOCKS.reduce((acc, b) => acc + b.farmersRegistered, 0);

  return (
    <div className="space-y-7">
      {/* 1. TOP BANNER */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <span>👨‍🌾 {t.officerTitle}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-bold">
                DISTRICT MONITORING
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              Agricultural Intelligence Console
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {t.officerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600">Filter Crop:</label>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="p-2 text-xs bg-stone-50 border border-stone-300 rounded-xl font-medium"
            >
              <option value="ALL">All Crops</option>
              <option value="Tomato">🍅 Tomato</option>
              <option value="Rice">🌾 Rice</option>
              <option value="Groundnut">🥜 Groundnut</option>
              <option value="Banana">🍌 Banana</option>
              <option value="Sugarcane">🎋 Sugarcane</option>
            </select>
          </div>
        </div>

        {/* 4 Telemetry Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
            <span className="text-2xs font-bold uppercase text-stone-600 block">
              {t.farmersMonitored}
            </span>
            <div className="text-2xl font-bold text-stone-900 mt-1 font-mono-tabular">
              {totalFarmers.toLocaleString()}
            </div>
            <span className="text-2xs text-emerald-800 font-semibold mt-0.5 block">
              6 Blocks Monitored
            </span>
          </div>

          <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl">
            <span className="text-2xs font-bold uppercase text-red-800 block">
              {t.highRiskPlots}
            </span>
            <div className="text-2xl font-bold text-red-950 mt-1 font-mono-tabular">
              34 <span className="text-xs font-normal">Plots</span>
            </div>
            <span className="text-2xs text-red-800 mt-0.5 block">
              Gudiyatham Focus
            </span>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
            <span className="text-2xs font-bold uppercase text-amber-800 block">
              {t.diseaseAlerts}
            </span>
            <div className="text-2xl font-bold text-amber-950 mt-1 font-mono-tabular">
              3 Active
            </div>
            <span className="text-2xs text-amber-800 mt-0.5 block">
              Alternaria &amp; Blast
            </span>
          </div>

          <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl">
            <span className="text-2xs font-bold uppercase text-sky-800 block">
              {t.weatherAlerts}
            </span>
            <div className="text-2xl font-bold text-sky-950 mt-1 font-mono-tabular">
              76% Rain
            </div>
            <span className="text-2xs text-sky-800 mt-0.5 block">
              Irrigation Hold Active
            </span>
          </div>
        </div>
      </section>

      {/* 2. DISTRICT BLOCK BREAKDOWN TABLE & RISK MAP */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs space-y-5">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-lg md:text-xl font-bold text-stone-900">
            {t.blockHeading}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.blockSubtitle}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-700 font-bold uppercase tracking-wider text-2xs">
                <th className="p-3">{t.blockCol}</th>
                <th className="p-3">{t.farmersCol}</th>
                <th className="p-3">{t.cropCol}</th>
                <th className="p-3">{t.riskCol}</th>
                <th className="p-3">{t.alertCol}</th>
                <th className="p-3">{t.regenCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredBlocks.map((b) => (
                <tr
                  key={b.blockName}
                  onClick={() => setSelectedBlock(b)}
                  className={`hover:bg-emerald-50/40 cursor-pointer transition-colors ${
                    selectedBlock.blockName === b.blockName ? 'bg-emerald-50/70 font-semibold' : ''
                  }`}
                >
                  <td className="p-3 font-bold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{b.blockName}</span>
                  </td>
                  <td className="p-3 font-mono-tabular">{b.farmersRegistered.toLocaleString()}</td>
                  <td className="p-3">{b.dominantCrop}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-2xs ${
                        b.riskLevel === 'HIGH'
                          ? 'bg-red-100 text-red-800'
                          : b.riskLevel === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {b.riskLevel}
                    </span>
                  </td>
                  <td className="p-3 text-stone-700 truncate max-w-[220px]">
                    {b.activeDiseaseAlert}
                  </td>
                  <td className="p-3 font-mono-tabular font-bold text-emerald-900">
                    {b.avgRegenAdoption}/100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Block Focus Card */}
        <div className="p-4 bg-emerald-950 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-2xs font-bold uppercase tracking-widest text-emerald-300">
              Selected Block Focus: {selectedBlock.blockName}
            </span>
            <p className="text-xs text-emerald-100 mt-1">
              Active Advisory: <strong>{selectedBlock.activeDiseaseAlert}</strong> · Weather: <strong>{selectedBlock.weatherAlert}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <span className="px-3 py-1 bg-emerald-800 text-emerald-200 rounded-lg">
              {selectedBlock.healthyPct}% Healthy
            </span>
            <span className="px-3 py-1 bg-red-900 text-red-200 rounded-lg">
              {selectedBlock.atRiskPct}% Under Watch
            </span>
          </div>
        </div>
      </section>

      {/* 3. FARMER FEEDBACK TELEMETRY LOGS */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-7 shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-800" />
            <h2 className="text-lg md:text-xl font-bold text-stone-900">
              {t.feedbackHeading}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.feedbackSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {feedbackList.map((fb) => (
            <div
              key={fb.id}
              className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-stone-900 font-bold">{fb.farmerName}</strong>
                  <span className="text-2xs text-stone-500">· {fb.district} · {fb.crop}</span>
                  <span className="text-2xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                    Helpful: {fb.rating}
                  </span>
                </div>
                <p className="text-stone-700">
                  <strong>Issue:</strong> {fb.issue}
                </p>
                <p className="text-emerald-900 font-medium">
                  <strong>Action Taken:</strong> &ldquo;{fb.comment}&rdquo;
                </p>
              </div>

              <span className="text-2xs text-stone-400 shrink-0 font-mono-tabular">
                {fb.timestamp}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
