import { Destination, TourPackage, Hotel, Vehicle, ActivityExperience, MapPoint, WeatherReport, JournalArticle, Review } from '../types';

export const BUSINESS_INFO = {
  name: "Murree Classic Travel & Tour",
  tagline: "Curated Luxury Mountain Journeys & Expeditions",
  address: "GPO Chowk, Bank Road, Murree, 47150, Pakistan",
  phone: "+92 321 5603396",
  whatsapp: "+923215603396",
  whatsappFormatted: "+92 321 5603396",
  email: "info@murreeclassictravel.com",
  coordinates: { lat: 33.9070, lng: 73.3903 },
  workingHours: "24/7 Mountain Travel Assistance & Desk Support",
  verifiedBadge: "Registered Tour Operator — Murree Hill Station, Pakistan"
};

export const INITIAL_WEATHER: WeatherReport = {
  city: "Murree Hills & Galiyat",
  temperatureC: 13,
  condition: "Partly Cloudy with Alpine Mist",
  humidity: 68,
  windSpeedKmh: 14,
  visibilityKm: 8.5,
  snowProbabilityPercent: 25,
  roadConditions: "Islamabad-Murree Expressway (N-75) Clear; Bank Road & Mall Road normal traffic flow.",
  galiyatPassStatus: "Murree to Nathia Gali pass open; 4x4 recommended for morning frost / high peaks.",
  updatedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " PKT (Live Feed)"
};

