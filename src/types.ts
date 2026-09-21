export type TripType = 
  | 'family' 
  | 'couple' 
  | 'friends' 
  | 'corporate' 
  | 'student' 
  | 'adventure' 
  | 'luxury' 
  | 'custom';

export type AvailabilityStatus = 'AVAILABLE' | 'LIMITED' | 'ON REQUEST' | 'SOLD OUT';

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  altitude: string;
  distanceFromIslamabad: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  startingPricePKR: number;
  image: string;
  description: string;
  highlights: string[];
  coordinates: { lat: number; lng: number };
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  durationDays: number;
  durationNights: number;
  duration?: string;
  style: TripType;
  tripStyle?: TripType;
  pricePerPersonPKR: number;
  pricePKR?: number;
  availability: AvailabilityStatus;
  image: string;
  overview: string;
  description?: string;
  highlights?: string[];
  itinerary: {
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
  }[];
  inclusions: string[];
  exclusions: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  destinationId: string;
  starRating: number;
  ratingScore: number;
  guestRating?: number;
  roomCategory: string;
  pricePerNightPKR: number;
  availability: AvailabilityStatus;
  image: string;
  amenities: string[];
  cancellationPolicy: string;
  description: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacityPassengers: number;
  capacityLuggage: string;
  ac: boolean;
  mountainTested: boolean;
  driverIncluded: boolean;
  fuelPolicy?: string;
  pricePerDayPKR: number;
  image: string;
  features: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  tripType: string;
  comment: string;
}

export interface ActivityExperience {
  id: string;
  name: string;
  location: string;
  duration: string;
  pricePKR: number;
  description: string;
  category: 'sightseeing' | 'adventure' | 'nature' | 'photography';
  iconName: string;
}

export interface Booking {
  id: string;
  createdAt: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  travellers: {
    adults: number;
    children: number;
    type: TripType;
  };
  hotel?: {
    id: string;
    name: string;
    roomCategory: string;
    nights: number;
    price: number;
  };
  transport?: {
    id: string;
    name: string;
    days: number;
    price: number;
  };
  selectedExperiences: {
    id: string;
    name: string;
    price: number;
  }[];
  customer: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    cnicOrPassport?: string;
    specialRequirements?: string;
  };
  pricing: {
    basePrice: number;
    accommodationTotal: number;
    transportTotal: number;
    activitiesTotal: number;
    taxesAndService: number;
    discount: number;
    grandTotalPKR: number;
  };
  status: 'CONFIRMED' | 'PENDING_REVIEW' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PARTIALLY_PAID' | 'VERIFIED';
}

export interface WeatherReport {
  city: string;
  temperatureC: number;
  condition: string;
  humidity: number;
  windSpeedKmh: number;
  visibilityKm: number;
  snowProbabilityPercent: number;
  roadConditions: string;
  galiyatPassStatus: string;
  updatedAt: string;
}

export interface MapPoint {
  id: string;
  title: string;
  type: 'hotel' | 'viewpoint' | 'attraction' | 'hiking' | 'hub';
  altitude: string;
  coords: { x: number; y: number }; // percentage on custom topographic map
  realCoords: { lat: number; lng: number };
  description: string;
  badge: string;
}
