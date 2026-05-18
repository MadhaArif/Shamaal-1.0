"use client";

import dynamic from "next/dynamic";
import { Search, Calendar, Users, MapPin } from "lucide-react";

const MountainScene = dynamic(() => import("@/components/home/MountainScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-shamaal-navy" />,
});

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
      <MountainScene />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-shamaal-gold animate-pulse" />
          <span>Tours available for Summer 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          Discover{" "}
          <span className="text-shamaal-gold">The Great North</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light drop-shadow-md">
          Premium guided tours and luxury travel experiences across the breathtaking landscapes of Northern Pakistan.
        </p>

        {/* Floating Search Widget */}
        <div className="bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-2xl border border-white/20 mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 border border-white/10 text-left">
              <MapPin className="text-shamaal-gold mr-3 h-5 w-5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Destination</span>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-full font-medium text-sm"
                />
              </div>
            </div>

            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 border border-white/10 text-left">
              <Calendar className="text-shamaal-gold mr-3 h-5 w-5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Date</span>
                <input
                  type="text"
                  placeholder="When?"
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-full font-medium text-sm"
                />
              </div>
            </div>

            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 border border-white/10 text-left">
              <Users className="text-shamaal-gold mr-3 h-5 w-5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Travelers</span>
                <input
                  type="text"
                  placeholder="How many?"
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-full font-medium text-sm"
                />
              </div>
            </div>

            <button className="bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-xl py-3 px-6 transition-all duration-300 flex items-center justify-center space-x-2 group">
              <span>Search</span>
              <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-shamaal-gold to-transparent" />
      </div>
    </section>
  );
}