export const DESTINATIONS: Destination[] = [
  {
    id: "murree",
    name: "Murree Hill Station",
    tagline: "The Queen of Hills & Historic Colonial Ridge",
    altitude: "2,291 m (7,516 ft)",
    distanceFromIslamabad: "64 km (~1 hr 15 mins)",
    bestTimeToVisit: "Year-Round (Summer Breeze / Winter Snow)",
    recommendedDuration: "2 - 3 Days",
    startingPricePKR: 18500,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80",
    description: "Nestled along the Himalayan foothills among towering blue pine and deodar forests, Murree offers historic mountain architecture, scenic viewpoints like Kashmir Point and Pindi Point, and the vibrant life of Mall Road.",
    highlights: ["Historic GPO & Mall Road walk", "Kashmir Point panoramic snow view", "Pindi Point chairlift & pine ridges", "British colonial mountain heritage"],
    coordinates: { lat: 33.9070, lng: 73.3903 }
  },
  {
    id: "nathia-gali",
    name: "Nathia Gali",
    tagline: "Alpine Meadows, Misty Trails & Mukshpuri Peak",
    altitude: "2,410 m (7,910 ft)",
    distanceFromIslamabad: "82 km (~2 hrs)",
    bestTimeToVisit: "May to October (Lush green) & Dec - Feb (Deep snow)",
    recommendedDuration: "2 - 4 Days",
    startingPricePKR: 24000,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    description: "The crown jewel of the Galiyat range. Known for its cool alpine climate, thick oak and cedar wilderness, historic wooden church, and the iconic hiking trail to Mukshpuri Top (9,200 ft).",
    highlights: ["Mukshpuri & Miranjani hiking expeditions", "Governor House woodland trails", "St. Matthew's wooden church (1914)", "Wild flora and mountain monkey sanctuaries"],
    coordinates: { lat: 34.0722, lng: 73.3814 }
  },
  {
    id: "bhurban",
    name: "Bhurban Valley",
    tagline: "Luxury Serenity, Golf Greens & Kashmir Panoramas",
    altitude: "1,850 m (6,070 ft)",
    distanceFromIslamabad: "68 km (~1 hr 25 mins)",
    bestTimeToVisit: "April to November (Spring to Autumn)",
    recommendedDuration: "2 - 3 Days",
    startingPricePKR: 32000,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    description: "A prestigious highland enclave renowned for 5-star luxury resorts, lush private golf courses, quiet pine valleys, and undisturbed views towards the snow-crested Pir Panjal mountains.",
    highlights: ["Pearl Continental luxury experience", "Terrace dining facing Kashmir valleys", "High-altitude 9-hole golf course", "Exclusive private villas and wellness retreats"],
    coordinates: { lat: 33.9567, lng: 73.4517 }
  },
  {
    id: "patriata",
    name: "Patriata (New Murree)",
    tagline: "Cable Car Flights Above Pine Canopies",
    altitude: "2,200 m (7,217 ft)",
    distanceFromIslamabad: "70 km (~1 hr 30 mins)",
    bestTimeToVisit: "March to November & Snowfall months",
    recommendedDuration: "1 - 2 Days",
    startingPricePKR: 16500,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    description: "Famous for its world-class dual-stage cable car and chairlift system extending over 7 kilometers across dense forest valleys, offering breathtaking 360-degree aerial mountain vistas.",
    highlights: ["World-class chairlift and gondola ride", "Deep deodar forest canopy walk", "High ridge equestrian trails", "Chilly mountain breeze and picnic viewpoints"],
    coordinates: { lat: 33.9022, lng: 73.4731 }
  },
  {
    id: "ayubia",
    name: "Ayubia National Park",
    tagline: "Historic Pipeline Track & Untamed Wilderness",
    altitude: "2,400 m (7,874 ft)",
    distanceFromIslamabad: "76 km (~1 hr 50 mins)",
    bestTimeToVisit: "May to October & Winter trekking",
    recommendedDuration: "1 - 2 Days",
    startingPricePKR: 19500,
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80",
    description: "A federally protected alpine sanctuary home to leopards, golden eagles, and the historic 4-km flat Pipeline Track connecting Dunga Gali to Ayubia under cathedral-like pine trees.",
    highlights: ["Historic Dunga Gali Pipeline Track", "Ayubia chairlift over green gorges", "Protected Himalayan bird watching", "Centuries-old fir and pine woodlands"],
    coordinates: { lat: 34.0298, lng: 73.4022 }
  },
  {
    id: "galiyat",
    name: "The Greater Galiyat Circuit",
    tagline: "Continuous Mountain Ridges from Murree to Abbottabad",
    altitude: "2,100 m – 2,800 m",
    distanceFromIslamabad: "Scenic 120 km Circuit",
    bestTimeToVisit: "April through November",
    recommendedDuration: "3 - 5 Days",
    startingPricePKR: 38000,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=80",
    description: "An unforgettable grand loop traversing Changla Gali, Khaira Gali, Dunga Gali, Nathia Gali, and Thandiani with endless mist, mountain streams, and authentic mountain hospitality.",
    highlights: ["Multi-gali mountain ridge driving", "Thandiani peak & pine horizons", "Private farmstays and organic fruit orchards", "Sunset over the Hazara and Kashmir ranges"],
    coordinates: { lat: 34.0500, lng: 73.3900 }
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "murree-colonial-heritage",
    title: "Murree Imperial & Pine Ridge Escape",
    subtitle: "A refined weekend exploring heritage trails, GPO Chowk, and Kashmir Point",
    destination: "Murree Hill Station",
    durationDays: 3,
    durationNights: 2,
    style: "family",
    pricePerPersonPKR: 28500,
    availability: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    overview: "Experience Murree with zero logistics hassle. Enjoy private mountain transport from Islamabad, boutique accommodation on Bank Road, guided walks through historic colonial sites, and sunset coffee at Kashmir Point.",
    itinerary: [
      {
        day: 1,
        title: "Ascent to the Queen of Hills",
        morning: "Private pickup from Islamabad / Rawalpindi via Expressway. Scenic drive through Tret and Charra Pani.",
        afternoon: "Check-in at boutique mountain hotel. Welcome Kashmiri tea and orientation walk around Bank Road & GPO Chowk.",
        evening: "Sunset walk along Kashmir Point with warm coffee, followed by private heritage dinner."
      },
      {
        day: 2,
        title: "Pine Canopy & Pindi Point Panorama",
        morning: "Artisanal breakfast facing the valley. Morning chairlift experience at Pindi Point.",
        afternoon: "Guided historical tour of Murree Brewery heritage architecture and Holy Trinity Church (1857).",
        evening: "Leisurely Mall Road exploration with local dry fruit shopping and warm roast corn."
      },
      {
        day: 3,
        title: "High Forest Ridge & Return",
        morning: "Excursion to scenic Lawrence College road & secluded pine trails for morning photography.",
        afternoon: "Traditional luncheon at mountain view terrace. Departure back to Islamabad with full luggage assistance.",
        evening: "Arrival in Islamabad with unforgettable mountain memories."
      }
    ],
    inclusions: [
      "Dedicated air-conditioned private vehicle with mountain chauffeur",
      "2 Nights boutique hotel accommodation on Bank Road",
      "Daily gourmet mountain breakfast",
      "Kashmir Point & Pindi Point chairlift access",
      "Experienced local Murree guide",
      "Expressway tolls, fuel, and driver allowances"
    ],
    exclusions: [
      "Personal shopping and souvenirs",
      "Optional horseback riding fees",
      "Individual lunch/dinner meals unless specified"
    ]
  },
  {
    id: "bhurban-luxury-retreat",
    title: "Bhurban 5-Star Highland Sanctuary",
    subtitle: "Opulent golf valley stay, private spa treatments, and candlelit terrace dinners",
    destination: "Bhurban Valley",
    durationDays: 3,
    durationNights: 2,
    style: "luxury",
    pricePerPersonPKR: 54000,
    availability: "LIMITED",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    overview: "Tailored for discerning travelers seeking unmatched luxury and serenity in the Himalayas. Stay at the prestigious Pearl Continental Bhurban with private Prado 4x4 transport and curated terrace banquets.",
    itinerary: [
      {
        day: 1,
        title: "VIP Transfer & Golf Enclave Welcome",
        morning: "Direct private transfer in an executive 4x4 SUV from Islamabad International Airport or residence.",
        afternoon: "Express check-in to Deluxe Mountain View Suite at PC Bhurban. High tea on the private balcony.",
        evening: "Chef's 4-course dinner overlooking the Pir Panjal mountain silhouettes."
      },
      {
        day: 2,
        title: "Highland Golf & Secret Pine Valley",
        morning: "9-hole morning golf session or spa wellness treatment.",
        afternoon: "Private scenic drive to secluded Bhurban viewpoints and organic local apple orchards.",
        evening: "Private bonfire on the garden terrace with traditional live acoustic music upon request."
      },
      {
        day: 3,
        title: "Sunrise Over Kashmir Valley",
        morning: "Champagne-style breakfast with fresh Himalayan honey and mountain breads.",
        afternoon: "Relaxed late check-out. Smooth return drive via scenic Murree bypass.",
        evening: "Drop-off at your destination in Islamabad."
      }
    ],
    inclusions: [
      "Toyota Prado 4x4 with executive chauffeur for the entire journey",
      "2 Nights Deluxe Mountain Suite at Pearl Continental Bhurban",
      "Daily lavish buffet breakfast",
      "VIP Welcome High Tea & Mountain Basket",
      "Golf course access pass and wellness facility privileges",
      "24/7 dedicated concierge manager"
    ],
    exclusions: [
      "Private spa treatments (available at special discount)",
      "Room service alcohol or international telephone calls"
    ]
  },
  {
    id: "mukshpuri-galiyat-trek",
    title: "Mukshpuri Top & Alpine Wilderness Expedition",
    subtitle: "High-altitude hiking, deep cedar woods, and the historic Pipeline Track",
    destination: "Nathia Gali",
    durationDays: 4,
    durationNights: 3,
    style: "adventure",
    pricePerPersonPKR: 36000,
    availability: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    overview: "Designed for trekking enthusiasts, nature photographers, and adventurous families. Summit Mukshpuri Top (9,200 ft) for 360-degree vistas extending from Nanga Parbat on clear days down to the Murree ridges.",
    itinerary: [
      {
        day: 1,
        title: "Journey to Nathia Gali",
        morning: "Departure from Islamabad. Scenic transit through Murree hills into the higher Galiyat altitudes.",
        afternoon: "Arrival at Nathia Gali. Check-in to Arcadian Sprucewoods or pine cabin. Acclimatization walk.",
        evening: "Warm Kashmiri Kehwa by the stone fireplace with local mountain guides."
      },
      {
        day: 2,
        title: "Conquering Mukshpuri Peak (2,800m)",
        morning: "Early breakfast and guided ascent from Dunga Gali trail through enchanted oak forests.",
        afternoon: "Summit celebration at Mukshpuri Top with picnic lunch and sweeping views of Kashmir and Hazara.",
        evening: "Descent to Nathia Gali village. Hearty organic BBQ dinner."
      },
      {
        day: 3,
        title: "Ayubia Historic Pipeline Track",
        morning: "Scenic trek along the historic British-era water pipeline track connecting Dunga Gali to Ayubia.",
        afternoon: "Exploration of Ayubia National Park. Chairlift descent over the gorge.",
        evening: "Stargazing session at high ridge vantage point."
      },
      {
        day: 4,
        title: "Governor House Trails & Farewell",
        morning: "Gentle morning stroll along Governor House Nathia Gali and historic wooden church.",
        afternoon: "Descent through scenic Abbottabad / Murree route with roadside pakoras and mountain tea.",
        evening: "Return to Islamabad."
      }
    ],
    inclusions: [
      "4x4 Mountain Vehicle with experienced Galiyat driver",
      "3 Nights alpine lodge stay in Nathia Gali",
      "Licensed mountain trekking guide & wilderness first aid support",
      "All park entry permits and pipeline track fees",
      "Daily energetic mountain breakfasts and trail picnic kits"
    ],
    exclusions: [
      "Personal trekking gear (poles, high-ankle hiking boots)",
      "Travel medical insurance"
    ]
  },
  {
    id: "patriata-cloud-family",
    title: "Patriata Cloud Gondola & Forest Discovery",
    subtitle: "The ultimate family holiday featuring chairlifts, cable cars, and forest horseback trails",
    destination: "Patriata",
    durationDays: 2,
    durationNights: 1,
    style: "family",
    pricePerPersonPKR: 19800,
    availability: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    overview: "Ideal for weekend family escapes. Experience the famous Patriata dual-stage chairlift and cable car gliding high above emerald valleys, complemented by kid-friendly nature walks.",
    itinerary: [
      {
        day: 1,
        title: "Soaring Over the Pines",
        morning: "Morning pickup from Islamabad. Arrival at Patriata Base Station.",
        afternoon: "VIP fast-track boarding for Chairlift & Cable Car to top ridge. Forest picnic and horseback rides.",
        evening: "Check-in to mountain retreat with panoramic sunset views. Family BBQ dinner."
      },
      {
        day: 2,
        title: "High Ridge Forest Walk & Return",
        morning: "Sunrise breakfast over rolling cloud sea. Forest photography walk.",
        afternoon: "Descent via cable car. Lunch at valley side restaurant.",
        evening: "Smooth evening return to Islamabad."
      }
    ],
    inclusions: [
      "Private family van (Toyota Hiace or Sedan) with chauffeur",
      "1 Night family suite accommodation",
      "Fast-track VIP tickets for Patriata Chairlift & Cable Car",
      "Breakfast and welcome refreshments",
      "Tolls, fuel, and child safety seating on request"
    ],
    exclusions: [
      "Horseback riding rentals (arranged on-site)",
      "Lunch meals"
    ]
  }
];

