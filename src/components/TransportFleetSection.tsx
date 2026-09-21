import React from 'react';
import { 
  Car, 
  Users, 
  Briefcase, 
  Wind, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { VEHICLES, BUSINESS_INFO } from '../data/travelData';
import { Vehicle } from '../types';

interface TransportFleetSectionProps {
  onSelectVehicleForBooking: (vehicle: Vehicle) => void;
}

export const TransportFleetSection: React.FC<TransportFleetSectionProps> = ({
  onSelectVehicleForBooking
}) => {
  return (
    <section id="transport" className="py-24 bg-[#f4f8f5] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <Car className="w-3.5 h-3.5 text-[#c49838]" />
              <span>DEDICATED MOUNTAIN FLEET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Mountain-Tested Chauffeur Transport
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light">
              All vehicles include seasoned hill-station drivers trained on high-altitude winter passes, steep inclines, and expressway navigation.
            </p>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded-2xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Vehicle Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[10px] font-mono font-bold text-[#a87920] shadow-xs">
                    {vehicle.type}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-[#f0f6f2] border border-[#cbdad1] text-[#183e2b] text-[10px] font-bold shadow-xs">
                    Hill Driver Included
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-lg font-serif text-[#122319] font-normal group-hover:text-[#183e2b] transition-colors">
                    {vehicle.name}
                  </h3>

                  {/* Specs Pill row */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#244232]">
                    <div className="flex items-center space-x-1.5 p-2 rounded-lg bg-[#f0f5f2] border border-[#d2dfd7]">
                      <Users className="w-3.5 h-3.5 text-[#a87920]" />
                      <span>{vehicle.capacityPassengers} Guests</span>
                    </div>

                    <div className="flex items-center space-x-1.5 p-2 rounded-lg bg-[#f0f5f2] border border-[#d2dfd7]">
                      <Briefcase className="w-3.5 h-3.5 text-[#a87920]" />
                      <span>{vehicle.capacityLuggage} Bags</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-2 text-xs text-[#5e776a]">
                    <Wind className="w-3.5 h-3.5 text-teal-600" />
                    <span>Dual Air-Conditioning & Heating</span>
                  </div>

                  {/* Fuel Policy */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#f7faf8] border border-[#dce6df] text-[11px] text-[#475e52] flex items-start space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{vehicle.fuelPolicy || 'Dedicated hill driver included • Fuel & tolls transparently billed'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Select */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#e8f0ec] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-[#6b8577]">Daily Mountain Rate</div>
                    <div className="font-mono text-base font-bold text-[#122319]">
                      PKR {vehicle.pricePerDayPKR.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectVehicleForBooking(vehicle)}
                    className="px-3.5 py-2 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
                  >
                    <span>Reserve</span>
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
