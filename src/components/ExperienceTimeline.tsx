import React from 'react';
import { 
  Compass, 
  Calendar, 
  Car, 
  Mountain, 
  Award, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export const ExperienceTimeline: React.FC<{ onStartTrip: () => void }> = ({ onStartTrip }) => {
  const steps = [
    {
      num: '01',
      title: 'Plan Your Vision',
      desc: 'Choose your desired mountain valleys, travel dates, and group style. Customize private transport or select a signature curated package.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Confirm & Reserve',
      desc: 'Receive transparent pricing, confirmed room categories at luxury partner hotels, and your certified mountain chauffeur assignment.',
      icon: Calendar
    },
    {
      num: '03',
      title: 'Scenic Departure',
      desc: 'Your private air-conditioned vehicle arrives at your doorstep in Islamabad or Rawalpindi for the scenic ascent via the N-75 Expressway.',
      icon: Car
    },
    {
      num: '04',
      title: 'Highland Exploration',
      desc: 'Enjoy Mukshpuri ridges, Patriata cable cars, pine forest strolls, and fireside Kashmiri kehwa arranged seamlessly by our desk.',
      icon: Mountain
    },
    {
      num: '05',
      title: 'Seamless Return',
      desc: 'Safe descent with treasured alpine memories, local souvenirs from Bank Road, and round-the-clock roadside coordination.',
      icon: Award
    }
  ];

  return (
    <section className="py-24 bg-[#f8faf9] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#c49838]" />
            <span>THE GUEST JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal">
            How Every Mountain Escape Unfolds
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475e52] font-light leading-relaxed">
            From your first inquiry to your fireside retreat in the pine forest, our Murree headquarters orchestrates every mile with care.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-2xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#a87920]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#f0f5f2] border border-[#d0ded6] flex items-center justify-center text-[#183e2b]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#122319] font-normal mb-2 group-hover:text-[#183e2b] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#475e52] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartTrip}
            className="px-6 py-3.5 rounded-full bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>Begin Your Mountain Reservation</span>
            <ArrowRight className="w-4 h-4 text-[#f2ce79]" />
          </button>
        </div>
      </div>
    </section>
  );
};
