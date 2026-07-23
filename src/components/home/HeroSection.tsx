"use client";

import { useState, useEffect } from "react";
import { Search, ArrowUpRight, Compass, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DESTINATIONS = [
  {
    url: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?auto=format&fit=crop&q=80&w=2500",
    title: "HUNZA",
    sub: "Valley of Eternal Youth",
    color: "#ffb604",
    coords: "36.3167° N, 74.6500° E",
    tagline: "Witness the majestic golden peaks and the turquoise Attabad Lake."
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2500",
    title: "NEELUM",
    sub: "The Blue Gem of Kashmir",
    color: "#1b2f5a",
    coords: "34.5967° N, 73.9000° E",
    tagline: "Where the river hums the songs of the mountains."
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2500",
    title: "NARAN",
    sub: "Heart of the Himalayas",
    color: "#ffb604",
    coords: "34.9072° N, 73.6531° E",
    tagline: "Drive through the clouds on the road to heaven."
  },
  {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2500",
    title: "BABUSAR",
    sub: "Gateway to the North",
    color: "#ffb604",
    coords: "35.0872° N, 74.0272° E",
    tagline: "Touch the sky at the highest point of Kaghan Valley."
  },
  {
    url: "/images/destinations/skardu-viewpoint.jpeg",
    title: "SKARDU",
    sub: "The Throne of Mountains",
    color: "#1b2f5a",
    coords: "35.2975° N, 75.6333° E",
    tagline: "Explore the gateway to the world's highest peaks."
  },
  {
    url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&q=80&w=2500",
    title: "NANGA PARBAT",
    sub: "The Killer Mountain",
    color: "#ffb604",
    coords: "35.2375° N, 74.5891° E",
    tagline: "The ninth highest mountain in the world, standing in all its glory."
  },
  {
    url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2500",
    title: "SHANGRILLA",
    sub: "The Heart of Skardu",
    color: "#1b2f5a",
    coords: "35.3524° N, 75.5262° E",
    tagline: "Experience the ultimate luxury amidst the red-roofed cottages."
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2500",
    title: "NALTAR",
    sub: "The Rainbow of Pakistan",
    color: "#ffb604",
    coords: "36.1367° N, 74.1833° E",
    tagline: "Explore the magical colors of Rainbow Lake in Naltar Valley."
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleThumbnails = () => {
    const thumbnails = [];
    // Show 4 upcoming destinations in the carousel
    for (let i = 1; i <= 4; i++) {
      thumbnails.push(DESTINATIONS[(currentIndex + i) % DESTINATIONS.length]);
    }
    return thumbnails;
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Main Background Image with AnimatePresence */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src={DESTINATIONS[currentIndex].url}
            alt={DESTINATIONS[currentIndex].title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Cinematic Film Grain Noise Overlay to mask pixelation */}
          <div className="absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
          {/* Elegant Overlay gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 h-full w-full max-w-[1536px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-center pb-32 md:pb-20">
        
        <div className="max-w-3xl mt-20 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-shamaal-gold" />
                <Compass className="w-4 h-4 text-shamaal-gold animate-spin-slow" style={{ animationDuration: '4s' }} />
                <span className="text-shamaal-gold font-semibold tracking-[0.3em] text-xs uppercase">
                  Discover Pakistan
                </span>
              </div>
              
              {/* Massive Modern Typography */}
              <h1 className="text-[5rem] sm:text-[7rem] lg:text-[9rem] font-black leading-[0.85] text-white tracking-tighter mb-8 drop-shadow-2xl uppercase">
                {DESTINATIONS[currentIndex].title}
              </h1>
              
              <div className="pl-6 border-l-2 border-shamaal-gold mb-12">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">
                  {DESTINATIONS[currentIndex].sub}
                </h3>
                <p className="text-white/70 text-base md:text-lg max-w-lg font-light leading-relaxed">
                  {DESTINATIONS[currentIndex].tagline}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Search & Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-xl"
          >
            <div className="relative group w-full flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-shamaal-gold transition-colors" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/tours?query=${query}`)}
                placeholder="Where to next?"
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-4 pl-14 pr-6 outline-none focus:border-shamaal-gold focus:bg-white/20 transition-all text-sm font-medium text-white placeholder:text-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              />
            </div>
            <button 
              onClick={() => router.push('/tours')}
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-shamaal-gold text-black font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors shrink-0 w-full sm:w-auto shadow-[0_0_30px_rgba(255,182,4,0.3)]"
            >
              Explore <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>

      {/* Modern Interactive Thumbnails Overlay - The "Outstanding" Factor */}
      <div className="absolute bottom-12 right-6 md:right-16 lg:right-24 z-20 hidden lg:flex items-end gap-5">
        {getVisibleThumbnails().map((dest, idx) => {
          const actualIndex = DESTINATIONS.findIndex(d => d.title === dest.title);
          
          return (
            <motion.div
              key={`${dest.title}-${actualIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => handleThumbnailClick(actualIndex)}
              className={`group relative w-36 h-48 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-500 hover:-translate-y-2 ${
                idx === 0 
                  ? "border-shamaal-gold shadow-[0_15px_40px_rgba(255,182,4,0.3)] scale-105" 
                  : "border-white/20 hover:border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              }`}
            >
              <img
                src={dest.url}
                alt={dest.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              
              <div className="absolute bottom-5 left-4 right-4">
                <p className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-1">
                  {dest.title}
                </p>
                <div className="flex items-center gap-1.5 text-shamaal-gold/80">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Pakistan</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Slide Indicator */}
      <div className="absolute bottom-6 left-6 right-6 lg:hidden flex gap-2 z-20">
        {DESTINATIONS.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-shamaal-gold" : "w-2 bg-white/30"}`}
          />
        ))}
      </div>

      {/* Elegant Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5 z-20 backdrop-blur-sm">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-shamaal-gold shadow-[0_0_20px_rgba(255,182,4,0.8)]"
        />
      </div>

    </section>
  );
}
