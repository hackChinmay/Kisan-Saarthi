export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn';

export type CropType =
  | 'Tomato'
  | 'Rice'
  | 'Wheat'
  | 'Cotton'
  | 'Sugarcane'
  | 'Groundnut'
  | 'Banana';

export type SoilType =
  | 'Loamy'
  | 'Red Lateritic'
  | 'Black Cotton (Vertisol)'
  | 'Alluvial'
  | 'Sandy Loam'
  | 'Clay Loam';

export type IrrigationType = 'Drip' | 'Sprinkler' | 'Flood / Furrow' | 'Rainfed';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface FarmerProfile {
  id: string;
  uid?: string;
  name: string;
  phoneNumber?: string;
  preferredLanguage?: SupportedLanguage;
  state: string;
  district: string;
  village: string;
  farmSize: number; // in acres
  crop: CropType;
  variety: string;
  sowingDate: string;
  soilType: SoilType;
  irrigationType: IrrigationType;
  language: SupportedLanguage;
  farmerIdMasked?: string;
  createdAt?: string;
  updatedAt?: string;
  coordinates?: {
    lat: number;
    lng: number;
    source: 'browser-gps' | 'district-centroid';
  };
}

export interface FarmerAuthUser {
  uid: string;
  phoneNumber: string | null;
  displayName?: string | null;
}

export interface SoilData {
  soilType: SoilType;
  ph: number;
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  organicCarbon: number; // %
  moisture: number; // %
  isSampleProfile: boolean;
}

export interface DailyForecast {
  date: string;
  dayLabel: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  rainfallMm: number;
  humidity: number;
  condition: string;
}

export interface WeatherData {
  source: 'LIVE' | 'DEMO';
  providerLabel: string;
  lastUpdated: string;
  temperature: number;
  rainProbability: number;
  humidity: number;
  windSpeed: number; // km/h
  condition: string;
  farmingImplication: string;
  forecast7Day: DailyForecast[];
}

export interface KnowledgeDocument {
  id: string;
  crop: CropType | 'All';
  category: 'Disease Management' | 'Soil & Nutrient' | 'Irrigation & Weather' | 'Regenerative Practice';
  title: string;
  sourceOrg: string;
  regionApplicability: string;
  symptomsOrTriggers: string[];
  advisoryContent: string;
  regenerativePractice: string;
  preventiveMeasures: string[];
}

export interface RetrievedChunk extends KnowledgeDocument {
  relevanceScore: number;
  matchedTerms: string[];
}

export interface RiskFactorBreakdown {
  label: string;
  delta: number;
  reason: string;
}

export interface PrototypeRiskBreakdown {
  weatherRisk: RiskLevel;
  diseaseRisk: RiskLevel;
  waterStressRisk: RiskLevel;
  soilRisk: RiskLevel;
  overallRisk: RiskLevel;
  numericScore: number;
  factors: RiskFactorBreakdown[];
}

export interface AIRecommendationResponse {
  id: string;
  farmerId: string;
  timestamp: string;
  cropDetected?: string;
  issue: string;
  confidence: number;
  riskLevel: RiskLevel;
  observations: string[];
  why: string[];
  immediateActions: string[];
  preventiveActions: string[];
  irrigationGuidance?: string;
  weatherConsideration: string;
  regenerativeRecommendation: string;
  followUp: string[];
  sources: string[];
  actionPlan: {
    today: string[];
    thisWeek: string[];
    nextTwoWeeks: string[];
  };
  retrievedDocs?: {
    id: string;
    title: string;
    sourceOrg: string;
    relevanceScore: number;
  }[];
  localizedSummary?: {
    en: string;
    hi: string;
    ta: string;
    selectedLangText: string;
  };
  isFallback: boolean;
  modelUsed: string;
  latencyMs?: number;
}

export interface FarmerFeedback {
  id: string;
  recommendationId: string;
  farmerName: string;
  district: string;
  crop: CropType;
  issue: string;
  rating: 'Yes' | 'Partially' | 'No';
  comment: string;
  outcome: string;
  timestamp: string;
}

export interface FarmAlert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'INFO' | 'REGENERATIVE';
  title: string;
  reason: string;
  recommendedAction: string;
  category: 'Weather' | 'Disease' | 'Soil & Water' | 'Regenerative';
}

export interface GeminiDiagnostics {
  connected: boolean;
  model: string;
  backend: string;
  rag: string;
  fallback: string;
  message: string;
}
