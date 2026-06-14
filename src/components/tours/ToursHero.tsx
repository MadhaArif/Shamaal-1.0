"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ToursHeroProps {
  title: string | React.ReactNode;
}

export default function ToursHero({ title }: ToursHeroProps) {
  return (
    <section className="relative h-[45vh] min-h-[350px] flex items-end overflow-hidden mb-12">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/destinations/babusar-top.jpeg"
            alt="Explore Tours"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-shamaal-navy/80 via-shamaal-navy/30 to-shamaal-navy/90" />
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-shamaal-gold font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Adventure Awaits</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] md:leading-tight uppercase italic">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
