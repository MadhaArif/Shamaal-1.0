"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NAV_LINKS = [
  { name: "HOME",         path: "/" },
  { name: "TOURS",        path: "/tours" },
  { name: "DESTINATIONS", path: "/destinations" },
  { name: "CUSTOM",       path: "/custom-tours" },
  { name: "MEMORIES",     path: "/memories" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] left-0 right-0 ${
          isScrolled
            ? "top-6 mx-4 lg:mx-auto lg:max-w-6xl rounded-full py-3 px-6 md:px-10 bg-[#060d1a]/60 backdrop-blur-[40px] border border-white/[0.08]"
            : isHome
            ? "top-0 max-w-full bg-gradient-to-b from-black/80 via-black/40 to-transparent py-10 px-6 sm:px-14 lg:px-20"
            : "top-0 max-w-full bg-[#060d1a]/80 backdrop-blur-[40px] py-6 px-6 sm:px-14 lg:px-20"
        }`}
      >
        <div className="flex justify-between items-center">

          {/* ── Logo ──────────────────────────────── */}
          <Link href="/" className="flex items-center group shrink-0">
            <div
              className={`relative transition-all duration-1000 group-hover:brightness-125 group-hover:scale-105 origin-left ${
                isScrolled ? "h-12 w-40 md:h-14 md:w-48" : "h-16 w-48 md:h-20 md:w-64"
              }`}
            >
              <Image
                src="/logo.png"
                alt="Shamaal Tourism"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 144px, 208px"
              />
            </div>
          </Link>

          {/* ── Desktop Nav ────────────────────────── */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative text-[11px] font-medium tracking-[0.2em] transition-all duration-500 group py-2 ${
                    isActive ? "text-shamaal-gold drop-shadow-[0_0_8px_rgba(255,182,4,0.5)]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                  {/* Active / hover line */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-shamaal-gold to-transparent transition-all duration-500 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                  {/* Elegant dot */}
                  <span 
                    className={`absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-shamaal-gold transition-all duration-500 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Book Now CTA */}
            <Link
              href="/book"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full overflow-hidden text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-700 border border-shamaal-gold/30 text-shamaal-gold hover:text-[#060d1a] hover:border-shamaal-gold hover:shadow-[0_0_40px_rgba(255,182,4,0.4)]"
            >
              {/* Elegant glow inside */}
              <span className="absolute inset-0 bg-gradient-to-r from-shamaal-gold via-yellow-400 to-shamaal-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
              <Compass className="w-4 h-4 relative z-10 group-hover:rotate-90 transition-transform duration-700" />
              <span className="relative z-10">Book Now</span>
            </Link>
          </div>

          {/* ── Mobile Toggle ─────────────────────── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-shamaal-gold/40 transition-all duration-400"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileMenuOpen ? "x" : "menu"}
                initial={{ opacity: 0, rotate: isMobileMenuOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
                transition={{ duration: 0.25 }}
                className="text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
        )}

        {isMobileMenuOpen && (
            <motion.div
              key="panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-[#060d1a] border-l border-white/[0.06] flex flex-col md:hidden shadow-[-20px_0_80px_rgba(0,0,0,0.5)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div className="relative h-14 w-44">
                  <Image src="/logo.png" alt="Shamaal Tourism" fill className="object-contain" sizes="176px" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-shamaal-gold/40 transition-all"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-1">
                {[...NAV_LINKS, { name: "CONTACT", path: "/contact" }].map((link, i) => {
                  const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-4 px-4 rounded-xl font-semibold text-sm tracking-[0.2em] transition-all duration-300 ${
                            isActive
                              ? "text-shamaal-gold bg-shamaal-gold/5 border border-shamaal-gold/20"
                              : "text-white/70 hover:text-white hover:bg-white/[0.03]"
                        }`}
                      >
                        {link.name}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-shamaal-gold" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="px-6 py-6 border-t border-white/[0.06]">
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-shamaal-gold to-yellow-500 text-shamaal-navy font-semibold tracking-[0.2em] text-xs uppercase hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(255,182,4,0.2)]"
                >
                  <Compass className="w-4 h-4" />
                  Book Now
                </Link>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
