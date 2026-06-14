"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DestinationsHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end justify-start overflow-hidden">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/destinations/deosai-plains.jpeg"
            alt="Pakistan Northern Areas"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dynamic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-shamaal-navy/80 via-shamaal-navy/40 to-shamaal-navy/90" />
        </motion.div>
        
        {/* Mist/Fog Effect (CSS-based to avoid ORB errors) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 3, delay: 1 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-mist" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[100%] animate-mist-slow" />
            </motion.div>
          </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-shamaal-gold font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 block">The Great North</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none">
            Our <span className="text-shamaal-gold">Destinations</span>
          </h1>
          <div className="h-1.5 w-24 bg-shamaal-gold mt-8" />
        </motion.div>
      </div>
    </section>
  );
}
