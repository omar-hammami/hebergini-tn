import React, { useState } from 'react';
import { Search, Globe, Menu, User, Shield, Leaf, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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

            <div className="flex items-center space-x-1 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow cursor-pointer">
              <Menu size={16} className="text-gray-600" />
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
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
  );
};

export default Navbar;