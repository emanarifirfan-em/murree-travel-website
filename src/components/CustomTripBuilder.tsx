import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  Hotel, 
  Utensils, 
  Camera, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';
import { DESTINATIONS, BUSINESS_INFO } from '../data/travelData';

interface CustomTripBuilderProps {
  onOpenBookingWithCustom: (summary: any) => void;
}

export const CustomTripBuilder: React.FC<CustomTripBuilderProps> = ({
  onOpenBookingWithCustom
}) => {
  const [selectedDests, setSelectedDests] = useState<string[]>(['Murree Hill Station', 'Nathia Gali']);
  const [durationDays, setDurationDays] = useState(3);
  const [guestCount, setGuestCount] = useState(2);
  const [accommodationTier, setAccommodationTier] = useState('5-Star Luxury Resort (PC Bhurban / Arcadian)');
  const [vehicleTier, setVehicleTier] = useState('4x4 Prado SUV');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Patriata Cable Car VIP Access',
    'Mukshpuri Pine Ridge Trek',
    'Sunset Coffee at Kashmir Point'
  ]);
  const [diningChoice, setDiningChoice] = useState('Highland Trout & Traditional Shinwari Karahi');
  const [specialAddon, setSpecialAddon] = useState('Dedicated Senior Mountain Guide');

  const toggleDest = (destName: string) => {
    if (selectedDests.includes(destName)) {
      if (selectedDests.length > 1) {
        setSelectedDests(selectedDests.filter(d => d !== destName));
      }
    } else {
      setSelectedDests([...selectedDests, destName]);
    }
  };

  const toggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setSelectedActivities(selectedActivities.filter(a => a !== act));
    } else {
      setSelectedActivities([...selectedActivities, act]);
    }
  };

  // Dynamic estimate calculation based on user selections
  const baseTransportPerDay = vehicleTier.includes('Prado') ? 22000 : vehicleTier.includes('Hiace') ? 17500 : 9500;
  const hotelPerNight = accommodationTier.includes('5-Star') ? 38000 : accommodationTier.includes('Boutique') ? 24000 : 16000;
  const activitiesTotal = selectedActivities.length * 3500 * guestCount;
  const estimatedTotal = (baseTransportPerDay * durationDays) + (hotelPerNight * (durationDays - 1)) + activitiesTotal;

  const handleLaunchBooking = () => {
    onOpenBookingWithCustom({
      destination: selectedDests.join(' & '),
      travellers: guestCount,
      notes: `Custom Itinerary: ${accommodationTier}, ${vehicleTier}, Dining: ${diningChoice}, Special: ${specialAddon}`
    });
  };

  return (
    <section id="trip-builder" className="py-24 bg-[#f4f8f5] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#c49838]" />
              <span>CUSTOM TRIP ARCHITECT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Design Your Mountain Expedition
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light">
              Customize multiple destinations, lodging tiers, vehicle classes, and curated ridge experiences. Real-time itinerary generation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Multiple Destinations */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6e2db] shadow-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-[#122319] block mb-3">
                1. Select Valley Bases (Choose 1 or more)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DESTINATIONS.map((d) => {
                  const isChecked = selectedDests.includes(d.name);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleDest(d.name)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#183e2b] border-[#183e2b] text-white shadow-xs'
                          : 'bg-[#f8faf9] border-[#d2dfd7] text-[#244232] hover:border-[#a0b8aa]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{d.name.split(' ')[0]}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-[#f2ce79]" />}
                      </div>
                      <div className={`text-[10px] font-mono mt-1 ${isChecked ? 'text-emerald-100' : 'text-[#6b8577]'}`}>
                        {d.altitude}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration & Guests */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6e2db] shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#122319] block mb-2">
                  2. Duration ({durationDays} Days / {durationDays - 1} Nights)
                </label>
                <div className="flex items-center space-x-2">
                  {[2, 3, 4, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDurationDays(d)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        durationDays === d
                          ? 'bg-[#183e2b] text-white border-[#183e2b] font-bold shadow-xs'
                          : 'bg-[#f8faf9] border-[#d2dfd7] text-[#244232] hover:border-[#a0b8aa]'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#122319] block mb-2">
                  3. Party Size ({guestCount} Guests)
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 4, 8].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGuestCount(g)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        guestCount === g
                          ? 'bg-[#183e2b] text-white border-[#183e2b] font-bold shadow-xs'
                          : 'bg-[#f8faf9] border-[#d2dfd7] text-[#244232] hover:border-[#a0b8aa]'
                      }`}
                    >
                      {g === 1 ? 'Solo' : g === 2 ? 'Couple' : `${g}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Lodging & Fleet */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6e2db] shadow-xs space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#122319] block mb-2">
                  4. Accommodation Standard
                </label>
                <select
                  value={accommodationTier}
                  onChange={(e) => setAccommodationTier(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#f8faf9] border border-[#cbdad1] text-[#122319] text-xs focus:border-[#183e2b] focus:outline-none"
                >
                  <option value="5-Star Luxury Resort (PC Bhurban / Arcadian)">5-Star Luxury Resort (PC Bhurban / Arcadian Sprucewoods)</option>
                  <option value="Heritage Boutique (Lockwood Hotel Bank Road)">Heritage Boutique (Lockwood Hotel Bank Road Murree)</option>
                  <option value="Executive Alpine Chalet (Pine Top Resort)">Executive Alpine Chalet (Pine Top Resort Kashmir Point)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#122319] block mb-2">
                  5. Mountain Vehicle & Chauffeur
                </label>
                <select
                  value={vehicleTier}
                  onChange={(e) => setVehicleTier(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#f8faf9] border border-[#cbdad1] text-[#122319] text-xs focus:border-[#183e2b] focus:outline-none"
                >
                  <option value="4x4 Prado SUV">Toyota Land Cruiser Prado TX (4x4 Mountain Tested)</option>
                  <option value="Executive Sedan Corolla Grande">Toyota Corolla Altis Grande (Air Conditioned & Chauffeur)</option>
                  <option value="Grand Cabin Hiace 14-Seater">Toyota Hiace Grand Cabin (12 - 14 Guests)</option>
                  <option value="Luxury Coaster 24-Seater">Toyota Coaster Luxury Bus (24 Guests)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Experiences & Activities */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6e2db] shadow-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-[#122319] block mb-3">
                6. Mountain Experiences (Select Desired)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Patriata Cable Car VIP Access',
                  'Mukshpuri Pine Ridge Trek',
                  'Ayubia Pipeline Track Walk',
                  'Sunset Coffee at Kashmir Point',
                  'Private Evening Bonfire & BBQ',
                  'Highland Flora Photography Tour'
                ].map((act) => {
                  const isChecked = selectedActivities.includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => toggleActivity(act)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#183e2b] border-[#183e2b] text-white shadow-xs'
                          : 'bg-[#f8faf9] border-[#d2dfd7] text-[#244232] hover:border-[#a0b8aa]'
                      }`}
                    >
                      <span>{act}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#f2ce79]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Itinerary Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#d6e2db] shadow-xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#e8f0ec] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#a87920] font-bold uppercase tracking-wider">LIVE ITINERARY PREVIEW</span>
                <h3 className="text-xl font-serif text-[#122319]">{durationDays}-Day Bespoke Journey</h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#f0f6f2] border border-[#cbdad1] text-[#183e2b] text-xs font-mono font-bold">
                {guestCount} Guests
              </span>
            </div>

            {/* Generated Route Schedule */}
            <div className="space-y-3 text-xs text-[#384e41]">
              <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e2eae5]">
                <div className="font-bold text-[#183e2b] mb-1">Day 01 • Islamabad to {selectedDests[0] || 'Murree'}</div>
                <p className="text-[#475e52]">
                  Morning private pickup via Expressway N-75. Check-in at {accommodationTier.split('(')[0]}. Afternoon excursion: {selectedActivities[0] || 'Scenic ridge viewpoints'}.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e2eae5]">
                <div className="font-bold text-[#183e2b] mb-1">
                  Day 02 • {selectedDests[1] || selectedDests[0] || 'Galiyat'} Exploration
                </div>
                <p className="text-[#475e52]">
                  Breakfast overlooking mountain pine valley. Private transfer for {selectedActivities[1] || 'highland ridge stroll'}. Evening Kehwa & local specialty cuisine.
                </p>
              </div>

              {durationDays >= 3 && (
                <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e2eae5]">
                  <div className="font-bold text-[#183e2b] mb-1">Day 03 • Mountain Farewell & Descent</div>
                  <p className="text-[#475e52]">
                    Late checkout, artisanal souvenir stop at Bank Road GPO Chowk, and chauffeured return to Islamabad.
                  </p>
                </div>
              )}
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-xl bg-[#f0f6f2] border border-[#cbdad1] space-y-2">
              <div className="flex justify-between text-xs text-[#5e776a]">
                <span>Estimated Journey Budget</span>
                <span className="font-mono text-[#183e2b] font-bold">Full Package</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#122319]">
                PKR {estimatedTotal.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#475e52] flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Includes certified chauffeur, fuel, lodging, and tax</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleLaunchBooking}
                className="w-full py-3.5 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request This Custom Itinerary</span>
                <ArrowRight className="w-4 h-4 text-[#f2ce79]" />
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hello Murree Classic, I configured a custom ${durationDays}-day trip for ${guestCount} guests (${selectedDests.join(', ')}). Could you provide exact date availability?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#f0f6f2] hover:bg-[#e4eee7] border border-[#cbdad1] text-[#183e2b] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Inquiry (+92 321 5603396)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
