import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  signUp as firebaseSignUp, 
  signIn as firebaseSignIn, 
  signInWithProvider as firebaseSignInWithProvider,
  signOut as firebaseSignOut,
  resetPassword as firebaseResetPassword,
  getUserProfile,
  updateUserProfile,
  createUserProfile
} from '../lib/firebase';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phone: string;
  photoURL: string;
  bio: string;
  location: string;
  dateOfBirth: string;
  isVerified: boolean;
  emailVerified: boolean;
  verificationLevel: 'basic' | 'enhanced' | 'premium';
  createdAt: any;
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      showPhone: boolean;
      showEmail: boolean;
    };
  };
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<any>;
  signOut: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updateProfile: (updates: any) => Promise<any>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        const { data, error } = await getUserProfile(user.uid);
        if (data) {
          setUserProfile(data as UserProfile);
        } else if (!error || error === 'User profile not found') {
          // Create profile if it doesn't exist
          await createUserProfile(user);
          const { data: newData } = await getUserProfile(user.uid);
          if (newData) {
            setUserProfile(newData as UserProfile);
          }
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    const result = await firebaseSignUp(email, password, userData);
    return result;
  };

  const signIn = async (email: string, password: string) => {
    const result = await firebaseSignIn(email, password);
    return result;
  };

  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    const result = await firebaseSignInWithProvider(provider);
    return result;
  };

  const signOut = async () => {
    const result = await firebaseSignOut();
    if (!result.error) {
      setUser(null);
      setUserProfile(null);
    }
    return result;
  };

  const resetPassword = async (email: string) => {
    const result = await firebaseResetPassword(email);
    return result;
  };

  const updateProfile = async (updates: any) => {
    if (!user) return { error: 'No user logged in' };
    
    const result = await updateUserProfile(user.uid, updates);
    if (!result.error) {
      // Refresh profile data
      await refreshProfile();
    }
    return result;
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    const { data } = await getUserProfile(user.uid);
    if (data) {
      setUserProfile(data as UserProfile);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};