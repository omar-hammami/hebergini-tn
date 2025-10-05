import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Grid2x2 as Grid, Map, SlidersHorizontal } from 'lucide-react';
import SearchFilters from './SearchFilters';
import PropertyGrid from './PropertyGrid';
import MapView from './MapView';
import SortingOptions from './SortingOptions';
import { Property, SearchFilters as SearchFiltersType, SortOption } from '../../types/property';
import { mockProperties } from '../../data/mockProperties';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  
  const [filters, setFilters] = useState<SearchFiltersType>({
    priceRange: [0, 500],
    propertyTypes: [],
    amenities: [],
    ratings: 0,
    instantBook: false,
    superhost: false,
    ecoFriendly: false,
    hasWorkspace: false,
    blockchainVerified: false,
    bedrooms: 0,
    bathrooms: 0
  });

  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading] = useState(false);

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
    return parts.join(', ') || '2 adultes';
  };

  // Apply filters and search
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let results = mockProperties.filter(property => {
        // Location search
        if (searchQuery && !property.location.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !property.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        // Price range
        if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
          return false;
        }

        // Property types
        if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.type)) {
          return false;
        }

        // Amenities
        if (filters.amenities.length > 0) {
          const hasAllAmenities = filters.amenities.every(amenity => 
            property.amenities.some(propAmenity => 
              propAmenity.toLowerCase().includes(amenity.toLowerCase())
            )
          );
          if (!hasAllAmenities) return false;
        }

        // Ratings
        if (filters.ratings > 0 && property.rating < filters.ratings) {
          return false;
        }

        // Boolean filters
        if (filters.superhost && !property.isSuperhost) return false;
        if (filters.ecoFriendly && !property.isEcoFriendly) return false;
        if (filters.hasWorkspace && !property.hasWorkspace) return false;
        if (filters.blockchainVerified && !property.isBlockchainVerified) return false;

        // Bedrooms and bathrooms
        if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) return false;
        if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) return false;

        return true;
      });

      // Apply sorting
      results = sortProperties(results, sortBy);
      
      setFilteredProperties(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters, sortBy]);

  const sortProperties = (properties: Property[], sortOption: SortOption): Property[] => {
    const sorted = [...properties];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return sorted;
    }
  };

  const handleSearch = () => {
    // Trigger search with current parameters
    setFilters({ ...filters });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 bg-white border border-gray-300 rounded-2xl p-2">
              {/* Location */}
              <div className="flex items-center space-x-2 px-3 py-2">
                <MapPin size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm focus:outline-none"
                />
              </div>

              {/* Check-in */}
              <div className="flex items-center space-x-2 px-3 py-2 border-l border-gray-200">
                <Calendar size={16} className="text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-sm focus:outline-none"
                />
              </div>

              {/* Check-out */}
              <div className="flex items-center space-x-2 px-3 py-2 border-l border-gray-200">
                <Calendar size={16} className="text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-sm focus:outline-none"
                />
              </div>

              {/* Guests */}
              <div className="flex items-center space-x-2 px-3 py-2 border-l border-gray-200 relative">
                <Users size={16} className="text-gray-400" />
                <button
                  onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                  className="w-full text-left text-sm focus:outline-none flex items-center justify-between"
                >
                  <span className="truncate">{getGuestText()}</span>
                  <svg className={`w-4 h-4 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Guest Dropdown */}
                {showGuestDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setShowGuestDropdown(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4 min-w-[280px]">
                      <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">Adultes</div>
                            <div className="text-xs text-gray-500">13 ans et plus</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => decrementGuests('adults')}
                              disabled={adults <= 1}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{adults}</span>
                            <button
                              onClick={() => incrementGuests('adults')}
                              disabled={adults >= 16}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">Enfants</div>
                            <div className="text-xs text-gray-500">2-12 ans</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => decrementGuests('children')}
                              disabled={children <= 0}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{children}</span>
                            <button
                              onClick={() => incrementGuests('children')}
                              disabled={children >= 5}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">Bébés</div>
                            <div className="text-xs text-gray-500">Moins de 2 ans</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => decrementGuests('infants')}
                              disabled={infants <= 0}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{infants}</span>
                            <button
                              onClick={() => incrementGuests('infants')}
                              disabled={infants >= 5}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => setShowGuestDropdown(false)}
                          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-2xl hover:from-teal-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Search size={20} />
              <span>Rechercher</span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                  showFilters 
                    ? 'bg-teal-50 border-teal-300 text-teal-700' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <SlidersHorizontal size={16} />
                <span>Filtres</span>
                {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v > 0 || v === true) && (
                  <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>

              <div className="text-sm text-gray-600">
                {loading ? 'Recherche...' : `${filteredProperties.length} logement${filteredProperties.length > 1 ? 's' : ''} trouvé${filteredProperties.length > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <SortingOptions sortBy={sortBy} onSortChange={setSortBy} />
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid size={16} className={viewMode === 'grid' ? 'text-teal-600' : 'text-gray-600'} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Map size={16} className={viewMode === 'map' ? 'text-teal-600' : 'text-gray-600'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <PropertyGrid properties={filteredProperties} loading={loading} />
            ) : (
              <MapView properties={filteredProperties} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;