"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, MapPin, Award, Compass, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DESTINATIONS = [
  {
    url: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1920",
    title: "NEELUM",
    sub: "The Blue Gem of Kashmir",
    color: "#1b2f5a",
    coords: "34.5967° N, 73.9000° E",
    tagline: "Where the river hums the songs of the mountains."
  },
  {
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1920",
    title: "NARAN",
    sub: "Heart of the Himalayas",
    color: "#ffb604",
    coords: "34.9072° N, 73.6531° E",
    tagline: "Drive through the clouds on the road to heaven."
  },
  {
    url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1920",
    title: "HUNZA",
    sub: "Valley of Eternal Youth",
    color: "#ffb604",
    coords: "36.3167° N, 74.6500° E",
    tagline: "Witness the majestic golden peaks at sunrise."
  },
  {
    url: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1920",
    title: "SKARDU",
    sub: "The Throne of Mountains",
    color: "#1b2f5a",
    coords: "35.2975° N, 75.6333° E",
    tagline: "Explore the gateway to the world's highest peaks."
  }
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const next = useCallback(() => setIndex((i) => (i + 1) % DESTINATIONS.length), []);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* Cinematic Living Background Layer */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Base Image with High-Speed Ken Burns */}
            <div className="absolute inset-0 h-full w-full">
              <Image 
                src={DESTINATIONS[index].url}
                alt={DESTINATIONS[index].title}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
                style={{ 
                  animation: 'cinematic-zoom 10s infinite alternate linear'
                }}
              />
            </div>
            
            {/* Overlay 1: Moving Fog/Mist (CSS-based to avoid ORB errors) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] animate-mist" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[100%] animate-mist-slow" />
            </div>

            {/* Overlay 2: Dynamic Light Leaks */}
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-tr from-shamaal-gold/5 via-transparent to-shamaal-sky/5 pointer-events-none"
            />
            
            {/* Multi-layered Gradients for Cinematic Depth */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-70 hidden md:block" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic Particle System (Snow/Dust) - Client Only to avoid Hydration Mismatch */}
      {mounted && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5
              }}
              animate={{ 
                y: ["-10%", "110%"],
                x: [Math.random() * 100 + "%", (Math.random() * 100 + 10) + "%"],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            />
          ))}
        </div>
      )}

      {/* Aesthetic Texture Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Main Content Layout */}
      <div className="relative z-10 h-full w-full max-w-[1440px] mx-auto px-6 md:px-20 flex flex-col justify-end pb-12 md:pb-24">
        
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end"
        >
          {/* Left Side: Main Brand & CTA */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4 mb-6 md:mb-8"
            >
              <span className="h-[2px] w-12 md:w-16 bg-shamaal-gold" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] text-shamaal-gold uppercase">
                Premium Adventure • Discovery 0{index + 1}
              </span>
            </motion.div>

            <div className="relative mb-8 md:mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] md:leading-tight tracking-tighter uppercase italic mix-blend-difference">
                    {DESTINATIONS[index].title}
                  </h1>
                </motion.div>
              </AnimatePresence>
              
              {/* Outlined Ghost Text Behind */}
              <motion.div 
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 md:-top-2 left-1 md:left-2 -z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] md:leading-tight tracking-tighter uppercase italic text-transparent stroke-white/10 stroke-1 opacity-20"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
              >
                {DESTINATIONS[index].title}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center"
            >
              <button 
                onClick={() => router.push('/tours')}
                className="group relative w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-shamaal-gold text-shamaal-navy font-black rounded-full transition-all duration-500 hover:bg-white hover:scale-105 active:scale-95 overflow-hidden shadow-2xl shadow-shamaal-gold/20"
              >
                <span className="relative z-10 flex items-center justify-center tracking-widest text-[10px] md:text-xs">
                  BOOK THE EXPEDITION <ArrowUpRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
                </span>
              </button>
              
              <div className="h-14 w-[1px] bg-white/20 hidden lg:block" />

              <div className="relative group w-full sm:max-w-xs">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-white/40 group-focus-within:text-shamaal-gold transition-colors" />
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && router.push(`/tours?query=${query}`)}
                  placeholder="WHERE DO YOU WANT TO GO?"
                  className="w-full bg-transparent border-b border-white/20 py-4 md:py-5 pl-8 md:pl-10 outline-none focus:border-shamaal-gold transition-all text-[10px] md:text-xs font-bold tracking-widest placeholder:text-white/10"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Narrative & Discovery */}
          <div className="lg:col-span-4 lg:pl-12 hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-shamaal-gold">
                    {DESTINATIONS[index].sub}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed font-light italic">
                    "{DESTINATIONS[index].tagline}"
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 overflow-hidden relative shadow-lg">
                        <Image src={`https://i.pravatar.cc/100?u=${i+70}`} alt="explorer" fill className="object-cover" unoptimized />
                      </div>
                    ))}
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-[#0a0a0a] bg-shamaal-gold flex items-center justify-center text-[8px] md:text-[10px] font-black text-black shadow-lg">
                      +50K
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] md:text-[10px] font-black tracking-widest text-white/30 uppercase">
                      Trusted by Explorers
                    </p>
                    <p className="text-[10px] md:text-xs font-bold text-shamaal-gold">Pakistan's #1 Operator</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic Side Navigation */}
      <div className="absolute right-4 md:right-8 bottom-12 md:bottom-24 z-20 flex flex-col space-y-6 md:space-y-8 items-center">
        <div className="flex flex-col space-y-3 md:space-y-4">
          {DESTINATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative flex items-center justify-center"
            >
              <div className={`transition-all duration-500 rounded-full ${
                index === i ? "w-2 md:w-2.5 h-2 md:h-2.5 bg-shamaal-gold scale-125 shadow-[0_0_15px_rgba(255,182,4,0.5)]" : "w-1 md:w-1.5 h-1 md:h-1.5 bg-white/20 group-hover:bg-white/50"
              }`} />
            </button>
          ))}
        </div>
        <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-shamaal-gold to-transparent" />
      </div>

      <style jsx global>{`
        @keyframes cinematic-zoom {
          0% { transform: scale(1.1) translate(0, 0); }
          100% { transform: scale(1.3) translate(-2%, -1%); }
        }
      `}</style>
    </section>
  );
}
