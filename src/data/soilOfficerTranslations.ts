import { SupportedLanguage } from '../types/agri';

export interface SoilOfficerTranslation {
  // Soil & Regenerative
  soilTitle: string;
  soilSubtitle: string;
  soilSummaryHeading: string;
  nutrientStatusHeading: string;
  soilTypeLabel: string;
  phLabel: string;
  npkLabel: string;
  socLabel: string;
  moistureLabel: string;
  regenScoreHeading: string;
  regenScoreSubtitle: string;
  waterEfficiency: string;
  soilHealth: string;
  cropDiversity: string;
  organicMatter: string;
  practicesHeading: string;
  practicesSubtitle: string;
  practiceMulchTitle: string;
  practiceMulchDesc: string;
  practiceIntercropTitle: string;
  practiceIntercropDesc: string;
  practiceCompostTitle: string;
  practiceCompostDesc: string;
  practiceDripTitle: string;
  practiceDripDesc: string;
  formulaHeading: string;
  formulaDesc: string;

  // Officer Dashboard
  officerTitle: string;
  officerSubtitle: string;
  farmersMonitored: string;
  highRiskPlots: string;
  diseaseAlerts: string;
  weatherAlerts: string;
  blockHeading: string;
  blockSubtitle: string;
  feedbackHeading: string;
  feedbackSubtitle: string;
  ratingLabel: string;
  farmerOutcomeLabel: string;
  blockCol: string;
  farmersCol: string;
  cropCol: string;
  riskCol: string;
  alertCol: string;
  regenCol: string;
}

