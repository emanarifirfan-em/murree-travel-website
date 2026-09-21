import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/Navigation';
import { LiveWeatherBar } from './components/LiveWeatherBar';
import { Hero } from './components/Hero';
import { MurreeCinemaShowcase } from './components/MurreeCinemaShowcase';
import { DestinationExplorer } from './components/DestinationExplorer';
import { InteractiveMurreeMap } from './components/InteractiveMurreeMap';
import { TourPackagesSection } from './components/TourPackagesSection';
import { CustomTripBuilder } from './components/CustomTripBuilder';
import { HotelsSection } from './components/HotelsSection';
import { TransportFleetSection } from './components/TransportFleetSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { WhyMurreeClassic } from './components/WhyMurreeClassic';
import { CustomerReviews } from './components/CustomerReviews';
import { TravelJournal } from './components/TravelJournal';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingAiConciergeTrigger } from './components/FloatingAiConciergeTrigger';
import { BookingModal } from './components/BookingModal';
import { AiTravelConcierge } from './components/AiTravelConcierge';
import { CustomerDashboardModal } from './components/CustomerDashboardModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { WeatherReport, TourPackage, Hotel, Vehicle, TripType } from './types';
import { INITIAL_WEATHER } from './data/travelData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Global Modals State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isCustomerDashboardOpen, setIsCustomerDashboardOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  // Weather state
  const [weather, setWeather] = useState<WeatherReport>(INITIAL_WEATHER);

  // GSAP Scroll-Triggered Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('.gsap-reveal-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Fetch live weather periodically
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (err) {
        console.warn('Weather telemetry check failed, maintaining station cache:', err);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handlers for opening booking modal with pre-fills
  const handleOpenBooking = (initialData?: any) => {
    setBookingInitialData(initialData || null);
    setIsBookingOpen(true);
  };

  const handleHeroSearch = (criteria: {
    destination: string;
    date: string;
    travellers: number;
    tripType: TripType;
  }) => {
    handleOpenBooking(criteria);
  };

  const handleBookPackage = (pkg: TourPackage) => {
    handleOpenBooking({
      destination: pkg.destination,
      packageId: pkg.id,
      tripType: pkg.tripStyle
    });
  };

  const handleReserveHotel = (hotel: Hotel) => {
    handleOpenBooking({
      destination: hotel.location.split(',')[0],
      hotelId: hotel.id
    });
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    handleOpenBooking({
      vehicleId: vehicle.id
    });
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#122319] font-sans selection:bg-[#183e2b] selection:text-white relative overflow-x-hidden">
      {/* Main Navigation with soft light header */}
      <Navigation
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onOpenMyBookings={() => setIsCustomerDashboardOpen(true)}
        weather={weather}
      />

      {/* Cinematic Hero with ambient video background & AI prompt */}
      <Hero
        onSearch={handleHeroSearch}
        onExploreJourneys={() => {
          document.querySelector('#journeys')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onPlanTrip={() => {
          document.querySelector('#trip-builder')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Mature & Elegant Murree Cinema Video Showcase */}
      <div className="gsap-reveal-section">
        <MurreeCinemaShowcase
          onPlanTrip={() => {
            document.querySelector('#trip-builder')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* Signature Tour Packages */}
      <div className="gsap-reveal-section">
        <TourPackagesSection onBookPackage={handleBookPackage} />
      </div>

      {/* Destination Explorer */}
      <div className="gsap-reveal-section">
        <DestinationExplorer
          onSelectDestinationForBooking={(destName) => {
            handleOpenBooking({ destination: destName });
          }}
        />
      </div>

      {/* Interactive Murree & Galiyat Topographic Map & Real-Time Road Telemetry */}
      <div className="gsap-reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 pt-10">
          <LiveWeatherBar weather={weather} />
        </div>
        <InteractiveMurreeMap
          onSelectPointForTrip={(pointTitle) => {
            handleOpenBooking({ destination: pointTitle });
          }}
        />
      </div>

      {/* Custom Trip Architect */}
      <div className="gsap-reveal-section">
        <CustomTripBuilder
          onOpenBookingWithCustom={(customData) => {
            handleOpenBooking(customData);
          }}
        />
      </div>

      {/* Verified Hotels & Mountain Chalets */}
      <div className="gsap-reveal-section">
        <HotelsSection onReserveHotel={handleReserveHotel} />
      </div>

      {/* Dedicated Mountain Transport Fleet */}
      <div className="gsap-reveal-section">
        <TransportFleetSection onSelectVehicleForBooking={handleSelectVehicle} />
      </div>

      {/* Experience Timeline */}
      <div className="gsap-reveal-section">
        <ExperienceTimeline onStartTrip={() => handleOpenBooking()} />
      </div>

      {/* Why Murree Classic & GPO Chowk Headquarters */}
      <div className="gsap-reveal-section">
        <WhyMurreeClassic />
      </div>

      {/* Traveler Reviews */}
      <div className="gsap-reveal-section">
        <CustomerReviews />
      </div>

      {/* Travel Journal / Highland Magazine */}
      <div className="gsap-reveal-section">
        <TravelJournal />
      </div>

      {/* Comprehensive Alpine Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Floating Murree AI Concierge Visible in Front */}
      <FloatingAiConciergeTrigger onOpen={() => setIsConciergeOpen(true)} />

      {/* Dedicated Sticky Bottom Bar for Mobile Devices */}
      <MobileStickyBar
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* 10-Step Smart Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
      />

      {/* 24/7 AI Travel Concierge (Gemini 3.8 Flash) */}
      <AiTravelConcierge
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onLaunchBooking={(details) => handleOpenBooking(details)}
      />

      {/* Customer Dashboard / Voucher Tracker */}
      <CustomerDashboardModal
        isOpen={isCustomerDashboardOpen}
        onClose={() => setIsCustomerDashboardOpen(false)}
      />

      {/* Agency Staff Operations Portal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </div>
  );
}
