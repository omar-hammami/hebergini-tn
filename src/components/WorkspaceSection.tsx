import React from 'react';
import { Briefcase, Wifi, Coffee, Monitor, Users, MapPin, Star } from 'lucide-react';

const WorkspaceSection = () => {
  const workspaceProperties = [
    {
      id: 1,
      title: "Loft moderne avec bureau privé",
      location: "Centre-ville, Tunis",
      price: 95,
      rating: 4.9,
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
      features: ["WiFi Fibre 1Gb", "Bureau ergonomique", "Écran 4K", "Imprimante"]
    },
    {
      id: 2,
      title: "Villa co-working avec piscine",
      location: "Sidi Bou Said",
      price: 150,
      rating: 4.95,
      image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg",
      features: ["Espace co-working", "Salle de réunion", "WiFi haute vitesse", "Cuisine partagée"]
    },
    {
      id: 3,
      title: "Studio design pour nomades",
      location: "La Marsa",
      price: 75,
      rating: 4.87,
      image: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg",
      features: ["Setup streaming", "Éclairage LED", "Chaise ergonomique", "Café illimité"]
    }
  ];

  const workspaceFeatures = [
    {
      icon: Wifi,
      title: "Internet Ultra-Rapide",
      description: "Connexion fibre garantie avec backup 4G/5G"
    },
    {
      icon: Monitor,
      title: "Équipement Pro",
      description: "Écrans 4K, webcams HD, éclairage professionnel"
    },
    {
      icon: Coffee,
      title: "Espace Détente",
      description: "Coin café, cuisine équipée, espaces de relaxation"
    },
    {
      icon: Users,
      title: "Réservation Groupe",
      description: "Espaces modulables pour équipes et retraites d'entreprise"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="text-blue-600" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Workspace-as-a-Service
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Travaillez depuis n'importe où avec nos espaces optimisés pour les nomades digitaux 
            et les équipes distantes. Internet ultra-rapide et équipement professionnel garantis.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {workspaceFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Workspace Properties */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Espaces de Travail Populaires</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {workspaceProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <Briefcase size={14} />
                    <span>Workspace</span>
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{property.title}</h4>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="space-y-1 mb-4">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block mr-1 mb-1">
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-gray-900">{property.price}€</span>
                    <span className="text-gray-600 text-sm">/nuit</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Besoin d'un espace pour votre équipe ?</h3>
          <p className="mb-6 opacity-90">Réservez des espaces modulables pour vos retraites d'entreprise et sessions de travail collaboratif.</p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Réservation Groupe
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceSection;