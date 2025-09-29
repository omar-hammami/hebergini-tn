import React, { useState } from 'react';
import { Heart, Star, Shield, Briefcase, Leaf, CheckCircle } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  isSuperhost: boolean;
  hasWorkspace: boolean;
  isEcoFriendly: boolean;
  isBlockchainVerified: boolean;
  amenities: string[];
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images[currentImageIndex]} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Heart Icon */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart 
            size={18} 
            className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'} transition-colors`} 
          />
        </button>

        {/* Trust Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {property.isBlockchainVerified && (
            <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <Shield size={12} />
              <span>Vérifié</span>
            </div>
          )}
          {property.isSuperhost && (
            <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <CheckCircle size={12} />
              <span>Superhost</span>
            </div>
          )}
        </div>

        {/* Feature Badges */}
        <div className="absolute bottom-3 left-3 flex space-x-1">
          {property.hasWorkspace && (
            <div className="bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <Briefcase size={12} />
              <span>Workspace</span>
            </div>
          )}
          {property.isEcoFriendly && (
            <div className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <Leaf size={12} />
              <span>Eco</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="font-medium text-gray-900">{property.rating}</span>
            <span className="text-gray-500 text-sm">({property.reviews})</span>
          </div>
        </div>

        <p className="text-gray-600 mb-3">{property.location}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{property.amenities.length - 3} autres
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-gray-900">{property.price}€</span>
            <span className="text-gray-600">/nuit</span>
          </div>
          <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;