import {
  CropType,
  FarmerProfile,
  KnowledgeDocument,
  PrototypeRiskBreakdown,
  RetrievedChunk,
  RiskFactorBreakdown,
  RiskLevel,
  SoilData,
  WeatherData,
} from '../types/agri';

export const INDIAN_STATES_DISTRICTS: Record<
  string,
  {
    districts: {
      name: string;
      lat: number;
      lng: number;
      agroZone: string;
      defaultVillage: string;
    }[];
  }
> = {
  'Tamil Nadu': {
    districts: [
      { name: 'Vellore', lat: 12.9165, lng: 79.1325, agroZone: 'North Eastern Zone (TN-2)', defaultVillage: 'Katpadi' },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, agroZone: 'Western Zone (TN-3)', defaultVillage: 'Pollachi' },
      { name: 'Thanjavur', lat: 10.787, lng: 79.1378, agroZone: 'Cauvery Delta Zone (TN-4)', defaultVillage: 'Orathanadu' },
      { name: 'Madurai', lat: 9.9252, lng: 78.1198, agroZone: 'Southern Zone (TN-5)', defaultVillage: 'Melur' },
    ],
  },
  Maharashtra: {
    districts: [
      { name: 'Nashik', lat: 19.9975, lng: 73.7898, agroZone: 'Western Maharashtra Plain Zone', defaultVillage: 'Niphad' },
      { name: 'Pune', lat: 18.5204, lng: 73.8567, agroZone: 'Scarcity & Transition Zone', defaultVillage: 'Baramati' },
      { name: 'Nagpur', lat: 21.1458, lng: 79.0882, agroZone: 'Central Vidarbha Zone', defaultVillage: 'Kalmeshwar' },
    ],
  },
  'Uttar Pradesh': {
    districts: [
      { name: 'Varanasi', lat: 25.3176, lng: 82.9739, agroZone: 'Eastern Plain Zone (UP-7)', defaultVillage: 'Pindra' },
      { name: 'Karnal / Meerut', lat: 28.9845, lng: 77.7064, agroZone: 'Western Plain Zone (UP-3)', defaultVillage: 'Sardhana' },
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462, agroZone: 'Central Plain Zone (UP-5)', defaultVillage: 'Mohanlalganj' },
    ],
  },
  'Andhra Pradesh & Telangana': {
    districts: [
      { name: 'Guntur', lat: 16.3067, lng: 80.4365, agroZone: 'Krishna-Godavari Zone', defaultVillage: 'Tenali' },
      { name: 'Anantapur', lat: 14.6819, lng: 77.6006, agroZone: 'Scarce Rainfall Zone', defaultVillage: 'Dharmavaram' },
      { name: 'Warangal', lat: 17.9689, lng: 79.5941, agroZone: 'Central Telangana Zone', defaultVillage: 'Parkal' },
    ],
  },
  Karnataka: {
    districts: [
      { name: 'Kolar', lat: 13.1367, lng: 78.1292, agroZone: 'Eastern Dry Zone (KA-5)', defaultVillage: 'Malur' },
      { name: 'Mandya', lat: 12.5218, lng: 76.8951, agroZone: 'Southern Dry Zone (KA-6)', defaultVillage: 'Maddur' },
      { name: 'Dharwad', lat: 15.4589, lng: 75.0078, agroZone: 'Northern Transition Zone', defaultVillage: 'Navalgund' },
    ],
  },
  'West Bengal': {
    districts: [
      { name: 'Bardhaman', lat: 23.2324, lng: 87.8615, agroZone: 'Old Alluvial Zone', defaultVillage: 'Memari' },
      { name: 'Hooghly', lat: 22.9012, lng: 88.3899, agroZone: 'New Alluvial Gangetic Zone', defaultVillage: 'Singur' },
    ],
  },
  Punjab: {
    districts: [
      { name: 'Ludhiana', lat: 30.901, lng: 75.8573, agroZone: 'Central Plain Zone (PB-3)', defaultVillage: 'Samrala' },
      { name: 'Bathinda', lat: 30.211, lng: 74.9455, agroZone: 'South-Western Cotton Belt', defaultVillage: 'Talwandi Sabo' },
    ],
  },
};

