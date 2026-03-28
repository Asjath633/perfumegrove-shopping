
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <h1 className="h1 mb-4">
              {department === "perfume" ? "Our Perfumes" : "Phone Accessories"}
            </h1>
            <p className="text-warmgray max-w-2xl mx-auto">
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
