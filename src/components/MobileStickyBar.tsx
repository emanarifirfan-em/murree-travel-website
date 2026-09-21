import React from 'react';
import { Phone, MessageSquare, Sparkles, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenBooking,
  onOpenConcierge
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#080e14]/95 backdrop-blur-xl border-t border-[#1e2f3e] p-2.5 px-4 shadow-2xl flex items-center justify-between gap-2">
      {/* 1. Quick Call Button */}
      <a
        href={`tel:${BUSINESS_INFO.phone}`}
        className="flex-1 py-2 px-2 rounded-xl bg-[#121c25] border border-[#233544] text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 active:scale-95 transition-all"
        aria-label="Call Murree Office"
      >
        <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>Call Desk</span>
      </a>

      {/* 2. WhatsApp Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent("Hello Murree Classic Travel & Tour, I would like to inquire about a mountain journey.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-2 rounded-xl bg-[#12281c] border border-[#225237] text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1.5 active:scale-95 transition-all"
        aria-label="WhatsApp Desk"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
        <span>WhatsApp</span>
      </a>

      {/* 3. AI Concierge */}
      <button
        onClick={onOpenConcierge}
        className="p-2.5 rounded-xl bg-[#14232e] border border-[#2d4659] text-[#d4af37] active:scale-95 transition-all"
        aria-label="AI Concierge"
      >
        <Sparkles className="w-4 h-4" />
      </button>

      {/* 4. Book Trip Luxury CTA */}
      <button
        onClick={onOpenBooking}
        className="flex-[1.3] py-2 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8952b] text-[#080e14] text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1 shadow-lg active:scale-95 transition-all"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Trip</span>
      </button>
    </div>
  );
};
