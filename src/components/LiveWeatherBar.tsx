import React from 'react';
import { CloudSun, ShieldAlert, Phone, Sparkles, Navigation, AlertTriangle, Radio } from 'lucide-react';
import { WeatherReport } from '../types';
import { BUSINESS_INFO } from '../data/travelData';

interface LiveWeatherBarProps {
  weather: WeatherReport;
}

export const LiveWeatherBar: React.FC<LiveWeatherBarProps> = ({ weather }) => {
  return (
    <div className="w-full rounded-2xl bg-[#13281c] border border-[#214330] p-3 sm:p-4 text-xs text-[#d6ede0] shadow-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Left: Weather Metrics */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#1a3827] border border-[#2c583e]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
              LIVE HIGHLAND TELEMETRY
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <CloudSun className="w-4 h-4 text-[#f2ce79]" />
            <span className="font-semibold text-white">Murree Station:</span>
            <span className="font-mono text-[#f2ce79] font-bold">{weather.temperatureC}°C</span>
            <span className="text-[#a7ceb8]">({weather.condition})</span>
          </div>

          <span className="hidden md:inline text-[#2d5940]">|</span>

          <div className="flex items-center space-x-1.5 text-[#86efac]">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span>N-75 Expressway: <strong className="text-white">{weather.roadConditions}</strong></span>
          </div>
        </div>

        {/* Right: Emergency & Help */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
          <span className="text-[#a7ceb8]">
            Highway Police: <span className="font-mono text-white font-semibold">130</span>
          </span>

          <span className="hidden sm:inline text-[#2d5940]">|</span>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="text-[#f2ce79] hover:underline flex items-center space-x-1 font-mono font-medium"
          >
            <Phone className="w-3 h-3" />
            <span>HQ Desk: {BUSINESS_INFO.phone}</span>
          </a>

          <span className="text-[10px] text-[#84a993] font-mono hidden sm:inline">
            Updated: {weather.updatedAt}
          </span>
        </div>
      </div>
    </div>
  );
};
