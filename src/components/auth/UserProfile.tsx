import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Settings, 
  Camera, 
  Edit3, 
  Save, 
  X,
  CheckCircle,
  AlertCircle,
  Star,
  History,
  Bell,
  Lock,
  Globe
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import toast from 'react-hot-toast';

const UserProfile: React.FC = () => {
  const { currentUser, userProfile, updateUserProfile, sendVerificationEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userProfile || {});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image doit faire moins de 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `profile-images/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      
      await updateUserProfile({ photoURL });
      toast.success('Photo de profil mise à jour!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors du téléchargement');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const getVerificationBadge = () => {
    const { verificationLevel, isEmailVerified, isPhoneVerified, isKYCVerified } = userProfile;
    
    if (verificationLevel === 'premium') {
      return (
        <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
          <Shield size={14} />
          <span>Premium</span>
        </div>
      );
    } else if (verificationLevel === 'enhanced') {
      return (
        <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm">
          <CheckCircle size={14} />
          <span>Vérifié</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
          <AlertCircle size={14} />
          <span>Basique</span>
        </div>
      );
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'verification', label: 'Vérification', icon: Shield },
    { id: 'bookings', label: 'Réservations', icon: History },
    { id: 'preferences', label: 'Préférences', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex items-end space-x-4 -mt-16">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  {userProfile.photoURL ? (
                    <img 
                      src={userProfile.photoURL} 
                      alt={userProfile.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-teal-500 text-white text-2xl font-bold">
                      {userProfile.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Camera size={16} className="text-gray-600" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{userProfile.displayName}</h1>
                  {getVerificationBadge()}
                </div>
                <p className="text-gray-600">{userProfile.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="text-sm font-medium">{userProfile.trustScore}/100</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    Membre depuis {new Date(userProfile.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        setEditData(userProfile);
                        setIsEditing(false);
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                    <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.displayName || ''}
                        onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userProfile.displayName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900">{userProfile.email}</p>
                      {userProfile.isEmailVerified ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <button
                          onClick={sendVerificationEmail}
                          className="text-teal-600 hover:text-teal-700 text-sm"
                        >
                          Vérifier
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phoneNumber || ''}
                        onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+216 XX XXX XXX"
                      />
                    ) : (
                      <p className="text-gray-900">{userProfile.phoneNumber || 'Non renseigné'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de naissance
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth || ''}
                        onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {userProfile.dateOfBirth 
                          ? new Date(userProfile.dateOfBirth).toLocaleDateString('fr-FR')
                          : 'Non renseignée'
                        }
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location || ''}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Ville, Pays"
                      />
                    ) : (
                      <p className="text-gray-900">{userProfile.location || 'Non renseignée'}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.bio || ''}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Parlez-nous de vous..."
                      />
                    ) : (
                      <p className="text-gray-900">{userProfile.bio || 'Aucune bio renseignée'}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setEditData(userProfile);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Save size={16} />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Vérification d'identité</h2>
                
                <div className="grid gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="text-blue-500" size={20} />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-sm text-gray-600">Vérifiez votre adresse email</p>
                        </div>
                      </div>
                      {userProfile.isEmailVerified ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <button
                          onClick={sendVerificationEmail}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Vérifier
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Phone className="text-green-500" size={20} />
                        <div>
                          <h3 className="font-medium">Téléphone</h3>
                          <p className="text-sm text-gray-600">Vérifiez votre numéro de téléphone</p>
                        </div>
                      </div>
                      {userProfile.isPhoneVerified ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                          Vérifier
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="text-purple-500" size={20} />
                        <div>
                          <h3 className="font-medium">Identité (KYC)</h3>
                          <p className="text-sm text-gray-600">Vérification complète d'identité</p>
                        </div>
                      </div>
                      {userProfile.isKYCVerified ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                          Commencer
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <h3 className="font-medium text-teal-900 mb-2">Avantages de la vérification</h3>
                  <ul className="text-sm text-teal-800 space-y-1">
                    <li>• Augmentation de votre score de confiance</li>
                    <li>• Accès à des logements premium</li>
                    <li>• Réservations instantanées</li>
                    <li>• Support prioritaire</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Historique des réservations</h2>
                
                {userProfile.bookingHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation</h3>
                    <p className="text-gray-600">Vous n'avez pas encore effectué de réservation.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Booking history would be displayed here */}
                    <p className="text-gray-600">Vos réservations apparaîtront ici.</p>
                  </div>
                )}
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Préférences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Langue et région</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Langue
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="ar">العربية</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Devise
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                          <option value="TND">TND (د.ت)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-teal-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Notifications par email</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-teal-500" />
                        <span className="ml-2 text-gray-700">Notifications SMS</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-teal-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Notifications push</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Confidentialité</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-teal-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Profil public</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-teal-500" />
                        <span className="ml-2 text-gray-700">Afficher l'historique des réservations</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;