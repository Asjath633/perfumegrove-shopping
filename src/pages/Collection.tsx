
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductGrid from "@/components/products/ProductGrid";
import { getProductsByDepartment } from "@/lib/products";

interface CollectionProps {
  department?: "perfume" | "accessory";
}

const Collection = ({ department = "perfume" }: CollectionProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [department]);

  const displayProducts = getProductsByDepartment(department);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Navbar />
      <main className="flex-1 pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="page-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-1 sm:mb-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white mb-1">
              {department === "perfume" ? "Our Perfumes" : "Phone Accessories"}
            </h1>
            <p className="text-warmgray text-[10px] sm:text-base max-w-2xl mx-auto uppercase tracking-[0.2em] sm:tracking-normal opacity-60 sm:opacity-100 hidden sm:block">
              {department === "perfume"
                ? "Explore our complete collection of handcrafted attars, each telling its own unique olfactory story."
                : "Premium accessories to protect and style your phone."}
            </p>
          </div>

          <ProductGrid products={displayProducts} />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Collection;
