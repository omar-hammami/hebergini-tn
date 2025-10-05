import React, { useState } from 'react';
import { MapPin, Star, Heart, Maximize2 } from 'lucide-react';
import { Property } from '../../types/property';

interface MapViewProps {
  properties: Property[];
}

const MapView: React.FC<MapViewProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);

  // Mock map coordinates for demonstration
  const getPropertyCoordinates = (property: Property) => {
    const baseCoords = {
      'Tunis': { lat: 36.8065, lng: 10.1815 },
      'Sidi Bou Said': { lat: 36.8707, lng: 10.3475 },
      'La Marsa': { lat: 36.8778, lng: 10.3247 },
      'Carthage': { lat: 36.8531, lng: 10.3294 },
      'Hammamet': { lat: 36.4000, lng: 10.6167 },
      'Sousse': { lat: 35.8256, lng: 10.6369 }
    };

    const cityKey = Object.keys(baseCoords).find(city => 
      property.location.includes(city)
    ) as keyof typeof baseCoords;

    if (cityKey) {
      return {
        lat: baseCoords[cityKey].lat + (Math.random() - 0.5) * 0.02,
        lng: baseCoords[cityKey].lng + (Math.random() - 0.5) * 0.02
      };
    }

    return { lat: 36.8065, lng: 10.1815 };
  };

  return (
    <div className="relative h-[600px] bg-gray-100 rounded-2xl overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Mock coastline */}
            <path
              d="M0,150 Q100,120 200,140 T400,130"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
            />
            {/* Mock roads */}
            <path
              d="M50,50 L350,80 M100,200 L300,180 M150,100 L250,250"
              stroke="#6B7280"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Property Markers */}
      {properties.map((property) => {
        const coords = getPropertyCoordinates(property);
        const x = ((coords.lng - 10.0) / 0.7) * 100;
        const y = ((36.9 - coords.lat) / 0.2) * 100;

        return (
          <div
            key={property.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              hoveredProperty === property.id ? 'z-20 scale-110' : 'z-10'
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setHoveredProperty(property.id)}
            onMouseLeave={() => setHoveredProperty(null)}
            onClick={() => setSelectedProperty(property)}
          >
            <div className={`bg-white rounded-full px-3 py-1 shadow-lg border-2 transition-colors ${
              selectedProperty?.id === property.id 
                ? 'border-teal-500 bg-teal-50' 
                : hoveredProperty === property.id
                ? 'border-teal-300'
                : 'border-white'
            }`}>
              <span className="text-sm font-medium text-gray-900">
                {property.price}€
              </span>
            </div>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
          <Maximize2 size={16} className="text-gray-600" />
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold">
            +
          </button>
          <div className="border-t border-gray-200"></div>
          <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold">
            −
          </button>
        </div>
      </div>

      {/* Property Details Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 max-w-sm">
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {selectedProperty.title}
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart size={16} className="text-gray-400" />
                </button>
              </div>
              <div className="flex items-center space-x-1 mb-2">
                <MapPin size={12} className="text-gray-400" />
                <span className="text-xs text-gray-600">{selectedProperty.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span className="text-xs font-medium">{selectedProperty.rating}</span>
                  <span className="text-xs text-gray-500">({selectedProperty.reviews})</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{selectedProperty.price}€</div>
                  <div className="text-xs text-gray-600">par nuit</div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedProperty(null)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
        <div className="text-xs text-gray-600 mb-2">Prix par nuit</div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          <span>Sélectionné</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;