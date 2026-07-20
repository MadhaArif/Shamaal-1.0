import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Award, Shield, Users, Globe, Star, CheckCircle, Sparkles, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shamaal Tourism",
  description: "Learn about Shamaal Tourism — Pakistan's premium guided tour company, specialising in authentic, luxury travel experiences across the Great North.",
};

const STATS = [
  { value: "1,200+", label: "Tours Completed", color: "#ffb604" },
  { value: "50,000+", label: "Happy Travelers", color: "#60a5fa" },
  { value: "12+", label: "Years Experience", color: "#34d399" },
  { value: "4.9★", label: "Average Rating", color: "#f97316" },
];

const VALUES = [
  { icon: Shield, title: "Safety First", desc: "Every tour includes certified guides, first-aid kits and 24/7 emergency support." },
  { icon: Globe, title: "Authentic Experiences", desc: "We partner with local communities to offer genuine cultural immersion." },
  { icon: Award, title: "Premium Quality", desc: "From handpicked hotels to luxury transport — we never cut corners." },
  { icon: Users, title: "Small Groups", desc: "Intimate group sizes ensure personal attention and meaningful connections." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-shamaal-cream dark:bg-[#060d1a] overflow-x-hidden">
        
        {/* ── Hero Section ─────────────────────────────────── */}
        <section className="relative h-[70vh] flex items-end overflow-hidden">
          {/* Zooming background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/destinations/shangrilla-lake.jpeg"
              alt="Shamaal Tourism Team"
              fill
              className="object-cover opacity-75"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#060d1a]/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-5 animate-tick-up">
              <Compass className="w-3.5 h-3.5 text-shamaal-gold" />
              <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-shamaal-navy dark:text-white max-w-3xl leading-tight">
              Crafting <span className="text-gradient-gold">Unforgettable</span> Northern Journeys
            </h1>
          </div>
        </section>

        {/* ── Stats Bar ────────────────────────────────────── */}
        <section className="relative z-30 -mt-10 px-4 max-w-7xl mx-auto">
          <div className="rounded-2xl border border-white/[0.06] bg-[#07101f]/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/[0.08]">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="text-center md:px-6">
                  <p 
                    className="text-4xl md:text-5xl font-black mb-2.5 tracking-tight"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-500 dark:text-white/40 text-[10px] tracking-[0.2em] font-black uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story Section ────────────────────────────────── */}
        <section className="py-28 relative">
          {/* Glow */}
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-shamaal-gold/[0.02] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-shamaal-gold font-black tracking-[0.25em] uppercase text-[10px] block mb-4">Who We Are</span>
                <h2 className="text-3xl md:text-5xl font-black text-shamaal-navy dark:text-white mb-6 leading-tight">
                  Born in the Mountains, Built for Adventurers
                </h2>
                <div className="space-y-6 text-gray-600 dark:text-white/45 text-sm md:text-base leading-relaxed">
                  <p>
                    Shamaal Tourism was founded by a group of passionate mountaineers and travel enthusiasts who wanted to share the raw, breathtaking beauty of Northern Pakistan with the world — authentically and responsibly.
                  </p>
                  <p>
                    The name <strong className="text-shamaal-navy dark:text-white font-bold">Shamaal</strong> (شمال) — meaning <em className="text-shamaal-gold italic">North</em> in Urdu — embodies our soul. We are a brand built entirely around the magnificent landscapes, rich cultures, and legendary hospitality of Pakistan&apos;s north.
                  </p>
                  <p>
                    Today, we are Pakistan&apos;s most trusted premium tour operator, having taken over 50,000 travellers on life-changing journeys through Hunza, Skardu, Fairy Meadows, and beyond.
                  </p>
                </div>
                
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "PTDC Certified Operator",
                    "ISO 9001:2015 Certified",
                    "Local Guide Expertise",
                    "24/7 Ground Support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-gray-600 dark:text-white/70 font-semibold text-sm">
                      <div className="w-5 h-5 rounded-full bg-shamaal-gold/15 border border-shamaal-gold/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-shamaal-gold" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative image card with traveler choice overlay */}
              <div className="relative h-[480px] rounded-3xl overflow-hidden border border-white/[0.06] group shadow-2xl">
                <Image
                  src="/images/destinations/skardu-viewpoint.jpeg"
                  alt="Northern Pakistan mountains"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/80 via-transparent to-transparent z-10" />

                {/* Rating Card badge */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-2xl p-5 z-20">
                  <div className="flex items-center gap-1 text-shamaal-gold mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-shamaal-navy dark:text-white font-bold text-sm leading-relaxed">&ldquo;Best tour company in Pakistan!&rdquo;</p>
                  <p className="text-gray-500 dark:text-white/40 text-xs mt-1.5">— TripAdvisor Travellers&apos; Choice 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values/Promise Section ──────────────────────── */}
        <section className="py-28 relative bg-[#07101f] overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,182,4,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-5">
                <Sparkles className="w-3.5 h-3.5 text-shamaal-gold" />
                <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Our Promise</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-shamaal-navy dark:text-white">What Sets Us Apart</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map((val, index) => (
                <div 
                  key={val.title} 
                  className="group relative p-7 rounded-2xl border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-white/[0.02] hover:border-shamaal-gold/20 hover:bg-white/[0.04] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl bg-shamaal-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="w-12 h-12 rounded-xl bg-shamaal-gold/10 border border-shamaal-gold/20 flex items-center justify-center mb-6 group-hover:bg-shamaal-gold/15 transition-colors duration-400">
                    <val.icon className="w-5 h-5 text-shamaal-gold" />
                  </div>
                  
                  <h3 className="text-shamaal-navy dark:text-white font-black text-lg mb-3 group-hover:text-shamaal-gold/90 transition-colors duration-400">{val.title}</h3>
                  <p className="text-gray-600 dark:text-white/40 text-sm leading-relaxed">{val.desc}</p>

                  {/* Bottom gold line on hover */}
                  <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-shamaal-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
