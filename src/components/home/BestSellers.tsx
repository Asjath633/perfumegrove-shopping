
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import ProductCard from "../products/ProductCard";
import { getBestSellers } from "@/lib/products";

const BestSellers = () => {
  const bestSellers = getBestSellers();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (bestSellers.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] w-8 bg-gold"></div>
              <span className="text-gold font-medium tracking-[0.2em] uppercase text-xs">Most Loved</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-brand font-bold text-richblack mb-6">Our Best Sellers</h2>
            <p className="text-warmgray text-lg leading-relaxed">
              Experience the pinnacle of fine attar mastery with our signature collection that has captured the hearts of connoisseurs worldwide.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-richblack hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 group shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-richblack hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 group shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 pt-4 -mx-4 px-4 active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[44vw] sm:min-w-[320px] lg:min-w-[350px] snap-start relative">
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-richblack text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  <Trophy size={10} className="text-gold" />
                  <span>BEST SELLER</span>
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 py-3 px-6 rounded-full bg-cream/30 border border-gold/10 backdrop-blur-sm">
            <span className="text-warmgray text-sm">Join over 10,000+ satisfied customers</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
