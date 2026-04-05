
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
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
