
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) {
        heroRef.current.style.opacity = "1";
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className={cn(
        "relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-20 px-6",
        "bg-gradient-to-b from-[#121212] via-[#050505] to-black opacity-0 transition-opacity duration-1000"
      )}
    >
      {/* 🌌 Atmospheric Blue Glow Layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* 🎖️ Award Archway Main Display */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Floating Excellence Header */}
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom duration-1000">
           <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-gold/30" />
              <span className="text-gold tracking-[0.4em] text-[10px] md:text-sm font-bold uppercase py-1 px-3 border border-gold/20 rounded-full bg-gold/5 backdrop-blur-sm">
                Awarded 2026
              </span>
              <div className="h-[1px] w-12 bg-gold/30" />
           </div>
           
           <h1 className="text-6xl md:text-8xl lg:text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-[#222] tracking-tighter leading-none mb-2 drop-shadow-2xl selection:bg-gold selection:text-black">
              EXCELLENCE
           </h1>
           <p className="text-gold tracking-[0.6em] text-[10px] md:text-sm font-light uppercase opacity-60">
              The Highest Standard of Luxury
           </p>
        </div>

        {/* 🛡️ Central Shield Trophy Stage */}
        <div className="relative mb-20 group animate-in zoom-in fade-in duration-1000 delay-300">
           {/* Trophy Lighting Effects */}
           <div className="absolute -inset-20 bg-blue-400/5 rounded-full blur-[80px] group-hover:bg-gold/5 transition-all duration-1000 pointer-events-none" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
           
           {/* Shield Logo Frame (The Award) */}
           <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center z-10 transition-transform duration-700 group-hover:scale-105">
              <div className="absolute inset-0 border border-white/5 rounded-2xl rotate-45 backdrop-blur-sm bg-white/[0.02]" />
              <div className="absolute inset-2 border border-white/10 rounded-2xl -rotate-12" />
              
              <img 
                src="/zandro_logo.png?v=3" 
                alt="ZANDRO Excellence Award" 
                className="w-full h-full object-contain relative z-20 drop-shadow-[0_0_40px_rgba(255,215,0,0.2)] group-hover:drop-shadow-[0_0_60px_rgba(255,215,0,0.4)] transition-all duration-700" 
              />
              
              {/* Dynamic Sparkles */}
              <Sparkles className="absolute -top-4 -right-4 text-gold/40 animate-pulse transition-opacity opacity-0 group-hover:opacity-100" size={24} />
              <Sparkles className="absolute -bottom-8 -left-4 text-white/20 animate-pulse duration-3000 opacity-0 group-hover:opacity-100" size={18} />
           </div>

           {/* 🏛️ 3-Tier Black Marble/Luxury Plinth */}
           <div className="mt-[-20px] relative z-0 flex flex-col items-center">
              {/* Tier 1 (Smallest Top) */}
              <div className="w-48 h-4 bg-[#222] border-t border-white/20 relative z-30 shadow-2xl" />
              {/* Tier 2 (Middle) */}
              <div className="w-64 h-6 bg-[#181818] border-t border-white/10 relative z-20 shadow-2xl -mt-1" />
              {/* Tier 3 (Base) */}
              <div className="w-80 h-10 bg-gradient-to-b from-[#121212] to-black border-t border-white/5 relative z-10 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.7)]" />
              
              {/* Blue Ground Lighting */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-blue-500/40 blur-[8px] animate-pulse" />
           </div>
        </div>

        {/* 🧭 Call to Action Section */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 animate-in fade-in slide-in-from-top duration-1000 delay-700">
          <Link
            to="/perfumes"
            className="group relative flex items-center bg-gold text-richblack px-10 py-5 rounded-md font-bold tracking-[0.2em] transition-all hover:pr-12 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,215,0,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            <span className="relative uppercase text-sm">Explore Collection</span>
            <ArrowRight size={18} className="relative ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            to="/accessories"
            className="group flex items-center text-white/50 hover:text-white transition-all uppercase tracking-[0.3em] text-[11px] font-medium"
          >
            <ShieldCheck size={16} className="mr-3 opacity-40 group-hover:opacity-100" />
            <span>Guaranteed Quality</span>
          </Link>
        </div>
      </div>

      {/* 📐 Subtle Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute h-full w-[1px] left-1/4 bg-white" />
        <div className="absolute h-full w-[1px] right-1/4 bg-white" />
        <div className="absolute w-full h-[1px] top-1/2 bg-white" />
      </div>
    </div>
  );
};

export default Hero;
