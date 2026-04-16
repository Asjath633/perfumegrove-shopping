
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getProductById, getProductsByCategory, Product, getSizeImage } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag, ShieldCheck, Heart, Share2, Award, Zap, Clock, Star } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsInWishlist(saved.some((item: any) => item.id === id));
    };
    checkWishlist();
    window.addEventListener('wishlist-updated', checkWishlist);
    return () => window.removeEventListener('wishlist-updated', checkWishlist);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setQuantity(1);
        setSelectedSize("");
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate("/perfumes");
      }
    }
  }, [id, navigate]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
      const currentSizeObj = product.sizes?.find(s => s.size === selectedSize) ||
        { size: product.size, stock: product.stock };
      if (newQuantity >= 1 && newQuantity <= currentSizeObj.stock) {
        setQuantity(newQuantity);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
      setQuantity(1);
      setImageLoaded(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const sizeToAdd = selectedSize || product.size;
      const productWithSelectedSize = {
        ...product,
        size: sizeToAdd,
        price: product.sizes?.find(s => s.size === sizeToAdd)?.price || product.price
      };

      for (let i = 0; i < quantity; i++) {
        addToCart(productWithSelectedSize);
      }
    }
  };

  const getCurrentStock = () => {
    if (!product) return 0;
    const sizeToCheck = selectedSize || product.size;
    if (product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === sizeToCheck);
      return sizeObj ? sizeObj.stock : product.stock;
    }
    return product.stock;
  };

  const getCurrentPrice = () => {
    if (!product) return 0;
    const sizeToCheck = selectedSize || product.size;
    if (product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === sizeToCheck);
      return sizeObj ? sizeObj.price : product.price;
    }
    return product.price;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#F5F5DC] items-center justify-center p-12 text-center">
         <Navbar />
         <div className="max-w-md space-y-8 animate-pulse">
            <h2 className="text-4xl font-serif font-black uppercase tracking-widest text-[#C9A84C]">Selecting Scent...</h2>
            <p className="text-sm uppercase tracking-[0.5em] text-white/20 font-bold">Refining your aromatic masterpiece</p>
            <div className="pt-8 flex justify-center">
               <Link to="/" className="text-[10px] font-black uppercase tracking-widest border border-white/10 px-12 py-4 rounded-full hover:bg-white/5 transition-all">Return to Gallery</Link>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* LEFT: Product Display */}
            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <Link to="/perfumes" className="text-[9px] tracking-[.4em] uppercase text-white/20 hover:text-gold transition-colors font-black">Collection</Link>
                  <div className="w-1 h-1 rounded-full bg-gold/40"></div>
                  <span className="text-[9px] tracking-[.4em] uppercase text-[#C9A84C] font-black">{product.category}</span>
               </div>
               
               <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-[#080808]">
                 <img
                   key={`${product.id}-${selectedSize}`}
                   src={getSizeImage(product, selectedSize)}
                   alt={product.name}
                   className={`w-full h-full ${product.department === 'accessory' ? 'object-contain p-12' : 'object-cover'} transition-transform duration-[3s] hover:scale-105`}
                   onLoad={() => setImageLoaded(true)}
                 />
                 
                 <div className="absolute top-6 right-6 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
                        if (isInWishlist) {
                          const updated = wishlist.filter((item: any) => item.id !== product.id);
                          localStorage.setItem("wishlist", JSON.stringify(updated));
                          setIsInWishlist(false);
                          toast.info("Removed from wishlist");
                        } else {
                          wishlist.push(product);
                          localStorage.setItem("wishlist", JSON.stringify(wishlist));
                          setIsInWishlist(true);
                          toast.success("Added to wishlist");
                        }
                        window.dispatchEvent(new Event('wishlist-updated'));
                      }}
                      className={`w-10 h-10 bg-white/5 hover:bg-gold/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 transition-all ${isInWishlist ? 'text-[#C9A84C]' : ''}`}
                    >
                       <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                    </button>
                    <button className="w-10 h-10 bg-white/5 hover:bg-gold/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 transition-all">
                       <Share2 size={16} />
                    </button>
                 </div>
               </div>
            </div>

            {/* RIGHT: Curated Selection Details */}
            <div className="flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-[1px] bg-gold"></div>
                   <span className="text-gold text-[9px] font-black tracking-[0.5em] uppercase">Signature Edition</span>
               </div>
               
               <h1 className="text-4xl md:text-5xl font-serif font-black mb-6 tracking-tight">{product.name}</h1>
               
               <div className="flex items-center gap-6 mb-8">
                  <span className="text-3xl font-brand font-bold text-white tracking-tighter">₹{getCurrentPrice()}</span>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div className="flex flex-col">
                     <div className="flex text-gold">
                        {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                     </div>
                     <span className="text-[8px] uppercase font-black text-white/20 mt-1 tracking-[0.3em]">Top Rated Masterpiece</span>
                  </div>
               </div>

               <p className="text-sm font-serif italic text-white/50 leading-relaxed mb-10 max-w-xl">
                  {product.description}
               </p>

               {/* Notes */}
               <div className="mb-10">
                  <h3 className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 mb-5">Olfactory Journey</h3>
                  <div className="flex flex-wrap gap-2">
                     {product.notes.map(note => (
                       <span key={note} className="px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-all">
                         {note}
                       </span>
                     ))}
                  </div>
               </div>

               {/* Size Selection */}
               {product.sizes && (
                 <div className="mb-10">
                   <h3 className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 mb-5">Select Volume</h3>
                   <div className="grid grid-cols-2 gap-3">
                     {product.sizes.map(sizeOption => (
                       <button
                         key={sizeOption.size}
                         onClick={() => handleSizeChange(sizeOption.size)}
                         className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                           selectedSize === sizeOption.size
                             ? 'bg-[#C9A84C] text-black border-[#C9A84C] shadow-lg'
                             : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                         }`}
                       >
                         {sizeOption.size} • ₹{sizeOption.price}
                       </button>
                     ))}
                   </div>
                 </div>
               )}

               {/* Actions */}
               <div className="mt-4 space-y-6">
                  <div className="flex items-center gap-6">
                     <div className="flex items-center bg-white/[0.03] rounded-full p-1 border border-white/5">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-black text-sm">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                     </div>
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">{getCurrentStock()} Units in Reserve</span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-white text-black hover:bg-[#C9A84C] hover:text-black transition-all duration-500 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3"
                    disabled={getCurrentStock() === 0}
                  >
                    <ShoppingBag size={16} />
                    Secure Purchase
                  </button>
                  
                  <div className="flex items-center justify-center gap-6 pt-4 opacity-20 text-[8px] font-black uppercase tracking-[0.4em]">
                     <div className="flex items-center gap-2 tracking-tighter"><ShieldCheck size={12} /> Purity Certified</div>
                     <div className="flex items-center gap-2 tracking-tighter"><Clock size={12} /> Priority Concierge</div>
                  </div>
               </div>

            </div>
          </div>

          {/* Recommended Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-32">
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                 <h2 className="text-2xl font-serif font-black tracking-tight uppercase">You May Also <span className="text-[#C9A84C]">Favor</span></h2>
                 <Link to="/perfumes" className="text-[#C9A84C] text-[9px] font-black tracking-widest uppercase border-b border-[#C9A84C]/20 pb-1">View Collection</Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
