import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Check, 
  X,
  PhoneCall
} from 'lucide-react';
import { DESTINATIONS, BUSINESS_INFO } from '../data/travelData';
import { Destination } from '../types';

interface DestinationExplorerProps {
  onSelectDestinationForBooking: (destName: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  onSelectDestinationForBooking
}) => {
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-24 bg-[#f8faf9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <Compass className="w-3.5 h-3.5 text-[#c49838]" />
              <span>THE HIGHLAND COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Destinations Across Murree & The Galiyat
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light leading-relaxed">
              Each highland valley holds its own distinct climate, pine woodlands, and quiet mountain viewpoints.
            </p>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#d6e2db] hover:border-[#b8cfc2] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              {/* Image Container with Cinematic Zoom */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Altitude Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[11px] font-mono text-[#a87920] font-bold shadow-xs">
                  {dest.altitude}
                </div>

                {/* Distance */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[11px] text-[#122319] font-medium shadow-xs">
                  {dest.distanceFromIslamabad}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-serif font-normal drop-shadow-sm">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#a87920] font-semibold italic">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-[#475e52] mt-2.5 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-[#f0f5f2] border border-[#d2dfd7] text-[#244232] font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Price & Action */}
                <div className="mt-6 pt-4 border-t border-[#e8f0ec] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6b8577]">Verified Base Rate</div>
                    <div className="font-mono text-sm font-bold text-[#122319]">
                      From PKR {dest.startingPricePKR.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveModalDest(dest)}
                      className="px-3 py-2 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f0eb] text-xs text-[#183e2b] font-medium border border-[#d2dfd7] transition-all cursor-pointer"
                      title="View Details"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => onSelectDestinationForBooking(dest.name)}
                      className="px-3.5 py-2 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center space-x-1 shadow-sm cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#f2ce79]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Modal Details */}
      {activeModalDest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white border border-[#d2dfd7] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="relative h-64 sm:h-72">
              <img
                src={activeModalDest.image}
                alt={activeModalDest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              <button
                onClick={() => setActiveModalDest(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#122319] shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-mono text-[#f2ce79] font-bold uppercase">{activeModalDest.altitude}</span>
                <h3 className="text-2xl sm:text-3xl font-serif">{activeModalDest.name}</h3>
                <p className="text-xs text-slate-200 mt-1 italic">{activeModalDest.tagline}</p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#384e41]">
              <div>
                <h4 className="font-semibold text-[#122319] uppercase text-xs tracking-wider mb-1">
                  About this Highland Destination
                </h4>
                <p className="text-xs leading-relaxed text-[#475e52]">
                  {activeModalDest.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#e8f0ec] text-xs">
                <div>
                  <span className="text-[#6b8577]">Distance from Islamabad:</span>
                  <p className="font-semibold text-[#122319]">{activeModalDest.distanceFromIslamabad}</p>
                </div>
                <div>
                  <span className="text-[#6b8577]">Recommended Duration:</span>
                  <p className="font-semibold text-[#122319]">{activeModalDest.recommendedDuration}</p>
                </div>
                <div>
                  <span className="text-[#6b8577]">Best Season:</span>
                  <p className="font-semibold text-[#122319]">{activeModalDest.bestTimeToVisit}</p>
                </div>
                <div>
                  <span className="text-[#6b8577]">Local Base:</span>
                  <p className="font-semibold text-[#122319]">Managed via GPO Chowk Desk</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e8f0ec]">
                <h4 className="font-semibold text-[#122319] uppercase text-xs tracking-wider mb-2">
                  Key Attractions & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalDest.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-[#244232]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e8f0ec] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-[#6b8577]">Package Starting Rate</span>
                  <div className="font-mono text-base font-bold text-[#122319]">
                    PKR {activeModalDest.startingPricePKR.toLocaleString()} <span className="text-xs font-sans font-normal text-[#6b8577]">/ person</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Inquiry for ${activeModalDest.name} package`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#f0f6f2] hover:bg-[#e4eee7] border border-[#cbdad1] text-[#183e2b]"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setActiveModalDest(null);
                      onSelectDestinationForBooking(activeModalDest.name);
                    }}
                    className="px-5 py-3 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Book Journey Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
