import { Property } from '../types/property';

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Villa moderne avec piscine - Sidi Bou Said",
    location: "Sidi Bou Said, Tunisie",
    price: 180,
    rating: 4.95,
    reviews: 127,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"
    ],
    isSuperhost: true,
    hasWorkspace: true,
    isEcoFriendly: true,
    isBlockchainVerified: true,
    amenities: ['WiFi fibre', 'Piscine', 'Parking', 'Climatisation', 'Cuisine équipée', 'Terrasse'],
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    description: "Magnifique villa moderne avec vue panoramique sur la mer Méditerranée.",
    host: {
      name: "Ahmed Ben Ali",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      joinedDate: "2020-03-15",
      responseRate: 98,
      responseTime: "1 heure"
    },
    coordinates: { lat: 36.8707, lng: 10.3475 },
    instantBook: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-12-01T15:30:00Z"
  },
  {
    id: 2,
    title: "Appartement design centre-ville - Tunis",
    location: "Centre-ville, Tunis",
    price: 85,
    rating: 4.87,
    reviews: 89,
    images: [
      "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    ],
    isSuperhost: false,
    hasWorkspace: true,
    isEcoFriendly: false,
    isBlockchainVerified: true,
    amenities: ['WiFi', 'Bureau dédié', 'Cuisine équipée', 'Balcon', 'Climatisation'],
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    description: "Appartement moderne au cœur de Tunis, parfait pour les voyageurs d'affaires.",
    host: {
      name: "Leila Mansouri",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      joinedDate: "2021-07-22",
      responseRate: 95,
      responseTime: "2 heures"
    },
    coordinates: { lat: 36.8065, lng: 10.1815 },
    instantBook: false,
    createdAt: "2023-03-20T14:00:00Z",
    updatedAt: "2024-11-28T09:15:00Z"
  },
  {
    id: 3,
    title: "Riad traditionnel restauré - Médina",
    location: "Médina, Tunis",
    price: 120,
    rating: 4.92,
    reviews: 156,
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg"
    ],
    isSuperhost: true,
    hasWorkspace: false,
    isEcoFriendly: true,
    isBlockchainVerified: true,
    amenities: ['Patio', 'Architecture traditionnelle', 'Climatisation', 'WiFi', 'Petit-déjeuner'],
    type: 'riad',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    description: "Riad authentique au cœur de la médina, alliant charme traditionnel et confort moderne.",
    host: {
      name: "Mohamed Trabelsi",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      joinedDate: "2019-11-10",
      responseRate: 99,
      responseTime: "30 minutes"
    },
    coordinates: { lat: 36.7981, lng: 10.1697 },
    instantBook: true,
    createdAt: "2022-08-05T11:30:00Z",
    updatedAt: "2024-12-02T16:45:00Z"
  },
  {
    id: 4,
    title: "Penthouse vue mer - La Marsa",
    location: "La Marsa, Tunisie",
    price: 250,
    rating: 4.98,
    reviews: 201,
    images: [
      "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg",
      "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg"
    ],
    isSuperhost: true,
    hasWorkspace: true,
    isEcoFriendly: true,
    isBlockchainVerified: true,
    amenities: ['Vue mer', 'Terrasse', 'Parking privé', 'WiFi fibre', 'Jacuzzi', 'Cuisine moderne'],
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    description: "Penthouse luxueux avec vue imprenable sur la mer et la baie de Tunis.",
    host: {
      name: "Sonia Khelifi",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      joinedDate: "2020-01-08",
      responseRate: 100,
      responseTime: "15 minutes"
    },
    coordinates: { lat: 36.8778, lng: 10.3247 },
    instantBook: true,
    createdAt: "2023-05-12T08:20:00Z",
    updatedAt: "2024-12-01T12:00:00Z"
  },
  {
    id: 5,
    title: "Studio cocooning - Carthage",
    location: "Carthage, Tunisie",
    price: 65,
    rating: 4.83,
    reviews: 74,
    images: [
      "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg",
      "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg"
    ],
    isSuperhost: false,
    hasWorkspace: true,
    isEcoFriendly: true,
    isBlockchainVerified: true,
    amenities: ['Coin bureau', 'Kitchenette', 'WiFi', 'Proximité sites historiques', 'Parking'],
    type: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: "Studio confortable près des sites archéologiques de Carthage.",
    host: {
      name: "Karim Bouazizi",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      joinedDate: "2021-09-14",
      responseRate: 92,
      responseTime: "3 heures"
    },
    coordinates: { lat: 36.8531, lng: 10.3294 },
    instantBook: false,
    createdAt: "2023-07-18T13:45:00Z",
    updatedAt: "2024-11-30T10:30:00Z"
  },
  {
    id: 6,
    title: "Maison d'hôtes eco-responsable - Hammamet",
    location: "Hammamet, Tunisie",
    price: 95,
    rating: 4.90,
    reviews: 112,
    images: [
      "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    ],
    isSuperhost: true,
    hasWorkspace: false,
    isEcoFriendly: true,
    isBlockchainVerified: true,
    amenities: ['Jardin bio', 'Panneaux solaires', 'Produits locaux', 'WiFi', 'Piscine naturelle'],
    type: 'house',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    description: "Maison d'hôtes écologique avec jardin bio et piscine naturelle.",
    host: {
      name: "Fatma Gharbi",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      joinedDate: "2020-06-03",
      responseRate: 97,
      responseTime: "1 heure"
    },
    coordinates: { lat: 36.4000, lng: 10.6167 },
    instantBook: true,
    createdAt: "2022-12-10T16:20:00Z",
    updatedAt: "2024-12-02T14:15:00Z"
  },
  {
    id: 7,
    title: "Loft industriel avec workspace - Sousse",
    location: "Sousse, Tunisie",
    price: 110,
    rating: 4.76,
    reviews: 63,
    images: [
      "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
      "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg"
    ],
    isSuperhost: false,
    hasWorkspace: true,
    isEcoFriendly: false,
    isBlockchainVerified: true,
    amenities: ['Bureau équipé', 'WiFi fibre', 'Écran 4K', 'Imprimante', 'Climatisation', 'Parking'],
    type: 'loft',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    description: "Loft moderne parfait pour les nomades digitaux avec espace de travail dédié.",
    host: {
      name: "Youssef Hamdi",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
      joinedDate: "2022-02-28",
      responseRate: 89,
      responseTime: "4 heures"
    },
    coordinates: { lat: 35.8256, lng: 10.6369 },
    instantBook: false,
    createdAt: "2023-09-25T09:10:00Z",
    updatedAt: "2024-11-29T11:45:00Z"
  },
  {
    id: 8,
    title: "Villa familiale avec jardin - Nabeul",
    location: "Nabeul, Tunisie",
    price: 140,
    rating: 4.88,
    reviews: 95,
    images: [
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      "https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg"
    ],
    isSuperhost: true,
    hasWorkspace: false,
    isEcoFriendly: true,
    isBlockchainVerified: true,
    amenities: ['Grand jardin', 'Barbecue', 'Aire de jeux', 'WiFi', 'Parking', 'Climatisation'],
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    description: "Villa spacieuse idéale pour les familles avec grand jardin et aire de jeux.",
    host: {
      name: "Nadia Sellami",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      joinedDate: "2019-04-17",
      responseRate: 96,
      responseTime: "2 heures"
    },
    coordinates: { lat: 36.4561, lng: 10.7376 },
    instantBook: true,
    createdAt: "2022-06-08T12:30:00Z",
    updatedAt: "2024-12-01T08:20:00Z"
  }
];