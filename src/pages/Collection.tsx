
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/lib/products";

const Collection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <h1 className="h1 mb-4">Our Collection</h1>
            <p className="text-warmgray max-w-2xl mx-auto">
              Explore our complete collection of handcrafted attars, each telling its own unique olfactory story
            </p>
          </div>
          
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Collection;
