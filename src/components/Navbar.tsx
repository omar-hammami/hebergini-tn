import React, { useState } from 'react';
import { Search, Globe, Menu, User, Shield, Leaf, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { currentUser, userProfile, logout } = useAuth();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Hebergini.tn</span>
          </Link>

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
            <button className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors px-3 py-2 rounded-full hover:bg-gray-50">
              <Shield size={16} />
              <span>Devenir hôte</span>
            </button>
            
            <button className="p-2 text-gray-700 hover:text-teal-600 transition-colors">
              <Globe size={20} />
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow"
                >
                  <Menu size={16} className="text-gray-600" />
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    {userProfile?.photoURL ? (
                      <img 
                        src={userProfile.photoURL} 
                        alt={userProfile.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-teal-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-green-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          {userProfile?.photoURL ? (
                            <img 
                              src={userProfile.photoURL} 
                              alt={userProfile.displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{userProfile?.displayName}</p>
                          <p className="text-xs text-gray-600 truncate">{userProfile?.email}</p>
                          {userProfile?.verificationLevel && (
                            <div className="flex items-center mt-1">
                              {userProfile.verificationLevel === 'premium' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                                  <Shield size={10} className="mr-1" />
                                  Premium
                                </span>
                              )}
                              {userProfile.verificationLevel === 'enhanced' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800">
                                  <Shield size={10} className="mr-1" />
                                  Vérifié
                                </span>
                              )}
                              {userProfile.verificationLevel === 'basic' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                                  <Shield size={10} className="mr-1" />
                                  Basique
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <a 
                        href="/profile" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:text-teal-700 transition-all duration-200 group"
                      >
                        <User size={16} className="mr-3 text-gray-400 group-hover:text-teal-500" />
                        <span className="font-medium">Mon profil</span>
                      </a>
                      
                      <a 
                        href="/bookings" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:text-teal-700 transition-all duration-200 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="font-medium">Mes réservations</span>
                      </a>
                      
                      <a 
                        href="/host" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:text-teal-700 transition-all duration-200 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium">Devenir hôte</span>
                      </a>
                      
                      <div className="px-4 py-2">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                      </div>
                      
                      <a 
                        href="/settings" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:text-teal-700 transition-all duration-200 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">Paramètres</span>
                      </a>
                      
                      <a 
                        href="/help" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:text-teal-700 transition-all duration-200 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Centre d'aide</span>
                      </a>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Se déconnecter</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-green-600 transition-all font-medium"
                >
                  S'inscrire
                </button>
              </div>
            )}
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
    </>
  );
};

export default Navbar;