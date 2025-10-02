import React, { useState } from 'react';
import { Search, Globe, Menu, User, Shield, Leaf, Briefcase } from 'lucide-react';
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
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{userProfile?.displayName}</p>
                      <p className="text-sm text-gray-600">{userProfile?.email}</p>
                    </div>
                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Mon profil
                    </a>
                    <a href="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Mes réservations
                    </a>
                    <a href="/host" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Devenir hôte
                    </a>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Se déconnecter
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