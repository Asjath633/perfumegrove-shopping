
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CartDrawer from "@/components/cart/CartDrawer";
import { FeatureHighlights, BestSellers, ExploreCollections, AboutSection, CustomerReviews, CallToAction } from "@/components/home/HomeComponents";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
