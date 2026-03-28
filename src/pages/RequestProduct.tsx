import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PackageSearch } from "lucide-react";

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

        // WhatsApp Phone Number (India code 91 + the number from your sheet)
        const YOUR_WHATSAPP_NUMBER = "919842083220"; 

        const message = `*NEW PRODUCT REQUEST*

*Name:* ${formData.customerName}
*Phone:* ${formData.phone}

*Product Requested:*
${formData.productDetails}`;

        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp in a new tab
        window.open(`https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");

        toast.success("Opening WhatsApp...");
        setFormData({ customerName: "", phone: "", productDetails: "" });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-20">
                <div className="page-container max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <PackageSearch size={48} className="mx-auto text-gold mb-4" />
                        <h1 className="h2 mb-4">Request a Product</h1>
                        <p className="text-warmgray">
                            Can't find the exact perfume or accessory you're looking for? 
                            Let us know what you need, and we'll do our best to stock it for you!
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Your Name</label>
                                <Input
                                    placeholder="Enter your name"
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <Input
                                    placeholder="Enter your phone number"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">What product are you looking for?</label>
                                <textarea
                                    className="w-full min-h-[120px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                                    placeholder="e.g. iPhone 15 Pro Max Privacy Screen Protector, or Dior Sauvage 100ml..."
                                    value={formData.productDetails}
                                    onChange={(e) => setFormData({ ...formData, productDetails: e.target.value })}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 flex items-center justify-center font-medium"
                            >
                                Send Request via WhatsApp
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
};

export default RequestProduct;
