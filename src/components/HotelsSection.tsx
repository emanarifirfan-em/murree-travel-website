import React, { useState } from 'react';
import { 
  Hotel as HotelIcon, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Wifi, 
  Coffee, 
  Check, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { HOTELS, BUSINESS_INFO } from '../data/travelData';
import { Hotel } from '../types';

interface HotelsSectionProps {
  onReserveHotel: (hotel: Hotel) => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({ onReserveHotel }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredHotels = activeFilter === 'all'
    ? HOTELS
    : HOTELS.filter(h => h.location.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="hotels" className="py-24 bg-[#f8faf9] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <HotelIcon className="w-3.5 h-3.5 text-[#c49838]" />
              <span>HANDPICKED HIGHLAND ACCOMMODATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Verified Mountain Stays
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light">
              From colonial heritage suites near Bank Road to 5-star forest sanctuaries in Bhurban. We coordinate reservations with verified highland properties.
            </p>
          </div>

          {/* Location filter pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 p-1 rounded-xl bg-white border border-[#d6e2db] shadow-xs">
            {[
              { id: 'all', label: 'All Stays' },
              { id: 'bhurban', label: 'Bhurban' },
              { id: 'nathia', label: 'Nathia Gali' },
              { id: 'murree', label: 'Murree' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#183e2b] text-white font-bold shadow-xs'
                    : 'text-[#475e52] hover:text-[#122319]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="rounded-2xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Star rating */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 flex items-center space-x-1 text-xs text-[#a87920] shadow-xs font-bold">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#a87920]" />
                  ))}
                  <span className="font-mono ml-1 text-[#122319]">{(hotel.ratingScore || 4.8).toFixed(1)}</span>
                </div>

                {/* Availability */}
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-md bg-[#f0f6f2] border border-[#cbdad1] text-[#183e2b] text-[10px] uppercase font-mono font-bold shadow-xs">
                  {hotel.availability}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#a87920] font-semibold">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{hotel.location}</span>
                    </span>
                    <span className="text-[#5e776a] font-mono text-[11px]">{hotel.roomCategory}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#122319] font-normal mt-2 group-hover:text-[#183e2b] transition-colors">
                    {hotel.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475e52] mt-2.5 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {hotel.amenities.map((am, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#f0f5f2] border border-[#d2dfd7] text-[11px] text-[#244232]"
                      >
                        {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-6 pt-4 border-t border-[#e8f0ec] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#6b8577] uppercase tracking-wider">{hotel.cancellationPolicy}</div>
                    <div className="font-mono text-lg font-bold text-[#122319]">
                      PKR {hotel.pricePerNightPKR.toLocaleString()} <span className="text-xs text-[#6b8577] font-sans font-normal">/ night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onReserveHotel(hotel)}
                    className="px-5 py-2.5 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Reserve Room</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f2ce79]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
