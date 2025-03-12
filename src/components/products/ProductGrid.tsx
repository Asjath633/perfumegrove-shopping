
import React, { useState, useEffect } from "react";
import { Product, getAllCategories } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(false);
  const categories = ["all", ...getAllCategories()];

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
    </div>
  );
};

export default ProductGrid;
