
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper relative aspect-[3/4] bg-cream/40 rounded-lg overflow-hidden">
        <div 
          className={`absolute inset-0 bg-secondary animate-pulse ${imageLoaded ? 'hidden' : 'block'}`}
        ></div>
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md transition-all duration-500 ${
            isHovered 
              ? 'opacity-100 transform-none' 
              : 'opacity-0 translate-y-4'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={16} className="text-richblack" />
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-medium transition-colors group-hover:text-gold">{product.name}</h3>
        <p className="text-warmgray text-sm">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
        <p className="font-medium">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
