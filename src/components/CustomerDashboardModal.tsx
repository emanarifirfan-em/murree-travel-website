import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Phone, 
  Car, 
  Hotel, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  MessageSquare,
  Clock,
  UserCheck
} from 'lucide-react';
import { Booking } from '../types';
import { BUSINESS_INFO } from '../data/travelData';

interface CustomerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDashboardModal: React.FC<CustomerDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('MCT-2026-8812');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
      if (data.length > 0) {
        setSelectedBooking(data[0]);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const match = bookings.find(
      b => b.id.toLowerCase().includes(query) || 
           b.customer.phone.includes(query) ||
           b.customer.name.toLowerCase().includes(query)
    );
    if (match) {
      setSelectedBooking(match);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04080c]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b141d] border border-[#233544] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#0e1924] border-b border-[#1f2f3e] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#14261d] border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                TRAVELER PORTAL & EXPEDITION TRACKER
              </div>
              <h3 className="text-xl font-serif text-white">My Mountain Bookings</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-[#14222f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search / Filter Bar */}
        <div className="p-4 bg-[#0d1620] border-b border-[#1c2e3e]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Booking ID (e.g. MCT-2026-8812) or Phone Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121c25] border border-[#233544] text-white text-xs focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#080e14] font-bold text-xs uppercase tracking-wider"
            >
              Lookup
            </button>
          </form>
        </div>

        {/* Body View */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-300">
          {selectedBooking ? (
            <div className="space-y-6">
              {/* Top Status Card */}
              <div className="p-5 rounded-2xl bg-[#0e1823] border border-[#233544] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-bold text-white">{selectedBooking.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-mono">
                      {selectedBooking.status}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif text-[#d4af37] mt-1">{selectedBooking.destination}</h4>
                  <div className="text-xs text-slate-400 flex items-center space-x-3 mt-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedBooking.travelDate}</span>
                    </span>
                    <span>•</span>
                    <span>Lead: {selectedBooking.customer.name} ({selectedBooking.customer.phone})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-2 rounded-lg bg-[#142330] hover:bg-[#1a3042] text-xs text-white border border-[#23384a] flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Voucher</span>
                  </button>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hello Murree Classic, I am following up on booking ${selectedBooking.id}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#142a1f] hover:bg-[#1c3d2c] text-emerald-300 text-xs border border-[#215739] flex items-center space-x-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Driver</span>
                  </a>
                </div>
              </div>

              {/* Grid: Hotel & Transport Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hotel Card */}
                <div className="p-4 rounded-xl bg-[#0f1b26] border border-[#1e3042] space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase text-[#d4af37]">
                    <Hotel className="w-4 h-4" />
                    <span>Confirmed Accommodation</span>
                  </div>
                  <div className="text-sm font-bold text-white">{selectedBooking.hotel?.name || 'Self-Arranged Lodging'}</div>
                  <div className="text-xs text-slate-400">
                    Category: {selectedBooking.hotel?.roomCategory || 'Standard'} ({selectedBooking.hotel?.nights || 2} Nights)
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center space-x-1 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Voucher Active • Front Desk Notified</span>
                  </div>
                </div>

                {/* Transport Card */}
                <div className="p-4 rounded-xl bg-[#0f1b26] border border-[#1e3042] space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase text-[#d4af37]">
                    <Car className="w-4 h-4" />
                    <span>Chauffeured Mountain Transport</span>
                  </div>
                  <div className="text-sm font-bold text-white">{selectedBooking.transport?.name || 'Private Mountain Vehicle'}</div>
                  <div className="text-xs text-slate-400">
                    Assigned: Certified Murree Hills Chauffeur (All-weather 4x4)
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center space-x-1 pt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Telemetry Active • Dispatch Station: GPO Chowk</span>
                  </div>
                </div>
              </div>

              {/* Price & Billing breakdown */}
              <div className="p-5 rounded-xl bg-[#0d1620] border border-[#1d2d3c] space-y-3 text-xs">
                <div className="text-xs font-bold uppercase text-[#d4af37] border-b border-[#1b2b3a] pb-2">
                  Billing Summary & Payment Verification
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Grand Total (PKR)</span>
                  <span className="font-mono font-bold text-white text-sm">
                    PKR {selectedBooking.pricing.grandTotalPKR.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payment Status</span>
                  <span className="font-mono text-emerald-400 font-semibold">{selectedBooking.paymentStatus}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p>No booking found matching your query. Enter your booking reference or phone number.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
