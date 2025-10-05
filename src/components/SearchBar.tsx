import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Briefcase, Filter, Plus, Minus, ChevronDown } from 'lucide-react';

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState('stays');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('location', searchQuery);
    if (checkIn) searchParams.set('checkin', checkIn);
    if (checkOut) searchParams.set('checkout', checkOut);
    if (guests > 1) searchParams.set('guests', guests.toString());
    if (activeTab !== 'stays') searchParams.set('type', activeTab);
    
    navigate(`/search?${searchParams.toString()}`);
  };

  const totalGuests = adults + children;

  const incrementGuests = (type: 'adults' | 'children' | 'infants') => {
    switch (type) {
      case 'adults':
        if (adults < 16) setAdults(adults + 1);
        break;
      case 'children':
        if (children < 5) setChildren(children + 1);
        break;
      case 'infants':
        if (infants < 5) setInfants(infants + 1);
        break;
    }
  };

  const decrementGuests = (type: 'adults' | 'children' | 'infants') => {
    switch (type) {
      case 'adults':
        if (adults > 1) setAdults(adults - 1);
        break;
      case 'children':
        if (children > 0) setChildren(children - 1);
        break;
      case 'infants':
        if (infants > 0) setInfants(infants - 1);
        break;
    }
  };

  const getGuestText = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} adulte${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} enfant${children > 1 ? 's' : ''}`);
    if (infants > 0) parts.push(`${infants} bébé${infants > 1 ? 's' : ''}`);
    return parts.join(', ') || '1 adulte';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Tabs */}
      <div className="flex items-center justify-center space-x-8 mb-6">
        <button 
          onClick={() => setActiveTab('stays')}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'stays' 
              ? 'border-teal-500 text-teal-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Logements
        </button>
        <button 
          onClick={() => setActiveTab('workspace')}
          className={`pb-2 border-b-2 transition-colors flex items-center space-x-1 ${
            activeTab === 'workspace' 
              ? 'border-teal-500 text-teal-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Briefcase size={16} />
          <span>Espaces de travail</span>
        </button>
        <button 
          onClick={() => setActiveTab('experiences')}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'experiences' 
              ? 'border-teal-500 text-teal-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Expériences
        </button>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Destination */}
          <div className="flex-1 p-4 border-r border-gray-200">
            <label className="block text-xs font-medium text-gray-600 mb-1">Destination</label>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher une destination" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="flex-1 p-4 border-r border-gray-200">
            <label className="block text-xs font-medium text-gray-600 mb-1">Arrivée</label>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Quand ?" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="w-full text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 p-4 border-r border-gray-200">
            <label className="block text-xs font-medium text-gray-600 mb-1">Départ</label>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Quand ?" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="w-full text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 p-4 border-r border-gray-200 relative">
            <label className="block text-xs font-medium text-gray-600 mb-1">Voyageurs</label>
            <button
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center space-x-2">
              <Users size={16} className="text-gray-400" />
                <span className="text-gray-900 truncate">{getGuestText()}</span>
            </div>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Guest Dropdown */}
            {showGuestDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowGuestDropdown(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 p-6">
                  <div className="space-y-6">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Adultes</div>
                        <div className="text-sm text-gray-500">13 ans et plus</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => decrementGuests('adults')}
                          disabled={adults <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium">{adults}</span>
                        <button
                          onClick={() => incrementGuests('adults')}
                          disabled={adults >= 16}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Enfants</div>
                        <div className="text-sm text-gray-500">2-12 ans</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => decrementGuests('children')}
                          disabled={children <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium">{children}</span>
                        <button
                          onClick={() => incrementGuests('children')}
                          disabled={children >= 5}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Bébés</div>
                        <div className="text-sm text-gray-500">Moins de 2 ans</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => decrementGuests('infants')}
                          disabled={infants <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium">{infants}</span>
                        <button
                          onClick={() => incrementGuests('infants')}
                          disabled={infants >= 5}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowGuestDropdown(false)}
                      className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 rounded-lg hover:from-teal-600 hover:to-green-600 transition-all"
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search Button */}
          <div className="flex items-center p-4">
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-full hover:from-teal-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Search size={20} />
              <span className="hidden md:block">Rechercher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400"
        >
          <Filter size={16} />
          <span>Filtres avancés</span>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Type de logement</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-500" />
                  <span className="text-gray-700">Appartement</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-500" />
                  <span className="text-gray-700">Maison</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-500" />
                  <span className="text-gray-700">Villa</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Commodités</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-500" />
                  <span className="text-gray-700">WiFi haute vitesse</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-500" />
                  <span className="text-gray-700">Espace de travail</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-500" />
                  <span className="text-gray-700">Éco-responsable</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Prix par nuit</h3>
              <div className="flex items-center space-x-4">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
                <span className="text-gray-500">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
                <span className="text-gray-600">€</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;