"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DESTINATIONS = [
  {
    url: "/images/destinations/attabad-lake.jpeg",
    title: "HUNZA",
    sub: "Valley of Eternal Youth",
    color: "#ffb604",
    coords: "36.3167° N, 74.6500° E",
    tagline: "Witness the majestic golden peaks and the turquoise Attabad Lake."
  },
  {
    url: "/images/destinations/deosai-plains.jpeg",
    title: "NEELUM",
    sub: "The Blue Gem of Kashmir",
    color: "#1b2f5a",
    coords: "34.5967° N, 73.9000° E",
    tagline: "Where the river hums the songs of the mountains."
  },
  {
    url: "/images/destinations/saiful-malook.jpeg",
    title: "NARAN",
    sub: "Heart of the Himalayas",
    color: "#ffb604",
    coords: "34.9072° N, 73.6531° E",
    tagline: "Drive through the clouds on the road to heaven."
  },
  {
    url: "/images/destinations/babusar-top.jpeg",
    title: "BABUSAR",
    sub: "Gateway to the North",
    color: "#ffb604",
    coords: "35.0872° N, 74.0272° E",
    tagline: "Touch the sky at the highest point of Kaghan Valley."
  },
  {
    url: "/images/destinations/shangrilla-lake.jpeg",
    title: "SKARDU",
    sub: "The Throne of Mountains",
    color: "#1b2f5a",
    coords: "35.2975° N, 75.6333° E",
    tagline: "Explore the gateway to the world's highest peaks."
  },
  {
    url: "/images/destinations/nanga-parbat.jpeg",
    title: "NANGA PARBAT",
    sub: "The Killer Mountain",
    color: "#ffb604",
    coords: "35.2375° N, 74.5891° E",
    tagline: "The ninth highest mountain in the world, standing in all its glory."
  },
  {
    url: "/images/destinations/shangrilla-resort.jpeg",
    title: "SHANGRILLA",
    sub: "The Heart of Skardu",
    color: "#1b2f5a",
    coords: "35.3524° N, 75.5262° E",
    tagline: "Experience the ultimate luxury amidst the red-roofed cottages."
  },
  {
    url: "/images/destinations/rainbow-lake.jpeg",
    title: "NALTAR",
    sub: "The Rainbow of Pakistan",
    color: "#ffb604",
    coords: "36.1367° N, 74.1833° E",
    tagline: "Explore the magical colors of Rainbow Lake in Naltar Valley."
  },
  {
    url: "/images/destinations/kharphocho-fort.jpeg",
    title: "KHARPHOCHO",
    sub: "The King of Forts",
    color: "#1b2f5a",
    coords: "35.3000° N, 75.6167° E",
    tagline: "Gaze upon the Indus river from the ancient walls of Skardu's crown."
  },
  {
    url: "/images/destinations/skardu-viewpoint.jpeg",
    title: "SKARDU VALLEY",
    sub: "The Heart of Baltistan",
    color: "#ffb604",
    coords: "35.2975° N, 75.6333° E",
    tagline: "A breathtaking panoramic view where the mountains meet the Indus."
  },
  {
    url: "/images/destinations/khaplu-fort.jpeg",
    title: "KHAPLU FORT",
    sub: "Architectural Heritage",
    color: "#1b2f5a",
    coords: "35.1440° N, 76.3399° E",
    tagline: "Discover the royal history of Baltistan in this beautifully restored palace."
  },
  {
    url: "/images/destinations/cold-desert.jpeg",
    title: "COLD DESERT",
    sub: "Sarfaranga Sands",
    color: "#ffb604",
    coords: "35.3167° N, 75.5500° E",
    tagline: "The world's highest cold desert, where dunes are dusted with snow."
  },
  {
    url: "/images/destinations/babusar-top.jpeg",
    title: "BABUSAR TOP",
    sub: "The Gateway Peak",
    color: "#1b2f5a",
    coords: "35.0872° N, 74.0272° E",
    tagline: "Touch the sky at 13,691 feet on the highest point of the Kaghan Valley."
  },
  {
    url: "/images/destinations/k2-concordia.jpeg",
    title: "K2 CONCORDIA",
    sub: "Throne Room of the Gods",
    color: "#1b2f5a",
    coords: "35.7417° N, 76.5150° E",
    tagline: "The most spectacular mountain wilderness on the planet."
  },
  {
    url: "/images/destinations/baldi-viewpoint.jpeg",
    title: "ATTABAD LAKE",
    sub: "Aerial View from Baldi",
    color: "#ffb604",
    coords: "36.3100° N, 74.8700° E",
    tagline: "The turquoise waters of Attabad Lake as seen from the heavens."
  }
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{x: number, y: number, targetX: number, targetX2: number, duration: number, delay: number}[]>([]);
  
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const next = useCallback(() => setIndex((i) => (i + 1) % DESTINATIONS.length), []);

  useEffect(() => {
    // Generate particles on client side only to avoid hydration mismatch and impurity issues
    const generatedParticles = [...Array(10)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetX2: Math.random() * 100 + 2,
      duration: 20 + Math.random() * 30,
      delay: Math.random() * 10
    }));
    
    // Defer state updates to avoid cascading render warning in some linters
    const timeout = setTimeout(() => {
      setParticles(generatedParticles);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white font-sans">
      {/* Cinematic Living Background Layer */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Base Image with Ultra-Subtle Ken Burns */}
            <div className="absolute inset-0 h-full w-full overflow-hidden">
              <Image 
                src={DESTINATIONS[index].url}
                alt={DESTINATIONS[index].title}
                fill
                priority
                quality={100}
                className="object-cover object-[center_40%] transition-opacity duration-1000"
                sizes="100vw"
                style={{ 
                  animation: 'cinematic-zoom 40s infinite alternate-reverse ease-in-out'
                }}
              />
            </div>
            
            {/* Minimalist Gradients for Text Legibility only - Not ruining the image */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic Particle System (Snow/Dust) - Kept very subtle */}
      {mounted && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: p.x + "%", 
                y: p.y + "%",
                opacity: 0
              }}
              animate={{ 
                y: ["-5%", "105%"],
                x: [p.targetX + "%", p.targetX2 + "%"],
                opacity: [0, 0.1, 0]
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                ease: "linear",
                delay: p.delay
              }}
              className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 h-full w-full max-w-[1536px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-end pb-16 md:pb-24">
        
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-10 md:gap-16 items-end"
        >
          {/* Left Side: Main Brand & CTA */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-[1px] w-8 bg-shamaal-gold/60" />
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-shamaal-gold/80 uppercase">
                Discover Pakistan • 0{index + 1}
              </span>
            </motion.div>

            <div className="relative mb-8 md:mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight tracking-normal text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                    {DESTINATIONS[index].title.charAt(0) + DESTINATIONS[index].title.slice(1).toLowerCase()}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
            >
              <button 
                onClick={() => router.push('/tours')}
                className="group relative w-full sm:w-auto px-8 py-4 border border-shamaal-gold/50 text-shamaal-gold font-medium rounded-full transition-all duration-500 hover:bg-shamaal-gold hover:text-shamaal-navy active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center tracking-[0.1em] text-[10px] md:text-xs">
                  VIEW EXPEDITIONS <ArrowUpRight className="ml-2 w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </button>
              
              <div className="relative group w-full sm:max-w-[240px]">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/60 group-focus-within:text-shamaal-gold transition-colors" />
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && router.push(`/tours?query=${query}`)}
                  placeholder="Find a destination..."
                  className="w-full bg-black/40 backdrop-blur-md border-b border-white/30 py-3 pl-8 outline-none focus:border-shamaal-gold/60 transition-all text-[10px] md:text-xs font-semibold tracking-wide text-white placeholder:text-white/60"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Narrative & Discovery */}
          <div className="lg:col-span-4 lg:pl-12 hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-shamaal-gold/90">
                    {DESTINATIONS[index].sub}
                  </h3>
                  <p className="text-sm lg:text-base text-white/40 leading-relaxed font-light">
                    {DESTINATIONS[index].tagline}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-zinc-900 overflow-hidden relative shadow-xl">
                        <Image src={`https://i.pravatar.cc/100?u=${i+150}`} alt="explorer" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" unoptimized />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-shamaal-gold/80 flex items-center justify-center text-[10px] font-bold text-black">
                      +10k
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium tracking-widest text-white/20 uppercase">
                      Official Guide
                    </p>
                    <p className="text-xs font-semibold text-shamaal-gold/70">Pakistan Tourism</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Modern Navigation Controls */}
      <div className="absolute right-8 bottom-16 z-20 flex flex-col items-center space-y-10">
        <div className="flex flex-col space-y-5">
          {DESTINATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative flex items-center justify-center"
            >
              {index === i && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute -inset-2 bg-shamaal-gold/10 rounded-full blur-sm"
                />
              )}
              <div className={`transition-all duration-500 rounded-full ${
                index === i ? "w-2.5 h-2.5 bg-shamaal-gold shadow-[0_0_20px_rgba(255,182,4,0.6)]" : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40"
              }`} />
            </button>
          ))}
        </div>
        <div className="h-20 w-[1px] bg-gradient-to-b from-shamaal-gold/50 to-transparent" />
      </div>

      <style>{`
        @keyframes cinematic-zoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.05); }
        }
        @keyframes mist {
          from { transform: translateX(-100%) skewX(12deg); }
          to { transform: translateX(100%) skewX(12deg); }
        }
        @keyframes mist-slow {
          from { transform: translateX(100%) -skewX(12deg); }
          to { transform: translateX(-100%) -skewX(12deg); }
        }
      `}</style>
    </section>
  );
}
