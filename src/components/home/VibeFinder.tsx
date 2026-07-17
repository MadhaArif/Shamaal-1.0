"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Mountain, Tent, ArrowUpRight, Camera, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VIBES = [
  {
    id: "adventure",
    icon: Mountain,
    title: "Adventure",
    label: "For Thrill-Seekers",
    desc: "High peaks, rough tracks, and heart-pounding expeditions across Pakistan's wildest frontiers.",
    image: "/images/destinations/k2-concordia.jpeg",
    link: "/tours?query=adventure",
    accent: "#f97316",
  },
  {
    id: "peace",
    icon: Trees,
    title: "Serenity",
    label: "For the Soul",
    desc: "Quiet valleys, lush green forests, and serene lake-side retreats far from the noise.",
    image: "/images/destinations/deosai-plains.jpeg",
    link: "/tours?query=peace",
    accent: "#34d399",
  },
  {
    id: "culture",
    icon: Camera,
    title: "Culture",
    label: "For the Curious",
    desc: "Ancient forts, local bazaars, Kalash festivals, and centuries of living heritage.",
    image: "/images/destinations/khaplu-fort.jpeg",
    link: "/tours?query=culture",
    accent: "#a78bfa",
  },
  {
    id: "wildlife",
    icon: Tent,
    title: "Wild Life",
    label: "Into the Wild",
    desc: "Stargazing camps, Himalayan ibex, snow leopard trails, and untouched wilderness.",
    image: "/images/destinations/nanga-parbat.jpeg",
    link: "/tours?query=wildlife",
    accent: "#60a5fa",
  },
];

export default function VibeFinder() {
  const [active, setActive] = useState(VIBES[0]);

  return (
    <section className="relative py-28 md:py-36 bg-[#07101f] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] -translate-y-1/2 transition-all duration-1000"
          style={{ background: `${active.accent}08` }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-shamaal-gold/20 bg-shamaal-gold/5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-shamaal-gold" />
            <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">
              Find Your Perfect Trip
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            What&apos;s your travel{" "}
            <span className="text-gradient-gold">vibe?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Vibe selector ── */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
              {VIBES.map((vibe) => {
                const isActive = active.id === vibe.id;
                return (
                  <motion.button
                    key={vibe.id}
                    onClick={() => setActive(vibe)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`relative group p-5 md:p-6 rounded-2xl border text-left transition-all duration-500 overflow-hidden ${
                      isActive
                        ? "border-white/25 bg-white/[0.12] shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                        : "border-white/[0.05] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Active accent glow */}
                    {isActive && (
                      <motion.div
                        layoutId="vibe-glow"
                        className="absolute inset-0 opacity-22 rounded-2xl"
                        style={{ background: vibe.accent }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-400"
                      style={{
                        background: isActive ? `${vibe.accent}20` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isActive ? vibe.accent + "40" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <vibe.icon
                        className="w-5 h-5 transition-colors duration-400"
                        style={{ color: isActive ? vibe.accent : "rgba(255,255,255,0.4)" }}
                      />
                    </div>

                    {/* Text */}
                    <p
                      className="text-[9px] font-black tracking-[0.2em] uppercase mb-1 transition-colors duration-400"
                      style={{ color: isActive ? vibe.accent : "rgba(255,255,255,0.3)" }}
                    >
                      {vibe.label}
                    </p>
                    <h3 className={`text-base font-black transition-colors duration-400 ${isActive ? "text-white" : "text-white/50"}`}>
                      {vibe.title}
                    </h3>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="vibe-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: vibe.accent }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Desc + CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
                  {active.desc}
                </p>
                <Link
                  href={active.link}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,182,4,0.35)] hover:scale-105"
                  style={{
                    background: active.accent,
                    color: "#07101f",
                    boxShadow: `0 0 24px ${active.accent}30`,
                  }}
                >
                  Explore {active.title} Tours
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: Image ── */}
          <div className="order-1 lg:order-2 relative h-[360px] md:h-[580px] rounded-3xl overflow-hidden">
            {/* Border glow */}
            <div
              className="absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none z-20"
              style={{ boxShadow: `inset 0 0 0 1px ${active.accent}30` }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/90 via-transparent to-transparent" />

                {/* Info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10"
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black tracking-[0.2em] uppercase mb-3"
                    style={{ background: `${active.accent}15`, color: active.accent, border: `1px solid ${active.accent}30` }}
                  >
                    <active.icon className="w-3 h-3" />
                    {active.label}
                  </div>
                  <h4 className="text-white text-lg font-black mb-1">{active.title} Experience</h4>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{active.desc}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Corner accent */}
            <div
              className="absolute top-6 right-6 w-20 h-20 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-700"
              style={{ background: active.accent }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