export const HOTELS: Hotel[] = [
  {
    id: "pearl-continental-bhurban",
    name: "Pearl Continental Hotel Bhurban",
    location: "Bhurban Valley, Murree Hills",
    destinationId: "bhurban",
    starRating: 5,
    ratingScore: 4.8,
    roomCategory: "Executive Mountain View Suite",
    pricePerNightPKR: 38000,
    availability: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Free High-Speed Wi-Fi", "9-Hole Golf Course", "Heated Swimming Pool", "Luxury Spa & Sauna", "Terrace Fine Dining", "Valet Parking"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in date.",
    description: "Pakistan's most iconic 5-star mountain resort perched on a cliff edge overlooking Kashmir. Features world-class hospitality, lush private gardens, and five distinct dining venues."
  },
  {
    id: "arcadian-sprucewoods",
    name: "Arcadian Sprucewoods Resort",
    location: "Nathia Gali, Galiyat",
    destinationId: "nathia-gali",
    starRating: 4,
    ratingScore: 4.7,
    roomCategory: "Pine Chalet Room",
    pricePerNightPKR: 28000,
    availability: "LIMITED",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Private Forest View Balcony", "Stone Fireplace", "Artisanal Restaurant", "Guided Trekking Desk", "Heated Bedrooms", "Free Wi-Fi"],
    cancellationPolicy: "Free cancellation up to 72 hours prior to arrival.",
    description: "Secluded in a dense fir and spruce forest of Nathia Gali, Arcadian offers an intimate Scandinavian chalet atmosphere with roaring fireplaces and direct trail access."
  },
  {
    id: "lockwood-hotel-murree",
    name: "Lockwood Heritage Hotel Murree",
    location: "Bank Road / Club Road, Murree",
    destinationId: "murree",
    starRating: 4,
    ratingScore: 4.6,
    roomCategory: "Colonial Heritage Suite",
    pricePerNightPKR: 22000,
    availability: "AVAILABLE",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Centuries-Old Colonial Ambiance", "Antique Wooden Fireplaces", "Lush Lawn High Tea", "2-minute walk to GPO Chowk", "Private Chauffeur Parking"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    description: "Built in 1880, Lockwood is one of Murree's oldest preserved heritage hotels, offering vintage charm, grand verandas, and peaceful gardens just steps from Bank Road."
  },
  {
    id: "pine-top-hotel",
    name: "Pine Top Luxury Resort",
    location: "Kashmir Point, Murree",
    destinationId: "murree",
    starRating: 4,
    ratingScore: 4.5,
    roomCategory: "Himalayan View Deluxe",
    pricePerNightPKR: 24500,
    availability: "ON REQUEST",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Direct Kashmir Point Vista", "Heated Floors", "Rooftop Observation Lounge", "Continental & Pakistani Buffet", "Backup Power Generator"],
    cancellationPolicy: "50% refund if cancelled within 3 days.",
    description: "Perched near Murree's highest viewpoint at Kashmir Point, Pine Top provides undisturbed sunrise panoramas towards the snow peaks of Azad Kashmir."
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: "toyota-corolla-sedan",
    name: "Toyota Corolla Altis Grande",
    type: "Premium Sedan",
    capacityPassengers: 3,
    capacityLuggage: "2 Large + 2 Small Bags",
    ac: true,
    mountainTested: true,
    driverIncluded: true,
    pricePerDayPKR: 9500,
    image: "https://images.unsplash.com/photo-1590362891988-f77804702e86?auto=format&fit=crop&w=1000&q=80",
    features: ["Expert hill-station driver", "Dual Climate Control AC", "Expressway FastTag enabled", "Bottled water & phone chargers"]
  },
  {
    id: "prado-4x4-suv",
    name: "Toyota Land Cruiser Prado TX (4x4)",
    type: "Luxury Mountain 4x4 SUV",
    capacityPassengers: 5,
    capacityLuggage: "4 Large Suitcases",
    ac: true,
    mountainTested: true,
    driverIncluded: true,
    pricePerDayPKR: 22000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    features: ["All-Wheel Mountain Traction for snow/frost", "Leather interior & panoramic sunroof", "Hill descent control", "Senior certified alpine driver"]
  },
  {
    id: "toyota-hiace-cabin",
    name: "Toyota Hiace Grand Cabin VIP",
    type: "Executive Van",
    capacityPassengers: 12,
    capacityLuggage: "10 Medium Bags",
    ac: true,
    mountainTested: true,
    driverIncluded: true,
    pricePerDayPKR: 17500,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    features: ["High-roof luxury captain seats", "Rear AC vents for all passengers", "Spacious family aisle", "Luggage roof carrier with waterproof cover"]
  },
  {
    id: "luxury-coaster-saloon",
    name: "Toyota Coaster Saloon VIP",
    type: "Group Coaster",
    capacityPassengers: 24,
    capacityLuggage: "20 Large Bags",
    ac: true,
    mountainTested: true,
    driverIncluded: true,
    pricePerDayPKR: 28000,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80",
    features: ["Reclining luxury seats with armrests", "PA audio mic system for corporate tours", "Double AC units", "Experienced mountain convoy driver"]
  }
];

