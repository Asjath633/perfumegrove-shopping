import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Heart, Share2 } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsInWishlist(wishlist.some((item: any) => item.id === product.id));
    };
    checkWishlist();
    window.addEventListener('wishlist-updated', checkWishlist);
    return () => window.removeEventListener('wishlist-updated', checkWishlist);
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper relative aspect-[3/4] bg-white rounded-xl sm:rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-700 group-hover:border-[#C9A84C]/40 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.1)]">
        
        {/* Loading Skeleton */}
        <div
          className={`absolute inset-0 bg-white/[0.05] animate-pulse ${imageLoaded ? 'hidden' : 'block'}`}
        ></div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain ${product.department === 'perfume' ? 'p-2 sm:p-4' : 'p-8'} transition-transform duration-1000 ease-apple ${isHovered ? 'scale-105' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 sm:top-5 sm:left-5 bg-[#C9A84C] text-black text-[7px] sm:text-[9px] font-black px-2 py-1 sm:px-4 sm:py-1.5 rounded-full tracking-widest uppercase z-10 shadow-lg">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-6 right-6 bg-white text-black rounded-full p-4 shadow-2xl transition-all duration-700 transform ${isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            } hover:bg-[#C9A84C] hover:scale-110 active:scale-95 z-20`}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={20} strokeWidth={3} />
        </button>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
            const exists = wishlist.find((item: any) => item.id === product.id);
            if (exists) {
              const updated = wishlist.filter((item: any) => item.id !== product.id);
              localStorage.setItem("wishlist", JSON.stringify(updated));
              toast.info("Removed from wishlist");
            } else {
              wishlist.push(product);
              localStorage.setItem("wishlist", JSON.stringify(wishlist));
              toast.success("Added to wishlist");
            }
            window.dispatchEvent(new Event('wishlist-updated'));
          }}
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full transition-all duration-500 z-20 ${isInWishlist ? 'bg-[#C9A84C] text-black shadow-[0_0_20px_rgba(201,168,76,0.4)]' : 'bg-black/5 hover:bg-black/10 backdrop-blur-sm text-[#C9A84C] hover:scale-110 active:scale-95'}`}
        >
          <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-3 sm:mt-8 px-1 sm:px-2 space-y-1 sm:space-y-3">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#C9A84C] opacity-80 group-hover:opacity-100 transition-opacity">
            {product.category}
          </span>
          <h3 className="text-sm sm:text-xl md:text-2xl font-serif font-black text-white leading-tight transition-colors group-hover:text-[#C9A84C] truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
            <div className="flex text-[#C9A84C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill="currentColor" />
              ))}
            </div>
            <span className="text-[8px] sm:text-[10px] text-white/40 font-bold">(120+ Reviews)</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <div className="flex items-baseline gap-1 sm:gap-3">
            <span className="text-base sm:text-2xl font-black text-white tracking-tight">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-white/20 line-through font-bold whitespace-nowrap">₹{product.originalPrice}</span>
            )}
          </div>
          <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full group-hover:border-[#C9A84C]/30 group-hover:text-white transition-all">
            {product.size || 'Standard'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
