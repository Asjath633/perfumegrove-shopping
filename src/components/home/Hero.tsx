
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements on mount
    const animateElements = () => {
      if (heroRef.current) {
        heroRef.current.style.opacity = "1";
      }

      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateY(0)";
        }
      }, 300);

      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = "1";
          subtitleRef.current.style.transform = "translateY(0)";
        }
      }, 500);

      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.opacity = "1";
          buttonRef.current.style.transform = "translateY(0)";
        }
      }, 700);
    };

    animateElements();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden opacity-0 transition-opacity duration-1000"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-richblack/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 opacity-0 transform translate-y-10 transition-all duration-1000 ease-apple"
        >
          The Art of Natural Perfumery
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 opacity-0 transform translate-y-10 transition-all duration-1000 ease-apple"
        >
          Discover our collection of handcrafted attars, made with the finest natural ingredients to create timeless scents that evolve uniquely with your body chemistry.
        </p>

        <div
          ref={buttonRef}
          className="opacity-0 transform translate-y-10 transition-all duration-1000 ease-apple"
        >
          <Link
            to="/perfumes"
            className="inline-flex items-center bg-white/90 backdrop-blur-sm text-richblack px-8 py-4 rounded-lg hover:bg-white transition-all group"
          >
            <span className="mr-2">Explore Collection</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
