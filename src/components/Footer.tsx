import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Shield, Leaf, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">Hebergini.tn</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Plateforme innovante de location de vacances avec vérification blockchain, 
              espaces de travail intégrés et programme de durabilité environnementale.
            </p>
            
            {/* Trust Badges */}
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center space-x-1 text-teal-400">
                <Shield size={16} />
                <span className="text-sm">Blockchain vérifié</span>
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <Leaf size={16} />
                <span className="text-sm">Éco-responsable</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold mb-4">Découvrir</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Logements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Espaces de travail</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expériences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Destinations populaires</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Logements éco-certifiés</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hôtes</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Devenir hôte</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ressources hôtes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vérification blockchain</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Certification éco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Forum communauté</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Assistance sécurité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Signaler un problème</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nous contacter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chat en direct</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="font-semibold mb-4">Nous Contacter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-400">
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-teal-400" />
              <span>contact@hebergini.tn</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-teal-400" />
              <span>+216 70 000 000</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-teal-400" />
              <span>Tunis, Tunisie</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Hebergini.tn. Tous droits réservés.
          </div>
          
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions générales</a>
            <a href="#" className="hover:text-white transition-colors">Plan du site</a>
            <a href="#" className="hover:text-white transition-colors">GDPR</a>
            <a href="#" className="hover:text-white transition-colors">Accessibilité</a>
          </div>
        </div>

        {/* Innovation Footer */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="font-semibold mb-2">Innovation & Technologie</h4>
                <p className="text-gray-400 text-sm">Propulsé par l'IA, sécurisé par blockchain, engagé pour la planète</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-blue-400">
                  <Briefcase size={16} />
                  <span className="text-sm">WaaS</span>
                </div>
                <div className="flex items-center space-x-1 text-teal-400">
                  <Shield size={16} />
                  <span className="text-sm">Blockchain</span>
                </div>
                <div className="flex items-center space-x-1 text-green-400">
                  <Leaf size={16} />
                  <span className="text-sm">Net Zero</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;