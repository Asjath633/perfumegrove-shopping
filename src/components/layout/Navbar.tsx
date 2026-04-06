
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, Menu, X, Plus, ChevronLeft, ChevronRight, 
  RotateCcw, Lock, Search, Smile, User, Info 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top duration-700">
      {/* 🏆 Browser Frame Mockup Header */}
      <div className="bg-[#1a1a1a] border-b border-white/5 h-10 flex items-center px-4 justify-between select-none">
        {/* Window Controls */}
        <div className="flex items-center space-x-2 w-24">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" />
        </div>

        {/* Tab Indicators (Mockup) */}
        <div className="flex items-center absolute left-1/2 -translate-x-1/2 space-x-1 h-full">
          <div className="bg-[#2a2a2a] h-8 px-4 rounded-t-lg flex items-center space-x-2 text-[11px] text-white/90 border-x border-t border-white/5 min-w-[120px]">
             <span className="text-gold font-bold">GEN</span>
             <span className="truncate">ZANDRO</span>
             <X size={10} className="hover:text-gold cursor-pointer" />
          </div>
          <div className="px-3 py-1 hover:bg-white/5 rounded-md flex items-center justify-center transition-colors">
            <Plus size={14} className="text-white/40" />
          </div>
        </div>

        {/* Right Corner Info */}
        <div className="flex items-center space-x-4 text-white/40">
           <Smile size={16} className="hover:text-white/60 transition-colors" />
           <User size={16} className="hover:text-white/60 transition-colors" />
           <Info size={16} className="hover:text-white/60 transition-colors" />
        </div>
      </div>

      {/* 🚀 Browser Navigation/URL BAr */}
      <div className={cn(
        "bg-[#242424] px-4 py-2 flex items-center space-x-4 transition-all duration-300",
        isScrolled ? "shadow-xl border-b border-white/10" : ""
      )}>
        <div className="flex items-center space-x-1 text-white/40">
          <button className="p-1.5 hover:bg-white/5 rounded-md"><ChevronLeft size={18} /></button>
          <button className="p-1.5 hover:bg-white/5 rounded-md"><ChevronRight size={18} /></button>
          <button className="p-1.5 hover:bg-white/5 rounded-md ml-1"><RotateCcw size={16} /></button>
        </div>

        {/* URL Input Area */}
        <div className="flex-1 bg-[#121212] rounded-full h-8 flex items-center px-4 justify-between group cursor-text border border-white/5 hover:border-white/20 transition-all">
          <div className="flex items-center space-x-3 truncate">
            <Lock size={12} className="text-green-500/80" />
            <span className="text-[13px] text-white/80 font-light tracking-wide">https://www.zandro.com</span>
          </div>
          <div className="flex items-center space-x-3 text-white/40">
             <RotateCcw size={14} className="hover:text-gold transition-colors" />
             <Search size={14} />
          </div>
        </div>

        {/* Real Navbar Interactions (Cart / Menu) */}
        <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
          <button
            onClick={openCart}
            className="p-2 hover:text-gold transition-all relative group"
          >
            <ShoppingBag size={20} className="text-white/90 group-hover:scale-110 duration-300" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-richblack text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
