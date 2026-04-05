
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-cream"
    >
      <div className="page-container">
        <div className="text-center mb-16">
          <p className="subtle-text mb-3">Discover</p>
          <h2 className="h2 mb-4">Featured Collections</h2>
          <p className="text-warmgray max-w-2xl mx-auto">
            Explore our premium collections of handcrafted attars and elite smartphone accessories, each selected for its exceptional quality and craftsmanship.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-all duration-1000 ease-apple ${isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
            }`}
        >
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-1000 ease-apple"
              style={{
                transitionDelay: `${150 * index}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)"
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/perfumes"
            className="inline-block border-b border-richblack pb-1 text-sm hover:border-gold hover:text-gold transition-colors"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
