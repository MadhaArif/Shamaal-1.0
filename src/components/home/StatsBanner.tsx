"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function Counter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const springValue = useSpring(0, {
    stiffness: 150,
    damping: 25,
    duration: 1.0,
  });

  const displayValue = useTransform(springValue, (current) => {
    if (label.includes("Rating")) {
      return current.toFixed(1);
    }
    return Math.floor(current).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    } else {
      springValue.set(0);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="text-center">
      <motion.p className="text-3xl md:text-5xl font-bold text-shamaal-gold mb-1 md:mb-2">
        <motion.span>{displayValue}</motion.span>{suffix}
      </motion.p>
      <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-semibold">{label}</p>
    </div>
  );
}

export default function StatsBanner() {
  return (
    <section className="bg-shamaal-navy py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          <Counter value={1200} label="Tours Completed" suffix="+" />
          <Counter value={50000} label="Happy Travelers" suffix="+" />
          <Counter value={12} label="Years Experience" suffix="+" />
          <Counter value={4.9} label="Average Rating" suffix="★" />
        </div>
      </div>
    </section>
  );
}
