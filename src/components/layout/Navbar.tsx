"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const showBackground = !isHome || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        showBackground
          ? "bg-shamaal-navy/90 backdrop-blur-md border-white/10 shadow-lg py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Compass className={`h-8 w-8 ${showBackground ? "text-shamaal-gold" : "text-white"} transition-colors duration-300 group-hover:rotate-45`} />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none tracking-wider text-white">
                SHAMAAL<span className="text-shamaal-gold">®</span>
              </span>
              <span className={`text-[10px] tracking-widest ${showBackground ? "text-gray-300" : "text-gray-200"}`}>THE GREAT NORTH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tours" className="text-white hover:text-shamaal-gold transition-colors text-sm font-medium tracking-wide">
              TOURS
            </Link>
            <Link href="/destinations" className="text-white hover:text-shamaal-gold transition-colors text-sm font-medium tracking-wide">
              DESTINATIONS
            </Link>
            <Link href="/custom-tours" className="text-white hover:text-shamaal-gold transition-colors text-sm font-medium tracking-wide">
              CUSTOM
            </Link>
            <Link href="/blog" className="text-white hover:text-shamaal-gold transition-colors text-sm font-medium tracking-wide">
              BLOG
            </Link>
            <Link href="/about" className="text-white hover:text-shamaal-gold transition-colors text-sm font-medium tracking-wide">
              ABOUT
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-shamaal-gold/50 text-white hover:bg-shamaal-gold hover:text-shamaal-navy transition-all duration-300 text-sm font-medium"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-shamaal-navy/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              <Link
                href="/tours"
                className="block px-3 py-4 text-white hover:bg-white/5 rounded-md text-base font-medium border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tours
              </Link>
              <Link
                href="/destinations"
                className="block px-3 py-4 text-white hover:bg-white/5 rounded-md text-base font-medium border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                href="/about"
                className="block px-3 py-4 text-white hover:bg-white/5 rounded-md text-base font-medium border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-4 text-white hover:bg-white/5 rounded-md text-base font-medium border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 px-3">
                <Link
                  href="/login"
                  className="block w-full text-center px-5 py-3 rounded-md bg-shamaal-gold text-shamaal-navy font-bold hover:bg-yellow-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
