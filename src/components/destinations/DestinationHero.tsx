"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface DestinationHeroProps {
  name: string;
  region: string;
  tagline: string;
  heroImage: string;
}

export default function DestinationHero({ name, region, tagline, heroImage }: DestinationHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
      {/* Background Layer with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={heroImage}
            alt={name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-shamaal-navy/80 via-shamaal-navy/20 to-shamaal-navy/90" />
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 w-full">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/destinations" className="inline-flex items-center text-white/80 hover:text-shamaal-gold text-xs md:text-sm mb-6 md:mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Destinations
          </Link>
          <span className="text-shamaal-gold font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 block uppercase">{region}</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] md:leading-tight uppercase italic">
            {name}
          </h1>
          <p className="text-white/80 text-lg md:text-2xl font-medium italic mt-4 md:mt-6 max-w-2xl leading-relaxed">
            &ldquo;{tagline}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
