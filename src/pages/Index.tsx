
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Story Section */}
        <section className="py-20 bg-secondary overflow-hidden">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <p className="subtle-text mb-3">Our Story</p>
                <h2 className="h2 mb-6">The Ancient Art of Attar</h2>
                <p className="text-warmgray mb-5 leading-relaxed">
                  Attars are precious natural perfumes created through the ancient art of hydro-distillation, 
                  a tradition spanning over a thousand years across the Middle East, India, and beyond.
                </p>
                <p className="text-warmgray mb-5 leading-relaxed">
                  Unlike conventional perfumes, attars contain no alcohol or synthetic chemicals. 
                  They are pure botanical essences that evolve uniquely with your body chemistry, 
                  creating a scent experience that is entirely personal and long-lasting.
                </p>
                <p className="text-warmgray leading-relaxed">
                  At Attarome, we honor this ancient tradition while bringing a modern sensibility to 
                  our carefully curated collection of hand-crafted attars.
                </p>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1616604847662-b9b5d9200d98?q=80&w=800&auto=format&fit=crop" 
                      alt="Attar making process" 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-1000"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gold rounded-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="text-xs font-light">EST.</p>
                      <p className="text-xl font-light">2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-cream">
          <div className="page-container">
            <div className="text-center mb-16">
              <p className="subtle-text mb-3">Why Choose Attarome</p>
              <h2 className="h2 mb-4">The Natural Difference</h2>
              <p className="text-warmgray max-w-2xl mx-auto">
                Discover the benefits of our natural attars compared to conventional perfumes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <span className="text-gold text-2xl">01</span>
                </div>
                <h3 className="text-xl mb-4">100% Natural</h3>
                <p className="text-warmgray">
                  Our attars contain no alcohol, synthetic chemicals, or fixatives—just pure, 
                  natural botanical essences.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <span className="text-gold text-2xl">02</span>
                </div>
                <h3 className="text-xl mb-4">Long-Lasting</h3>
                <p className="text-warmgray">
                  The concentrated nature of attars means they last much longer than conventional 
                  perfumes—often throughout the entire day.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <span className="text-gold text-2xl">03</span>
                </div>
                <h3 className="text-xl mb-4">Uniquely Yours</h3>
                <p className="text-warmgray">
                  Attars interact with your body chemistry, creating a scent that is uniquely 
                  personal to you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
