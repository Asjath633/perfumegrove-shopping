
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity,
    totalItems,
    totalPrice 
  } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="page-container">
          <h1 className="h2 mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <h2 className="text-xl mb-2">Your cart is empty</h2>
              <p className="text-warmgray mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link 
                to="/collection" 
                className="button-primary"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-medium">Cart Items ({totalItems})</h2>
                  </div>
                  
                  <ul className="divide-y">
                    {items.map(item => (
                      <li key={item.product.id} className="p-6 flex items-center">
                        <div className="w-20 h-24 bg-secondary rounded-md overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 ml-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-warmgray">{item.product.size}</p>
                            </div>
                            <p className="font-medium">${item.product.price}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
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
                            
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-warmgray hover:text-richblack transition-colors flex items-center"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash size={16} className="mr-1" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/collection"
                    className="text-gold hover:underline flex items-center"
                  >
                    <span className="mr-1">Continue Shopping</span>
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-warmgray">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-warmgray">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/checkout"
                    className="button-primary w-full flex justify-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
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

export default Cart;
