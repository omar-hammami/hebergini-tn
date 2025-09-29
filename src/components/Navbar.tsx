import React, { useState } from 'react';
import { Search, Globe, Menu, User, Shield, Leaf, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import UserProfile from './auth/UserProfile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, userProfile, signOut } = useAuth();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Hebergini.tn</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors">
                <span>Logements</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors">
                <Briefcase size={16} />
                <span>Espaces de travail</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors">
                <span>Expériences</span>
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <button 
                onClick={() => handleAuthClick('signup')}
                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors px-3 py-2 rounded-full hover:bg-gray-50"
              >
                <Shield size={16} />
                <span>Devenir hôte</span>
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-2 text-gray-700">
                <span className="text-sm">Bonjour, {userProfile?.firstName || user.displayName?.split(' ')[0] || user.email?.split('@')[0]}</span>
              </div>
            )}
            
            <button className="p-2 text-gray-700 hover:text-teal-600 transition-colors">
              <Globe size={20} />
            </button>

            <div className="relative">
              <div 
                onClick={() => user ? setShowUserProfile(true) : handleAuthClick('login')}
                className="flex items-center space-x-1 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow cursor-pointer"
              >
                <Menu size={16} className="text-gray-600" />
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  user ? 'bg-gradient-to-r from-teal-500 to-green-500' : 'bg-gray-400'
                }`}>
                  {user ? (
                    userProfile?.photoURL ? (
                      <img src={userProfile.photoURL} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {userProfile?.firstName?.[0] || user.displayName?.[0] || user.email?.[0]?.toUpperCase()}
                      </span>
                    )
                  ) : (
                    <User size={14} className="text-white" />
                  )}
                </div>
              </div>
              
              {user && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 hidden group-hover:block">
                  <button
                    onClick={() => setShowUserProfile(true)}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Mon profil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Mes réservations
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Mes favoris
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="bg-gradient-to-r from-teal-50 to-green-50 border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-1 text-teal-700">
              <Shield size={14} />
              <span>Blockchain vérifié</span>
            </div>
            <div className="flex items-center space-x-1 text-green-700">
              <Leaf size={14} />
              <span>Voyage durable</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-700">
              <Briefcase size={14} />
              <span>Espaces de travail</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <AuthModal 
      isOpen={showAuthModal} 
      onClose={() => setShowAuthModal(false)} 
      initialMode={authMode}
    />
    
    <UserProfile 
      isOpen={showUserProfile} 
      onClose={() => setShowUserProfile(false)} 
    />
    </>
  );
};

export default Navbar;