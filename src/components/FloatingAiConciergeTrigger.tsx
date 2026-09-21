import React, { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';

interface FloatingAiConciergeTriggerProps {
  onOpen: () => void;
}

export const FloatingAiConciergeTrigger: React.FC<FloatingAiConciergeTriggerProps> = ({ onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      aria-label="Murree AI Concierge"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40"
    >
      <div className="relative group">
        {/* Tooltip on hover (desktop) */}
        <div 
          className={`absolute bottom-full right-0 mb-2.5 px-3 py-1.5 rounded-xl bg-[#122319] text-white text-[11px] font-medium tracking-wide whitespace-nowrap shadow-lg border border-[#244331] pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-[#f2ce79]">Murree AI</span>
            <span className="text-[#9eb7a8]">• Instant Concierge</span>
          </div>
          <div className="absolute top-full right-5 -mt-1 border-4 border-transparent border-t-[#122319]" />
        </div>

        {/* Compact App Icon Button */}
        <button
          onClick={onOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#1e4a33] via-[#183e2b] to-[#0f2418] border border-white/25 shadow-xl shadow-[#183e2b]/30 flex flex-col items-center justify-center text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#f2ce79]/50"
          title="Open Murree AI Concierge"
          aria-label="Open Murree AI Concierge"
        >
          {/* Subtle app icon glass gloss highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          {/* Icon */}
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#f2ce79] group-hover:rotate-12 transition-transform duration-300 drop-shadow-sm" />
            <span className="text-[9px] font-mono font-bold tracking-wider text-[#e6f4ec] mt-0.5 uppercase">
              AI
            </span>
          </div>

          {/* Green Live Online Status Indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-xs" />
          </span>
        </button>
      </div>
    </aside>
  );
};
