
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash, Plus, Minus, CreditCard, Truck, User, MapPin, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// 🔥 PASTE YOUR GOOGLE SCRIPT URL HERE BRO!
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEkbGQ0kI-71I1JnlsZ2o6Oq_F_3qlrf2SvDBxrcWevfu_6jbm6jzOpnBUkY7ZB2Uv/exec";

const Cart = () => {
    const navigate = useNavigate();
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
        const hasOrdered = localStorage.getItem("hasOrdered");
        setIsFirstOrder(!hasOrdered);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error("Your collection is empty!");
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
                localStorage.setItem("hasOrdered", "true");
                
                const newOrder = {
                    id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    items: [...items],
                    totalPrice,
                    date: new Date().toISOString(),
                    status: 'processing',
                    customerDetails: {
                        name: formData.customerName,
                        phone: formData.phone,
                        address: formData.address
                    }
                };
                
                const existingOrders = JSON.parse(localStorage.getItem("pastOrders") || "[]");
                localStorage.setItem("pastOrders", JSON.stringify([newOrder, ...existingOrders]));

                toast.success("Order secured! Launching payment gateway...");
                
                // 🔥 AUTO-REDIRECT TO UPI APP IF ONLINE PAY
                if (formData.paymentType === "Online") {
                   const upiUrl = `upi://pay?pa=syedasjath05@okaxis&pn=Zandro&am=${totalPrice}&cu=INR`;
                   window.location.href = upiUrl;
                }

                clearCart();
                setFormData({ customerName: "", phone: "", email: "", address: "", paymentType: "COD" });
                setShowCheckout(false);
                
                // Allow time for UPI launch
                setTimeout(() => {
                   navigate("/orders");
                }, 1500);
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            toast.error("Failed to secure order. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
            <Navbar />
            <main className="flex-1 pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[1px] bg-[#C9A84C]"></div>
                        <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight">Your Selection</h1>
                    </div>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                                <ShoppingBag size={48} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold">Your collection is empty</h2>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Begin your journey through our exclusive attars.</p>
                            </div>
                            <Link to="/perfumes" className="inline-flex px-12 py-5 bg-[#C9A84C] text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-[#C9A84C]/20">
                                Explore Gallery
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            
                            {/* Inventory List */}
                            <div className="lg:col-span-7 space-y-12">
                                <div className="space-y-8">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 border-b border-white/5 pb-6 flex items-center gap-4">
                                        <Truck size={14} /> Curated Items ({totalItems})
                                    </h2>

                                    <ul className="space-y-10">
                                        {items.map(item => (
                                            <li key={item.product.id} className="group flex gap-8 items-center bg-white/[0.01] hover:bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 transition-all">
                                                <div className="w-24 h-32 bg-white/5 rounded-2xl overflow-hidden border border-white/5 shrink-0">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between h-32">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg md:text-xl font-serif font-black text-white group-hover:text-[#C9A84C] transition-colors">{item.product.name}</h3>
                                                            <p className="text-[10px] text-[#C9A84C] font-black uppercase tracking-widest mt-1">{item.product.size || 'Standard'}</p>
                                                        </div>
                                                        <span className="text-xl font-black text-white">₹{item.product.price}</span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/10">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-10 text-center text-sm font-black text-[#C9A84C]">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                                                                disabled={item.quantity >= item.product.stock}
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="text-white/20 hover:text-red-500 transition-all flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"
                                                        >
                                                            <Trash size={14} />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-8">
                                    <Link to="/perfumes" className="text-[#C9A84C] hover:text-white flex items-center gap-3 transition-all">
                                        <div className="w-8 h-[1px] bg-white/20"></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Continue Exploring</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Summary & Checkout */}
                            <div className="lg:col-span-5">
                                <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-10 md:p-12 sticky top-32 backdrop-blur-3xl shadow-2xl">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A84C] mb-10 pb-6 border-b border-white/5">Order Summary</h2>

                                    <div className="space-y-6 mb-10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-white/30">Subtotal</span>
                                            <span className="text-lg font-black text-white">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-white/30">Shipping</span>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A84C]">Complimentary</span>
                                                {isFirstOrder && (
                                                    <p className="text-[8px] text-green-500 font-bold uppercase tracking-tighter mt-1 animate-pulse">Welcome Gift Included!</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/10">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">Grand Total</span>
                                                <span className="text-4xl font-brand font-black text-white tracking-tighter">₹{totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {!showCheckout ? (
                                        <button
                                            onClick={() => setShowCheckout(true)}
                                            className="w-full bg-[#C9A84C] hover:scale-[1.02] transition-all duration-500 text-black py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 shadow-xl shadow-[#C9A84C]/10"
                                        >
                                            Secure Checkout
                                            <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <User size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C]/40" />
                                                    <input
                                                        placeholder="FULL NAME"
                                                        value={formData.customerName}
                                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                                        required
                                                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white placeholder-white/10 focus:outline-none focus:border-[#C9A84C]"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Phone size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C]/40" />
                                                    <input
                                                        placeholder="PHONE NUMBER"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        required
                                                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white placeholder-white/10 focus:outline-none focus:border-[#C9A84C]"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Mail size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C]/40" />
                                                    <input
                                                        placeholder="EMAIL ADDRESS"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white placeholder-white/10 focus:outline-none focus:border-[#C9A84C]"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <MapPin size={14} className="absolute left-5 top-5 text-[#C9A84C]/40" />
                                                    <textarea
                                                        placeholder="DELIVERY ADDRESS"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                        required
                                                        className="w-full min-h-[100px] pl-12 pr-6 py-5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white placeholder-white/10 focus:outline-none focus:border-[#C9A84C] resize-none"
                                                    />
                                                </div>

                                                <div className="relative">
                                                    <CreditCard size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A84C]/40" />
                                                    <select
                                                        value={formData.paymentType}
                                                        onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white appearance-none focus:outline-none focus:border-[#C9A84C]"
                                                    >
                                                        <option value="COD" className="bg-[#0B0B0B]">CASH ON DELIVERY</option>
                                                        <option value="Online" className="bg-[#0B0B0B]">ONLINE TRANSFER (GPay/PhonePe/Bank)</option>
                                                    </select>
                                                </div>

                                                {formData.paymentType === "Online" && (
                                                   <div className="p-6 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-2xl space-y-4 animate-in fade-in zoom-in-95 duration-500">
                                                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#C9A84C]">Payment Instructions</h4>
                                                      <div className="space-y-3">
                                                         <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">GPay / PhonePe (UPI)</span>
                                                            <span className="text-[10px] font-black text-white select-all">syedasjath05@okaxis</span>
                                                         </div>
                                                      </div>
                                                      <p className="text-[8px] font-black uppercase tracking-wider text-white/20 italic">
                                                         * Please share payment screenshot on WhatsApp after placing order
                                                      </p>

                                                      <a 
                                                         href={`upi://pay?pa=syedasjath05@okaxis&pn=Zandro&am=${totalPrice}&cu=INR`}
                                                         className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-white/5 border border-[#C9A84C]/40 text-[#C9A84C] rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#C9A84C] hover:text-black transition-all"
                                                      >
                                                         Pay via UPI App (GPay / PhonePe)
                                                         <ArrowRight size={14} />
                                                      </a>
                                                   </div>
                                                )}
                                            </div>

                                            <div className="pt-4 space-y-4">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-white text-black hover:bg-[#C9A84C] hover:text-black transition-all duration-500 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 disabled:opacity-50"
                                                    disabled={loading}
                                                >
                                                    {loading ? "SEALING ORDER..." : "PLACE ORDER"}
                                                    <ShieldCheck size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="w-full text-center text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                                                    onClick={() => setShowCheckout(false)}
                                                >
                                                    Modify Selection
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    <div className="mt-10 flex items-center justify-center gap-6 opacity-10 text-[8px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><ShieldCheck size={12} /> SECURE</span>
                                        <span className="flex items-center gap-2"><MapPin size={12} tracking-widest /> WORLDWIDE DISPATCH</span>
                                    </div>
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