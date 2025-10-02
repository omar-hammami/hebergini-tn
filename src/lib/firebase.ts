import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBA8rjGrr8_He9b6U7glQgLOccYcQaoWm4",
  authDomain: "hebergini-tn.firebaseapp.com",
  projectId: "hebergini-tn",
  storageBucket: "hebergini-tn.firebasestorage.app",
  messagingSenderId: "52030882623",
  appId: "1:52030882623:web:3c682ed84c89d046c4898a",
  measurementId: "G-GRZ8QJKVH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

facebookProvider.setCustomParameters({
  display: 'popup'
});

export default app;