export const EXPERIENCES: ActivityExperience[] = [
  {
    id: "patriata-chairlift",
    name: "Patriata Chairlift & Cable Car VIP Pass",
    location: "Patriata (New Murree)",
    duration: "2 - 3 Hours",
    pricePKR: 3500,
    description: "Glide over towering blue pines in a scenic dual-stage chairlift and enclosed gondola with fast-track line privileges.",
    category: "sightseeing",
    iconName: "CableCar"
  },
  {
    id: "pipeline-track-guided",
    name: "Historic Pipeline Track Guided Nature Walk",
    location: "Dunga Gali to Ayubia",
    duration: "3 Hours (4 km flat)",
    pricePKR: 4500,
    description: "An easy, family-safe alpine trail shaded by 150-year-old pine cathedrals with a professional naturalist guide.",
    category: "nature",
    iconName: "Compass"
  },
  {
    id: "mukshpuri-guided-trek",
    name: "Mukshpuri Peak Guided Summit Trek",
    location: "Nathia Gali",
    duration: "4 - 5 Hours",
    pricePKR: 6000,
    description: "Ascend to 9,200 ft with certified mountain guides, trail snacks, mountain poles, and summit photography.",
    category: "adventure",
    iconName: "Mountain"
  },
  {
    id: "kashmir-point-sunset",
    name: "Kashmir Point Heritage & Sunset Coffee Tour",
    location: "Murree Upper Ridge",
    duration: "2 Hours",
    pricePKR: 2500,
    description: "Historical stroll past Governor House and Cadet College Murree, ending with artisan coffee at the sunset deck.",
    category: "photography",
    iconName: "Camera"
  },
  {
    id: "galiyat-local-cuisine",
    name: "Galiyat Traditional Mountain Food Tasting",
    location: "Nathia Gali / Murree",
    duration: "2 Hours",
    pricePKR: 4000,
    description: "Authentic Charsi Shinwari Karahi, Patakha Chicken of Nathia Gali, fresh hot Walnut bread, and Kashmiri Kehwa.",
    category: "sightseeing",
    iconName: "Utensils"
  }
];