export const SOIL_OFFICER_TRANSLATIONS: Record<SupportedLanguage, SoilOfficerTranslation> = {
  en: {
    soilTitle: 'Soil Intelligence & Regenerative Agriculture',
    soilSubtitle: 'Soil Health Card Parameters, 4-Pillar Regenerative Farming Score & Water Conservation',
    soilSummaryHeading: 'Field Soil Health Summary',
    nutrientStatusHeading: 'Macronutrient Status (N-P-K & Organic Carbon)',
    soilTypeLabel: 'Soil Texture / Classification',
    phLabel: 'Soil pH (Reaction)',
    npkLabel: 'Available N-P-K (kg/ha)',
    socLabel: 'Soil Organic Carbon (SOC)',
    moistureLabel: 'Root-Zone Moisture',
    regenScoreHeading: 'Regenerative Farming Score',
    regenScoreSubtitle: 'Composite score evaluating non-chemical soil restoration, water saving, and crop diversity',
    waterEfficiency: 'Water Efficiency',
    soilHealth: 'Soil Health',
    cropDiversity: 'Crop Diversity',
    organicMatter: 'Organic Matter',
    practicesHeading: 'Adopted Regenerative Farming Practices',
    practicesSubtitle: 'Toggle practices to see immediate score impact and agronomic benefits for your farm',
    practiceMulchTitle: 'Organic Surface Mulching (5 cm Paddy Straw / Crop Residue)',
    practiceMulchDesc: 'Reduces topsoil evaporation by ~25–30%, suppresses weeds without chemicals, and prevents rain-splash fungal spores.',
    practiceIntercropTitle: 'Trap & Legume Intercropping (Marigold 1:10 + Cowpea Bunds)',
    practiceIntercropDesc: 'Attracts fruit borers away from tomato, fixes atmospheric nitrogen, and attracts beneficial predator insects.',
    practiceCompostTitle: 'FYM & Bio-Inoculated Vermicompost Application',
    practiceCompostDesc: 'Supplies Trichoderma viride, increases soil organic carbon above 0.75%, and builds drought resilience.',
    practiceDripTitle: 'Micro-Irrigation Precision Scheduling (Drip / Sensor)',
    practiceDripDesc: 'Saves 40–50% water compared to flood irrigation and avoids leaf wetness that triggers fungal diseases.',
    formulaHeading: 'Transparent Calculation Formula',
    formulaDesc: 'Score = 0.35 × Water Efficiency + 0.25 × Soil Health + 0.20 × Crop Diversity + 0.20 × Organic Matter.',

    officerTitle: 'Agriculture Officer & FPO District Console',
    officerSubtitle: 'Vellore District Telemetry, Geospatial Agro-Risk Heatmap & Farmer Feedback Logs',
    farmersMonitored: 'Farmers Monitored',
    highRiskPlots: 'High-Risk Farms',
    diseaseAlerts: 'Disease Alerts',
    weatherAlerts: 'Weather Alerts',
    blockHeading: 'District Block Agro-Risk Breakdown',
    blockSubtitle: 'Real-time telemetry aggregated across blocks in Vellore District (Tamil Nadu)',
    feedbackHeading: 'Recent Farmer Feedback Loop (Closed-Loop Telemetry)',
    feedbackSubtitle: 'Field action logs and verification outcomes reported directly by smallholder farmers',
    ratingLabel: 'Feedback Rating',
    farmerOutcomeLabel: 'Farmer Field Action Taken',
    blockCol: 'Block / Taluk',
    farmersCol: 'Farmers',
    cropCol: 'Major Crop',
    riskCol: 'Risk Level',
    alertCol: 'Active Alert',
    regenCol: 'Regen Score',
  },
  hi: {
    soilTitle: 'मिट्टी की जांच और प्राकृतिक खेती',
    soilSubtitle: 'मृदा स्वास्थ्य कार्ड, 4-स्तंभ प्राकृतिक खेती स्कोर एवं जल संरक्षण',
    soilSummaryHeading: 'खेत की मिट्टी का स्वास्थ्य विवरण',
    nutrientStatusHeading: 'पोषक तत्व स्थिति (नाइट्रोजन-फास्फोरस-पोटाश व जैविक कार्बन)',
    soilTypeLabel: 'मिट्टी का प्रकार',
    phLabel: 'मिट्टी का पीएच (pH मान)',
    npkLabel: 'उपलब्ध एन-पी-के (किग्रा/हेक्टेयर)',
    socLabel: 'मृदा जैविक कार्बन (SOC)',
    moistureLabel: 'जड़ क्षेत्र में नमी',
    regenScoreHeading: 'प्राकृतिक खेती स्कोर',
    regenScoreSubtitle: 'रसायन-मुक्त मिट्टी सुधार, जल बचत और फसल विविधता का समग्र मूल्यांकन',
    waterEfficiency: 'जल दक्षता',
    soilHealth: 'मिट्टी स्वास्थ्य',
    cropDiversity: 'फसल विविधता',
    organicMatter: 'जैविक पदार्थ',
    practicesHeading: 'अपनाई गई प्राकृतिक खेती पद्धतियां',
    practicesSubtitle: 'अपने खेत के लिए स्कोर प्रभाव और कृषि लाभ देखने के लिए पद्धतियों का चयन करें',
    practiceMulchTitle: 'जैविक पुआल मल्चिंग (5 सेमी धान पुआल / फसल अवशेष)',
    practiceMulchDesc: 'मिट्टी से वाष्पीकरण 25–30% घटाता है, खरपतवार रोकता है और बारिश में पत्तों पर फंगल छींटों से बचाता है।',
    practiceIntercropTitle: 'फंदा व दलहनी अंतर्वर्ती फसल (गेंदा 1:10 + लोबिया मेड़)',
    practiceIntercropDesc: 'टमाटर से कीटों को आकर्षित करके हटाता है, नाइट्रोजन बढ़ाता है और मित्र कीटों को आश्रय देता है।',
    practiceCompostTitle: 'गोबर खाद व ट्राइकोडर्मा संवर्धित केंचुआ खाद',
    practiceCompostDesc: 'ट्राइकोडर्मा की आपूर्ति करता है, जैविक कार्बन को 0.75% से ऊपर ले जाता है और सूखा सहनशीलता बढ़ाता है।',
    practiceDripTitle: 'सूक्ष्म ड्रिप सिंचाई समय-सारणी',
    practiceDripDesc: 'बाढ़ सिंचाई की तुलना में 40–50% पानी बचाता है और फंगल रोगों को पनपने से रोकता है।',
    formulaHeading: 'पारदर्शी गणना सूत्र',
    formulaDesc: 'स्कोर = 0.35 × जल दक्षता + 0.25 × मिट्टी स्वास्थ्य + 0.20 × फसल विविधता + 0.20 × जैविक पदार्थ।',

    officerTitle: 'कृषि अधिकारी एवं एफपीओ जिला कंसोल',
    officerSubtitle: 'वेल्लोर जिला कृषि निगरानी, भू-स्थानिक जोखिम मानचित्र एवं किसान फीडबैक',
    farmersMonitored: 'निगरानी में कुल किसान',
    highRiskPlots: 'उच्च जोखिम वाले खेत',
    diseaseAlerts: 'रोग संबंधी चेतावनियां',
    weatherAlerts: 'मौसम संबंधी चेतावनियां',
    blockHeading: 'जिला ब्लॉक-वार कृषि जोखिम विवरण',
    blockSubtitle: 'वेल्लोर जिले (तमिलनाडु) के सभी ब्लॉकों से एकत्रित वास्तविक समय डेटा',
    feedbackHeading: 'किसान फीडबैक और समाधान ट्रैकर',
    feedbackSubtitle: 'छोटे किसानों द्वारा सीधे दर्ज की गई जमीनी कार्रवाई और समाधान विवरण',
    ratingLabel: 'फीडबैक रेटिंग',
    farmerOutcomeLabel: 'किसान द्वारा की गई कार्रवाई',
    blockCol: 'ब्लॉक / तालुक',
    farmersCol: 'किसान संख्या',
    cropCol: 'मुख्य फसल',
    riskCol: 'जोखिम स्तर',
    alertCol: 'सक्रिय चेतावनी',
    regenCol: 'प्राकृतिक स्कोर',
  },
  ta: {
    soilTitle: 'மண் நுண்ணறிவு மற்றும் இயற்கை விவசாயம்',
    soilSubtitle: 'மண் வள அட்டை அளவீடுகள், 4-தூண்கள் இயற்கை விவசாய மதிப்பெண் & நீர் மேலாண்மை',
    soilSummaryHeading: 'பண்ணை மண் வள சுருக்கம்',
    nutrientStatusHeading: 'ஊட்டச்சத்து நிலை (தழை-மணி-சாம்பல் சத்து & கரிமக் கார்பன்)',
    soilTypeLabel: 'மண் வகைப்பாடு',
    phLabel: 'மண் கார அமிலத்தன்மை (pH)',
    npkLabel: 'கிடைக்கக்கூடிய N-P-K (கிலோ/ஹெக்டர்)',
    socLabel: 'மண் கரிமக் கார்பன் (SOC)',
    moistureLabel: 'வேர் மண்டல ஈரப்பதம்',
    regenScoreHeading: 'இயற்கை விவசாய மதிப்பெண்',
    regenScoreSubtitle: 'இரசாயனமற்ற மண் மீட்டெடுப்பு, நீர் சேமிப்பு மற்றும் பயிர் பன்முகத்தன்மை மதிப்பீடு',
    waterEfficiency: 'நீர் பயன்பாட்டுத் திறன்',
    soilHealth: 'மண் வளம்',
    cropDiversity: 'பயிர் பன்முகத்தன்மை',
    organicMatter: 'கரிமப் பொருள்',
    practicesHeading: 'பின்பற்றப்படும் இயற்கை விவசாய முறைகள்',
    practicesSubtitle: 'உங்கள் பண்ணைக்கான மதிப்பெண் தாக்கம் மற்றும் நன்மைகளைக் காண முறைகளைத் தேர்ந்தெடுக்கவும்',
    practiceMulchTitle: 'கரிம வைக்கோல் மூடாக்கு (5 செ.மீ நெல் வைக்கோல் / கழிவுகள்)',
    practiceMulchDesc: 'மண் ஆவியாதலை 25–30% குறைக்கிறது, களைகளைக் கட்டுப்படுத்துகிறது மற்றும் பூஞ்சை பரவுவதைத் தடுக்கிறது.',
    practiceIntercropTitle: 'பொறி மற்றும் பயறு ஊடுபயிர் (சாமந்தி 1:10 + தட்டப்பயறு வரப்பு)',
    practiceIntercropDesc: 'காய்ப்புழுக்களை கவர்ந்து தக்காளி பயிரைக் காக்கிறது, வளிமண்டல நைட்ரஜனை நிலைநிறுத்துகிறது.',
    practiceCompostTitle: 'மண்புழு உரம் & டிரைக்கோடெர்மா பயன்பாடு',
    practiceCompostDesc: 'டிரைக்கோடெர்மாவை வழங்கி கரிமக் கார்பனை 0.75% க்கு மேல் உயர்த்தி வறட்சித் தாங்கும் திறனைத் தருகிறது.',
    practiceDripTitle: 'துல்லிய சொட்டு நீர் பாசன அட்டவணை',
    practiceDripDesc: 'பாய்வு பாசனத்துடன் ஒப்பிடும்போது 40–50% நீரைச் சேமித்து, இலைகளில் பூஞ்சை நோய் பரவாமல் தடுக்கிறது.',
    formulaHeading: 'வெளிப்படையான கணக்கீட்டு சூத்திரம்',
    formulaDesc: 'மதிப்பெண் = 0.35 × நீர் திறன் + 0.25 × மண் வளம் + 0.20 × பயிர் பன்முகத்தன்மை + 0.20 × கரிமப் பொருள்.',

    officerTitle: 'வேளாண் அலுவலர் மற்றும் FPO மாவட்ட கன்சோல்',
    officerSubtitle: 'வேலூர் மாவட்ட வேளாண் தொலைநிலை அளவீடு, இடர் வரைபடம் மற்றும் உழவர் பின்னூட்டம்',
    farmersMonitored: 'கண்காணிக்கப்படும் உழவர்கள்',
    highRiskPlots: 'அதிக இடர் உள்ள பண்ணைகள்',
    diseaseAlerts: 'நோய் எச்சரிக்கைகள்',
    weatherAlerts: 'வானிலை எச்சரிக்கைகள்',
    blockHeading: 'மாவட்ட வட்டார வாரியான இடர் நிலை',
    blockSubtitle: 'வேலூர் மாவட்ட (தமிழ்நாடு) வட்டாரங்களில் இருந்து பெறப்பட்ட நேரடித் தரவுகள்',
    feedbackHeading: 'உழவர் பின்னூட்ட பதிவு மற்றும் கள நடவடிக்கை',
    feedbackSubtitle: 'சிறு விவசாயிகளால் நேரடியாகப் பதிவு செய்யப்பட்ட கள நடவடிக்கைகள் மற்றும் தீர்வுகள்',
    ratingLabel: 'பின்னூட்ட மதிப்பீடு',
    farmerOutcomeLabel: 'உழவர் மேற்கொண்ட நடவடிக்கை',
    blockCol: 'வட்டாரம்',
    farmersCol: 'உழவர்கள்',
    cropCol: 'முதன்மைப் பயிர்',
    riskCol: 'இடர் நிலை',
    alertCol: 'செயலில் உள்ள எச்சரிக்கை',
    regenCol: 'இயற்கை மதிப்பெண்',
  },
  te: {} as SoilOfficerTranslation,
  kn: {} as SoilOfficerTranslation,
  mr: {} as SoilOfficerTranslation,
  bn: {} as SoilOfficerTranslation,
};

// Fallbacks for other regional languages
for (const code of ['te', 'kn', 'mr', 'bn'] as SupportedLanguage[]) {
  SOIL_OFFICER_TRANSLATIONS[code] = SOIL_OFFICER_TRANSLATIONS.hi;
}
