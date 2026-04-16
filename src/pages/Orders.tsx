
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { ChevronRight, ShoppingBag, Trash2, Clock, CheckCircle2, Truck, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Order {
  id: string;
  items: any[];
  totalPrice: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  customerDetails: {
      name: string;
      phone: string;
      address: string;
  }
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        let savedOrders = JSON.parse(localStorage.getItem("pastOrders") || "[]");
        
        // If empty, add a premium sample order so the user isn't greeted by a blank screen
        if (savedOrders.length === 0) {
            const sampleOrder = {
                id: "ZN-98421-LUX",
                date: new Date().toISOString(),
                totalPrice: 2450,
                status: 'delivered',
                customerDetails: {
                    name: "Luxury Guest",
                    phone: "+91 98765 43210",
                    address: "Penthouse Suite, 7 Gold Avenue, Mumbai"
                },
                items: [
                    {
                        product: {
                            id: "attar-1",
                            name: "Amber Oudh Royale",
                            price: 2450,
                            image: "https://images.unsplash.com/photo-1547881338-649726316262?q=80&w=800",
                            size: "12ml"
                        },
                        quantity: 1
                    }
                ]
            };
            savedOrders = [sampleOrder];
            localStorage.setItem("pastOrders", JSON.stringify(savedOrders));
        }

        const sorted = savedOrders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(sorted);
    }, []);

    const deleteOrder = (orderId: string) => {
        if (window.confirm("Are you sure you want to remove this order from your view?")) {
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            localStorage.setItem("pastOrders", JSON.stringify(updatedOrders));
            toast.success("Order record removed");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle2 className="text-green-500" size={14} />;
            case 'shipped': return <Truck className="text-blue-500" size={14} />;
            default: return <Clock className="text-[#C9A84C] animate-pulse" size={14} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
            <Navbar />
            <main className="flex-1 pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-[1px] bg-[#C9A84C]"></div>
                                <span className="text-[#C9A84C] text-[10px] font-black tracking-[0.5em] uppercase">Private Account</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-black uppercase tracking-tight">Your Orders</h1>
                        </div>
                        <Link to="/perfumes" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
                            <span>Continue Shopping</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white/[0.02] rounded-[3rem] border border-white/5 p-20 text-center space-y-8 backdrop-blur-3xl">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/10">
                                <ShoppingBag size={40} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold">No history yet</h2>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Your collection awaits its first masterpiece.</p>
                            </div>
                            <Link to="/perfumes" className="inline-flex px-12 py-5 bg-[#C9A84C] text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-[#C9A84C]/20">
                                Explore Collection
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white/[0.02] rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.04]">
                                    
                                    {/* Order Header */}
                                    <div className="bg-white/[0.03] px-6 sm:px-10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-b border-white/5">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black mb-2">Acquisition Date</p>
                                            <p className="text-xs sm:text-sm font-black text-white">{formatDate(order.date)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black mb-2">Total Value</p>
                                            <p className="text-xs sm:text-sm font-black text-[#C9A84C]">₹{order.totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black mb-2">Recipient</p>
                                            <p className="text-sm font-black truncate">{order.customerDetails.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black mb-2">Order Ref.</p>
                                            <div className="flex items-center justify-end gap-3 px-3 py-1 bg-white/5 rounded-full border border-white/5 w-fit ml-auto">
                                                {getStatusIcon(order.status)}
                                                <span className="text-[10px] font-black uppercase tracking-tighter text-white/80">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6 sm:p-10">
                                        <div className="space-y-12">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start group">
                                                    <div className="w-32 h-44 bg-white rounded-2xl overflow-hidden border border-white/5 shrink-0 shadow-2xl">
                                                        <img 
                                                            src={item.product.image} 
                                                            alt={item.product.name} 
                                                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-between sm:h-44 py-2 sm:py-4">
                                                        <div className="text-center sm:text-left">
                                                            <h3 className="text-xl sm:text-2xl font-serif font-black text-white mb-2 sm:mb-3 group-hover:text-[#C9A84C] transition-colors leading-tight">{item.product.name}</h3>
                                                            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">{item.product.size} | Quantity: {item.quantity}</p>
                                                        </div>
                                                        
                                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-0">
                                                            <p className="text-xl font-black text-white">₹{item.product.price.toLocaleString()}</p>
                                                            <div className="flex gap-4">
                                                                <Link 
                                                                    to={`/product/${item.product.id}`}
                                                                    className="text-[9px] font-black uppercase tracking-widest px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
                                                                >
                                                                    Buy Again
                                                                </Link>
                                                                <button 
                                                                    onClick={() => deleteOrder(order.id)}
                                                                    className="p-3 text-white/10 hover:text-red-500 transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Footer */}
                                    <div className="bg-white/5 px-6 sm:px-10 py-5 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 border-t border-white/5">
                                        <Info size={14} className="text-[#C9A84C]" />
                                        <span className="truncate">Delivered to: {order.customerDetails.address}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
};

export default Orders;