export const MAP_POINTS: MapPoint[] = [
  {
    id: "gpo-chowk",
    title: "Murree Classic Travel & Tour (HQ)",
    type: "hub",
    altitude: "2,291 m",
    coords: { x: 38, y: 55 },
    realCoords: { lat: 33.9070, lng: 73.3903 },
    description: "Our physical headquarters at GPO Chowk, Bank Road. Visit us for tea, route advice, or in-person bookings.",
    badge: "Headquarters"
  },
  {
    id: "kashmir-point",
    title: "Kashmir Point Viewpoint",
    type: "viewpoint",
    altitude: "2,350 m",
    coords: { x: 44, y: 48 },
    realCoords: { lat: 33.9140, lng: 73.4010 },
    description: "Murree's highest scenic overlook offering direct views toward the snow-clad peaks of Kashmir and Rawalakot.",
    badge: "Panoramic View"
  },
  {
    id: "pindi-point",
    title: "Pindi Point & Chairlift",
    type: "viewpoint",
    altitude: "2,210 m",
    coords: { x: 32, y: 64 },
    realCoords: { lat: 33.8960, lng: 73.3850 },
    description: "Spectacular southern view toward Rawalpindi and Islamabad twinkling at night; includes a forest chairlift.",
    badge: "Night View & Lift"
  },
  {
    id: "pc-bhurban",
    title: "Pearl Continental Bhurban",
    type: "hotel",
    altitude: "1,850 m",
    coords: { x: 62, y: 42 },
    realCoords: { lat: 33.9567, lng: 73.4517 },
    description: "Luxury resort featuring golf course, fine dining, and private forest walking paths.",
    badge: "5-Star Resort"
  },
  {
    id: "patriata-terminal",
    title: "Patriata Chairlift & Cable Car Terminal",
    type: "attraction",
    altitude: "2,200 m",
    coords: { x: 68, y: 72 },
    realCoords: { lat: 33.9022, lng: 73.4731 },
    description: "The famous New Murree chairlift system floating over 7 kilometers of untouched pine ravines.",
    badge: "Cable Car Ride"
  },
  {
    id: "mukshpuri-top",
    title: "Mukshpuri Top (9,200 ft)",
    type: "hiking",
    altitude: "2,800 m",
    coords: { x: 26, y: 22 },
    realCoords: { lat: 34.0620, lng: 73.4180 },
    description: "The second highest peak in Galiyat. A glorious trek surrounded by wildflowers and silver fir trees.",
    badge: "Himalayan Trek"
  },
  {
    id: "ayubia-pipeline",
    title: "Ayubia National Park & Pipeline Track",
    type: "attraction",
    altitude: "2,400 m",
    coords: { x: 35, y: 32 },
    realCoords: { lat: 34.0298, lng: 73.4022 },
    description: "Historical 4km walking corridor above the valleys, featuring wildlife sanctuaries and chairlifts.",
    badge: "Historic Walk"
  },
  {
    id: "arcadian-nathia",
    title: "Arcadian Sprucewoods Nathia Gali",
    type: "hotel",
    altitude: "2,410 m",
    coords: { x: 22, y: 28 },
    realCoords: { lat: 34.0722, lng: 73.3814 },
    description: "Charming alpine stone lodge tucked into the serene cedar sanctuary of Nathia Gali.",
    badge: "Alpine Chalet"
  }
];

