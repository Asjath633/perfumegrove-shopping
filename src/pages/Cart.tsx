import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// 🔥 PASTE YOUR GOOGLE SCRIPT URL HERE BRO!
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEkbGQ0kI-71I1JnlsZ2o6Oq_F_3qlrf2SvDBxrcWevfu_6jbm6jzOpnBUkY7ZB2Uv/exec";

const Cart = () => {
    const {
        items,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart
    } = useCart();

    const [showCheckout, setShowCheckout] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFirstOrder, setIsFirstOrder] = useState(true);
    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        email: "",
        address: "",
        paymentType: "COD"
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        // Check if this is the first order
        const hasOrdered = localStorage.getItem("hasOrdered");
        setIsFirstOrder(!hasOrdered);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify({
                    ...formData,
                    items,
                    totalPrice
                }),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                }
            });

            const result = await response.json();

            if (result.result === "success") {
                // Mark that order has been placed
                localStorage.setItem("hasOrdered", "true");
                toast.success("Order placed successfully! We'll contact you soon.");
                clearCart();
                setFormData({ customerName: "", phone: "", email: "", address: "", paymentType: "COD" });
                setShowCheckout(false);
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            toast.error("Failed to place order. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
                            <Link to="/perfumes" className="button-primary">
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
                                                        <p className="font-medium">₹{item.product.price}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="mx-3 min-w-8 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                                                                disabled={item.quantity >= item.product.stock}
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="text-warmgray hover:text-richblack transition-colors flex items-center"
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
                                    <Link to="/perfumes" className="text-gold hover:underline flex items-center">
                                        <span className="mr-1">← Continue Shopping</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Order Summary + Checkout */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                    <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-warmgray">Subtotal</span>
                                            <span>₹{totalPrice.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-warmgray">Shipping</span>
                                            <div className="text-right">
                                                <span>Free</span>
                                                {isFirstOrder && (
                                                    <p className="text-xs text-gold font-medium">First Order!</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4 mb-6">
                                        <div className="flex justify-between font-medium text-lg">
                                            <span>Total</span>
                                            <span>₹{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {!showCheckout ? (
                                        <Button
                                            onClick={() => setShowCheckout(true)}
                                            className="w-full bg-gold hover:bg-gold/90 text-white"
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
                                            <h3 className="font-medium">Enter Your Details</h3>

                                            <Input
                                                placeholder="Your Name"
                                                value={formData.customerName}
                                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                                required
                                            />
                                            <Input
                                                placeholder="Phone Number"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                            <Input
                                                placeholder="Delivery Address"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                required
                                            />

                                            <select
                                                value={formData.paymentType}
                                                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                                className="w-full p-2 border rounded-md"
                                            >
                                                <option value="COD">Cash on Delivery</option>
                                                <option value="Online">Online Payment</option>
                                            </select>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gold hover:bg-gold/90 text-white"
                                                disabled={loading}
                                            >
                                                {loading ? "Placing Order..." : "Place Order"}
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => setShowCheckout(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </form>
                                    )}
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