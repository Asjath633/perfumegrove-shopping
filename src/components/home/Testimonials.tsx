
import React from "react";
import { Star, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";

const testimonials = [
  {
    title: "Incredible Longevity!",
    name: "Aryan S.",
    date: "12 Oct 2026",
    content: "The Oud Royale is unlike anything I've ever experienced. Its longevity is remarkable, lasting well over 12 hours on my skin. Truly a masterpiece.",
    rating: 5,
    verified: true
  },
  {
    title: "Pure and Soulful",
    name: "Zaira K.",
    date: "05 Oct 2026",
    content: "I've tried many luxury brands, but Zandro's attars have a soul. The White Musk is so pure and calming. Also, the packaging is exquisite.",
    rating: 5,
    verified: true
  },
  {
    title: "Best for Events",
    name: "Kabir M.",
    date: "28 Sep 2026",
    content: "Perfect balance of tradition and modern elegance. The 'Long Lasting' claim is 100% accurate. Highly recommended for weddings.",
    rating: 5,
    verified: true
  },
  {
    title: "Premium Quality!",
    name: "Sarah J.",
    date: "15 Sep 2026",
    content: "I was skeptical about ordering online but the quality exceeded my expectations. Very well packed and high quality oils.",
    rating: 5,
    verified: true
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#0B0B0B] border-t border-white/5">
      <div className="max-w-[1750px] mx-auto px-4 lg:px-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mb-2 uppercase tracking-tight">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="flex text-[#C9A84C]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">4.9 / 5 Average Rating</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[280px] sm:w-[350px] bg-white/[0.03] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#C9A84C] gap-0.5">
                  {[...Array(t.rating)].map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">{t.date}</span>
              </div>

              <h4 className="text-white font-bold text-lg mb-2">{t.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                "{t.content}"
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] text-[10px] font-black uppercase">
                    {t.name[0]}
                  </div>
                  <span className="text-white/80 font-bold text-xs">{t.name}</span>
                </div>
                {t.verified && (
                  <div className="flex items-center gap-1.5 text-[#C9A84C]/60">
                    <CheckCircle size={14} />
                    <span className="text-[9px] uppercase font-black tracking-widest">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