export const CROP_VARIETIES: Record<CropType, string[]> = {
  Tomato: ['Arka Rakshak (F1 Triple Resistant)', 'PKM-1 (TNAU)', 'Pusa Ruby', 'Arka Samrat'],
  Rice: ['ADT-43 (Short Duration)', 'CO-51', 'Swarna (MTU 7029)', 'Pusa Basmati 1509'],
  Wheat: ['HD 2967', 'HD 3086 (Pusa Gautami)', 'DBW 187 (Karan Vandana)'],
  Cotton: ['Suraj (ICAR-CICR)', 'MCU-5', 'Bt Hybrid Bollgard-II'],
  Sugarcane: ['Co 86032 (Nayana)', 'Co 0238 (Karan 4)', 'CoC 24'],
  Groundnut: ['TMV-7', 'VRI-8 (Virudhachalam)', 'Kadiri-6 (K-6)', 'Girnar-4'],
  Banana: ['Grand Naine (G-9)', 'Poovan', 'Nendran', 'Red Banana (Sevvazhai)'],
};

export const AGRICULTURAL_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: 'ICAR-TOM-01',
    crop: 'Tomato',
    category: 'Disease Management',
    title: 'Early Blight (Alternaria solani) Management in Tomato under High Humidity',
    sourceOrg: 'ICAR-IIHR Bengaluru & TNAU Plant Pathology Bulletin',
    regionApplicability: 'Tamil Nadu, Karnataka, Andhra Pradesh, Maharashtra',
    symptomsOrTriggers: [
      'brown spots',
      'concentric rings',
      'target lesions',
      'yellowing around lesions',
      'lower leaves turning brown',
      'high humidity',
      'early blight',
      'leaf blight',
    ],
    advisoryContent:
      'Early blight (Alternaria solani) starts on older lower leaves as small dark-brown spots with concentric bullseye rings surrounded by a yellow chlorotic halo. Warm temperatures (24–29°C) coupled with relative humidity >75% or intermittent rain accelerate spore germination. Immediately prune and remove infected lower leaves touching the soil. Avoid overhead sprinkler irrigation that wets foliage; use drip irrigation in morning hours so canopy dries rapidly.',
    regenerativePractice:
      'Apply 5 cm organic paddy-straw or dried leaf mulch over beds to block soil-borne Alternaria spores from splashing onto lower leaves during rain. Use foliar bio-fungicide spray of Pseudomonas fluorescens (10g/L) or Trichoderma viride with neem cake soil amendment.',
    preventiveMeasures: [
      'Maintain 60cm x 45cm plant spacing and stake indeterminate/semi-determinate plants for canopy airflow.',
      'Practice 2-year non-solanaceous crop rotation with legumes (cowpea/green gram) or cereals.',
      'Remove and compost/destroy crop debris outside the field after harvest.',
    ],
  },
  {
    id: 'ICAR-TOM-02',
    crop: 'Tomato',
    category: 'Soil & Nutrient',
    title: 'Tomato Leaf Yellowing, Nitrogen-Potassium Balance & Blossom End Rot Prevention',
    sourceOrg: 'ICAR-Indian Institute of Horticultural Research (IIHR)',
    regionApplicability: 'All India',
    symptomsOrTriggers: [
      'yellow leaves',
      'leaves turning yellow',
      'chlorosis',
      'fertilizer',
      'nutrient deficiency',
      'blossom end rot',
      'flowering stage',
    ],
    advisoryContent:
      'Uniform yellowing of older bottom leaves often signals nitrogen mobilization or magnesium deficiency, whereas interveinal chlorosis with marginal scorching indicates potassium deficiency during fruit set. Irregular soil moisture blocks calcium uptake, causing blossom-end rot. Maintain consistent root-zone moisture at 60–70% field capacity via drip fertigation.',
    regenerativePractice:
      'Incorporate 10 tonnes/acre well-decomposed Farm Yard Manure (FYM) enriched with Azospirillum and Phosphobacteria (2 kg/acre) plus vermicompost top-dressing instead of heavy urea doses that attract sucking pests.',
    preventiveMeasures: [
      'Keep soil pH between 6.0 and 7.0 for optimal micronutrient availability.',
      'Intercrop 1 row of tall African marigold for every 10–12 rows of tomato as a trap crop for fruit borer (Helicoverpa armigera) and root-knot nematodes.',
    ],
  },
  {
    id: 'ICAR-RICE-01',
    crop: 'Rice',
    category: 'Disease Management',
    title: 'Rice Leaf Blast (Magnaporthe oryzae) & Bacterial Leaf Blight Advisory',
    sourceOrg: 'ICAR-National Rice Research Institute (NRRI) & TNAU Cauvery Delta Advisory',
    regionApplicability: 'Tamil Nadu, West Bengal, Andhra Pradesh, Punjab, Odisha',
    symptomsOrTriggers: [
      'spindle spots',
      'diamond lesions',
      'blast',
      'brown spots on paddy',
      'leaf drying',
      'high humidity',
      'nitrogen excess',
    ],
    advisoryContent:
      'Rice blast presents as spindle- or diamond-shaped lesions with grayish-white centers and reddish-brown margins. High relative humidity (>85%), cloudy drizzly weather, and excessive top-dressing of urea trigger rapid spread. Withhold nitrogenous top-dressing immediately when blast lesions are noticed.',
    regenerativePractice:
      'Adopt System of Rice Intensification (SRI) or Alternate Wetting and Drying (AWD) using a perforated field water tube (pani pipe) to cut irrigation water by 25–30%, lower canopy micro-humidity, and strengthen root growth.',
    preventiveMeasures: [
      'Split nitrogen application into 3–4 small doses guided by a Leaf Color Chart (LCC) rather than blanket urea broadcasting.',
      'Use Pseudomonas fluorescens seed treatment (10g/kg seed) and bund planting of flowering cowpea to conserve natural predators (spiders, mirid bugs).',
    ],
  },
  {
    id: 'ICAR-WHEAT-01',
    crop: 'Wheat',
    category: 'Disease Management',
    title: 'Wheat Yellow/Stripe Rust & Terminal Heat Stress Management',
    sourceOrg: 'ICAR-Indian Institute of Wheat and Barley Research (IIWBR), Karnal',
    regionApplicability: 'Punjab, Uttar Pradesh, Haryana, Madhya Pradesh',
    symptomsOrTriggers: [
      'yellow powder',
      'stripe rust',
      'yellow stripes on leaves',
      'heat stress',
      'irrigation crown root',
    ],
    advisoryContent:
      'Yellow rust appears as parallel rows of yellowish-orange pustules on adult leaves under cool, humid conditions (10–18°C). Scout lower canopy in early morning. For terminal heat stress during grain filling, apply light irrigation during calm wind hours to buffer canopy temperature.',
    regenerativePractice:
      'Zero-till seeding with Happy Seeder into anchored rice residue retains 4–6 tonnes/acre of surface mulch, conserving 20% soil moisture, suppressing Phalaris minor weeds without burning stubble, and building soil organic carbon.',
    preventiveMeasures: [
      'Ensure timely irrigation at Crown Root Initiation (CRI stage, 21 days after sowing) and flowering stage.',
      'Integrate bio-priming of seeds with Trichoderma harzianum.',
    ],
  },
  {
    id: 'ICAR-COT-01',
    crop: 'Cotton',
    category: 'Disease Management',
    title: 'Cotton Pink Bollworm, Sucking Pests & Leaf Reddening (Lalya) Management',
    sourceOrg: 'ICAR-Central Institute for Cotton Research (CICR), Nagpur',
    regionApplicability: 'Maharashtra, Telangana, Gujarat, Punjab, Tamil Nadu',
    symptomsOrTriggers: [
      'red leaves',
      'bollworm',
      'whitefly',
      'rosette flower',
      'water stress',
      'black soil cracking',
    ],
    advisoryContent:
      'Physiological leaf reddening (Lalya) in cotton occurs due to sudden night temperature drops combined with magnesium/nitrogen depletion during boll development. Pink bollworm larvae enter developing bolls causing rosette flowers. Install pheromone traps (5/acre) for monitoring and remove rosetted blooms.',
    regenerativePractice:
      'Intercrop short-duration green gram or black gram (1:2 ratio) between cotton rows to fix atmospheric nitrogen, cover bare black soil against evaporation cracks, and host ladybird beetles and Chrysoperla predators.',
    preventiveMeasures: [
      'Install yellow sticky traps (15/acre) for whitefly/jassid monitoring and spray 5% Neem Seed Kernel Extract (NSKE) before crossing Economic Threshold Level (ETL).',
      'Terminate crop timely after final picking and shred stalks for composting to break pest carryover.',
    ],
  },
  {
    id: 'ICAR-SUG-01',
    crop: 'Sugarcane',
    category: 'Irrigation & Weather',
    title: 'Sugarcane Red Rot Prevention, Trash Mulching & Subsurface Drip Efficiency',
    sourceOrg: 'ICAR-Sugarcane Breeding Institute (SBI), Coimbatore',
    regionApplicability: 'Tamil Nadu, Uttar Pradesh, Maharashtra, Karnataka',
    symptomsOrTriggers: [
      'cane drying',
      'red rot',
      'water usage',
      'reduce water',
      'shoot borer',
      'yellowing crown',
    ],
    advisoryContent:
      'Sugarcane requires high water over a 10–12 month cycle, making flood irrigation unsustainable in groundwater-stressed blocks. Red rot (Colletotrichum falcatum) causes yellowing of 3rd/4th crown leaves and reddened internal pith with white transverse bands. Avoid waterlogging and never ratoon an infected plot.',
    regenerativePractice:
      'Detrash dry cane leaves at 150 days and lay a 10 cm thick trash mulch inside furrows instead of burning. Trash mulching cuts soil evaporation by 35%, suppresses early shoot borer, and adds 3.5 tonnes/acre organic biomass.',
    preventiveMeasures: [
      'Adopt paired-row trench planting with drip irrigation to save up to 40% water compared to conventional flood furrows.',
      'Release Trichogramma chilonis parasitoid cards (20,000/acre) against internode borer.',
    ],
  },
  {
    id: 'ICAR-GND-01',
    crop: 'Groundnut',
    category: 'Disease Management',
    title: 'Groundnut Tikka Leaf Spot (Early/Late) & Gypsum Pegging Nutrition',
    sourceOrg: 'ICAR-Directorate of Groundnut Research (DGR) & TNAU Vridhachalam',
    regionApplicability: 'Tamil Nadu, Andhra Pradesh, Gujarat, Karnataka',
    symptomsOrTriggers: [
      'brown spots',
      'black spots',
      'tikka disease',
      'leaf spot',
      'pod filling',
      'gypsum',
      'moisture stress',
    ],
    advisoryContent:
      'Tikka leaf spot (Cercospora arachidicola) causes dark brown circular lesions with yellow halos on upper leaf surfaces, leading to premature defoliation if humidity remains high during pegging (35–55 DAS). Ensure earthing up and gypsum application (160 kg/acre) at 40–45 DAS to provide soluble calcium and sulfur directly to developing pegs.',
    regenerativePractice:
      'Being a leguminous crop, inoculate groundnut seeds with Rhizobium bio-fertilizer + Phosphate Solubilizing Bacteria (PSB) to fix 40–60 kg N/ha naturally and enrich soil fertility for the subsequent cereal/vegetable crop.',
    preventiveMeasures: [
      'Intercrop groundnut with red gram (pigeonpea) or pearl millet in a 6:1 ratio for micro-climate windbreak and risk diversification.',
      'Avoid disturbing soil after 50 DAS to protect subterranean pegs.',
    ],
  },
  {
    id: 'ICAR-BAN-01',
    crop: 'Banana',
    category: 'Disease Management',
    title: 'Banana Sigatoka Leaf Spot, Panama Wilt & Pseudostem Weevil Management',
    sourceOrg: 'ICAR-National Research Centre for Banana (NRCB), Tiruchirappalli',
    regionApplicability: 'Tamil Nadu, Maharashtra, Kerala, Andhra Pradesh, Karnataka',
    symptomsOrTriggers: [
      'yellow streaks',
      'brown streaks on banana leaf',
      'sigatoka',
      'wilt',
      'wind damage',
      'irrigation',
    ],
    advisoryContent:
      'Yellow Sigatoka starts as pale yellow streaks parallel to leaf veins that coalesce into brown necrotic patches under rainy/humid conditions, reducing photosynthetic area and bunch weight. De-leaf only the hanging necrotic leaf tips rather than whole green leaves, and ensure field drainage channels are clear.',
    regenerativePractice:
      'Chop harvested banana pseudostems and leaves into 15 cm pieces and compost in inter-row trenches with cow dung slurry and earthworms (Eudrilus eugeniae), recycling up to 60% of potassium back into the plantation soil.',
    preventiveMeasures: [
      'Grow sunnhemp (Crotalaria juncea) or daincha as a live cover crop between banana rows during the first 90 days and incorporate at flowering.',
      'Provide bamboo/casuarina propping at bunch emergence when wind speeds exceed 25 km/h.',
    ],
  },
  {
    id: 'NMSA-REGEN-01',
    crop: 'All',
    category: 'Regenerative Practice',
    title: 'National Mission for Sustainable Agriculture (NMSA): Soil Organic Carbon & Water Resilience Protocol',
    sourceOrg: 'Ministry of Agriculture & Farmers Welfare / ICAR Soil Health Guidelines',
    regionApplicability: 'All Indian Agro-Climatic Zones',
    symptomsOrTriggers: [
      'soil health',
      'organic carbon',
      'reduce water usage',
      'regenerative',
      'mulching',
      'compost',
      'irrigate',
      'rain affect',
      'this week',
    ],
    advisoryContent:
      'Indian tropical soils frequently have Soil Organic Carbon (SOC) below 0.5%, reducing water-holding capacity and nutrient buffering. Every 0.1% increase in soil organic carbon stores an additional ~15,000–20,000 liters of plant-available water per acre in the root zone. Combine weather-triggered irrigation withholding (skipping irrigation when 24h rain probability >60%) with organic surface mulching.',
    regenerativePractice:
      'Four pillars of regenerative transition for smallholders: (1) Minimum mechanical soil disturbance between beds, (2) Year-round organic soil cover (crop residue / straw mulch), (3) Living roots & legume intercropping/rotation, and (4) Bio-input enrichment (Jeevamrutham / Trichoderma / PSB / Azospirillum).',
    preventiveMeasures: [
      'Test soil every 2 seasons for pH, EC, and Organic Carbon via the Soil Health Card scheme.',
      'Delay irrigation and foliar applications whenever 24-hour rainfall probability exceeds 60%.',
    ],
  },
];

