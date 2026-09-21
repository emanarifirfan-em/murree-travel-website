import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  PhoneCall
} from 'lucide-react';
import { TOUR_PACKAGES, BUSINESS_INFO } from '../data/travelData';
import { TourPackage, TripType } from '../types';

interface TourPackagesSectionProps {
  onBookPackage: (pkg: TourPackage) => void;
}

export const TourPackagesSection: React.FC<TourPackagesSectionProps> = ({ onBookPackage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);
  const [expandedDay, setExpandedDay] = useState<number>(1);

  const filteredPackages = selectedCategory === 'all'
    ? TOUR_PACKAGES
    : TOUR_PACKAGES.filter(p => p.style === selectedCategory);

  return (
    <section id="journeys" className="py-24 bg-[#f4f8f5] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#c49838]" />
              <span>SIGNATURE CURATED EXPEDITIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Journeys Through Murree & Galiyat
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light">
              Carefully designed itineraries combining private 4x4 mountain transport, certified local chauffeurs, boutique pine chalets, and guided scenic ridge routes.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 p-1 rounded-xl bg-white border border-[#d6e2db] shadow-xs">
            {[
              { id: 'all', label: 'All Journeys' },
              { id: 'family', label: 'Family' },
              { id: 'couple', label: 'Honeymoon' },
              { id: 'luxury', label: '5-Star Luxury' },
              { id: 'adventure', label: 'Winter & Trek' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#183e2b] text-white font-bold shadow-xs'
                    : 'text-[#475e52] hover:text-[#122319]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image with Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[11px] font-medium text-[#183e2b] flex items-center space-x-1 shadow-xs">
                  <Clock className="w-3 h-3 text-[#a87920]" />
                  <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-md bg-[#f0f6f2] border border-[#cbdad1] text-[#183e2b] text-[10px] uppercase font-mono font-bold shadow-xs">
                  {pkg.availability}
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#a87920] font-bold flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#a87920]" />
                    <span>{pkg.destination}</span>
                  </div>

                  <h3 className="text-xl font-serif text-[#122319] font-normal mt-1 group-hover:text-[#183e2b] transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-[#475e52] mt-2 line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Key Inclusions / Highlights */}
                  <div className="mt-4 space-y-1.5">
                    {pkg.inclusions.slice(0, 3).map((h: string, i: number) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#244232]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="mt-6 pt-4 border-t border-[#e8f0ec] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#6b8577] uppercase tracking-wider">Per Person Starting</div>
                    <div className="font-mono text-base font-bold text-[#122319]">
                      PKR {pkg.pricePerPersonPKR.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setActivePackageModal(pkg);
                        setExpandedDay(1);
                      }}
                      className="px-3 py-2 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f0eb] text-xs text-[#183e2b] font-medium border border-[#d2dfd7] transition-all cursor-pointer"
                    >
                      Itinerary
                    </button>

                    <button
                      onClick={() => onBookPackage(pkg)}
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

      {/* Detailed Itinerary Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white border border-[#d2dfd7] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="relative h-56 sm:h-64">
              <img
                src={activePackageModal.image}
                alt={activePackageModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setActivePackageModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#122319] shadow-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-mono text-[#f2ce79] uppercase font-bold">
                  {activePackageModal.destination} • {activePackageModal.durationDays} Days / {activePackageModal.durationNights} Nights
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">{activePackageModal.title}</h3>
                <p className="text-xs text-slate-200 mt-1 italic">{activePackageModal.subtitle}</p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#384e41]">
              <div>
                <h4 className="font-bold text-[#122319] uppercase text-xs tracking-wider mb-1">
                  Expedition Overview
                </h4>
                <p className="text-xs leading-relaxed text-[#475e52]">
                  {activePackageModal.overview}
                </p>
              </div>

              {/* Day by Day Accordion */}
              <div>
                <h4 className="font-bold text-[#122319] uppercase text-xs tracking-wider mb-3">
                  Day-by-Day Mountain Itinerary
                </h4>
                <div className="space-y-2">
                  {activePackageModal.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="border border-[#e2eae5] rounded-xl overflow-hidden bg-[#f9fbf9]"
                    >
                      <button
                        onClick={() => setExpandedDay(expandedDay === day.day ? 0 : day.day)}
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#edf3ef] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-[#183e2b] text-white flex items-center justify-center text-xs font-mono font-bold">
                            {day.day}
                          </span>
                          <span className="font-medium text-xs sm:text-sm text-[#122319]">
                            {day.title}
                          </span>
                        </div>
                        {expandedDay === day.day ? (
                          <ChevronUp className="w-4 h-4 text-[#6b8577]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#6b8577]" />
                        )}
                      </button>

                      {expandedDay === day.day && (
                        <div className="p-4 pt-1 bg-white border-t border-[#e2eae5] space-y-2.5 text-xs text-[#475e52]">
                          <div>
                            <span className="font-semibold text-[#183e2b] uppercase text-[10px] tracking-wider block">Morning:</span>
                            <p>{day.morning}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-[#183e2b] uppercase text-[10px] tracking-wider block">Afternoon:</span>
                            <p>{day.afternoon}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-[#183e2b] uppercase text-[10px] tracking-wider block">Evening:</span>
                            <p>{day.evening}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#e8f0ec]">
                <div>
                  <h5 className="text-xs font-bold uppercase text-[#122319] tracking-wider mb-2">
                    Package Inclusions
                  </h5>
                  <ul className="space-y-1 text-xs text-[#244232]">
                    {activePackageModal.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase text-[#122319] tracking-wider mb-2">
                    Package Exclusions
                  </h5>
                  <ul className="space-y-1 text-xs text-[#6b8577]">
                    {activePackageModal.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#e8f0ec] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-[#6b8577]">Standard Pricing</span>
                  <div className="font-mono text-lg font-bold text-[#122319]">
                    PKR {activePackageModal.pricePerPersonPKR.toLocaleString()} <span className="text-xs font-sans font-normal text-[#6b8577]">/ person</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Inquiry for Package: ${activePackageModal.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#f0f6f2] hover:bg-[#e4eee7] border border-[#cbdad1] text-[#183e2b]"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      const pkg = activePackageModal;
                      setActivePackageModal(null);
                      onBookPackage(pkg);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    Confirm Dates & Book
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
