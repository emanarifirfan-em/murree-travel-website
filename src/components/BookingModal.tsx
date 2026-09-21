import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Car, 
  Hotel as HotelIcon, 
  Sparkles, 
  Phone, 
  Mail, 
  Download, 
  Share2, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { 
  DESTINATIONS, 
  HOTELS, 
  VEHICLES, 
  EXPERIENCES, 
  BUSINESS_INFO 
} from '../data/travelData';
import { 
  TripType, 
  Hotel, 
  Vehicle, 
  ActivityExperience, 
  Booking 
} from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    destination?: string;
    date?: string;
    travellers?: number;
    tripType?: TripType;
    hotelId?: string;
    packageId?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  // Current step 1 to 10
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Destination
  const [destination, setDestination] = useState(initialData?.destination || 'Murree Hill Station');
  
  // Step 2: Date
  const defaultDepartureDate = initialData?.date || new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0];
  const [travelDate, setTravelDate] = useState<string>(defaultDepartureDate);
  const [nights, setNights] = useState(2);

  // Step 3: Travellers
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Step 4: Trip Type
  const [tripType, setTripType] = useState<TripType>(initialData?.tripType || 'family');

  // Step 5: Accommodation
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(() => {
    return HOTELS[0];
  });

  // Step 6: Transport
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(() => {
    return VEHICLES[1]; // Prado SUV default
  });

  // Step 7: Experiences
  const [selectedActivities, setSelectedActivities] = useState<ActivityExperience[]>([
    EXPERIENCES[0]
  ]);

  // Step 8: Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [cnicOrPassport, setCnicOrPassport] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [formError, setFormError] = useState('');

  // Step 10: Final Confirmed Booking State
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialData when modal opens
  useEffect(() => {
    if (initialData?.destination) setDestination(initialData.destination);
    if (initialData?.date) setTravelDate(initialData.date);
    if (initialData?.travellers) setAdults(Math.max(1, initialData.travellers));
    if (initialData?.tripType) setTripType(initialData.tripType);
    if (initialData?.hotelId) {
      const found = HOTELS.find(h => h.id === initialData.hotelId);
      if (found) setSelectedHotel(found);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // Toggle activity selection
  const toggleActivity = (act: ActivityExperience) => {
    if (selectedActivities.some(a => a.id === act.id)) {
      setSelectedActivities(selectedActivities.filter(a => a.id !== act.id));
    } else {
      setSelectedActivities([...selectedActivities, act]);
    }
  };

  // Price calculations
  const basePrice = 5000;
  const hotelTotal = selectedHotel ? selectedHotel.pricePerNightPKR * nights : 0;
  const transportTotal = selectedVehicle ? selectedVehicle.pricePerDayPKR * (nights + 1) : 0;
  const activitiesTotal = selectedActivities.reduce((sum, act) => sum + (act.pricePKR * (adults + children)), 0);
  const subtotal = basePrice + hotelTotal + transportTotal + activitiesTotal;
  const serviceTaxes = Math.round(subtotal * 0.05); // 5% provincial service tax
  const discount = (adults + children > 4) ? 5000 : 0; // Group discount
  const grandTotal = subtotal + serviceTaxes - discount;

  const handleNextStep = () => {
    if (currentStep === 8) {
      // Validate customer details
      if (!customerName.trim() || !customerPhone.trim()) {
        setFormError('Please enter your full name and contact phone number.');
        return;
      }
      setFormError('');
    }
    setCurrentStep(prev => Math.min(prev + 1, 10));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Confirm booking & save to server
  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        destination,
        travelDate,
        returnDate: (() => {
          const d = new Date(travelDate);
          d.setDate(d.getDate() + nights);
          return d.toISOString().split('T')[0];
        })(),
        travellers: {
          adults,
          children,
          type: tripType
        },
        hotel: selectedHotel ? {
          id: selectedHotel.id,
          name: selectedHotel.name,
          roomCategory: selectedHotel.roomCategory,
          nights,
          price: hotelTotal
        } : undefined,
        transport: selectedVehicle ? {
          id: selectedVehicle.id,
          name: selectedVehicle.name,
          days: nights + 1,
          price: transportTotal
        } : undefined,
        selectedExperiences: selectedActivities.map(a => ({
          id: a.id,
          name: a.name,
          price: a.pricePKR * (adults + children)
        })),
        customer: {
          name: customerName,
          phone: customerPhone,
          whatsapp: customerWhatsApp || customerPhone,
          email: customerEmail,
          cnicOrPassport,
          specialRequirements
        },
        pricing: {
          basePrice,
          accommodationTotal: hotelTotal,
          transportTotal,
          activitiesTotal,
          taxesAndService: serviceTaxes,
          discount,
          grandTotalPKR: grandTotal
        }
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedBooking(data.booking);
        setCurrentStep(10);
      }
    } catch (err) {
      console.error('Reservation submission error:', err);
      // Fallback local booking object
      const fallback: Booking = {
        id: `MCT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        destination,
        travelDate,
        travellers: { adults, children, type: tripType },
        customer: {
          name: customerName,
          phone: customerPhone,
          whatsapp: customerWhatsApp || customerPhone,
          email: customerEmail
        },
        pricing: {
          basePrice,
          accommodationTotal: hotelTotal,
          transportTotal,
          activitiesTotal,
          taxesAndService: serviceTaxes,
          discount,
          grandTotalPKR: grandTotal
        },
        status: 'PENDING_REVIEW',
        paymentStatus: 'UNPAID',
        selectedExperiences: selectedActivities.map(a => ({ id: a.id, name: a.name, price: a.pricePKR }))
      };
      setConfirmedBooking(fallback);
      setCurrentStep(10);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    if (!confirmedBooking) return '#';
    const text = `*MURREE CLASSIC TRAVEL & TOUR - BOOKING RESERVATION*
Booking Reference: ${confirmedBooking.id}
Destination: ${confirmedBooking.destination}
Travel Date: ${confirmedBooking.travelDate} (${nights} Nights)
Travellers: ${confirmedBooking.travellers.adults} Adults, ${confirmedBooking.travellers.children} Children (${confirmedBooking.travellers.type.toUpperCase()})
Accommodation: ${selectedHotel?.name || 'Self-Arranged'}
Transport: ${selectedVehicle?.name || 'Self-Arranged'}
Estimated Total: PKR ${confirmedBooking.pricing.grandTotalPKR.toLocaleString()}
Lead Guest: ${confirmedBooking.customer.name} (${confirmedBooking.customer.phone})

Hello, please confirm real-time availability and send IBFT deposit details.`;

    return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#04080c]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#0b141d] border border-[#233544] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#0e1924] border-b border-[#1f2f3e] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-[#162e24] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                STEP {currentStep} OF 10
              </div>
              <h3 className="text-base sm:text-lg font-serif text-white font-normal">
                {currentStep === 1 && "Select Mountain Destination"}
                {currentStep === 2 && "Choose Travel Date & Duration"}
                {currentStep === 3 && "Number of Travellers"}
                {currentStep === 4 && "Select Travel Style"}
                {currentStep === 5 && "Choose Mountain Accommodation"}
                {currentStep === 6 && "Select Transport & Vehicle"}
                {currentStep === 7 && "Add Curated Mountain Experiences"}
                {currentStep === 8 && "Lead Traveler Contact Information"}
                {currentStep === 9 && "Transparent Price Breakdown"}
                {currentStep === 10 && "Booking Reservation Voucher"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-[#14222f] hover:bg-[#1c3042] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#111c26] h-1.5">
          <div 
            className="bg-gradient-to-r from-[#d4af37] to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 10) * 100}%` }}
          />
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-200">
          {/* STEP 1: DESTINATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                Where would you like to escape? Select your primary base in Murree or the high Galiyat ridge.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {DESTINATIONS.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => setDestination(dest.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      destination === dest.name
                        ? 'bg-[#152a22] border-[#d4af37] shadow-lg'
                        : 'bg-[#101b24] border-[#1e2f3d] hover:border-[#3a5369]'
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-1 flex items-center justify-between">
                      <span>{dest.name}</span>
                      {destination === dest.name && <Check className="w-4 h-4 text-[#d4af37]" />}
                    </div>
                    <div className="text-[11px] text-[#d4af37] font-mono mb-2">{dest.altitude}</div>
                    <p className="text-xs text-slate-400 line-clamp-2">{dest.tagline}</p>
                  </div>
                ))}

                <div
                  onClick={() => setDestination("Custom Greater Galiyat Expedition")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    destination === "Custom Greater Galiyat Expedition"
                      ? 'bg-[#152a22] border-[#d4af37]'
                      : 'bg-[#101b24] border-[#1e2f3d] hover:border-[#3a5369]'
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">Custom Destination</div>
                  <div className="text-[11px] text-slate-400">Multi-Gali Circuit / Thandiani</div>
                  <p className="text-xs text-slate-400 mt-2">Tailored route with private chauffeur assistance.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TRAVEL DATE */}
          {currentStep === 2 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Departure Date from Islamabad / Rawalpindi
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Length of Mountain Stay: <span className="text-[#d4af37]">{nights} Nights ({nights + 1} Days)</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNights(n)}
                      className={`py-3 rounded-lg border font-semibold text-sm transition-all ${
                        nights === n
                          ? 'bg-[#d4af37] text-[#0b141d] border-[#d4af37]'
                          : 'bg-[#121c25] border-[#233544] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {n} {n === 1 ? 'Night' : 'Nights'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111e28] border border-[#203342] text-xs text-slate-300 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Expressway Road Monitoring Active</div>
                  <div className="mt-0.5 text-slate-400">Our desk coordinates departures to avoid peak toll traffic and ensure pleasant hill driving.</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TRAVELLERS */}
          {currentStep === 3 && (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-[#111c26] border border-[#233544] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Adults (Age 12+)</div>
                  <div className="text-xs text-slate-400">Standard seat & accommodation allocation</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-9 h-9 rounded-full bg-[#182734] border border-[#2b4153] text-white flex items-center justify-center text-lg hover:border-slate-400"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg text-[#d4af37] w-6 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-9 h-9 rounded-full bg-[#182734] border border-[#2b4153] text-white flex items-center justify-center text-lg hover:border-slate-400"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111c26] border border-[#233544] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Children (Under 12)</div>
                  <div className="text-xs text-slate-400">Discounted activity passes & shared bedding</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-9 h-9 rounded-full bg-[#182734] border border-[#2b4153] text-white flex items-center justify-center text-lg hover:border-slate-400"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg text-[#d4af37] w-6 text-center">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-9 h-9 rounded-full bg-[#182734] border border-[#2b4153] text-white flex items-center justify-center text-lg hover:border-slate-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TRIP TYPE */}
          {currentStep === 4 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { type: 'family', label: 'Family Holiday', desc: 'Relaxed pacing, child-friendly activities' },
                { type: 'couple', label: 'Couple / Honeymoon', desc: 'Scenic secluded suites, candlelit dinners' },
                { type: 'adventure', label: 'Adventure & Trek', desc: 'High trails, Mukshpuri peak, camping' },
                { type: 'luxury', label: '5-Star Luxury', desc: 'PC Bhurban, Prado 4x4, golf retreat' },
                { type: 'friends', label: 'Friends Getaway', desc: 'BBQ bonfires, jeep excursions' },
                { type: 'corporate', label: 'Corporate Retreat', desc: 'Coaster transport, seminar halls' },
                { type: 'student', label: 'Student Expedition', desc: 'Cost-effective group packages' },
                { type: 'custom', label: 'Bespoke Custom', desc: 'Designed exactly around your itinerary' }
              ].map((item) => (
                <div
                  key={item.type}
                  onClick={() => setTripType(item.type as TripType)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    tripType === item.type
                      ? 'bg-[#152a22] border-[#d4af37] shadow-lg'
                      : 'bg-[#101b24] border-[#1e2f3d] hover:border-[#3a5369]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
                  </div>
                  {tripType === item.type && (
                    <div className="mt-3 text-[#d4af37] flex items-center text-xs font-semibold">
                      <Check className="w-3.5 h-3.5 mr-1" /> Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: ACCOMMODATION */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                Verified luxury hotels with transparent mountain pricing and cancellation policies:
              </p>
              <div className="space-y-3">
                {HOTELS.map((hotel) => (
                  <div
                    key={hotel.id}
                    onClick={() => setSelectedHotel(hotel)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row gap-4 ${
                      selectedHotel?.id === hotel.id
                        ? 'bg-[#152822] border-[#d4af37] shadow-lg'
                        : 'bg-[#101b24] border-[#1e2f3d] hover:border-[#385369]'
                    }`}
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full sm:w-36 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white">{hotel.name}</h4>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            hotel.availability === 'AVAILABLE' 
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
                              : 'bg-amber-950/80 text-amber-300 border-amber-800'
                          }`}>
                            {hotel.availability}
                          </span>
                        </div>
                        <div className="text-xs text-[#d4af37]">{hotel.location} • {hotel.roomCategory}</div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{hotel.description}</p>
                      </div>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1e2f3d]/60 text-xs">
                        <span className="text-slate-400">{hotel.cancellationPolicy}</span>
                        <div className="text-right">
                          <span className="font-mono font-bold text-white">PKR {hotel.pricePerNightPKR.toLocaleString()}</span>
                          <span className="text-slate-400 text-[10px]"> / night</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: TRANSPORT */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                All vehicles include professional hill-station chauffeurs, fuel allowance, and mountain safety equipment:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VEHICLES.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedVehicle?.id === v.id
                        ? 'bg-[#152822] border-[#d4af37] shadow-lg'
                        : 'bg-[#101b24] border-[#1e2f3d] hover:border-[#385369]'
                    }`}
                  >
                    <div>
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-36 object-cover rounded-lg mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{v.name}</h4>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Chauffeur Included
                        </span>
                      </div>
                      <div className="text-xs text-[#d4af37] mt-0.5">{v.type}</div>
                      <div className="text-xs text-slate-400 mt-2 space-y-1">
                        <div>Seats: {v.capacityPassengers} Guests • Luggage: {v.capacityLuggage}</div>
                        <div>Mountain Traction: All-weather hill tested</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1e2f3d] flex items-center justify-between">
                      <span className="text-xs text-slate-400">Per Day Rate</span>
                      <span className="font-mono font-bold text-white text-sm">
                        PKR {v.pricePerDayPKR.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: EXPERIENCES */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                Select optional curated mountain experiences to add to your personalized journey:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXPERIENCES.map((act) => {
                  const isSelected = selectedActivities.some(a => a.id === act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleActivity(act)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-[#152822] border-[#d4af37]'
                          : 'bg-[#101b24] border-[#1e2f3d] hover:border-[#385369]'
                      }`}
                    >
                      <div className="flex-1 pr-3">
                        <div className="text-sm font-bold text-white">{act.name}</div>
                        <div className="text-xs text-[#d4af37] mt-0.5">{act.location} • {act.duration}</div>
                        <p className="text-xs text-slate-400 mt-1">{act.description}</p>
                        <div className="text-xs font-mono font-bold text-emerald-400 mt-2">
                          PKR {act.pricePKR.toLocaleString()} / person
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded flex items-center justify-center mt-1 border ${
                        isSelected ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: CUSTOMER DETAILS */}
          {currentStep === 8 && (
            <div className="space-y-4 max-w-xl mx-auto">
              <p className="text-sm text-slate-400">
                Please provide lead guest contact details. Your reservation voucher will be sent to WhatsApp and Email.
              </p>

              {formError && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number (For Instant Confirmation)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +92 321 5603396"
                    value={customerWhatsApp}
                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  CNIC / Passport Number (Optional, for hotel verification)
                </label>
                <input
                  type="text"
                  placeholder="37405-XXXXXXX-X"
                  value={cnicOrPassport}
                  onChange={(e) => setCnicOrPassport(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Special Requirements or Pickup Address
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Airport arrival terminal 1 at 10:30 AM, child car seat required..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#121c25] border border-[#233544] text-white focus:border-[#d4af37] focus:outline-none text-sm"
                />
              </div>
            </div>
          )}

          {/* STEP 9: PRICE SUMMARY */}
          {currentStep === 9 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="p-5 rounded-2xl bg-[#0e1721] border border-[#233544] shadow-xl space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] border-b border-[#1f303f] pb-2">
                  TRANSPARENT PRICING SUMMARY
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Agency Expedition Logistics</span>
                    <span className="font-mono">PKR {basePrice.toLocaleString()}</span>
                  </div>

                  {selectedHotel && (
                    <div className="flex justify-between text-slate-300">
                      <span>{selectedHotel.name} ({nights} Nights)</span>
                      <span className="font-mono">PKR {hotelTotal.toLocaleString()}</span>
                    </div>
                  )}

                  {selectedVehicle && (
                    <div className="flex justify-between text-slate-300">
                      <span>{selectedVehicle.name} ({nights + 1} Days)</span>
                      <span className="font-mono">PKR {transportTotal.toLocaleString()}</span>
                    </div>
                  )}

                  {activitiesTotal > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>Curated Experiences ({selectedActivities.length} selected)</span>
                      <span className="font-mono">PKR {activitiesTotal.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400 text-xs pt-2 border-t border-[#1a2835]">
                    <span>Taxes & Hill Station Service Surcharge (5%)</span>
                    <span className="font-mono">PKR {serviceTaxes.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 text-xs">
                      <span>Group Booking Advantage</span>
                      <span className="font-mono">- PKR {discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#233544] flex items-center justify-between text-lg">
                  <span className="font-bold text-white">Estimated Grand Total</span>
                  <span className="font-mono font-extrabold text-[#d4af37]">
                    PKR {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Real-time availability disclosure rule */}
              <div className="p-3.5 rounded-xl bg-[#111e28] border border-[#1f3547] text-xs text-slate-300 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Guaranteed Local Pricing Policy:</span> No hidden surcharges or surprise tolls. Availability will be confirmed by our travel team at GPO Chowk Murree within minutes of reservation.
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: CONFIRMATION VOUCHER */}
          {currentStep === 10 && confirmedBooking && (
            <div className="space-y-6 max-w-xl mx-auto text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-white">Mountain Journey Reserved</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reference: <span className="font-mono font-bold text-[#d4af37]">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Voucher Card */}
              <div className="p-5 rounded-xl bg-[#0d1620] border border-[#233544] text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-[#1b2b3a] pb-2">
                  <span className="text-slate-400">Destination</span>
                  <span className="font-bold text-white">{confirmedBooking.destination}</span>
                </div>
                <div className="flex justify-between border-b border-[#1b2b3a] pb-2">
                  <span className="text-slate-400">Travel Date</span>
                  <span className="text-white font-mono">{confirmedBooking.travelDate} ({nights} Nights)</span>
                </div>
                <div className="flex justify-between border-b border-[#1b2b3a] pb-2">
                  <span className="text-slate-400">Guest</span>
                  <span className="text-white">{confirmedBooking.customer.name} ({confirmedBooking.customer.phone})</span>
                </div>
                <div className="flex justify-between border-b border-[#1b2b3a] pb-2">
                  <span className="text-slate-400">Vehicle Assigned</span>
                  <span className="text-white">{selectedVehicle?.name || 'Private Transport'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Grand Total</span>
                  <span className="font-mono font-bold text-[#d4af37] text-sm">
                    PKR {confirmedBooking.pricing.grandTotalPKR.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp action */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#133022] hover:bg-[#1a402e] border border-[#286043] text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Send Confirmation Through WhatsApp (+92 321 5603396)</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-4 rounded-lg bg-[#14202b] border border-[#233544] text-xs text-slate-200 hover:text-white flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Print Voucher</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-lg bg-[#d4af37] text-[#0b141d] font-bold text-xs flex items-center justify-center space-x-1.5"
                  >
                    <span>Finish & Return</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Buttons */}
        {currentStep < 10 && (
          <div className="px-6 py-4 bg-[#0e1924] border-t border-[#1f2f3e] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-lg bg-[#14222f] text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 9 ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b8952b] text-[#080e14] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleConfirmReservation}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? <span>Processing Reservation...</span> : <span>Confirm Reservation</span>}
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
