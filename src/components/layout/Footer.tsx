
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/5 pt-24 pb-12 px-6 lg:px-12 font-sans">
      <div className="max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

          {/* Brand & Newsletter (Left) */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex flex-col mb-8 group">
              <span className="font-brand text-3xl font-black tracking-[0.25em] text-[#F5F5DC] group-hover:text-[#C9A84C] transition-all duration-500 leading-none">
                ZANDRO
              </span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] font-semibold mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                Luxury Attars
              </span>
            </Link>
            <p className="text-[#F5F5DC]/40 text-sm leading-relaxed mb-10 max-w-sm">
              Authentic Arabian heritage captured in every drop. Our natural attars are alcohol-free and meticulously crafted for longevity.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-6 pt-4">
              {[
                { icon: <Instagram size={20} />, link: "https://www.instagram.com/zandro_007/" },
                { icon: <Facebook size={20} />, link: "https://www.facebook.com/profile.php?id=61575429866308" }
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:text-white transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C9A84C] mb-8">Navigation</h4>
            <ul className="flex flex-col gap-5">
              {["Home", "Perfumes", "Accessories"].map(link => (
                <li key={link}>
                  <Link to={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="text-[#F5F5DC]/40 hover:text-[#C9A84C] text-xs font-bold tracking-[0.2em] transition-all uppercase">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>





        </div>

        {/* repeated logo and legal bottom */}
        <div className="pt-16 border-t border-white/5 flex flex-col items-center gap-12">
          <div className="flex flex-col items-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
            <span className="font-brand text-3xl sm:text-5xl font-black tracking-[0.5em] text-[#F5F5DC]">
              ZANDRO
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] sm:tracking-[1em] text-[#C9A84C] mt-4 font-bold">Luxury Attars Worldwide</span>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[#F5F5DC]/20 text-[9px] uppercase tracking-[0.4em] font-black">
              © 2026 ZANDRO LUXURY ATYARS • PRIVATE COLLECTION
            </p>
            <div className="flex items-center gap-10">
              <span className="text-[#F5F5DC]/10 text-[8px] uppercase tracking-[0.5em] font-black">Purity Guaranteed</span>
              <span className="text-[#F5F5DC]/10 text-[8px] uppercase tracking-[0.5em] font-black">Ethically Sourced</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
