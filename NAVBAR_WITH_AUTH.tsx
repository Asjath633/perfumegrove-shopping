/**
 * IMPROVED NAVBAR WITH AUTH (OPTIONAL)
 * 
 * This file shows how to integrate the auth system into the existing Navbar.
 * To use this, replace the original Navbar.tsx content with this improved version.
 * 
 * Features:
 * - Login/Signup buttons when not authenticated
 * - User profile menu when authenticated
 * - Responsive mobile menu
 * - Logout functionality
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, PackageSearch, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NavbarWithAuth = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/perfumes" className="nav-link">Perfumes</Link>
            <Link to="/accessories" className="nav-link">Accessories</Link>
          </div>

          {/* Right Section - Icons & Auth */}
          <div className="flex items-center space-x-1">
            {/* Request Icon Button */}
            <Link 
              to="/request"
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Request a product"
            >
              <PackageSearch size={20} />
            </Link>

            {/* Cart Button */}
            <button 
              onClick={openCart}
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Section - Desktop */}
            {user ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="ml-4 p-2 hover:text-gold transition-colors flex items-center gap-2"
                >
                  <User size={20} />
                  <span className="text-sm truncate max-w-[100px]">{user.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-warmgray">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-cream flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium hover:text-gold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-darkolive text-white rounded hover:bg-opacity-90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="ml-2 p-2 md:hidden hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-cream z-40 flex flex-col pt-24 pb-8 px-6 transition-transform duration-500 ease-apple md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6 text-center flex-1">
          <Link to="/" className="text-xl py-2 border-b border-gold/20">Home</Link>
          <Link to="/perfumes" className="text-xl py-2 border-b border-gold/20">Perfumes</Link>
          <Link to="/accessories" className="text-xl py-2 border-b border-gold/20">Accessories</Link>
        </div>

        {/* Mobile Auth Section */}
        <div className="space-y-3 border-t border-gold/20 pt-6">
          {user ? (
            <>
              <div className="pb-4 border-b border-gold/20">
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-warmgray">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-darkolive text-white rounded font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 text-center border-2 border-darkolive text-darkolive rounded font-medium hover:bg-darkolive hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-3 text-center bg-darkolive text-white rounded font-medium hover:bg-opacity-90 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarWithAuth;
