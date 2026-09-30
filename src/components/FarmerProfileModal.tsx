import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Globe,
  LogOut,
  MapPin,
  Pencil,
  Shield,
  Sprout,
  User,
  X,
} from 'lucide-react';
import {
  CropType,
  FarmerAuthUser,
  FarmerProfile,
  IrrigationType,
  SoilType,
  SupportedLanguage,
} from '../types/agri';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { INDIAN_STATES_DISTRICTS } from '../data/knowledgeBase';
import { maskFarmerId, saveFarmerProfileToFirestore } from '../services/firebase';

interface FarmerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile;
  authUser: FarmerAuthUser | null;
  language: SupportedLanguage;
  onUpdateProfile: (updated: FarmerProfile) => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onLogout: () => void;
}

export const FarmerProfileModal: React.FC<FarmerProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  authUser,
  language,
  onUpdateProfile,
  onLanguageChange,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(profile.name);
  const [crop, setCrop] = useState<CropType>(profile.crop);
  const [variety, setVariety] = useState<string>(profile.variety);
  const [farmSize, setFarmSize] = useState<number>(profile.farmSize);
  const [irrigation, setIrrigation] = useState<IrrigationType>(profile.irrigationType);
  const [soil, setSoil] = useState<SoilType>(profile.soilType);
  const [state, setState] = useState<string>(profile.state);
  const [district, setDistrict] = useState<string>(profile.district);
  const [village, setVillage] = useState<string>(profile.village);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  if (!isOpen) return null;

  const availableStates = Object.keys(INDIAN_STATES_DISTRICTS);
  const currentDistricts =
    INDIAN_STATES_DISTRICTS[state]?.districts ||
    INDIAN_STATES_DISTRICTS['Tamil Nadu'].districts;

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  const handleStateChange = (newState: string) => {
    setState(newState);
    const firstDist = INDIAN_STATES_DISTRICTS[newState]?.districts[0];
    if (firstDist) {
      setDistrict(firstDist.name);
      setVillage(firstDist.defaultVillage);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const foundDist = currentDistricts.find((d) => d.name === district);
    const updated: FarmerProfile = {
      ...profile,
      name,
      crop,
      variety,
      farmSize,
      irrigationType: irrigation,
      soilType: soil,
      state,
      district,
      village,
      coordinates: foundDist
        ? { lat: foundDist.lat, lng: foundDist.lng, source: 'district-centroid' }
        : profile.coordinates,
      updatedAt: new Date().toISOString(),
    };

    await saveFarmerProfileToFirestore(updated);
    onUpdateProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xl max-w-lg w-full overflow-hidden my-6">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-800 border-2 border-emerald-400 flex items-center justify-center text-xl font-bold text-white shrink-0">
              👤
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {profile.name}
                </h2>
                <span className="px-2 py-0.5 text-2xs font-semibold bg-emerald-800 text-emerald-200 rounded-full border border-emerald-700">
                  Verified Farmer
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profile.village}, {profile.district} ({profile.state})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.profileUpdated}</span>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-5">
              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 gap-3.5 text-xs">
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block mb-1">Primary Crop</span>
                  <div className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                    <span>🌱</span>
                    <span>{profile.crop}</span>
                  </div>
                  <span className="text-2xs text-stone-500 mt-0.5 block truncate">
                    {profile.variety}
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block mb-1">Farm Land Size</span>
                  <div className="text-sm font-semibold text-stone-900">
                    {profile.farmSize} Acres
                  </div>
                  <span className="text-2xs text-stone-500 mt-0.5 block">
                    {profile.irrigationType} Irrigation
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block mb-1">Soil Classification</span>
                  <div className="text-sm font-semibold text-stone-900">
                    {profile.soilType}
                  </div>
                  <span className="text-2xs text-stone-500 mt-0.5 block">
                    Root-zone calibrated
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block mb-1">Preferred Language</span>
                  <div className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{currentLangObj?.nativeName} ({currentLangObj?.name})</span>
                  </div>
                </div>
              </div>

              {/* Masked Sensitive ID */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
                    <Shield className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Farmer Identifier</span>
                  </div>
                  <p className="text-2xs text-emerald-800/80 mt-0.5">
                    Masked for privacy and Indian agricultural subsidy safety.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-white border border-emerald-300 text-emerald-950 rounded-lg">
                  {profile.farmerIdMasked || maskFarmerId('1234')}
                </span>
              </div>

              {/* Language Selector Strip */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700">
                  {t.changeLanguage}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => onLanguageChange(lang.code)}
                      className={`p-2 text-xs rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                        language === lang.code
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-700/20'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                      <span>{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>{t.editProfile}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="py-2.5 px-4 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.navLogout}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.primaryCrop}
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value as CropType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-medium"
                  >
                    <option value="Tomato">🍅 Tomato</option>
                    <option value="Rice">🌾 Rice</option>
                    <option value="Wheat">🌾 Wheat</option>
                    <option value="Cotton">🌱 Cotton</option>
                    <option value="Sugarcane">🎋 Sugarcane</option>
                    <option value="Groundnut">🥜 Groundnut</option>
                    <option value="Banana">🍌 Banana</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Crop Variety
                  </label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.state}
                  </label>
                  <select
                    value={state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    {availableStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.district}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    {currentDistricts.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.village}
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.farmSize}
                  </label>
                  <input
                    type="number"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={farmSize}
                    onChange={(e) => setFarmSize(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.irrigationType}
                  </label>
                  <select
                    value={irrigation}
                    onChange={(e) => setIrrigation(e.target.value as IrrigationType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="Drip">Drip</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Flood / Furrow">Flood / Furrow</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.soilType}
                  </label>
                  <select
                    value={soil}
                    onChange={(e) => setSoil(e.target.value as SoilType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="Loamy">Loamy</option>
                    <option value="Red Lateritic">Red Lateritic</option>
                    <option value="Black Cotton (Vertisol)">Black Cotton</option>
                    <option value="Alluvial">Alluvial</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay Loam">Clay Loam</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-2xs"
                >
                  {t.saveProfile}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
