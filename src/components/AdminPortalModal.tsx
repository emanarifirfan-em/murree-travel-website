import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  Car, 
  Hotel, 
  PhoneCall, 
  Download, 
  Search,
  Filter
} from 'lucide-react';
import { Booking } from '../types';
import { BUSINESS_INFO } from '../data/travelData';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'overview'>('bookings');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
      }
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  if (!isOpen) return null;

  const filtered = statusFilter === 'ALL'
    ? bookings
    : bookings.filter(b => b.status === statusFilter);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricing?.grandTotalPKR || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-[#04080c]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0b141d] border border-[#233544] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-6 bg-[#0e1924] border-b border-[#1f2f3e] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#192734] border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] font-sans">
                AGENCY MANAGEMENT PORTAL • GPO CHOWK DESK
              </div>
              <h3 className="text-xl font-serif text-white">Murree Classic Operations Dashboard</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-[#14222f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0d1620] border-b border-[#1c2e3e]">
          <div className="p-4 rounded-xl bg-[#111d28] border border-[#1e3042]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active Inquiries</div>
            <div className="text-2xl font-mono font-bold text-white mt-1">{bookings.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-[#111d28] border border-[#1e3042]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Confirmed Trips</div>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
              {bookings.filter(b => b.status === 'CONFIRMED').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#111d28] border border-[#1e3042]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Inquiry Volume (PKR)</div>
            <div className="text-2xl font-mono font-bold text-[#d4af37] mt-1">
              PKR {(totalRevenue / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#111d28] border border-[#1e3042]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Assigned Fleet</div>
            <div className="text-2xl font-mono font-bold text-blue-400 mt-1">4 Vehicles</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 bg-[#0f1b26] border-b border-[#1c2e3e] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Filter Status:</span>
            {['ALL', 'PENDING_REVIEW', 'CONFIRMED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                  statusFilter === st
                    ? 'bg-[#d4af37] text-black font-bold'
                    : 'bg-[#142330] text-slate-300 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const json = JSON.stringify(bookings, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `mct-bookings-${Date.now()}.json`;
              a.click();
            }}
            className="px-3 py-1 rounded bg-[#152736] border border-[#23384a] text-slate-300 hover:text-white flex items-center space-x-1"
          >
            <Download className="w-3 h-3" />
            <span>Export JSON</span>
          </button>
        </div>

        {/* Bookings Table */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#121e2a] text-[#d4af37] font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Guest & Contact</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Total (PKR)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2f3e]">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#111e29] transition-colors">
                    <td className="p-3 font-mono font-bold text-white">{b.id}</td>
                    <td className="p-3">
                      <div className="font-semibold text-white">{b.customer.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{b.customer.phone}</div>
                    </td>
                    <td className="p-3 text-white">{b.destination}</td>
                    <td className="p-3 font-mono">{b.travelDate}</td>
                    <td className="p-3 text-slate-300">{b.transport?.name?.split(' ')[0] || 'Prado 4x4'}</td>
                    <td className="p-3 font-mono font-bold text-[#d4af37]">
                      {b.pricing.grandTotalPKR.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        b.status === 'CONFIRMED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : b.status === 'CANCELLED'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        {b.status !== 'CONFIRMED' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'CONFIRMED')}
                            className="p-1 rounded bg-emerald-900 text-emerald-300 hover:bg-emerald-800"
                            title="Confirm"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <a
                          href={`https://wa.me/${b.customer.whatsapp || b.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.customer.name}, Murree Classic Travel desk confirming your reservation ${b.id}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-[#193325] text-emerald-300 hover:bg-[#204532]"
                          title="WhatsApp Guest"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
