import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Car, 
  Clock, 
  Award, 
  HeartHandshake, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

export const WhyMurreeClassic: React.FC = () => {
  const pillars = [
    {
      title: 'Permanent GPO Chowk Headquarters',
      desc: 'Unlike fly-by-night online aggregators, our physical office is located at the heart of Murree on Bank Road. Travelers can visit anytime for in-person advice, route assistance, and Kashmiri tea.',
      icon: MapPin
    },
    {
      title: 'Certified Mountain Chauffeurs',
      desc: 'Our drivers are seasoned hill-station navigators possessing deep experience with winter black ice, foggy switchbacks, and high-altitude trails across the Pir Panjal range.',
      icon: Car
    },
    {
      title: 'Transparent Fixed Pricing',
      desc: 'No hidden tourist markups, unexpected toll charges, or surge pricing during snow weekends. All packages include fuel, toll allowances, and documented inclusions.',
      icon: ShieldCheck
    },
    {
      title: '24/7 Road & Weather Monitoring',
      desc: 'Real-time telemetry and direct communication with Murree traffic police and expressway monitoring stations to route our guests away from congestion.',
      icon: Clock
    },
    {
      title: 'Direct Hotel Allotments',
      desc: 'Privileged partnership rooms at PC Bhurban, Arcadian Sprucewoods, and Lockwood Heritage Hotel ensuring guaranteed check-ins even during peak holidays.',
      icon: Award
    },
    {
      title: 'Bespoke Private Pacing',
      desc: 'Every trip is customized to your party. We never herd families onto rushed commercial schedules; you decide when to pause for mountain vistas.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-24 bg-[#f4f8f5] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Local Authority */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c49838]" />
              <span>THE MURREE CLASSIC DIFFERENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              A Legacy of Mountain Hospitality
            </h2>

            <p className="text-sm sm:text-base text-[#475e52] font-light leading-relaxed">
              Born and rooted in the hill station of Murree, we bridge the gap between historic mountain charm and modern luxury travel logistics.
            </p>

            {/* Address callout card */}
            <div className="p-5 rounded-2xl bg-[#f0f6f2] border border-[#cbdad1] space-y-3">
              <div className="flex items-center space-x-2 text-[#183e2b] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#a87920]" />
                <span>Visit Our Main Murree Desk</span>
              </div>
              <p className="text-xs text-[#2b4235]">
                {BUSINESS_INFO.address}
              </p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#d0ded6]">
                <span className="text-[#5e776a]">Direct Travel Hotline:</span>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="font-mono text-[#183e2b] font-bold hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Value Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#f0f5f2] border border-[#d0ded6] flex items-center justify-center text-[#183e2b] mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#122319] mb-1.5 font-sans">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#475e52] leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
