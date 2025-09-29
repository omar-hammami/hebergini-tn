import React from 'react';
import PropertyCard from './PropertyCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const FeaturedListings = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Villa moderne avec piscine - Sidi Bou Said",
      location: "Sidi Bou Said, Tunisie",
      price: 180,
      rating: 4.95,
      reviews: 127,
      images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
      isSuperhost: true,
      hasWorkspace: true,
      isEcoFriendly: true,
      isBlockchainVerified: true,
      amenities: ['WiFi fibre', 'Piscine', 'Parking', 'Climatisation']
    },
    {
      id: 2,
      title: "Appartement design centre-ville - Tunis",
      location: "Centre-ville, Tunis",
      price: 85,
      rating: 4.87,
      reviews: 89,
      images: ["https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg"],
      isSuperhost: false,
      hasWorkspace: true,
      isEcoFriendly: false,
      isBlockchainVerified: true,
      amenities: ['WiFi', 'Bureau dédié', 'Cuisine équipée', 'Balcon']
    },
    {
      id: 3,
      title: "Riad traditionnel restauré - Médina",
      location: "Médina, Tunis",
      price: 120,
      rating: 4.92,
      reviews: 156,
      images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"],
      isSuperhost: true,
      hasWorkspace: false,
      isEcoFriendly: true,
      isBlockchainVerified: true,
      amenities: ['Patio', 'Architecture traditionnelle', 'Climatisation', 'WiFi']
    },
    {
      id: 4,
      title: "Penthouse vue mer - La Marsa",
      location: "La Marsa, Tunisie",
      price: 250,
      rating: 4.98,
      reviews: 201,
      images: ["https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg"],
      isSuperhost: true,
      hasWorkspace: true,
      isEcoFriendly: true,
      isBlockchainVerified: true,
      amenities: ['Vue mer', 'Terrasse', 'Parking privé', 'WiFi fibre']
    },
    {
      id: 5,
      title: "Studio cocooning - Carthage",
      location: "Carthage, Tunisie",
      price: 65,
      rating: 4.83,
      reviews: 74,
      images: ["https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg"],
      isSuperhost: false,
      hasWorkspace: true,
      isEcoFriendly: true,
      isBlockchainVerified: true,
      amenities: ['Coin bureau', 'Kitchenette', 'WiFi', 'Proximité sites historiques']
    },
    {
      id: 6,
      title: "Maison d'hôtes eco-responsable - Hammamet",
      location: "Hammamet, Tunisie",
      price: 95,
      rating: 4.90,
      reviews: 112,
      images: ["https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg"],
      isSuperhost: true,
      hasWorkspace: false,
      isEcoFriendly: true,
      isBlockchainVerified: true,
      amenities: ['Jardin bio', 'Panneaux solaires', 'Produits locaux', 'WiFi']
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-teal-500" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Logements recommandés par l'IA</h2>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border border-gray-300 hover:border-teal-500 transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full border border-gray-300 hover:border-teal-500 transition-colors">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-teal-500 hover:text-teal-600 transition-colors">
            Voir tous les logements
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;