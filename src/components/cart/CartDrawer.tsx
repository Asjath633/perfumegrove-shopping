
import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
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

  // Prevent scrolling when cart is open
  React.useEffect(() => {
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
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      ></div>
      
      {/* Cart drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Your Cart ({totalItems})</h2>
              <button 
                onClick={closeCart}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <p className="text-warmgray mb-2">Your cart is empty</p>
                <button 
                  onClick={closeCart}
                  className="text-gold hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map(item => (
                  <li key={item.product.id} className="flex border-b pb-6">
                    <div className="w-20 h-24 bg-secondary rounded-md overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-warmgray hover:text-richblack transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <p className="text-sm text-warmgray">{item.product.size}</p>
                      <p className="mt-1">${item.product.price}</p>
                      
                      <div className="flex items-center mt-3">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-3 min-w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer with total and checkout */}
          <div className="p-6 border-t">
            {items.length > 0 && (
              <>
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-6 font-medium">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <Link 
                  to="/checkout"
                  className="button-primary w-full flex justify-center"
                  onClick={closeCart}
                >
                  Proceed to Checkout
                </Link>
                
                <button 
                  onClick={closeCart}
                  className="w-full text-center mt-4 text-sm text-warmgray hover:text-richblack transition-colors"
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
