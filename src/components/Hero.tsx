import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-white to-green-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Découvrez des logements
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600">
              vérifiés et durables
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plateforme innovante avec vérification blockchain, espaces de travail intégrés 
            et programme d'incitations écologiques pour voyageurs conscients.
          </p>
        </div>

        <SearchBar />

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-teal-600" />
            </div>
            <span className="text-sm">IA de recommandation</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-xs">CO₂</span>
            </div>
            <span className="text-sm">Compensation carbone</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">24/7</span>
            </div>
            <span className="text-sm">Support dédié</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;