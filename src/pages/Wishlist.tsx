
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success("Removed from wishlist");
  };

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[#C9A84C]"></div>
            <h1 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tight">Your Wishlist</h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white/[0.02] rounded-[3rem] border border-white/5 p-20 text-center space-y-8">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/10">
                <Heart size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold">Your wishlist is empty</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Save items you love to find them easily later.</p>
              </div>
              <Link to="/perfumes" className="inline-flex px-12 py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C9A84C] transition-all">
                Add Masterpieces
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div key={item.id} className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all hover:bg-white/[0.04] p-8">
                  <div className="aspect-[3/4] bg-white rounded-3xl mb-8 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" />
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 p-3 bg-black/80 rounded-full text-white/40 hover:text-red-500 backdrop-blur-md transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif font-black">{item.name}</h3>
                    <p className="text-2xl font-black text-[#C9A84C]">₹{item.price.toLocaleString()}</p>
                    
                    <div className="flex flex-col gap-3 pt-4">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-white text-black py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#C9A84C] transition-all"
                      >
                        Add to Cart
                      </button>
                      <Link 
                        to={`/product/${item.id}`}
                        className="w-full border border-white/10 text-center py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#C9A84C]/40 transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
