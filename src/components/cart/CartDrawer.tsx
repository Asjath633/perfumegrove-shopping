
import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice
  } = useCart();
  
  const [isFirstOrder, setIsFirstOrder] = React.useState(true);

  React.useEffect(() => {
    const hasOrdered = localStorage.getItem("hasOrdered");
    setIsFirstOrder(!hasOrdered);
    
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] transition-opacity duration-500"
        onClick={closeCart}
      ></div>

      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0B0B0B] z-[101] shadow-2xl border-l border-white/5 transition-transform duration-700 ease-apple">
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-8 border-b border-white/5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C9A84C]">Your Cart</h2>
                <div className="text-white text-xs mt-1 font-bold">{totalItems} Unique Items</div>
              </div>
              <button onClick={closeCart} className="p-2 rounded-full bg-white/5 hover:bg-[#C9A84C]/20 border border-white/10 transition-all text-white">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                   <ShoppingBag size={40} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Your collection is empty</p>
                  <button onClick={closeCart} className="text-[#C9A84C] text-[9px] uppercase tracking-widest font-black hover:underline underline-offset-8">
                    Start Exploring
                  </button>
                </div>
              </div>
            ) : (
              <ul className="space-y-10">
                {items.map(item => (
                  <li key={item.product.id} className="flex gap-6 group">
                    <div className="w-20 h-24 bg-white/5 rounded-2xl overflow-hidden border border-white/5 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-tight text-white mb-1">{item.product.name}</h3>
                          <p className="text-[9px] text-[#C9A84C] font-bold tracking-widest uppercase">{item.product.size || 'Standard'}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-white/20 hover:text-red-500 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 scale-90 -ml-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-[#C9A84C]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white" disabled={item.quantity >= item.product.stock}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-xs font-black text-white">₹{item.product.price}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-white/5 bg-white/[0.02] space-y-6">
            {items.length > 0 ? (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">Subtotal</span>
                    <span className="text-sm font-black text-white">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">Delivery</span>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-black text-green-500">Free Concierge</span>
                      {isFirstOrder && (
                        <p className="text-[8px] text-[#C9A84C] font-black uppercase tracking-tighter mt-1 animate-pulse">Gift Included!</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-black underline underline-offset-4">Grand Total</span>
                    <span className="text-2xl font-brand font-black text-white tracking-tight">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <Link
                  to="/cart"
                  className="w-full bg-white text-black hover:bg-[#C9A84C] transition-all duration-500 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 shadow-xl"
                  onClick={closeCart}
                >
                  Confirm & Checkout
                  <ArrowRight size={14} />
                </Link>

                <p className="text-center text-[8px] text-white/20 uppercase tracking-widest font-black pt-2">
                   Secure end-to-end luxury transaction
                </p>
              </>
            ) : (
              <button 
                onClick={closeCart}
                className="w-full border border-white/10 py-5 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40 hover:bg-white/5 transition-all"
              >
                Back to Gallery
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;