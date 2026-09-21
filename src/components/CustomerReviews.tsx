import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/travelData';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-24 bg-[#f8faf9] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
            <MessageSquare className="w-3.5 h-3.5 text-[#c49838]" />
            <span>TRAVELER PERSPECTIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal">
            Reflections From the Ridge
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475e52] font-light">
            Genuine experiences from families, honeymoon couples, and corporate delegations who entrusted their mountain journeys to Murree Classic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 text-[#a87920] mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#a87920]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#384e41] italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8f0ec] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#122319] flex items-center space-x-1">
                    <span>{review.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-[#6b8577]">{review.city} • {review.tripType}</div>
                </div>

                <span className="text-[10px] text-[#8ca396] font-mono">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
