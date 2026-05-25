"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Mountain, Tent, Waves, ArrowRight, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VIBES = [
  {
    id: "adventure",
    icon: Mountain,
    title: "Adventure",
    desc: "For the adrenaline seekers. High peaks and rough tracks.",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    link: "/tours?query=adventure"
  },
  {
    id: "peace",
    icon: Trees,
    title: "Peace",
    desc: "Quiet valleys, lush forests, and serene landscapes.",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
    link: "/tours?query=peace"
  },
  {
    id: "culture",
    icon: Camera,
    title: "Culture",
    desc: "Ancient forts, local traditions, and rich history.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    link: "/tours?query=culture"
  },
  {
    id: "camping",
    icon: Tent,
    title: "Wild Life",
    desc: "Sleeping under the stars and wildlife exploration.",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
    link: "/tours?query=wildlife"
  }
];

export default function VibeFinder() {
  const [activeVibe, setActiveVibe] = useState(VIBES[0]);

  return (
    <section className="py-24 bg-shamaal-navy overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-shamaal-gold/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <span className="text-shamaal-gold font-bold tracking-widest uppercase text-[10px] md:text-sm mb-4 block">Interactive Search</span>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 md:mb-12 leading-tight">
              What&apos;s your travel <span className="text-shamaal-gold">vibe?</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VIBES.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => setActiveVibe(vibe)}
                  className={`flex items-center space-x-4 p-4 md:p-6 rounded-2xl border transition-all duration-500 text-left group ${
                    activeVibe.id === vibe.id 
                      ? "bg-shamaal-gold border-shamaal-gold shadow-lg shadow-shamaal-gold/20" 
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className={`p-2.5 md:p-3 rounded-xl transition-colors duration-500 ${
                    activeVibe.id === vibe.id ? "bg-shamaal-navy text-white" : "bg-shamaal-gold/10 text-shamaal-gold group-hover:bg-shamaal-gold/20"
                  }`}>
                    <vibe.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base md:text-lg ${activeVibe.id === vibe.id ? "text-shamaal-navy" : "text-white"}`}>
                      {vibe.title}
                    </h3>
                    <p className={`text-[10px] md:text-xs mt-1 ${activeVibe.id === vibe.id ? "text-shamaal-navy/70" : "text-gray-400"}`}>
                      {vibe.desc.split('.')[0]}.
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 md:mt-12">
              <Link 
                href={activeVibe.link}
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-shamaal-navy font-bold rounded-full hover:bg-shamaal-gold transition-all duration-300 group text-sm md:text-base"
              >
                Find {activeVibe.title} Tours
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[350px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVibe.id}
                initial={{ opacity: 0, scale: 1.1, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeVibe.image}
                  alt={activeVibe.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-shamaal-navy via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{activeVibe.title} Experience</h4>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed">{activeVibe.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Visual highlight */}
            <div className="absolute top-8 right-8 w-16 md:w-24 h-16 md:h-24 bg-shamaal-gold/20 rounded-full blur-2xl animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
}
