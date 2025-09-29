import React from 'react';
import { Leaf, Award, Recycle, Heart, TreePine, Sun } from 'lucide-react';

const SustainabilitySection = () => {
  const sustainabilityFeatures = [
    {
      icon: Leaf,
      title: "Compensation Carbone",
      description: "Votre empreinte carbone est automatiquement compensée à chaque réservation",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Sun,
      title: "Énergie Renouvelable",
      description: "Logements équipés de panneaux solaires et sources d'énergie propre",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Recycle,
      title: "Zéro Déchet",
      description: "Système de tri, produits biodégradables et réduction des déchets",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TreePine,
      title: "Reforestation",
      description: "Un arbre planté pour chaque séjour dans nos logements éco-certifiés",
      color: "text-green-700",
      bgColor: "bg-green-50"
    }
  ];

  const ecoProperties = [
    {
      title: "Éco-villa solaire",
      location: "Hammamet",
      carbonSaved: "2.3 tonnes CO₂",
      ecoScore: 95,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    },
    {
      title: "Maison passive",
      location: "Sousse",
      carbonSaved: "1.8 tonnes CO₂",
      ecoScore: 92,
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    },
    {
      title: "Lodge écologique",
      location: "Djerba",
      carbonSaved: "3.1 tonnes CO₂",
      ecoScore: 98,
      image: "https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="text-green-600" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Voyage Responsable
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transformez vos voyages en actions positives pour la planète. 
            Nos logements éco-certifiés vous permettent de voyager sans culpabilité.
          </p>
        </div>

        {/* Sustainability Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sustainabilityFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Eco Properties Showcase */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Logements Éco-Exemplaires</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ecoProperties.map((property, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <Leaf size={14} />
                    <span>Éco-certifié</span>
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1">
                  <span className="text-green-600 font-bold text-sm">{property.ecoScore}%</span>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-1">{property.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{property.location}</p>
                
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">Impact Positif</span>
                  </div>
                  <p className="text-green-700 text-sm">{property.carbonSaved} économisées par séjour</p>
                </div>
                
                <button className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-colors">
                  Réserver Éco-Responsable
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Dashboard */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Notre Impact Collectif</h3>
            <p className="opacity-90">Ensemble, nous construisons un tourisme plus durable</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold mb-1">15,420</div>
              <div className="text-sm opacity-80">Tonnes CO₂ compensées</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold mb-1">8,750</div>
              <div className="text-sm opacity-80">Arbres plantés</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold mb-1">1,200</div>
              <div className="text-sm opacity-80">Logements éco-certifiés</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-80">Énergie renouvelable</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Calculer Mon Impact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;