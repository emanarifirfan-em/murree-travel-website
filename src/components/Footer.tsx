import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  Check, 
  ArrowUp, 
  Sparkles 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenConcierge,
  onOpenAdmin
}) => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    // Send inquiry via WhatsApp direct URL
    const text = `*MURREE CLASSIC TRAVEL - DIRECT WEB INQUIRY*
Name: ${contactName}
Phone: ${contactPhone}
Message: ${contactMessage}`;

    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#122319] text-[#cbdad1] relative overflow-hidden border-t border-[#1e392a]">
      {/* Upper Contact & Headquarters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Brand Identity & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-[#1e392a] border border-[#f2ce79]/40 flex items-center justify-center text-[#f2ce79]">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-widest text-white uppercase font-sans">
                  MURREE CLASSIC
                </h3>
                <div className="text-xs text-[#f2ce79] tracking-wider uppercase font-mono">
                  TRAVEL & TOUR • GPO CHOWK
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9eb7a8] font-light leading-relaxed">
              Established mountain tour operator headquartered permanently at GPO Chowk, Bank Road, Murree. We curate luxury alpine holidays, private 4x4 transport, and high-altitude trail experiences across Murree and the greater Galiyat.
            </p>

            <div className="p-4 rounded-xl bg-[#172c20] border border-[#234331] space-y-2.5 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#f2ce79] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Main Office:</span>
                  <span className="text-[#9eb7a8]">{BUSINESS_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-2 border-t border-[#234331]">
                <Phone className="w-4 h-4 text-[#f2ce79] flex-shrink-0" />
                <div className="flex space-x-3">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white font-mono text-[#f2ce79] font-bold">
                    {BUSINESS_INFO.phone}
                  </a>
                  <span className="text-[#476a54]">•</span>
                  <span className="text-emerald-300 font-medium">24/7 Mountain Desk</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-2 border-t border-[#234331]">
                <Mail className="w-4 h-4 text-[#f2ce79] flex-shrink-0" />
                <span className="text-[#9eb7a8] font-mono">{BUSINESS_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Center: Quick Inquiries Form (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#172c20] border border-[#234331] shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase text-[#f2ce79] mb-2 font-sans tracking-wider">
              <Send className="w-3.5 h-3.5" />
              <span>DIRECT DESK INQUIRY</span>
            </div>
            <h4 className="text-lg font-serif text-white font-normal mb-4">
              Connect With Our Travel Specialist
            </h4>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs space-y-2">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Check className="w-4 h-4" />
                  <span>Inquiry Transmitted</span>
                </div>
                <p>Our Murree headquarters team has opened your inquiry on WhatsApp. You will receive an immediate personalized response.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#112017] border border-[#2a503b] text-white text-xs placeholder:text-[#6a8776] focus:border-[#f2ce79] focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp (+92 3XX XXXXXXX)"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#112017] border border-[#2a503b] text-white text-xs placeholder:text-[#6a8776] focus:border-[#f2ce79] focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Preferred dates, destination, or vehicle inquiry..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#112017] border border-[#2a503b] text-white text-xs placeholder:text-[#6a8776] focus:border-[#f2ce79] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#f2ce79] hover:bg-[#dfba66] text-[#122319] font-bold text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Quick Links & Safety (3 cols) */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f2ce79]">
              EXPLORE EXPEDITIONS
            </h4>
            <ul className="space-y-2 text-[#9eb7a8]">
              <li><a href="#destinations" className="hover:text-white transition-colors">Murree & GPO Mall Road</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Nathia Gali & Mukshpuri</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Bhurban 5-Star Sanctuaries</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Ayubia Pipeline Track</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Patriata New Murree Chairlift</a></li>
              <li><a href="#transport" className="hover:text-white transition-colors">4x4 Prado Mountain Fleet</a></li>
            </ul>

            <div className="pt-4 border-t border-[#234331] space-y-2">
              <button
                onClick={onOpenConcierge}
                className="w-full py-2 rounded-lg bg-[#193224] border border-[#2a523b] text-[#cbdad1] hover:text-white flex items-center justify-center space-x-1.5 text-xs cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f2ce79]" />
                <span>Launch AI Concierge</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full py-2 rounded-lg bg-[#193224] border border-[#2a523b] text-[#8ca396] hover:text-[#cbdad1] text-[11px] text-center cursor-pointer transition-colors"
              >
                Staff / Admin Portal
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-[#1e392a] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#718b7c]">
          <div>
            © {new Date().getFullYear()} Murree Classic Travel & Tour. All rights reserved. GPO Chowk, Bank Road, Murree, Pakistan.
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <span className="flex items-center space-x-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Government Registered Mountain Operator</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#172c20] hover:bg-[#1e392a] text-[#cbdad1] hover:text-white transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