export const ARTICLES: JournalArticle[] = [
  {
    id: "winter-snowfall-guide-murree",
    title: "The Connoisseur's Guide to Murree Snowfall: Roads, Warmth & Hidden Views",
    category: "Weather & Driving",
    readTime: "5 min read",
    author: "Malik Naveed, Mountain Guide",
    date: "Autumn 2026 Edition",
    image: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=800&q=80",
    excerpt: "From 4x4 tire chains to avoiding weekend bottlenecks on the Expressway, here is how to experience winter snowfall like a mountain insider.",
    content: `When the first winter clouds gather over the Pir Panjal range, Murree transforms into a silent, snow-draped sanctuary. But mountain winter travel requires preparation.

The Islamabad-Murree Expressway (N-75) provides modern four-lane access up to Lower Topa. However, once you ascend towards Bank Road, Kashmir Point, and the high Galiyat pass, temperatures plummet and black ice can form within minutes.

Always prefer a dedicated 4x4 vehicle with all-terrain snow tires. Maintain a gentle throttle, avoid sudden braking, and carry wool blankets and thermos flasks. For real-time mountain updates, our team at GPO Chowk is on standby 24/7.`
  },
  {
    id: "mukshpuri-trek-beginners-guide",
    title: "Scaling Mukshpuri: An Unhurried Hike Through Pakistan's Enchanted Pine Forests",
    category: "Adventure & Trekking",
    readTime: "7 min read",
    author: "Sobia Khan, Alpine Naturalist",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    excerpt: "Why the Dunga Gali route is the most serene way to reach the 9,200ft summit, what birds to listen for, and where to rest with warm mountain kehwa.",
    content: `Mukshpuri stands at 2,800 meters (9,200 ft), the second highest summit in the Abbottabad Galiyat region. Starting from Dunga Gali or Nathia Gali, the trail winds beneath towering Himalayan blue pines and silver firs.

The gentle 3.5 km trail takes roughly 2.5 hours for moderate hikers. At the summit plateau, travelers are greeted by expansive sub-alpine meadows and a breathtaking 360-degree panorama stretching from the Jhelum river basin across to the snowfields of Nanga Parbat on clear mornings.`
  },
  {
    id: "colonial-architecture-bank-road",
    title: "Echoes of the 1800s: The Preserved Colonial Heritage of Murree's Bank Road",
    category: "Murree Heritage",
    readTime: "4 min read",
    author: "Farhan Qureshi, Cultural Historian",
    date: "Heritage Series",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover the architectural secrets behind the General Post Office (GPO), Holy Trinity Church, and the historic wooden cottages along Bank Road.",
    content: `Established in the 1850s as a high-altitude sanatorium and summer administrative outpost, Murree retains some of Pakistan's finest Victorian and Tudor-revival timber architecture.

The General Post Office (GPO) at the junction of Mall Road and Bank Road remains the historic heartbeat of the town. With its gabled timber eaves, red brickwork, and brass postal heritage, it stands as a testament to Murree's rich travel tradition.`
  },
  {
    id: "bhurban-luxury-retreat-guide",
    title: "Highland Sanctuaries: The Finest Suites & Alpine Stays in Bhurban",
    category: "Luxury Travel",
    readTime: "6 min read",
    author: "Ayesha Malik",
    date: "Luxury Review",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    excerpt: "Where to find 9-hole golf amidst pine canopies, heated infinity views, and candlelit Kashmiri dinners overlooking the valleys.",
    content: `Perched on an amphitheater ridge at 1,850 meters, Bhurban provides a sun-drenched microclimate distinct from the higher Galiyat. It is the premier retreat for discerning couples, corporate executives, and international travelers seeking European luxury within two hours of Islamabad.`
  }
];

