import React from 'react';
import { Star, Wifi, Briefcase, Leaf, Shield, Zap, Car, Coffee, Tv, AirVent } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../types/property';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange }) => {
  const propertyTypes = [
    { value: 'apartment', label: 'Appartement' },
    { value: 'house', label: 'Maison' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'loft', label: 'Loft' },
    { value: 'riad', label: 'Riad' }
  ];

  const amenityOptions = [
    { value: 'wifi', label: 'WiFi', icon: Wifi },
    { value: 'workspace', label: 'Espace de travail', icon: Briefcase },
    { value: 'parking', label: 'Parking', icon: Car },
    { value: 'kitchen', label: 'Cuisine', icon: Coffee },
    { value: 'tv', label: 'Télévision', icon: Tv },
    { value: 'ac', label: 'Climatisation', icon: AirVent }
  ];

  const updateFilters = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof SearchFiltersType, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-teal-600 hover:text-teal-700 underline"
        >
          Tout effacer
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Prix par nuit</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => updateFilters('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <span className="text-gray-600">€</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilters('priceRange', [filters.priceRange[0], Number(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0€</span>
              <span>500€+</span>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Type de logement</h4>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.propertyTypes.includes(type.value)}
                  onChange={() => toggleArrayFilter('propertyTypes', type.value)}
                  className="rounded text-teal-500 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rooms */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Chambres et salles de bain</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Chambres</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => updateFilters('bedrooms', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              >
                <option value={0}>Peu importe</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}+</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Salles de bain</label>
              <select
                value={filters.bathrooms}
                onChange={(e) => updateFilters('bathrooms', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              >
                <option value={0}>Peu importe</option>
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}+</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Équipements</h4>
          <div className="grid grid-cols-2 gap-2">
            {amenityOptions.map((amenity) => (
              <label key={amenity.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity.value)}
                  onChange={() => toggleArrayFilter('amenities', amenity.value)}
                  className="rounded text-teal-500 focus:ring-teal-500"
                />
                <amenity.icon size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{amenity.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Note minimum</h4>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.ratings === rating}
                  onChange={() => updateFilters('ratings', rating)}
                  className="text-teal-500 focus:ring-teal-500"
                />
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-700">{rating}+</span>
                </div>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.ratings === 0}
                onChange={() => updateFilters('ratings', 0)}
                className="text-teal-500 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">Toutes les notes</span>
            </label>
          </div>
        </div>

        {/* Special Features */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Caractéristiques spéciales</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.superhost}
                onChange={(e) => updateFilters('superhost', e.target.checked)}
                className="rounded text-teal-500 focus:ring-teal-500"
              />
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-orange-500" />
                <span className="text-sm text-gray-700">Superhost</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasWorkspace}
                onChange={(e) => updateFilters('hasWorkspace', e.target.checked)}
                className="rounded text-teal-500 focus:ring-teal-500"
              />
              <div className="flex items-center space-x-2">
                <Briefcase size={16} className="text-blue-500" />
                <span className="text-sm text-gray-700">Espace de travail</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ecoFriendly}
                onChange={(e) => updateFilters('ecoFriendly', e.target.checked)}
                className="rounded text-teal-500 focus:ring-teal-500"
              />
              <div className="flex items-center space-x-2">
                <Leaf size={16} className="text-green-500" />
                <span className="text-sm text-gray-700">Éco-responsable</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.blockchainVerified}
                onChange={(e) => updateFilters('blockchainVerified', e.target.checked)}
                className="rounded text-teal-500 focus:ring-teal-500"
              />
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-teal-500" />
                <span className="text-sm text-gray-700">Blockchain vérifié</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.instantBook}
                onChange={(e) => updateFilters('instantBook', e.target.checked)}
                className="rounded text-teal-500 focus:ring-teal-500"
              />
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-yellow-500" />
                <span className="text-sm text-gray-700">Réservation instantanée</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;