// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  User,
  UserCredential,
  sendEmailVerification,
  updatePassword as firebaseUpdatePassword
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Configure providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const facebookProvider = new FacebookAuthProvider();

// Auth helper functions
export const signUp = async (email: string, password: string, userData?: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's display name
    if (userData?.firstName && userData?.lastName) {
      await firebaseUpdateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });
    }

    // Send email verification
    await sendEmailVerification(user);

    // Create user profile in Firestore
    await createUserProfile(user, userData);

    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signInWithProvider = async (provider: 'google' | 'facebook') => {
  try {
    const authProvider = provider === 'google' ? googleProvider : facebookProvider;
    const userCredential = await signInWithPopup(auth, authProvider);
    
    // Create or update user profile
    await createUserProfile(userCredential.user);
    
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updatePassword = async (password: string) => {
  try {
    if (auth.currentUser) {
      await firebaseUpdatePassword(auth.currentUser, password);
      return { error: null };
    }
    return { error: 'No user logged in' };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Firestore helper functions
export const createUserProfile = async (user: User, additionalData?: any) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email, photoURL } = user;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        firstName: additionalData?.firstName || displayName?.split(' ')[0] || '',
        lastName: additionalData?.lastName || displayName?.split(' ')[1] || '',
        phone: additionalData?.phone || '',
        bio: '',
        location: '',
        dateOfBirth: '',
        isVerified: false,
        emailVerified: user.emailVerified,
        verificationLevel: 'basic',
        preferences: {
          language: 'fr',
          currency: 'EUR',
          notifications: {
            email: true,
            sms: false,
            push: true
          },
          privacy: {
            showPhone: false,
            showEmail: false
          }
        },
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { data: { id: userSnap.id, ...userSnap.data() }, error: null };
    } else {
      return { data: null, error: 'User profile not found' };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const uploadProfileImage = async (userId: string, file: File) => {
  try {
    const imageRef = ref(storage, `profile-images/${userId}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Update user profile with new photo URL
    await updateUserProfile(userId, { photoURL: downloadURL });
    
    // Update Firebase Auth profile
    if (auth.currentUser) {
      await firebaseUpdateProfile(auth.currentUser, { photoURL: downloadURL });
    }
    
    return { url: downloadURL, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

export { auth, db, storage, analytics };
export default app;