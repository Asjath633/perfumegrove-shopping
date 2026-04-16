
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, Heart, MessageSquareMore, Package, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);

  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateWishlistCount = () => {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(saved.length);
    };
    updateWishlistCount();
    window.addEventListener('wishlist-updated', updateWishlistCount);
    return () => window.removeEventListener('wishlist-updated', updateWishlistCount);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/perfumes?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Perfumes", path: "/perfumes" },
    { name: "Accessories", path: "/accessories" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-apple px-4 sm:px-6 lg:px-12",
        (isScrolled || isSearchOpen || location.pathname !== "/") ? "bg-[#0B0B0B]/95 backdrop-blur-xl py-1 sm:py-2" : "bg-transparent py-2 sm:py-4"
      )}
    >
      <div className="max-w-[1800px] mx-auto">
        <nav className="flex items-center justify-between">

          {/* Logo Section (Left) */}
          <Link to="/" className={cn("flex flex-col group flex-shrink-0 transition-opacity duration-300", isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100")}>
            <span className="font-brand text-2xl sm:text-3xl lg:text-4xl font-black tracking-[0.1em] sm:tracking-[0.25em] text-[#F5F5DC] group-hover:text-[#C9A84C] transition-all duration-500 leading-none">
              ZANDRO
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.5em] text-[#C9A84C] font-semibold mt-1 sm:mt-2 opacity-80 group-hover:opacity-100 transition-opacity font-sans">
              Luxury Attars
            </span>
          </Link>

          {/* Centered Navigation or Search Bar (Center) */}
          <div className="flex-1 flex justify-center px-8 relative h-10 items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="w-full max-w-2xl animate-in fade-in slide-in-from-top-2 duration-500 flex items-center gap-4">
                <Search size={16} className="text-[#C9A84C]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="SEARCH FOR MASTERPIECES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-white text-xs sm:text-base font-black tracking-widest uppercase focus:outline-none w-full placeholder-white/20"
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </form>
            ) : (
              <div className="hidden lg:flex items-center space-x-12">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "relative text-[10px] uppercase tracking-[0.4em] font-bold py-1 transition-all duration-500 group font-sans font-black",
                      location.pathname === item.path ? "text-[#C9A84C]" : "text-[#F5F5DC]/40 hover:text-[#F5F5DC]"
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A84C] scale-x-0 transition-transform duration-500 origin-right group-hover:scale-x-100 group-hover:origin-left",
                      location.pathname === item.path && "scale-x-100"
                    )} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actions Section (Right) */}
          <div className={cn("flex items-center gap-1 sm:gap-4 transition-opacity duration-300", isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100")}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative group p-2 text-[#F5F5DC]/60 hover:text-[#C9A84C] transition-all duration-300"
            >
              <Search size={20} className="sm:w-6 sm:h-6" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-[8px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest hidden sm:block">
                Search
              </span>
            </button>

            <Link to="/wishlist" className="relative group p-2 text-[#F5F5DC]/60 hover:text-[#C9A84C] transition-all duration-300">
              <Heart size={20} className="sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C9A84C] text-black text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {wishlistCount}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-[8px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest hidden sm:block">
                Wishlist
              </span>
            </Link>

            <Link to="/orders" className="relative group p-2 text-[#F5F5DC]/60 hover:text-[#C9A84C] transition-all duration-300">
              <Package size={20} className="sm:w-6 sm:h-6" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-[8px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest hidden sm:block">
                Orders
              </span>
            </Link>

            <Link to="/request" className="relative group p-2 text-[#F5F5DC]/60 hover:text-[#C9A84C] transition-all duration-300">
              <MessageSquareMore size={20} className="sm:w-6 sm:h-6" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-[8px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest hidden sm:block">
                Request
              </span>
            </Link>

            <button
              onClick={openCart}
              className="relative group ml-1 px-3 py-1.5 sm:px-6 sm:py-2.5 bg-white text-black rounded-full hover:bg-[#C9A84C] transition-all duration-500 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Bag</span>
                {totalItems > 0 && (
                  <span className="bg-black text-[#C9A84C] text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center -mr-1 animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-[#F5F5DC]/60 hover:text-[#C9A84C] ml-1 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[60px] bg-[#0B0B0B] z-40 transition-all duration-700 ease-apple border-t border-white/5",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col p-10 space-y-8 h-full">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between group"
            >
              <span className="text-3xl font-serif font-black uppercase text-white group-hover:text-[#C9A84C] transition-colors">
                {item.name}
              </span>
              <ArrowRight className="text-white/10 group-hover:text-[#C9A84C] transform -rotate-45 group-hover:rotate-0 transition-all" size={24} />
            </Link>
          ))}

          <div className="pt-10 mt-auto border-t border-white/5 space-y-4">
            <div className="flex justify-between items-center text-white/20 text-[9px] uppercase tracking-[0.5em] font-black">
              <span>Connect with Zandro</span>
              <span>v 1.2</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