export const TRAVEL_JOURNAL_ARTICLES = ARTICLES;

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Dr. Tariq & Family",
    city: "Lahore",
    rating: 5,
    date: "August 2026",
    tripType: "Bhurban & Murree 3-Day Family Retreat",
    comment: "Murree Classic Travel gave our family an impeccable holiday. The Prado was spotless, our driver Tariq knew every hill turn safely, and the hotel check-in at Bhurban was completely seamless. Highly recommended!"
  },
  {
    id: "rev-2",
    author: "Zainab & Hamza",
    city: "Karachi",
    rating: 5,
    date: "July 2026",
    tripType: "Nathia Gali Honeymoon & Mukshpuri Walk",
    comment: "Being from Karachi, we were unsure about high altitude driving in the rain. Murree Classic's team took care of all transport and guided us on the Mukshpuri trek. Truly a luxury standard rarely seen in Pakistani travel."
  },
  {
    id: "rev-3",
    author: "Imran S. (Corporate Lead)",
    city: "Islamabad",
    rating: 5,
    date: "September 2026",
    tripType: "Executive Coaster Group Tour to Patriata",
    comment: "Organized a corporate retreat for 18 people. Transparent pricing, zero hidden charges, and polite professional coordination from the GPO Chowk office. We will book all future company trips through them."
  }
];

export const TESTIMONIALS = REVIEWS;

