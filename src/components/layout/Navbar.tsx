"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
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

  return (
    <nav
      className={`fixed z-50 transition-all duration-700 left-0 right-0 ${
        isScrolled
          ? "top-4 mx-4 md:mx-auto max-w-5xl rounded-2xl bg-shamaal-navy/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-3 px-6 md:px-10"
          : isHome
          ? "top-0 max-w-full bg-transparent border-b border-transparent py-8 px-6 sm:px-12 lg:px-20"
          : "top-0 max-w-full bg-shamaal-navy/95 backdrop-blur-md border-b border-white/5 py-5 px-6 sm:px-12 lg:px-20"
      }`}
    >
      <div className="w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className={`relative transition-all duration-700 group-hover:brightness-110 ${
              isScrolled 
                ? "h-10 w-32 md:h-12 md:w-40" 
                : "h-12 w-36 md:h-16 md:w-52"
            }`}>
              <Image 
                src="/logo.png" 
                alt="Shamaal Tourism Logo" 
                fill 
                className="object-contain" 
                priority
                sizes="(max-width: 768px) 160px, 208px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: "HOME", path: "/" },
              { name: "TOURS", path: "/tours" },
              { name: "DESTINATIONS", path: "/destinations" },
              { name: "CUSTOM", path: "/custom-tours" },
              { name: "MEMORIES", path: "/memories" }
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.path} 
                className={`relative text-xs font-bold tracking-[0.2em] transition-all duration-300 hover:text-shamaal-gold ${
                  (link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)) 
                    ? "text-shamaal-gold" 
                    : "text-white/90"
                }`}
              >
                {link.name}
                <motion.span 
                  layoutId="nav-underline"
                  className={`absolute -bottom-2 left-0 h-[2px] bg-shamaal-gold rounded-full ${
                    (link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
            
            <Link
              href="/tours"
              className={`flex items-center space-x-2 px-8 py-3 rounded-full border border-shamaal-gold/50 text-white transition-all duration-500 hover:bg-shamaal-gold hover:text-shamaal-navy hover:border-shamaal-gold text-xs font-black tracking-widest uppercase group ${
                isScrolled ? "bg-shamaal-gold/10" : "bg-white/10"
              }`}
            >
              <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>BOOK NOW</span>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-shamaal-navy/98 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 flex flex-col text-center">
              {[
                { name: "HOME", path: "/" },
                { name: "TOURS", path: "/tours" },
                { name: "DESTINATIONS", path: "/destinations" },
                { name: "CUSTOM", path: "/custom-tours" },
                { name: "MEMORIES", path: "/memories" },
                { name: "CONTACT", path: "/contact" }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`block py-3 text-lg font-bold tracking-[0.2em] transition-all ${
                    (link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)) 
                      ? "text-shamaal-gold" 
                      : "text-white/90"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6">
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center space-x-2 w-full px-8 py-4 rounded-full bg-shamaal-gold text-shamaal-navy font-black tracking-widest uppercase hover:bg-yellow-500 transition-all shadow-lg shadow-shamaal-gold/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Camera className="w-5 h-5" />
                  <span>BOOK NOW</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
