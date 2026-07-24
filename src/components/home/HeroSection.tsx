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
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src={DESTINATIONS[currentIndex].url}
            alt={DESTINATIONS[currentIndex].title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Cinematic Film Grain Noise Overlay to mask pixelation */}
          <div className="absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/noise.svg')" }} />
          {/* Elegant Overlay gradients for readability - enhanced for drama */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
          {/* Radial glow for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,182,4,0.1),transparent_60%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 h-full w-full max-w-[1536px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-center pb-32 md:pb-20">
        
        <div className="max-w-4xl mt-24 md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-gradient-to-r from-shamaal-gold to-transparent" />
                <Compass className="w-4 h-4 text-shamaal-gold animate-spin-slow" style={{ animationDuration: '6s' }} />
                <span className="text-shamaal-gold font-bold tracking-[0.3em] text-[10px] uppercase">
                  EXPLORE PAKISTAN
                </span>
              </div>
              
              {/* Reduced Typography Size */}
              <h1 className="text-[3.5rem] sm:text-[5rem] lg:text-[7rem] font-black leading-[0.85] text-white tracking-tighter mb-8 drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)] uppercase">
                {DESTINATIONS[currentIndex].title}
              </h1>
              
              <div className="pl-6 border-l-2 border-shamaal-gold mb-10">
                <h3 className="text-xl md:text-3xl font-semibold text-white mb-3">
                  {DESTINATIONS[currentIndex].sub}
                </h3>
                <p className="text-white/80 text-sm md:text-lg max-w-2xl font-light leading-relaxed">
                  {DESTINATIONS[currentIndex].tagline}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Search & Action - reduced size, adjusted max width to avoid overlap with thumbnails */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-xl xl:max-w-lg"
          >
            <div className="relative group w-full flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-shamaal-gold transition-colors duration-300" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/tours?query=${query}`)}
                placeholder="Where to next?"
                className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/15 rounded-full py-3.5 pl-14 pr-6 outline-none focus:border-shamaal-gold focus:bg-white/15 transition-all duration-300 text-sm font-medium text-white placeholder:text-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
            <button 
              onClick={() => router.push('/tours')}
              className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-shamaal-gold via-yellow-400 to-shamaal-gold text-black font-bold tracking-[0.18em] uppercase hover:from-white hover:via-shamaal-gold hover:to-white transition-all duration-500 shrink-0 w-full sm:w-auto shadow-[0_0_60px_rgba(255,182,4,0.5)] hover:shadow-[0_0_80px_rgba(255,182,4,0.7)] hover:-translate-y-1 text-sm"
            >
              Explore <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

      </div>

      {/* Modern Interactive Thumbnails Overlay - further reduced size & moved up */}
      <div className="absolute bottom-16 right-6 md:right-12 lg:right-16 z-20 hidden lg:flex items-end gap-4">
        {getVisibleThumbnails().slice(0, 3).map((dest, idx) => {
          const actualIndex = DESTINATIONS.findIndex(d => d.title === dest.title);
          
          return (
            <motion.div
              key={`${dest.title}-${actualIndex}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              onClick={() => handleThumbnailClick(actualIndex)}
              className={`group relative w-28 h-40 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-500 hover:-translate-y-2 ${
                idx === 0 
                  ? "border-shamaal-gold shadow-[0_20px_60px_rgba(255,182,4,0.5)] scale-110" 
                  : "border-white/15 hover:border-white/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              }`}
            >
              <img
                src={dest.url}
                alt={dest.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />
              
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-[10px] font-bold tracking-[0.12em] uppercase mb-0.5">
                  {dest.title}
                </p>
                <div className="flex items-center gap-1 text-shamaal-gold/90">
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">PAKISTAN</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Slide Indicator - enhanced */}
      <div className="absolute bottom-8 left-6 right-6 lg:hidden flex gap-3 z-20 items-center">
        {DESTINATIONS.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-12 bg-shamaal-gold shadow-[0_0_15px_rgba(255,182,4,0.8)]" : "w-3 bg-white/30"}`}
          />
        ))}
      </div>

      {/* Elegant Progress Bar - enhanced */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/5 z-20 backdrop-blur-sm">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-shamaal-gold via-yellow-400 to-shamaal-gold shadow-[0_0_30px_rgba(255,182,4,1)]"
        />
      </div>

    </section>
  );
}
