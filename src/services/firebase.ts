import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { FarmerAuthUser, FarmerProfile, SupportedLanguage } from '../types/agri';

// Read config from Vite environment variables (configured via .env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kisansaarthi-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Initialize Firebase safely (prevent re-initialization in HMR)
const app: FirebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp(
        firebaseConfig.apiKey ? firebaseConfig : { ...firebaseConfig, apiKey: 'demo-key' }
      );
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// Configure language for Firebase Auth SMS
auth.useDeviceLanguage();

/**
 * Mask sensitive Farmer / Aadhaar Identifier
 * Example: "123456781234" -> "XXXX-XXXX-1234"
 */
export function maskFarmerId(rawId?: string): string {
  if (!rawId || rawId.trim() === '') {
    return 'XXXX-XXXX-1234';
  }
  const clean = rawId.replace(/[^0-9A-Za-z]/g, '');
  if (clean.length <= 4) {
    return `XXXX-XXXX-${clean.padStart(4, '0')}`;
  }
  const lastFour = clean.slice(-4);
  return `XXXX-XXXX-${lastFour}`;
}

/**
 * Create a Firebase RecaptchaVerifier on a DOM element
 */
export function createRecaptchaVerifier(containerId: string, onSolved?: () => void): RecaptchaVerifier {
  // Clear any existing window recaptcha verifier
  const win = window as unknown as { recaptchaVerifier?: RecaptchaVerifier };
  if (win.recaptchaVerifier) {
    try {
      win.recaptchaVerifier.clear();
    } catch {
      // ignore
    }
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      onSolved?.();
    },
    'expired-callback': () => {
      console.warn('reCAPTCHA expired. Please try again.');
    },
  });

  win.recaptchaVerifier = verifier;
  return verifier;
}

/**
 * Send real Firebase Phone OTP
 * @param phoneNumber Formatted with +91 (e.g. "+919876543210")
 * @param appVerifier RecaptchaVerifier instance
 */
export async function sendFirebasePhoneOtp(
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
  return await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
}

/**
 * Verify OTP Code received via SMS
 */
export async function verifyFirebasePhoneOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<UserCredential> {
  return await confirmationResult.confirm(otpCode);
}

/**
 * Sign out current farmer
 */
export async function signOutFarmer(): Promise<void> {
  await signOut(auth);
}

/**
 * Listen to Farmer Auth state changes
 */
export function subscribeToFarmerAuth(
  callback: (user: FarmerAuthUser | null) => void
): () => void {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      callback({
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        displayName: user.displayName || null,
      });
    } else {
      callback(null);
    }
  });
}

/**
 * Fetch Farmer Profile from Firestore collection `farmers/{uid}`
 */
export async function getFarmerProfileFromFirestore(uid: string): Promise<FarmerProfile | null> {
  try {
    const docRef = doc(db, 'farmers', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as FarmerProfile;
    }
  } catch (error) {
    console.warn('Could not fetch farmer profile from Firestore:', error);
  }
  return null;
}

/**
 * Save Farmer Profile to Firestore collection `farmers/{uid}`
 */
export async function saveFarmerProfileToFirestore(profile: FarmerProfile): Promise<void> {
  const uid = profile.uid || profile.id;
  if (!uid) {
    throw new Error('Missing profile uid for saving to Firestore');
  }

  // Ensure masked identifier and timestamps
  const cleanProfile: FarmerProfile = {
    ...profile,
    uid,
    farmerIdMasked: maskFarmerId(profile.farmerIdMasked),
    updatedAt: new Date().toISOString(),
    createdAt: profile.createdAt || new Date().toISOString(),
  };

  try {
    const docRef = doc(db, 'farmers', uid);
    await setDoc(docRef, cleanProfile, { merge: true });
  } catch (error) {
    console.warn('Could not write farmer profile to Firestore:', error);
    // Don't throw fatal error if local offline/mock mode
  }
}

/**
 * Update partial Farmer Profile in Firestore
 */
export async function updateFarmerProfileInFirestore(
  uid: string,
  data: Partial<FarmerProfile>
): Promise<void> {
  try {
    const docRef = doc(db, 'farmers', uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Could not update farmer profile in Firestore:', error);
  }
}
