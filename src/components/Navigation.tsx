import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Sparkles, 
  Menu, 
  X, 
  Calendar, 
  CloudSun, 
  UserCheck, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';
import { WeatherReport } from '../types';

interface NavigationProps {
  onOpenBooking: (initialData?: any) => void;
  onOpenConcierge: () => void;
  onOpenAdmin: () => void;
  onOpenMyBookings: () => void;
  weather: WeatherReport | null;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenBooking,
  onOpenConcierge,
  onOpenAdmin,
  onOpenMyBookings,
  weather
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Journeys', href: '#journeys' },
    { label: 'Cinema', href: '#cinema-showcase' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Map & Roads', href: '#murree-map' },
    { label: 'Custom Trip', href: '#trip-builder' },
    { label: 'Hotels', href: '#hotels' },
    { label: 'Transport', href: '#transport' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/98 backdrop-blur-md border-b border-[#dce6e0] w-full max-w-full ${
          isScrolled ? 'py-2 sm:py-2.5 shadow-md' : 'py-2.5 sm:py-3 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between w-full">
            {/* Brand Logo - Compact, clean, guaranteed right spacing so it NEVER touches 'Journeys' */}
            <div className="flex-shrink-0 mr-6 sm:mr-8 lg:mr-10">
              <a 
                href="#" 
                className="flex items-center space-x-2.5 group text-left"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#183e2b] border border-[#b88a29] flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2ce79] group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div className="bg-white px-0.5 rounded">
                  <div className="text-xs sm:text-sm font-extrabold tracking-wider sm:tracking-widest text-[#122319] uppercase font-sans flex items-center gap-1">
                    MURREE CLASSIC
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b88a29]"></span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#5e776a] uppercase font-semibold">
                    TRAVEL & TOUR
                  </div>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links - Centered with plenty of space from logo and right actions */}
            <nav className="hidden xl:flex items-center justify-center gap-1 2xl:gap-2 flex-1 px-2 2xl:px-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-2 py-1.5 rounded-lg text-xs tracking-wider uppercase text-[#384e41] hover:text-[#183e2b] hover:bg-[#f2f7f4] font-medium transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Action Controls for Desktop (XL screens: 1280px+) */}
            <div className="hidden xl:flex items-center space-x-2 2xl:space-x-3 flex-shrink-0 ml-6 sm:ml-8 lg:ml-10">
              {/* Live Weather Pill with guaranteed fit */}
              {weather && (
                <div 
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#f2f7f4] border border-[#d2dfd7] text-xs text-[#2b4235]"
                  title={`Road Status: ${weather.roadConditions}`}
                >
                  <CloudSun className="w-3.5 h-3.5 text-[#b88a29]" />
                  <span className="font-semibold text-[#183e2b]">Murree {weather.temperatureC}°C</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              )}

              {/* Book a Trip Button */}
              <button
                onClick={() => onOpenBooking()}
                className="px-3.5 py-1.5 rounded-full bg-[#183e2b] hover:bg-[#23533a] text-white font-semibold text-xs tracking-wider uppercase hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                Book a Trip
              </button>

              {/* My Bookings Switch */}
              <button
                onClick={onOpenMyBookings}
                className="p-1.5 rounded-full bg-[#f2f7f4] border border-[#d2dfd7] text-[#475e52] hover:text-[#183e2b] hover:border-[#183e2b] transition-colors cursor-pointer"
                title="View My Bookings"
                aria-label="View My Bookings"
              >
                <UserCheck className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile / Tablet / Compact Laptop Header Right (< XL: below 1280px) */}
            <div className="flex xl:hidden items-center space-x-2 flex-shrink-0">
              {/* Compact Weather Badge for medium tablets (md & lg) */}
              {weather && (
                <div 
                  className="hidden md:flex items-center space-x-1 px-2 py-1 rounded-full bg-[#f2f7f4] border border-[#d2dfd7] text-[11px] text-[#2b4235]"
                >
                  <CloudSun className="w-3 h-3 text-[#b88a29]" />
                  <span className="font-semibold text-[#183e2b]">{weather.temperatureC}°C</span>
                </div>
              )}

              {/* Quick Book Button */}
              <button
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 rounded-full bg-[#183e2b] hover:bg-[#23533a] text-white font-semibold text-xs tracking-wider uppercase active:scale-95 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              >
                Book
              </button>

              {/* Mobile Drawer Trigger (3 lines menu) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#f2f7f4] border border-[#d2dfd7] text-[#183e2b] focus:outline-none hover:bg-[#e7f0eb] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Right Drawer / Mobile & Tablet Sidebar with Smooth Scrolling */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right Sidebar drawer container */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl z-10 flex flex-col h-full animate-fadeIn border-l border-[#d2dfd7]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#e2eae5] bg-[#f8faf9] flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#183e2b] border border-[#b88a29] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#f2ce79]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#122319] tracking-widest">MURREE CLASSIC</div>
                  <div className="text-[9px] text-[#5e776a] tracking-wider">TRAVEL & TOUR</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-[#edf3f0] hover:bg-[#e2ece6] text-[#183e2b] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {/* Weather status in drawer */}
              {weather && (
                <div className="p-3 rounded-xl bg-[#f4f8f5] border border-[#d8e4dc] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#183e2b]">
                    <CloudSun className="w-4 h-4 text-[#b88a29]" />
                    <span className="font-semibold">Murree {weather.temperatureC}°C</span>
                    <span className="text-[#5e776a]">({weather.condition})</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    Roads Open
                  </span>
                </div>
              )}

              {/* Navigation Links List */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8ca396] mb-1.5 px-1">
                  Highland Expeditions
                </div>
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full flex items-center justify-between text-left py-2 px-3 rounded-xl text-xs sm:text-sm font-medium text-[#183e2b] hover:bg-[#f2f7f4] hover:text-[#b88a29] transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#8ca396]" />
                  </button>
                ))}
              </div>

              {/* Contact & Desk Info */}
              <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-[#e2eae5] space-y-2 text-xs">
                <div className="font-semibold text-[#183e2b] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b88a29]" />
                  <span>Murree GPO Chowk Headquarters</span>
                </div>
                <p className="text-[#5e776a] text-[11px] leading-relaxed">
                  Bank Road, opposite GPO Murree. Open 24/7 with dedicated 4x4 mountain fleet.
                </p>
                <div className="pt-1 flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#b88a29]" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="font-mono text-[#183e2b] font-bold text-xs">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Drawer Actions */}
            <div className="p-4 border-t border-[#e2eae5] bg-white flex-shrink-0 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-xl bg-[#183e2b] hover:bg-[#23533a] text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer text-center"
              >
                Book a Mountain Trip
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConcierge();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f0eb] border border-[#d2dfd7] text-xs text-[#183e2b] font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#b88a29]" />
                  <span>AI Assistant</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f0eb] border border-[#d2dfd7] text-xs text-[#183e2b] font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#183e2b]" />
                  <span>My Bookings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
