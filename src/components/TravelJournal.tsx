import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/travelData';
import { JournalArticle } from '../types';

export const TravelJournal: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-24 bg-[#f8faf9] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <BookOpen className="w-3.5 h-3.5 text-[#c49838]" />
              <span>THE HIGHLAND CHRONICLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Mountain Journal & Editorial
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light">
              Field guides, winter road wisdom, trekking elevations, and the colonial history of the Hazara hills.
            </p>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="rounded-2xl bg-white border border-[#d6e2db] hover:border-[#b8cfc2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[10px] font-mono text-[#a87920] font-bold shadow-xs">
                    {art.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-2 text-[11px] text-[#6b8577] mb-2">
                    <Clock className="w-3 h-3 text-[#a87920]" />
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-serif text-[#122319] font-normal group-hover:text-[#183e2b] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#475e52] mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#e8f0ec] flex items-center justify-between text-xs text-[#183e2b] font-bold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#a87920] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-[#d2dfd7] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="relative h-64">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#122319] shadow-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-mono text-[#f2ce79] uppercase font-bold">{activeArticle.category} • {activeArticle.readTime}</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">{activeArticle.title}</h3>
                <span className="text-xs text-slate-200">By {activeArticle.author} • {activeArticle.date}</span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-[#384e41] text-xs sm:text-sm leading-relaxed">
              <p className="font-serif italic text-base text-[#183e2b] border-l-2 border-[#a87920] pl-4">
                {activeArticle.excerpt}
              </p>
              <div className="space-y-3 whitespace-pre-line text-[#475e52]">
                {activeArticle.content}
              </div>
            </div>

            <div className="p-4 bg-[#f8faf9] border-t border-[#e8f0ec] flex items-center justify-between">
              <span className="text-xs text-[#6b8577]">Published by Murree Classic Travel Editorial Desk</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase cursor-pointer shadow-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
