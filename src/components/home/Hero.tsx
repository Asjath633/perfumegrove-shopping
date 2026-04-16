
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { getProductsByDepartment } from "@/lib/products";

const Hero = () => {
  const perfumes = getProductsByDepartment("perfume");
  const bestSellers = perfumes.filter(p => p.isBestSeller).slice(0, 3);
  const accessories = getProductsByDepartment("accessory").slice(0, 3);

  return (
    <div className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 lg:px-12 bg-[#0B0B0B] text-[#F5F5DC] font-sans">
      <div className="max-w-[1750px] mx-auto space-y-4 sm:space-y-8">
        
        {/* --- MAIN DASHBOARD: TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[780px] overflow-hidden">
          
          {/* 1. PRIMARY HERO DISPLAY (7 Columns) */}
          <div className="lg:col-span-8 relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#050505] group h-[400px] sm:h-[550px] lg:h-full">
            <img 
              src="/hero-zandro-ultimate.png" 
              alt="Zandro Ultimate Luxury Bottle" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            {/* Minimal Badges */}
            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-2 sm:gap-4">
               <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
                  <Leaf size={10} className="text-[#C9A84C]" />
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">Pure</span>
               </div>
               <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
                  <Clock size={10} className="text-[#C9A84C]" />
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">Lasting</span>
               </div>
            </div>

            <div className="absolute bottom-10 left-8 sm:bottom-16 sm:left-16 max-w-xl text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-[4.2rem] font-serif font-black leading-[1.1] tracking-tight mb-4 sm:mb-8 text-white">
                Crafted Attar & <br />
                Timeless Elegance
              </h1>
              <Link 
                to="/perfumes" 
                className="inline-flex items-center justify-center bg-white text-black hover:bg-[#C9A84C] px-10 sm:px-16 py-3.5 sm:py-4 rounded-full font-black tracking-[0.2em] uppercase text-[9px] sm:text-[11px] transition-all duration-500 shadow-2xl"
              >
                Experience Now
              </Link>
            </div>
          </div>

          {/* 2. SIDEBAR CONTENT (5 Columns) */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-4 h-full">
            
            {/* Top Sidebar: Best Sellers - Horizontal Scroll */}
            <div className="bg-white/[0.02] rounded-[2rem] border border-white/5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#C9A84C] font-serif text-xl sm:text-2xl font-bold uppercase leading-none tracking-tight">Best Sellers</h3>
                  <Link to="/perfumes" className="flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#C9A84C] font-black group/link">
                    View All <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {bestSellers.map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="flex-shrink-0 w-[120px] sm:w-[140px] group/item relative">
                       <div className="w-full aspect-[4/5] bg-white border border-white/5 rounded-2xl p-4 group-hover/item:border-[#C9A84C]/40 transition-all duration-500 overflow-hidden flex items-center justify-center">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="mt-3 text-center">
                          <p className="text-[8px] uppercase font-black tracking-widest text-white/40 truncate mb-1">{p.name}</p>
                          <p className="text-[10px] font-bold text-[#C9A84C]">₹{p.price}</p>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>

            {/* Middle Sidebar: Accessories - Horizontal Scroll */}
            <div className="bg-white/[0.02] rounded-[2rem] border border-white/5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#C9A84C] font-serif text-xl sm:text-2xl font-bold uppercase leading-none tracking-tight">Accessories</h3>
                  <Link to="/accessories" className="flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#C9A84C] font-black group/link">
                    View All <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {accessories.map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="flex-shrink-0 w-[120px] sm:w-[140px] group/item relative">
                       <div className="w-full aspect-square bg-white border border-white/5 rounded-2xl p-4 group-hover/item:border-[#C9A84C]/40 transition-all duration-500 overflow-hidden flex items-center justify-center">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="mt-3 text-center">
                          <p className="text-[8px] uppercase font-black tracking-widest text-white/40 truncate mb-1">{p.name}</p>
                          <p className="text-[10px] font-bold text-[#C9A84C]">₹{p.price}</p>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>

          </div>
        </div>

        {/* --- DOWN SIDE: COLLECTION CATEGORIES --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-12 bg-white/[0.02] rounded-[2.5rem] border border-white/5 p-6 sm:p-8">
             <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight uppercase text-[#C9A84C]">Browse Collections</h2>
                <Link to="/perfumes" className="flex items-center gap-2 text-[#C9A84C] font-black uppercase tracking-widest text-[8px] border border-[#C9A84C]/20 px-4 py-2 rounded-full">Explore <ArrowRight size={10} /></Link>
             </div>
             
             <div className="grid grid-cols-3 gap-3 sm:gap-4 font-sans">
                {[
                  { name: "Oud Royale", ar: "عود", img: "/cat-oud.png" },
                  { name: "Florals", ar: "امیحاح", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600" },
                  { name: "White Musk", ar: "كسك", img: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=600" }
                ].map((c, i) => (
                  <Link key={i} to="/perfumes" className="group relative h-40 sm:h-56 rounded-2xl overflow-hidden border border-white/5">
                     <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-[4s]" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-2 text-center">
                        <span className="text-2xl sm:text-4xl font-brand text-[#C9A84C] mb-1 opacity-60 group-hover:opacity-100 transition-all font-black">{c.ar}</span>
                        <h4 className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-black text-white/40">{c.name}</h4>
                     </div>
                  </Link>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
