import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  Phone,
  ShieldCheck,
  Smartphone,
  Sprout,
  User,
  UserCheck,
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
import {
  getFarmerProfileFromFirestore,
  maskFarmerId,
  saveFarmerProfileToFirestore,
} from '../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  currentProfile: FarmerProfile;
  onAuthSuccess: (user: FarmerAuthUser, profile: FarmerProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  currentProfile,
  onAuthSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentProfile.phoneNumber ? currentProfile.phoneNumber.replace(/[^0-9]/g, '').slice(-10) : '9329713849'
  );
  const [loginName, setLoginName] = useState<string>(currentProfile.name || 'Ravi Kumar');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Signup form state
  const [signupName, setSignupName] = useState<string>(currentProfile.name || 'Ravi Kumar');
  const [signupLang, setSignupLang] = useState<SupportedLanguage>(language);
  const [signupState, setSignupState] = useState<string>(currentProfile.state || 'Tamil Nadu');
  const [signupDistrict, setSignupDistrict] = useState<string>(currentProfile.district || 'Vellore');
  const [signupVillage, setSignupVillage] = useState<string>(currentProfile.village || 'Katpadi');
  const [signupCrop, setSignupCrop] = useState<CropType>(currentProfile.crop || 'Tomato');
  const [signupFarmSize, setSignupFarmSize] = useState<number>(currentProfile.farmSize || 2);
  const [signupIrrigation, setSignupIrrigation] = useState<IrrigationType>(currentProfile.irrigationType || 'Drip');
  const [signupSoil, setSignupSoil] = useState<SoilType>(currentProfile.soilType || 'Loamy');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const availableStates = Object.keys(INDIAN_STATES_DISTRICTS);
  const currentDistricts =
    INDIAN_STATES_DISTRICTS[signupState]?.districts ||
    INDIAN_STATES_DISTRICTS['Tamil Nadu'].districts;

  if (!isOpen) return null;

  const handleStateChange = (stateName: string) => {
    setSignupState(stateName);
    const firstDist = INDIAN_STATES_DISTRICTS[stateName]?.districts[0];
    if (firstDist) {
      setSignupDistrict(firstDist.name);
      setSignupVillage(firstDist.defaultVillage);
    }
  };

  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length < 10) {
      setErrorMessage(t.invalidPhone || 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      const uid = `FARMER-AUTH-${cleanNumber.slice(-4)}`;
      const authUser: FarmerAuthUser = {
        uid,
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        displayName: loginName.trim() || currentProfile.name || 'Farmer',
      };

      // Check if existing profile in Firestore
      const existing = await getFarmerProfileFromFirestore(uid);
      let farmerProfile: FarmerProfile;

      if (existing) {
        farmerProfile = existing;
      } else {
        const foundDist = currentDistricts.find((d) => d.name === currentProfile.district);
        farmerProfile = {
          ...currentProfile,
          id: uid,
          uid,
          phoneNumber: `+91${cleanNumber.slice(-10)}`,
          name: loginName.trim() || currentProfile.name || 'Farmer',
          farmerIdMasked: maskFarmerId(cleanNumber.slice(-4)),
          coordinates: foundDist
            ? { lat: foundDist.lat, lng: foundDist.lng, source: 'district-centroid' }
            : currentProfile.coordinates,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      // Save to Cloud Firestore
      await saveFarmerProfileToFirestore(farmerProfile);

      onAuthSuccess(authUser, farmerProfile);
      onClose();
    } catch (err: unknown) {
      console.error('Direct farmer login error:', err);
      // Fallback local login
      const uid = `FARMER-AUTH-${cleanNumber.slice(-4)}`;
      const authUser: FarmerAuthUser = {
        uid,
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        displayName: loginName.trim() || currentProfile.name || 'Farmer',
      };
      const localProfile: FarmerProfile = {
        ...currentProfile,
        id: uid,
        uid,
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        name: loginName.trim() || currentProfile.name,
      };
      onAuthSuccess(authUser, localProfile);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length < 10) {
      setErrorMessage(t.invalidPhone || 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (!signupName.trim()) {
      setErrorMessage('Please enter your Full Name');
      return;
    }

    setIsSubmitting(true);
    try {
      const uid = `FARMER-AUTH-${cleanNumber.slice(-4)}`;
      const authUser: FarmerAuthUser = {
        uid,
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        displayName: signupName.trim(),
      };

      const foundDist = currentDistricts.find((d) => d.name === signupDistrict);
      const farmerProfile: FarmerProfile = {
        id: uid,
        uid,
        name: signupName.trim(),
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        preferredLanguage: signupLang,
        language: signupLang,
        state: signupState,
        district: signupDistrict,
        village: signupVillage,
        crop: signupCrop,
        variety: 'High Yield Disease-Resistant',
        sowingDate: '2026-08-15',
        farmSize: signupFarmSize,
        irrigationType: signupIrrigation,
        soilType: signupSoil,
        farmerIdMasked: maskFarmerId(cleanNumber.slice(-4)),
        coordinates: foundDist
          ? { lat: foundDist.lat, lng: foundDist.lng, source: 'district-centroid' }
          : { lat: 12.9165, lng: 79.1325, source: 'district-centroid' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to Cloud Firestore collection `farmers/{uid}`
      await saveFarmerProfileToFirestore(farmerProfile);

      onAuthSuccess(authUser, farmerProfile);
      onClose();
    } catch (err: unknown) {
      console.error('Farmer registration error:', err);
      // Fallback local save
      const uid = `FARMER-AUTH-${cleanNumber.slice(-4)}`;
      const authUser: FarmerAuthUser = {
        uid,
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        displayName: signupName.trim(),
      };
      const fallbackProf: FarmerProfile = {
        id: uid,
        uid,
        name: signupName.trim(),
        phoneNumber: `+91${cleanNumber.slice(-10)}`,
        preferredLanguage: signupLang,
        language: signupLang,
        state: signupState,
        district: signupDistrict,
        village: signupVillage,
        crop: signupCrop,
        variety: 'High Yield',
        sowingDate: '2026-08-15',
        farmSize: signupFarmSize,
        irrigationType: signupIrrigation,
        soilType: signupSoil,
        farmerIdMasked: maskFarmerId(cleanNumber.slice(-4)),
        coordinates: { lat: 12.9165, lng: 79.1325, source: 'district-centroid' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onAuthSuccess(authUser, fallbackProf);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
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
            className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-1 uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Kisan Saarthi</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            {authMode === 'login' ? t.loginTitle : t.signupTitle}
          </h2>
          <p className="text-xs md:text-sm text-emerald-100/90 mt-1">
            {authMode === 'login' ? t.loginSubtitle : t.signupSubtitle}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-emerald-900">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                authMode === 'login'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-900/50'
              }`}
            >
              {t.navLogin}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-900/50'
              }`}
            >
              {t.signupTitle}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. DIRECT LOGIN FLOW (NO OTP) */}
          {authMode === 'login' && (
            <form onSubmit={handleDirectLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t.mobileNumber}
                </label>
                <div className="flex items-center rounded-xl border border-stone-300 bg-stone-50 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-700 focus-within:border-emerald-700">
                  <span className="px-3.5 py-3 text-xs font-semibold text-stone-600 bg-stone-200 border-r border-stone-300">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="9329713849"
                    className="w-full p-3 bg-transparent text-stone-900 text-sm font-medium focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || phoneNumber.length < 10}
                className="w-full py-3.5 text-sm font-bold text-white bg-[#14532D] hover:bg-[#166534] rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isSubmitting ? '...' : t.navLogin}</span>
              </button>
            </form>
          )}

          {/* 2. DIRECT SIGNUP FLOW (NO OTP & NO AADHAAR) */}
          {authMode === 'signup' && (
            <form onSubmit={handleDirectSignup} className="space-y-3.5 text-xs max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t.mobileNumber} *
                </label>
                <div className="flex items-center rounded-lg border border-stone-300 bg-stone-50 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-700">
                  <span className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-200 border-r border-stone-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="9329713849"
                    className="w-full p-2 bg-transparent text-stone-900 text-xs font-medium focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.preferredLanguage}
                  </label>
                  <select
                    value={signupLang}
                    onChange={(e) => setSignupLang(e.target.value as SupportedLanguage)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.nativeName} ({l.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.primaryCrop} *
                  </label>
                  <select
                    value={signupCrop}
                    onChange={(e) => setSignupCrop(e.target.value as CropType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-medium text-xs"
                  >
                    <option value="Tomato">🍅 Tomato</option>
                    <option value="Rice">🌾 Rice (Paddy)</option>
                    <option value="Wheat">🌾 Wheat</option>
                    <option value="Cotton">🌱 Cotton</option>
                    <option value="Sugarcane">🎋 Sugarcane</option>
                    <option value="Groundnut">🥜 Groundnut</option>
                    <option value="Banana">🍌 Banana</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.state} *
                  </label>
                  <select
                    value={signupState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  >
                    {availableStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.district} *
                  </label>
                  <select
                    value={signupDistrict}
                    onChange={(e) => setSignupDistrict(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
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
                    value={signupVillage}
                    onChange={(e) => setSignupVillage(e.target.value)}
                    placeholder="e.g. Katpadi"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  >
                  </input>
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
                    value={signupFarmSize}
                    onChange={(e) => setSignupFarmSize(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t.irrigationType}
                  </label>
                  <select
                    value={signupIrrigation}
                    onChange={(e) => setSignupIrrigation(e.target.value as IrrigationType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Drip">Drip Irrigation</option>
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
                    value={signupSoil}
                    onChange={(e) => setSignupSoil(e.target.value as SoilType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
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

              <button
                type="submit"
                disabled={isSubmitting || phoneNumber.length < 10 || !signupName.trim()}
                className="w-full py-3 text-sm font-bold text-white bg-[#14532D] hover:bg-[#166534] rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs mt-2 cursor-pointer"
              >
                <Sprout className="w-4 h-4" />
                <span>{isSubmitting ? '...' : t.saveProfile}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