export function retrieveAgriculturalKnowledge(
  query: string,
  crop: CropType,
  weather: WeatherData,
  soil: SoilData,
  topK = 3
): RetrievedChunk[] {
  const normalizedQuery = query.toLowerCase();
  const contextTokens = [
    crop.toLowerCase(),
    soil.soilType.toLowerCase(),
    weather.rainProbability > 55 ? 'rain high humidity irrigation' : 'dry moisture',
    soil.organicCarbon < 0.6 ? 'organic carbon soil health' : '',
    normalizedQuery,
  ]
    .join(' ')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2);

  const scored: RetrievedChunk[] = AGRICULTURAL_KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    const matchedTerms: string[] = [];

    if (doc.crop === crop) {
      score += 42;
      matchedTerms.push(`Crop: ${crop}`);
    } else if (doc.crop === 'All') {
      score += 24;
      matchedTerms.push('All-Crop Regenerative Standard');
    }

    for (const trigger of doc.symptomsOrTriggers) {
      const tLower = trigger.toLowerCase();
      if (normalizedQuery.includes(tLower)) {
        score += 28;
        matchedTerms.push(trigger);
      } else {
        const triggerWords = tLower.split(' ');
        const overlap = triggerWords.filter((tw) => contextTokens.includes(tw));
        if (overlap.length > 0) {
          score += overlap.length * 8;
          if (!matchedTerms.includes(trigger)) {
            matchedTerms.push(trigger);
          }
        }
      }
    }

    const bodyLower = `${doc.title} ${doc.advisoryContent} ${doc.regenerativePractice}`.toLowerCase();
    for (const token of new Set(contextTokens)) {
      if (bodyLower.includes(token)) {
        score += 3;
      }
    }

    const clampedScore = Math.min(98, Math.max(45, score));
    return {
      ...doc,
      relevanceScore: clampedScore,
      matchedTerms: matchedTerms.slice(0, 4),
    };
  });

  return scored
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, topK);
}

