import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Star, CreditCard as Edit3, Camera, Check, X, AlertCircle, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { uploadProfileImage } from '../../lib/firebase';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, updateProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'verification'>('profile');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    location: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (isOpen && userProfile) {
      setEditForm({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        dateOfBirth: userProfile.dateOfBirth || ''
      });
    }
  }, [isOpen, userProfile]);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      
      const updates = {
        ...editForm,
        displayName: `${editForm.firstName} ${editForm.lastName}`
      };

      const { error } = await updateProfile(updates);
      if (error) throw new Error(error);

      setEditing(false);
      setSuccess('Profil mis à jour avec succès');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError('');
      
      const { url, error } = await uploadProfileImage(user.uid, file);
      if (error) throw new Error(error);
      
      await refreshProfile();
      setSuccess('Photo de profil mise à jour');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError('Erreur lors du téléchargement de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  if (!isOpen) return null;

  const getInitials = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`;
    }
    if (userProfile?.displayName) {
      const names = userProfile.displayName.split(' ');
      return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
    }
    return userProfile?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-green-50">
          <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'profile' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                }`}
              >
                <User size={18} />
                <span>Informations personnelles</span>
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'verification' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                }`}
              >
                <Shield size={18} />
                <span>Vérification</span>
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'preferences' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                }`}
              >
                <Edit3 size={18} />
                <span>Préférences</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'security' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                }`}
              >
                <Shield size={18} />
                <span>Sécurité</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="p-6">
                {/* Messages */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center space-x-2">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center space-x-2">
                    <Check size={16} />
                    <span>{success}</span>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        {userProfile?.photoURL ? (
                          <img 
                            src={userProfile.photoURL} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {getInitials()}
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                          {uploadingImage ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Camera size={14} className="text-gray-600" />
                          )}
                        </label>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {userProfile?.displayName || `${userProfile?.firstName} ${userProfile?.lastName}`}
                        </h3>
                        <p className="text-gray-600">{userProfile?.email}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          {userProfile?.emailVerified && (
                            <span className="flex items-center space-x-1 text-green-600 text-sm">
                              <Shield size={14} />
                              <span>Email vérifié</span>
                            </span>
                          )}
                          {userProfile?.isVerified && (
                            <span className="flex items-center space-x-1 text-blue-600 text-sm">
                              <Shield size={14} />
                              <span>Profil vérifié</span>
                            </span>
                          )}
                          <span className="text-gray-500 text-sm">
                            Membre depuis {userProfile?.createdAt ? new Date(userProfile.createdAt.toDate()).toLocaleDateString('fr-FR') : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditing(!editing)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <Edit3 size={16} />
                        <span>{editing ? 'Annuler' : 'Modifier'}</span>
                      </button>
                    </div>

                    {/* Profile Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={editing ? editForm.firstName : userProfile?.firstName || ''}
                          onChange={handleInputChange}
                          disabled={!editing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={editing ? editForm.lastName : userProfile?.lastName || ''}
                          onChange={handleInputChange}
                          disabled={!editing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={editing ? editForm.phone : userProfile?.phone || ''}
                          onChange={handleInputChange}
                          disabled={!editing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Localisation
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editing ? editForm.location : userProfile?.location || ''}
                          onChange={handleInputChange}
                          disabled={!editing}
                          placeholder="Ville, Pays"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={editing ? editForm.dateOfBirth : userProfile?.dateOfBirth || ''}
                          onChange={handleInputChange}
                          disabled={!editing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={editing ? editForm.bio : userProfile?.bio || ''}
                        onChange={handleInputChange}
                        disabled={!editing}
                        rows={4}
                        placeholder="Parlez-nous de vous..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 disabled:bg-gray-50 resize-none"
                      />
                    </div>

                    {editing && (
                      <div className="flex space-x-4">
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg hover:from-teal-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
                        >
                          {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                          <span>Sauvegarder</span>
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Verification Tab */}
                {activeTab === 'verification' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Vérification d'identité</h3>
                      <p className="text-gray-600 mb-6">
                        Augmentez votre niveau de confiance en vérifiant votre identité. 
                        Cela vous permettra d'accéder à plus de fonctionnalités et d'inspirer confiance aux autres utilisateurs.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              userProfile?.emailVerified ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              <Mail size={20} className={userProfile?.emailVerified ? 'text-green-600' : 'text-yellow-600'} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Email</h4>
                              <p className="text-sm text-gray-600">
                                {userProfile?.emailVerified ? 'Votre adresse email est confirmée' : 'Vérifiez votre adresse email'}
                              </p>
                            </div>
                          </div>
                          {userProfile?.emailVerified ? (
                            <Check size={20} className="text-green-600" />
                          ) : (
                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                              Vérifier
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                              <Phone size={20} className="text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Téléphone</h4>
                              <p className="text-sm text-gray-600">Vérifiez votre numéro de téléphone</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                            Vérifier
                          </button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Shield size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Pièce d'identité</h4>
                              <p className="text-sm text-gray-600">Vérification KYC complète</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                            Commencer
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h4 className="font-medium text-teal-900 mb-2">Avantages de la vérification</h4>
                      <ul className="text-sm text-teal-800 space-y-1">
                        <li>• Badge de confiance sur votre profil</li>
                        <li>• Accès prioritaire aux nouvelles fonctionnalités</li>
                        <li>• Limites de paiement plus élevées</li>
                        <li>• Meilleur classement dans les résultats de recherche</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Other tabs content would go here */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Préférences</h3>
                    <p className="text-gray-600">Personnalisez votre expérience sur Hebergini.tn</p>
                    {/* Preferences content */}
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Sécurité</h3>
                    <p className="text-gray-600">Gérez vos paramètres de sécurité et confidentialité</p>
                    {/* Security content */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;