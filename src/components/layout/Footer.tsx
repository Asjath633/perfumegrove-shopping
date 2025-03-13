
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-richblack text-white pt-16 pb-8">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-light tracking-widest">
              ZANDRO
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Handcrafted natural attars capturing the essence of traditional perfumery with modern elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm tracking-wider uppercase mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collection" className="text-white/70 text-sm hover:text-gold transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 text-sm hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 text-sm hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 text-sm hover:text-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 text-sm hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-wider uppercase mb-4 text-gold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 text-gold" />
                <span className="text-white/70 text-sm">123 Fragrance Avenue, NY 10001, USA</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gold" />
                <span className="text-white/70 text-sm">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gold" />
                <span className="text-white/70 text-sm">info@zandro.com</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-sm tracking-wider uppercase mb-4 text-gold">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-gold/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-gold/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/50 text-xs">
            © {currentYear} Zandro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
