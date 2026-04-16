
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Clock, Hourglass, Star, ShoppingBag, ArrowRight } from "lucide-react";
import { getBestSellers, Product } from "@/lib/products";
import ProductCard from "../products/ProductCard";

// --- C. FEATURE HIGHLIGHTS ---
export const FeatureHighlights = () => (
  <section className="py-24 bg-[#0B0B0B]">
    <div className="page-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        {[
          { icon: <Leaf size={32} />, title: "100% Natural", desc: "Sourced from pure botanical essences" },
          { icon: <Hourglass size={32} />, title: "Long Lasting", desc: "Concentrated oils that linger for 24h+" },
          { icon: <div className="text-3xl">🕌</div>, title: "Alcohol-Free", desc: "Traditional attar formulation" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center animate-fade-in-scroll visible">
            <div className="text-[#D4AF37] mb-6 hover:scale-110 transition-transform duration-500">{item.icon}</div>
            <h3 className="font-sans font-bold tracking-[0.2em] text-[#F5F5DC] uppercase text-sm mb-3">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- D. BEST SELLERS ---
export const BestSellers = () => {
  const bestSellers = getBestSellers().slice(0, 4);
  return (
    <section className="py-32 bg-[#0B0B0B]">
      <div className="page-container">
        <div className="text-center mb-20 animate-fade-in-scroll visible">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F5DC] tracking-wide uppercase mb-4">Best Sellers</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="glass-card p-6 group hover:translate-y-[-10px] transition-all duration-700 hover:border-[#D4AF37]/30">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-secondary/5 relative">
                 <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 to-transparent"></div>
              </div>
              <h4 className="font-sans font-bold text-sm tracking-[0.1em] text-[#F5F5DC] mb-1 group-hover:text-[#D4AF37] transition-colors uppercase">{product.name}</h4>
              <p className="text-[#F5F5DC]/40 text-[10px] tracking-[0.2em] uppercase mb-4 font-medium">{product.category}</p>
              <div className="flex items-center justify-between mt-auto">
                 <span className="font-sans font-bold text-[#D4AF37]">₹{product.price}</span>
                 <Link to={`/product/${product.id}`} className="text-[9px] uppercase font-bold tracking-widest text-[#F5F5DC]/60 hover:text-[#D4AF37] border-b border-[#D4AF37]/30 pb-0.5 transition-all">Quick View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- E. EXPLORE COLLECTIONS ---
export const ExploreCollections = () => (
  <section className="py-32 bg-[#0B0B0B]">
    <div className="page-container">
      <div className="text-center mb-20">
         <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F5DC] tracking-wide mb-4">Explore Our Collections</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Oud Collection", ar: "عود", img: "https://images.unsplash.com/photo-1547881338-649726316262?q=80&w=600", category: "Oud" },
          { name: "Mild Attar", ar: "Mild", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600", category: "Mild" },
          { name: "Musk Attar", ar: "Musk", img: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=600", category: "Musk" }
        ].map((c, i) => (
          <Link key={i} to={`/perfumes?category=${c.category}`} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-1000">
             <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] brightness-[0.4]" />
             <div className="absolute inset-x-0 bottom-0 p-12 text-center z-10">
                <span className="text-6xl md:text-8xl font-brand text-[#D4AF37]/40 mb-2 block group-hover:scale-110 group-hover:text-[#D4AF37]/80 transition-all font-black opacity-30 group-hover:opacity-100 uppercase">{c.ar}</span>
                <h4 className="text-xs uppercase tracking-[0.4em] font-black text-[#F5F5DC] mt-4">{c.name}</h4>
             </div>
             <div className="absolute inset-0 bg-black/40 group-hover:bg-[#D4AF37]/5 transition-all duration-700"></div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// --- F. ABOUT SECTION ---
export const AboutSection = () => (
  <section className="py-32 bg-[#0B0B0B]">
    <div className="page-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden animate-fade-in-scroll visible border border-white/5 group">
           <img src="https://images.unsplash.com/photo-1616984714131-7bc7ea249fcc?q=80&w=1000" alt="Heritage" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        <div className="animate-fade-in-scroll visible">
           <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] font-sans font-bold tracking-[0.3em] uppercase text-[10px]">Since 1982</span>
           </div>
           <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#F5F5DC] mb-10 leading-tight tracking-tight">Our Story <br /> <span className="text-[#F5F5DC]/40 italic font-medium">Of True Heritage</span></h2>
           <p className="text-[#F5F5DC]/60 font-sans leading-[1.8] text-lg mb-10">
             The story provides an elegant and ancient tradition as experienced and text consumer manifest our experience on complexity and tradition. Meticulously distilled to preserve the raw, sacred essence of nature's finest botanicals.
           </p>
           <Link to="/about" className="gold-pill-button px-12 py-5">
             Read Full Heritage
           </Link>
        </div>
      </div>
    </div>
  </section>
);

// --- G. CUSTOMER REVIEWS ---
export const CustomerReviews = () => (
  <section className="py-32 bg-[#0B0B0B]">
    <div className="page-container">
       <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F5DC] tracking-wide mb-4">What Our <span className="text-[#D4AF37]">Customers</span> Say</h2>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { name: "Omar Khayyam", text: "The quality of the Oud is unmatched. It has a depth that I've only found in rare private collections.", star: 5 },
           { name: "Fatima Al-Sayed", text: "Truly alcohol-free and lasting. The Floral collection is like walking through a blooming oasis at dawn.", star: 5 },
           { name: "James Sterling", text: "A sophisticated experience from presentation to the scent profile. Zandro is the pinnacle of Attar.", star: 5 }
         ].map((rev, i) => (
           <div key={i} className="glass-card p-10 group hover:border-[#D4AF37]/30 transition-all duration-500">
              <div className="flex text-[#D4AF37] mb-6 space-x-1">
                 {[...Array(rev.star)].map((_, s) => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[#F5F5DC]/70 font-sans italic leading-relaxed mb-8 text-sm">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xs font-brand">{rev.name[0]}</div>
                 <span className="text-[#F5F5DC] font-sans font-bold tracking-widest uppercase text-[10px]">{rev.name}</span>
              </div>
           </div>
         ))}
       </div>
    </div>
  </section>
);

// --- H. CTA SECTION ---
export const CallToAction = () => (
  <section className="py-40 bg-[#0B0B0B] text-center">
    <div className="page-container relative overflow-hidden">
       <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full scale-150 pointer-events-none"></div>
       <div className="relative z-10">
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#F5F5DC] mb-12 tracking-tight">Experience <span className="text-[#D4AF37]">True</span> Luxury</h2>
          <Link to="/perfumes" className="gold-pill-button px-16 py-6 text-sm">
             Shop Now
          </Link>
       </div>
    </div>
  </section>
);
