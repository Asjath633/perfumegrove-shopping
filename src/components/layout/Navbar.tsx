
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, PackageSearch } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-apple",
        isScrolled ? "glass-effect shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="page-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-light tracking-widest transition-opacity hover:opacity-80">
            ZANDRO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-sm uppercase tracking-widest font-medium">Home</Link>
            <Link to="/perfumes" className="nav-link text-sm uppercase tracking-widest font-medium">Perfumes</Link>
            <Link to="/accessories" className="nav-link text-sm uppercase tracking-widest font-medium">Accessories</Link>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-2">
            {/* Request Icon Button */}
            <Link
              to="/request"
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Request a product"
            >
              <PackageSearch size={22} />
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="ml-2 p-2 md:hidden hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-richblack/95 z-40 flex flex-col pt-32 pb-8 px-6 transition-all duration-500 ease-apple md:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-8 text-center">
          <Link
            to="/"
            className="text-2xl font-light tracking-[0.2em] text-white hover:text-gold transition-colors opacity-90"
          >
            HOME
          </Link>
          <Link
            to="/perfumes"
            className="text-2xl font-light tracking-[0.2em] text-white hover:text-gold transition-colors opacity-90"
          >
            PERFUMES
          </Link>
          <Link
            to="/accessories"
            className="text-2xl font-light tracking-[0.2em] text-white hover:text-gold transition-colors opacity-90"
          >
            ACCESSORIES
          </Link>
          <Link
            to="/request"
            className="text-2xl font-light tracking-[0.2em] text-white hover:text-gold transition-colors opacity-90 pt-8 border-t border-white/10"
          >
            REQUEST A PRODUCT
          </Link>
        </div>

        {/* Footer info in mobile menu */}
        <div className="mt-auto text-center border-t border-white/10 pt-8">
          <p className="text-white/40 text-xs tracking-widest uppercase">© 2026 ZANDRO LUXURY</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
