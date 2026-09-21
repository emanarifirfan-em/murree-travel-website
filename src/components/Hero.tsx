import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  ShieldCheck, 
  Search, 
  PhoneCall, 
  Sparkles,
  Play,
  Volume2,
  VolumeX,
  ChevronRight,
  SunMedium
} from 'lucide-react';
import { DESTINATIONS, BUSINESS_INFO } from '../data/travelData';
import { TripType } from '../types';

interface HeroProps {
  onPlanTrip: () => void;
  onExploreJourneys: () => void;
  onSearch: (params: { destination: string; date: string; travellers: number; tripType: TripType }) => void;
  onOpenConcierge: (initialPrompt?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlanTrip,
  onExploreJourneys,
  onSearch,
  onOpenConcierge
}) => {
  const [selectedDestination, setSelectedDestination] = useState(DESTINATIONS[0].name);
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState(2);
  const [tripType, setTripType] = useState<TripType>('family');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination: selectedDestination,
      date: travelDate,
      travellers,
      tripType
    });
  };

  const quickQuestions = [
    "Is there snowfall today at Kashmir Point?",
    "Best luxury resort in Bhurban for couples?",
    "Rates for Prado 4x4 with local chauffeur?",
    "Is N-75 Murree Expressway open right now?"
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f4f8f5]">
      {/* Cinematic Alpine Video Background with Soft Light Mist */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2200&q=80"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[1.02] contrast-[0.95]"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-fog-over-the-pine-trees-42512-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Soft Light Mountain Mist Layering - Keeps all text 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9]/95 via-[#f8faf9]/80 to-[#f8faf9]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8faf9] via-transparent to-[#f8faf9]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        {/* Verified Location & Authority Badge */}
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#cbdad1] text-xs text-[#183e2b] font-semibold tracking-wider uppercase mb-5 self-start shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#b88a29]" />
          <span>GPO CHOWK, BANK ROAD, MURREE • ESTABLISHED LOCAL OPERATOR</span>
        </div>

        {/* Hero Title and Editorial Hierarchy */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#122319] tracking-tight leading-[1.08] font-normal">
            JOURNEY THROUGH <br />
            <span className="font-serif italic text-[#a87920]">MURREE & GALIYAT</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#3d5447] font-light max-w-2xl leading-relaxed">
            Curated highland expeditions, private 4x4 Prado transport, boutique pine chalets, and guided scenic trails across the Pir Panjal mountains.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onExploreJourneys}
              className="px-6 py-3.5 rounded-full bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs sm:text-sm tracking-wider uppercase active:scale-95 transition-all shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <span>Explore Journeys</span>
              <ArrowRight className="w-4 h-4 text-[#f2ce79]" />
            </button>

            <button
              onClick={onPlanTrip}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#f1f6f3] border border-[#cbdad1] text-[#183e2b] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              Plan My Custom Trip
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent("Hello Murree Classic Travel & Tour, I would like to inquire about a mountain journey.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-full bg-[#f0f7f3] border border-[#b8d6c4] text-[#15462c] hover:bg-[#e4f1e9] font-medium text-xs tracking-wider uppercase transition-all flex items-center space-x-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>

        {/* Direct In-Front AI Assistant Prompt Bar */}
        <div className="mt-8 max-w-4xl p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#cbdad1] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#183e2b]">
              <Sparkles className="w-4 h-4 text-[#b88a29] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="uppercase tracking-wider font-mono text-[11px]">MURREE AI CONCIERGE (LIVE DESK)</span>
            </div>
            <button
              onClick={() => onOpenConcierge()}
              className="text-xs text-[#a87920] hover:text-[#183e2b] font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>Open Full Assistant</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Clickable Question Chips */}
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => onOpenConcierge(q)}
                className="text-left px-3 py-1.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f0eb] border border-[#d6e4dc] hover:border-[#b88a29] text-[12px] text-[#2b4235] transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <span className="text-[#a87920] font-bold">Q:</span>
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Compact Smart Booking / Search Widget */}
        <div className="mt-6 w-full max-w-5xl">
          <form
            onSubmit={handleSearchSubmit}
            className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#d2dfd7] shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
          >
            {/* 1. Destination */}
            <div className="flex flex-col px-3 py-2 rounded-xl bg-[#f7faf8] border border-[#dce6df] hover:border-[#b8cfc2] transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e776a] flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#b88a29]" />
                <span>Destination</span>
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="mt-1 bg-transparent text-sm font-semibold text-[#122319] focus:outline-none cursor-pointer"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.name} className="bg-white text-[#122319]">
                    {dest.name}
                  </option>
                ))}
                <option value="Custom Destination" className="bg-white text-[#122319]">
                  Custom Highland Route
                </option>
              </select>
            </div>

            {/* 2. Travel Date */}
            <div className="flex flex-col px-3 py-2 rounded-xl bg-[#f7faf8] border border-[#dce6df] hover:border-[#b8cfc2] transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e776a] flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-[#b88a29]" />
                <span>Travel Date</span>
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 bg-transparent text-sm font-semibold text-[#122319] focus:outline-none cursor-pointer"
              >
              </input>
            </div>

            {/* 3. Travellers */}
            <div className="flex flex-col px-3 py-2 rounded-xl bg-[#f7faf8] border border-[#dce6df] hover:border-[#b8cfc2] transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e776a] flex items-center space-x-1">
                <Users className="w-3 h-3 text-[#b88a29]" />
                <span>Travellers</span>
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="mt-1 bg-transparent text-sm font-semibold text-[#122319] focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-white text-[#122319]">1 Solo Traveler</option>
                <option value={2} className="bg-white text-[#122319]">2 Persons (Couple)</option>
                <option value={3} className="bg-white text-[#122319]">3 - 4 Persons (Small Group)</option>
                <option value={5} className="bg-white text-[#122319]">5 - 8 Persons (Family Van)</option>
                <option value={12} className="bg-white text-[#122319]">10+ Persons (Hiace / Coaster)</option>
              </select>
            </div>

            {/* 4. Trip Type */}
            <div className="flex flex-col px-3 py-2 rounded-xl bg-[#f7faf8] border border-[#dce6df] hover:border-[#b8cfc2] transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e776a] flex items-center space-x-1">
                <Compass className="w-3 h-3 text-[#b88a29]" />
                <span>Trip Type</span>
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value as TripType)}
                className="mt-1 bg-transparent text-sm font-semibold text-[#122319] focus:outline-none cursor-pointer"
              >
                <option value="family" className="bg-white text-[#122319]">Family Holiday</option>
                <option value="couple" className="bg-white text-[#122319]">Couple / Honeymoon</option>
                <option value="adventure" className="bg-white text-[#122319]">Adventure & Trekking</option>
                <option value="luxury" className="bg-white text-[#122319]">5-Star Luxury Retreat</option>
                <option value="corporate" className="bg-white text-[#122319]">Corporate Delegation</option>
                <option value="custom" className="bg-white text-[#122319]">Custom Tailored</option>
              </select>
            </div>

            {/* 5. Submit Button */}
            <div className="sm:col-span-2 lg:col-span-1 h-full flex">
              <button
                type="submit"
                className="w-full h-full py-3.5 px-4 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#f2ce79]" />
                <span>Search Journey</span>
              </button>
            </div>
          </form>

          {/* Micro trust row */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-[#5e776a] px-2">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct local coordination from Murree GPO Chowk Desk</span>
            </span>
            <span className="hidden sm:inline font-mono font-medium text-[#2d4638]">
              Office: Bank Road, Murree • +92 321 5603396
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
