
import React, { useState, useEffect } from "react";
import { Product } from "@/lib/products";
import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dynamically get categories from the products actually displayed
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  const categories = ["all", ...uniqueCategories];

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading with small delay for better UX
    setTimeout(() => {
      if (!selectedCategory || selectedCategory === "all") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(
          products.filter(product => product.category === selectedCategory)
        );
      }
      setIsLoading(false);
    }, 300);
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === "all" ? null : category);
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 pb-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-all ${
                (category === "all" && !selectedCategory) || category === selectedCategory 
                  ? "bg-richblack text-white" 
                  : "bg-secondary hover:bg-gold/10"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid with Loading State */}
      <div className="relative min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 opacity-40">
            {products.slice(0, 8).map(product => (
              <div key={product.id} className="animate-pulse">
                <div className="bg-secondary rounded-lg aspect-[3/4]"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-secondary rounded w-3/4"></div>
                  <div className="h-4 bg-secondary rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-warmgray">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Request Product Banner */}
      <div className="mt-20 bg-cream/50 rounded-2xl p-8 md:p-12 text-center border border-gold/20 relative overflow-hidden">
        <div className="relative z-10">
          <PackageSearch size={48} className="mx-auto text-gold mb-4" />
          <h3 className="h3 mb-3 text-richblack">Didn't find what you're looking for?</h3>
          <p className="text-warmgray max-w-xl mx-auto mb-8 text-lg">
            {products.length > 0 && products[0].department === "accessory" 
              ? "We source the finest premium phone accessories. If you have a specific item in mind, let us know and we'll get it for you!"
              : "We source the finest perfumes. If you have a specific scent in mind, let us know and we'll get it for you!"}
          </p>
          <Link 
            to="/request" 
            className="inline-flex items-center bg-gold text-white px-8 py-4 rounded-full font-medium hover:bg-gold/90 transition-all shadow-sm"
          >
            <span>Request a Custom Product</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
