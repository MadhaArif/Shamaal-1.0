"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

export default function AnimatedRating({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const springValue = useSpring(0, {
    stiffness: 150,
    damping: 25,
    duration: duration,
  });

  const displayValue = useTransform(springValue, (current) => current.toFixed(1));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    } else {
      springValue.set(0);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.p ref={ref} className="text-5xl font-bold text-shamaal-gold">
      {displayValue}
    </motion.p>
  );
}
