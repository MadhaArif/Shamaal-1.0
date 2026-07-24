"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Star, Trophy, Clock, Users, LucideIcon } from "lucide-react";

const STATS = [
  { value: 1200,  suffix: "+", label: "Tours Completed",  icon: Trophy, color: "#ffb604" },
  { value: 50000, suffix: "+", label: "Happy Travelers",  icon: Users,  color: "#60a5fa" },
  { value: 12,    suffix: "+", label: "Years Experience", icon: Clock,  color: "#34d399" },
  { value: 4.9,   suffix: "★", label: "Average Rating",   icon: Star,   color: "#f97316" },
];

function Counter({
  value, label, suffix, icon: Icon, color, index
}: {
  value: number; label: string; suffix: string;
  icon: LucideIcon; color: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const springValue = useSpring(0, { stiffness: 100, damping: 20 });
  const displayValue = useTransform(springValue, (v) =>
    label.includes("Rating") ? v.toFixed(1) : Math.floor(v).toLocaleString('en-IN')
  );

  useEffect(() => {
    springValue.set(isInView ? value : 0);
  }, [isInView, value, springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${color}18, transparent 70%)` }}
      />

      <div className="relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl border border-shamaal-navy/[0.06] bg-white hover:border-shamaal-navy/20 hover:bg-white transition-all duration-500">
        
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
          style={{ background: `${color}14`, border: `1px solid ${color}28` }}
        >
          <Icon className="w-5 h-5" color={color} />
        </div>

        {/* Number */}
        <div className="flex items-end gap-1 mb-2">
          <motion.span
            className="text-4xl md:text-5xl font-black tabular-nums"
            style={{ color }}
          >
            {displayValue}
          </motion.span>
          <span className="text-2xl md:text-3xl font-black pb-1" style={{ color }}>
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-shamaal-navy/55 text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">
          {label}
        </p>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-12 rounded-full transition-all duration-700"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

export default function StatsBanner() {
  return (
    <section className="relative overflow-hidden bg-shamaal-cream py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-shamaal-gold/[0.04] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,182,4,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-shamaal-gold text-[10px] font-black tracking-[0.35em] uppercase mb-3">
            Our Track Record
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-shamaal-navy">
            Numbers that Speak for{" "}
            <span className="text-gradient-gold">Themselves</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <Counter key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
