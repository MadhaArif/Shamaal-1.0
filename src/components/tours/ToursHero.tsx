"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Compass } from "lucide-react";

interface ToursHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
}

export default function ToursHero({
  title,
  subtitle,
  eyebrow = "Adventure Awaits",
  image = "/images/destinations/babusar-top.jpeg",
}: ToursHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={image}
            alt={typeof title === "string" ? title : "Shamaal Tourism Tours"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Layered gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/60 via-[#060d1a]/20 to-[#060d1a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a]/50 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,182,4,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/8 mb-5">
            <Compass className="w-3 h-3 text-shamaal-gold" />
            <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[0.92] tracking-tight mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/40 text-base md:text-lg max-w-lg leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shamaal-gold/30 to-transparent" />
    </section>
  );
}
