import React from 'react';
import { Shield, CheckCircle, Lock, Award, Users, Zap } from 'lucide-react';

const TrustSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Vérification Blockchain",
      description: "Chaque hôte et propriété est vérifié via notre système blockchain sécurisé pour une transparence totale.",
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      icon: CheckCircle,
      title: "Inspection IA",
      description: "Notre IA analyse automatiquement les photos pour détecter les fausses annonces et garantir l'authenticité.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Lock,
      title: "Paiements Sécurisés",
      description: "Transactions cryptées avec protection 3D Secure et support de multiples devises pour votre sécurité.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Award,
      title: "Garantie Qualité",
      description: "Programme de compensation automatique en cas de problème avec votre réservation.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Users,
      title: "Communauté Vérifiée",
      description: "Système de réputation avancé basé sur l'historique immutable des interactions.",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      icon: Zap,
      title: "Support 24/7",
      description: "Assistance instantanée avec chatbot IA et agents humains disponibles à tout moment.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Confiance et Sécurité Garanties
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Notre technologie blockchain et IA révolutionnent la confiance dans le voyage. 
            Chaque interaction est vérifiée, sécurisée et transparente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:bg-gray-50 p-6 rounded-2xl transition-colors">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-1">99.8%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">50K+</div>
              <div className="text-gray-600">Propriétés vérifiées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">24h</div>
              <div className="text-gray-600">Temps de vérification</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-gray-600">Paiements sécurisés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;