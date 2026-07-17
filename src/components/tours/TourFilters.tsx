"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const REGIONS = ["Kashmir", "Naran", "Hunza", "Diamer", "Skardu", "Swat", "Chitral"];
const DIFFICULTIES = ["Easy", "Moderate", "Hard"];

export default function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get("region") || "";
  const hasFilters = !!currentRegion;

  const setRegion = (region: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentRegion === region) {
      params.delete("region");
    } else {
      params.set("region", region);
    }
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-28 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-shamaal-gold" />
            <span className="text-white font-black text-sm tracking-wide">Filters</span>
            {hasFilters && (
              <span className="w-5 h-5 rounded-full bg-shamaal-gold text-shamaal-navy text-[9px] font-black flex items-center justify-center">
                1
              </span>
            )}
          </div>
          {hasFilters && (
            <Link
              href="/tours"
              className="flex items-center gap-1 text-[10px] text-white/30 hover:text-rose-400 font-bold tracking-wider uppercase transition-colors duration-300"
            >
              <X className="w-3 h-3" /> Clear
            </Link>
          )}
        </div>

        {/* Region filter */}
        <div className="p-5">
          <p className="text-[10px] font-black text-white/25 tracking-[0.25em] uppercase mb-3">
            Region
          </p>
          <div className="flex flex-col gap-1">
            {REGIONS.map((region, i) => {
              const isActive = currentRegion === region;
              return (
                <motion.button
                  key={region}
                  onClick={() => setRegion(region)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left group ${
                    isActive
                      ? "text-shamaal-navy bg-shamaal-gold"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
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

        {/* Difficulty section (visual only — extend later) */}
        <div className="px-5 pb-5 border-t border-white/[0.04] pt-5">
          <p className="text-[10px] font-black text-white/25 tracking-[0.25em] uppercase mb-3">
            Difficulty
          </p>
          <div className="flex flex-col gap-1">
            {DIFFICULTIES.map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/30 cursor-not-allowed"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: d === "Easy" ? "#34d399" : d === "Moderate" ? "#fbbf24" : "#f87171",
                  }}
                />
                {d}
                <span className="ml-auto text-[9px] tracking-wider uppercase text-white/15">Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