export function calculatePrototypeRisk(
  profile: FarmerProfile,
  weather: WeatherData,
  soil: SoilData,
  hasDiseaseImageSymptom = true
): PrototypeRiskBreakdown {
  const factors: RiskFactorBreakdown[] = [];
  let score = 25;

  if (weather.rainProbability >= 65) {
    score += 25;
    factors.push({
      label: 'Rainfall anomaly & wet foliage window',
      delta: 25,
      reason: `${weather.rainProbability}% rain probability in next 24h increases fungal spore splash and nutrient leaching.`,
    });
  } else if (weather.rainProbability <= 15 && weather.temperature >= 35) {
    score += 18;
    factors.push({
      label: 'High evapotranspiration stress',
      delta: 18,
      reason: `${weather.temperature}°C with low rainfall increases crop water demand.`,
    });
  } else {
    factors.push({
      label: 'Moderate synoptic weather window',
      delta: 6,
      reason: `${weather.temperature}°C and ${weather.rainProbability}% rain chance within seasonal range.`,
    });
    score += 6;
  }

  if (weather.humidity >= 75) {
    score += 18;
    factors.push({
      label: 'High relative humidity (>75%)',
      delta: 18,
      reason: `${weather.humidity}% humidity accelerates fungal lesions (Early Blight / Blast / Sigatoka).`,
    });
  } else {
    factors.push({
      label: 'Canopy humidity within safe threshold',
      delta: -4,
      reason: `${weather.humidity}% relative humidity limits fungal spore germination.`,
    });
    score -= 4;
  }

  if (hasDiseaseImageSymptom) {
    score += 30;
    factors.push({
      label: 'Foliar lesion / symptom indicators',
      delta: 30,
      reason: `Active leaf-spot / discoloration query or specimen uploaded for ${profile.crop}.`,
    });
  }

  if (profile.irrigationType === 'Drip') {
    score -= 8;
    factors.push({
      label: 'Drip irrigation root-zone delivery',
      delta: -8,
      reason: 'Avoids leaf wetting and reduces foliar fungal transmission.',
    });
  } else if (profile.irrigationType === 'Flood / Furrow') {
    score += 10;
    factors.push({
      label: 'Flood irrigation moisture spike',
      delta: 10,
      reason: 'Increases collar humidity and temporary root-zone hypoxia.',
    });
  }

  if (soil.organicCarbon < 0.5) {
    score += 12;
    factors.push({
      label: 'Low soil organic carbon (<0.5%)',
      delta: 12,
      reason: `SOC at ${soil.organicCarbon}% lowers microbial buffering and water retention.`,
    });
  } else {
    score -= 5;
    factors.push({
      label: 'Soil moisture & organic buffering',
      delta: -5,
      reason: `Soil moisture (${soil.moisture}%) and SOC (${soil.organicCarbon}%) support root resilience.`,
    });
  }

  const clampedScore = Math.max(15, Math.min(95, score));

  const weatherRisk: RiskLevel =
    weather.rainProbability >= 65 || weather.temperature >= 37
      ? 'HIGH'
      : weather.rainProbability >= 40 || weather.humidity >= 75
      ? 'MEDIUM'
      : 'LOW';

  const diseaseRisk: RiskLevel =
    hasDiseaseImageSymptom && weather.humidity >= 75
      ? 'HIGH'
      : hasDiseaseImageSymptom || weather.humidity >= 75
      ? 'MEDIUM'
      : 'LOW';

  const waterStressRisk: RiskLevel =
    soil.moisture < 35 || (profile.irrigationType === 'Rainfed' && weather.rainProbability < 20)
      ? 'HIGH'
      : soil.moisture < 50 || weather.rainProbability > 70
      ? 'MEDIUM'
      : 'LOW';

  const soilRisk: RiskLevel =
    soil.organicCarbon < 0.45 || soil.ph < 5.5 || soil.ph > 8.2
      ? 'HIGH'
      : soil.organicCarbon < 0.65
      ? 'MEDIUM'
      : 'LOW';

  const overallRisk: RiskLevel =
    clampedScore >= 72 ? 'HIGH' : clampedScore >= 45 ? 'MEDIUM' : 'LOW';

  return {
    weatherRisk,
    diseaseRisk,
    waterStressRisk,
    soilRisk,
    overallRisk,
    numericScore: clampedScore,
    factors,
  };
}

