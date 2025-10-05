export interface Property {
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
  type: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description: string;
  host: {
    name: string;
    avatar: string;
    joinedDate: string;
    responseRate: number;
    responseTime: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  instantBook: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  priceRange: [number, number];
  propertyTypes: string[];
  amenities: string[];
  ratings: number;
  instantBook: boolean;
  superhost: boolean;
  ecoFriendly: boolean;
  hasWorkspace: boolean;
  blockchainVerified: boolean;
  bedrooms: number;
  bathrooms: number;
}

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'reviews' | 'newest';