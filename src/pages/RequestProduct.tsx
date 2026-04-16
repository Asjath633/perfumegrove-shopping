
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PackageSearch, MessageCircle } from "lucide-react";

const RequestProduct = () => {
    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        productDetails: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.productDetails.trim()) {
            toast.error("Please enter the product details!");
            return;
        }

        const YOUR_WHATSAPP_NUMBER = "919842083220"; 

        const message = `*NEW PRODUCT REQUEST*

*Name:* ${formData.customerName}
*Phone:* ${formData.phone}

*Product Requested:*
${formData.productDetails}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");

        toast.success("Opening WhatsApp...");
        setFormData({ customerName: "", phone: "", productDetails: "" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#F5F5DC]">
            <Navbar />
            <main className="flex-1 pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-2xl mx-auto">
                    
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#C9A84C]/10 rounded-full mb-8">
                           <PackageSearch size={36} className="text-[#C9A84C]" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6">Request a Product</h1>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">
                            Can't find the exact perfume or accessory? Let us know.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] rounded-[2.5rem] border border-white/5 p-10 md:p-12 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-6 text-sm focus:outline-none focus:border-[#C9A84C] transition-all text-white placeholder-white/20"
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-6 text-sm focus:outline-none focus:border-[#C9A84C] transition-all text-white placeholder-white/20"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">What are you looking for?</label>
                                <textarea
                                    className="w-full min-h-[160px] bg-white/[0.02] border border-white/10 rounded-[2rem] py-5 px-6 text-sm focus:outline-none focus:border-[#C9A84C] transition-all text-white placeholder-white/20 resize-none"
                                    placeholder="e.g. iPhone 15 Pro Max Privacy Screen Protector, or Dior Sauvage 100ml..."
                                    value={formData.productDetails}
                                    onChange={(e) => setFormData({ ...formData, productDetails: e.target.value })}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-full flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-green-500/10"
                            >
                                <MessageCircle size={20} />
                                Send Request via WhatsApp
                            </button>
                        </form>
                    </div>

                    <div className="mt-12 text-center">
                       <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
                          We will verify and contact you within 24 hours
                       </p>
                    </div>

                </div>
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
};

export default RequestProduct;