export function getDefaultDemoWeather(district: string, state: string): WeatherData {
  return {
    source: 'DEMO',
    providerLabel: `Demo Agro-Met Telemetry · ${district}, ${state}`,
    lastUpdated: 'Today, 06:30 IST',
    temperature: 29,
    rainProbability: 76,
    humidity: 82,
    windSpeed: 14,
    condition: 'Warm & Humid · Scattered Afternoon Showers Expected',
    farmingImplication:
      'High rainfall probability (76%) and 82% humidity over the next 24 hours: Delay irrigation today, avoid overhead foliar chemical sprays that could wash off, and inspect lower tomato leaves for fungal lesions.',
    forecast7Day: [
      { date: 'Today', dayLabel: 'Tue', tempMax: 29, tempMin: 23, rainProb: 76, rainfallMm: 14.2, humidity: 82, condition: 'Heavy Showers' },
      { date: 'Day +1', dayLabel: 'Wed', tempMax: 28, tempMin: 22, rainProb: 68, rainfallMm: 9.5, humidity: 84, condition: 'Humid & Rain' },
      { date: 'Day +2', dayLabel: 'Thu', tempMax: 30, tempMin: 23, rainProb: 40, rainfallMm: 2.1, humidity: 76, condition: 'Cloudy Intervals' },
      { date: 'Day +3', dayLabel: 'Fri', tempMax: 31, tempMin: 23, rainProb: 20, rainfallMm: 0.0, humidity: 68, condition: 'Partly Sunny' },
      { date: 'Day +4', dayLabel: 'Sat', tempMax: 32, tempMin: 24, rainProb: 15, rainfallMm: 0.0, humidity: 64, condition: 'Clear Sky' },
      { date: 'Day +5', dayLabel: 'Sun', tempMax: 31, tempMin: 23, rainProb: 30, rainfallMm: 1.0, humidity: 70, condition: 'Light Breeze' },
      { date: 'Day +6', dayLabel: 'Mon', tempMax: 30, tempMin: 23, rainProb: 55, rainfallMm: 6.4, humidity: 78, condition: 'Evening Rain' },
    ],
  };
}
