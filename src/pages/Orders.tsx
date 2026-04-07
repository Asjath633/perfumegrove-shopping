import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, Calendar, MapPin, ChevronRight, ShoppingBag, Trash2 } from "lucide-react";
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
        const savedOrders = JSON.parse(localStorage.getItem("pastOrders") || "[]");
        setOrders(savedOrders);
    }, []);

    const deleteOrder = (orderId: string) => {
        if (window.confirm("Are you sure you want to remove this order from your history?")) {
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            localStorage.setItem("pastOrders", JSON.stringify(updatedOrders));
            toast.success("Order removed from history");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'text-green-600 bg-green-50';
            case 'shipped': return 'text-blue-600 bg-blue-50';
            default: return 'text-gold bg-gold/5';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <Navbar />
            <main className="flex-1 pt-24 pb-20">
                <div className="page-container max-w-4xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="h2 mb-1">Your Orders</h1>
                            <p className="text-warmgray italic">Track and manage your recent purchases</p>
                        </div>
                        <Link to="/perfumes" className="text-gold hover:underline text-sm font-medium">
                            Continue Shopping
                        </Link>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="text-warmgray" size={24} />
                            </div>
                            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                            <p className="text-warmgray mb-6">When you place an order, it will appear here.</p>
                            <Link to="/perfumes" className="button-primary inline-block">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    {/* Order Header */}
                                    <div className="bg-gray-50/80 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-warmgray font-semibold mb-1">Order Placed</p>
                                                <p className="text-sm font-medium">{formatDate(order.date)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-warmgray font-semibold mb-1">Total</p>
                                                <p className="text-sm font-medium text-gold">₹{order.totalPrice.toFixed(2)}</p>
                                            </div>
                                            <div className="hidden sm:block">
                                                <p className="text-[10px] uppercase tracking-wider text-warmgray font-semibold mb-1">Ship To</p>
                                                <p className="text-sm font-medium truncate max-w-[150px]">{order.customerDetails.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-wider text-warmgray font-semibold mb-1">Order # {order.id}</p>
                                                <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => deleteOrder(order.id)}
                                                className="p-2 text-warmgray hover:text-red-500 transition-colors"
                                                title="Remove from history"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6">
                                        <div className="space-y-6">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-4 items-start">
                                                    <div className="w-20 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                                        <img 
                                                            src={item.product.image} 
                                                            alt={item.product.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-richblack mb-1">{item.product.name}</h3>
                                                        <p className="text-sm text-warmgray mb-1">{item.product.size} | Qty: {item.quantity}</p>
                                                        <p className="text-sm font-medium">₹{item.product.price.toFixed(2)}</p>
                                                        
                                                        <div className="mt-4 flex gap-3">
                                                            <Link 
                                                                to={`/product/${item.product.id}`}
                                                                className="text-xs font-semibold px-4 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                                                            >
                                                                Buy it again
                                                            </Link>
                                                            <button className="text-xs font-semibold px-4 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                                                                View item
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Footer - Shipping Info Summary */}
                                    <div className="bg-gray-50/30 px-6 py-3 border-t border-gray-50 flex items-center gap-2 text-xs text-warmgray italic">
                                        <MapPin size={12} className="text-gold" />
                                        <span>Delivering to: {order.customerDetails.address}</span>
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

export default Orders;
