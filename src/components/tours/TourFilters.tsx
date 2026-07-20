"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const REGIONS = ["Kashmir", "Naran", "Hunza", "Diamer", "Skardu", "Swat", "Chitral"];
const DIFFICULTIES = ["Easy", "Moderate", "Hard"];

const DIFFICULTY_DOT: Record<string, string> = {
  Easy: "#34d399",
  Moderate: "#fbbf24",
  Hard: "#f87171",
};

const DIFFICULTY_ACTIVE_CLASS: Record<string, string> = {
  Easy: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  Moderate: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  Hard: "bg-rose-400/15 text-rose-300 border-rose-400/30",
};

export default function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get("region") || "";
  const currentDifficulty = searchParams.get("difficulty") || "";
  const activeCount = [currentRegion, currentDifficulty].filter(Boolean).length;
  const hasFilters = activeCount > 0;

  const setParam = (key: string, value: string, current: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-28 rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-shamaal-gold" />
            <span className="text-shamaal-navy dark:text-white font-black text-sm tracking-wide">Filters</span>
            {hasFilters && (
              <span className="w-5 h-5 rounded-full bg-shamaal-gold text-shamaal-navy text-[9px] font-black flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>
          {hasFilters && (
            <Link
              href="/tours"
              className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-white/30 hover:text-rose-400 font-bold tracking-wider uppercase transition-colors duration-300"
            >
              <X className="w-3 h-3" /> Clear
            </Link>
          )}
        </div>

        {/* Region filter */}
        <div className="p-5">
          <p className="text-[10px] font-black text-gray-400 dark:text-white/25 tracking-[0.25em] uppercase mb-3">
            Region
          </p>
          <div className="flex flex-col gap-1">
            {REGIONS.map((region, i) => {
              const isActive = currentRegion === region;
              return (
                <motion.button
                  key={region}
                  onClick={() => setParam("region", region, currentRegion)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left ${
                    isActive
                      ? "text-shamaal-navy bg-shamaal-gold"
                      : "text-gray-600 dark:text-white/50 hover:text-shamaal-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {region}
                  {isActive && (
                    <motion.div
                      layoutId="region-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-shamaal-navy"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="px-5 pb-5 border-t border-gray-200 dark:border-white/[0.04] pt-5">
          <p className="text-[10px] font-black text-gray-400 dark:text-white/25 tracking-[0.25em] uppercase mb-3">
            Difficulty
          </p>
          <div className="flex flex-col gap-1">
            {DIFFICULTIES.map((d, i) => {
              const isActive = currentDifficulty === d;
              return (
                <motion.button
                  key={d}
                  onClick={() => setParam("difficulty", d, currentDifficulty)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left border ${
                    isActive
                      ? DIFFICULTY_ACTIVE_CLASS[d]
                      : "text-gray-600 dark:text-white/50 border-transparent hover:text-shamaal-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: DIFFICULTY_DOT[d] }}
                  />
                  {d}
                  {isActive && (
                    <motion.div
                      layoutId="difficulty-indicator"
                      className="w-1.5 h-1.5 rounded-full ml-auto"
                      style={{ background: DIFFICULTY_DOT[d] }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
