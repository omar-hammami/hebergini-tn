import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../lib/firebase';
import toast from 'react-hot-toast';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  location?: string;
  bio?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKYCVerified: boolean;
  verificationLevel: 'basic' | 'enhanced' | 'premium';
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      showProfile: boolean;
      showBookingHistory: boolean;
    };
  };
  bookingHistory: string[];
  trustScore: number;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserProfile = async (user: User, additionalData: any = {}) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL, phoneNumber } = user;
      const createdAt = new Date();

      const defaultProfile: UserProfile = {
        uid: user.uid,
        email: email || '',
        displayName: displayName || '',
        photoURL: photoURL || undefined,
        phoneNumber: phoneNumber || undefined,
        isEmailVerified: user.emailVerified,
        isPhoneVerified: false,
        isKYCVerified: false,
        verificationLevel: 'basic',
        createdAt,
        updatedAt: createdAt,
        preferences: {
          language: 'fr',
          currency: 'EUR',
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          privacy: {
            showProfile: true,
            showBookingHistory: false,
          },
        },
        bookingHistory: [],
        trustScore: 0,
        ...additionalData,
      };

      try {
        await setDoc(userRef, defaultProfile);
        setUserProfile(defaultProfile);
      } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }
    } else {
      setUserProfile(userSnap.data() as UserProfile);
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      await createUserProfile(user, { displayName });
      await sendEmailVerification(user);
      toast.success('Compte créé avec succès! Vérifiez votre email.');
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie!');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      toast.success('Déconnexion réussie!');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email de réinitialisation envoyé!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await createUserProfile(user);
      toast.success('Connexion Google réussie!');
    } catch (error: any) {
      console.error('Google login error:', error);
      throw new Error('Erreur lors de la connexion Google');
    }
  };

  const loginWithFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider);
      await createUserProfile(user);
      toast.success('Connexion Facebook réussie!');
    } catch (error: any) {
      console.error('Facebook login error:', error);
      throw new Error('Erreur lors de la connexion Facebook');
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser || !userProfile) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const updatedData = {
        ...updates,
        updatedAt: new Date(),
      };

      await updateDoc(userRef, updatedData);
      setUserProfile({ ...userProfile, ...updatedData });
      toast.success('Profil mis à jour avec succès!');
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error('Erreur lors de la mise à jour du profil');
    }
  };

  const sendVerificationEmail = async () => {
    if (!currentUser) return;

    try {
      await sendEmailVerification(currentUser);
      toast.success('Email de vérification envoyé!');
    } catch (error: any) {
      console.error('Send verification email error:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email de vérification');
    }
  };

  const refreshUserProfile = async () => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        setUserProfile(userSnap.data() as UserProfile);
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Aucun utilisateur trouvé avec cet email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'auth/invalid-email':
        return 'Adresse email invalide';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Réessayez plus tard';
      default:
        return 'Une erreur est survenue';
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUserProfile(userSnap.data() as UserProfile);
          } else {
            await createUserProfile(user);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook,
    updateUserProfile,
    sendVerificationEmail,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};