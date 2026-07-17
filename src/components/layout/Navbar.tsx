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
        className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] left-0 right-0 ${
          isScrolled
            ? "top-4 mx-4 lg:mx-auto lg:max-w-5xl rounded-2xl py-3 px-5 md:px-8 bg-[#060d1a]/80 backdrop-blur-[40px] border border-white/[0.08] shadow-[0_8px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]"
            : isHome
            ? "top-0 max-w-full bg-transparent border-b border-transparent py-8 px-6 sm:px-14 lg:px-20"
            : "top-0 max-w-full bg-[#060d1a]/90 backdrop-blur-[32px] border-b border-white/[0.06] py-5 px-6 sm:px-14 lg:px-20"
        }`}
      >
        <div className="flex justify-between items-center">

          {/* ── Logo ──────────────────────────────── */}
          <Link href="/" className="flex items-center group shrink-0">
            <div
              className={`relative transition-all duration-700 group-hover:brightness-110 ${
                isScrolled ? "h-10 w-32 md:h-12 md:w-40" : "h-12 w-36 md:h-16 md:w-52"
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
                  className={`relative text-[10px] font-black tracking-[0.28em] transition-colors duration-400 group ${
                    isActive ? "text-shamaal-gold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                  {/* Active / hover line */}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-shamaal-gold transition-all duration-500 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Book Now CTA */}
            <Link
              href="/book"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full overflow-hidden text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-500 border border-shamaal-gold/50 text-shamaal-gold hover:text-shamaal-navy hover:shadow-[0_0_30px_rgba(255,182,4,0.4)]"
            >
              {/* Fill animation */}
              <span className="absolute inset-0 bg-shamaal-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
              <Compass className="w-3.5 h-3.5 relative z-10 group-hover:rotate-45 transition-transform duration-400" />
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
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-[#060d1a] border-l border-white/[0.06] flex flex-col md:hidden shadow-[−20px_0_80px_rgba(0,0,0,0.8)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div className="relative h-10 w-32">
                  <Image src="/logo.png" alt="Shamaal Tourism" fill className="object-contain" sizes="128px" />
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
                        className={`flex items-center justify-between py-4 px-4 rounded-xl font-black text-sm tracking-[0.2em] transition-all duration-300 ${
                          isActive
                            ? "text-shamaal-gold bg-shamaal-gold/5 border border-shamaal-gold/20"
                            : "text-white/50 hover:text-white hover:bg-white/[0.03]"
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
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-shamaal-gold text-shamaal-navy font-black tracking-[0.2em] text-xs uppercase hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(255,182,4,0.3)]"
                >
                  <Compass className="w-4 h-4" />
                  Book Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
