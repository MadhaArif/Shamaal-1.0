"use client";

import { MapPin, Clock, Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface TourCardProps {
  id: string;
  title: string;
  slug: string;
  price: number;
  duration: number;
  location: string;
  difficulty: string;
  image: string;
  rating: number;
  reviews: number;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy:     "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Moderate: "text-amber-400  bg-amber-400/10  border-amber-400/20",
  Hard:     "text-rose-400   bg-rose-400/10   border-rose-400/20",
};

export default function TourCard({
  title, slug, price, duration, location, difficulty, image, rating, reviews,
}: TourCardProps) {
  const diffClass = DIFFICULTY_COLORS[difficulty] ?? "text-white/60 bg-white/5 border-white/10";

  return (
    <Link href={`/tours/${slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0c1525] hover:border-shamaal-gold/25 transition-colors duration-500 shadow-[0_4px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
      >
        {/* ── Image ─────────────────────────────────── */}
        <div className="relative h-60 overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1525] via-black/20 to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <Star className="w-3 h-3 text-shamaal-gold fill-shamaal-gold" />
            <span className="text-white text-xs font-bold">{rating.toFixed(1)}</span>
            <span className="text-white/40 text-[10px]">({reviews})</span>
          </div>

          {/* Difficulty badge */}
          <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase ${diffClass}`}>
            {difficulty}
          </div>

          {/* Duration pill */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <Clock className="w-3 h-3 text-shamaal-gold" />
            <span className="text-white text-xs font-bold">{duration} Days</span>
          </div>
        </div>

        {/* ── Content ───────────────────────────────── */}
        <div className="flex flex-col flex-1 p-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-shamaal-gold/70 mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase">{location}</span>
          </div>

          {/* Title */}
          <h3 className="text-shamaal-navy dark:text-white text-lg font-bold leading-snug mb-4 line-clamp-2 group-hover:text-shamaal-gold/90 transition-colors duration-400">
            {title}
          </h3>

          {/* Divider */}
          <div className="mt-auto divider-gold opacity-20 mb-5" />

          {/* Price + CTA */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-400 dark:text-white/30 text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5">Starting from</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-gray-500 dark:text-white/50 text-xs font-bold">PKR</span>
                <span className="text-shamaal-gold text-2xl font-black">{price.toLocaleString()}</span>
                <span className="text-gray-400 dark:text-white/30 text-[10px]">/person</span>
              </div>
            </div>

            <motion.div
              className="w-11 h-11 rounded-full border border-shamaal-gold/30 bg-shamaal-gold/5 flex items-center justify-center group-hover:bg-shamaal-gold group-hover:border-shamaal-gold transition-all duration-400"
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowUpRight className="w-5 h-5 text-shamaal-gold group-hover:text-shamaal-navy transition-colors duration-400" />
            </motion.div>
          </div>
        </div>

        {/* Gold bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-shamaal-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>
    </Link>
  );
}
