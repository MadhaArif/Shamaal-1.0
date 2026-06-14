import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Award, Shield, Users, Globe, Star, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Shamaal Tourism — Pakistan's premium guided tour company, specialising in authentic, luxury travel experiences across the Great North.",
};

const STATS = [
  { value: "1,200+", label: "Tours Completed" },
  { value: "50,000+", label: "Happy Travelers" },
  { value: "12+", label: "Years Experience" },
  { value: "4.9★", label: "Average Rating" },
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

      <main className="flex-grow pt-32 md:pt-40 bg-shamaal-cream dark:bg-[var(--background)]">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-shamaal-navy/60 z-10" />
          <Image
            src="/images/destinations/shangrilla-lake.jpeg"
            alt="Shamaal Tourism Team"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-2">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
              Crafting <span className="text-shamaal-gold">Unforgettable</span> Northern Journeys
            </h1>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-shamaal-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="py-10 px-8 text-center hover:bg-white/5 transition-colors duration-300">
                  <p className="text-4xl font-bold text-shamaal-gold mb-2">{stat.value}</p>
                  <p className="text-gray-300 text-sm uppercase tracking-widest font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Who We Are</span>
                <h2 className="text-4xl font-bold text-shamaal-navy dark:text-white mb-6 leading-snug">
                  Born in the Mountains, Built for Adventurers
                </h2>
                <div className="space-y-5 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  <p>
                    Shamaal Tourism was founded in 2012 by a group of passionate mountaineers and travel enthusiasts who wanted to share the raw, breathtaking beauty of Northern Pakistan with the world — authentically and responsibly.
                  </p>
                  <p>
                    The name <strong className="text-shamaal-navy dark:text-white">Shamaal</strong> (شمال) — meaning <em>North</em> in Urdu — embodies our soul. We are a brand built entirely around the magnificent landscapes, rich cultures, and legendary hospitality of Pakistan&apos;s north.
                  </p>
                  <p>
                    Today, we are Pakistan&apos;s most trusted premium tour operator, having taken over 50,000 travellers on life-changing journeys through Hunza, Skardu, Fairy Meadows, and beyond.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2 text-shamaal-navy dark:text-white font-semibold">
                    <CheckCircle className="w-5 h-5 text-shamaal-gold" />
                    <span>PTDC Certified Operator</span>
                  </div>
                  <div className="flex items-center space-x-2 text-shamaal-navy dark:text-white font-semibold">
                    <CheckCircle className="w-5 h-5 text-shamaal-gold" />
                    <span>ISO 9001:2015 Certified</span>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/destinations/skardu-viewpoint.jpeg"
                  alt="Northern Pakistan mountains"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-shamaal-navy/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-1 text-shamaal-gold mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-shamaal-navy dark:text-white font-bold text-sm">&ldquo;Best tour company in Pakistan!&rdquo;</p>
                  <p className="text-gray-500 text-xs mt-1">— TripAdvisor Travellers&apos; Choice 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-shamaal-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Our Promise</span>
              <h2 className="text-4xl font-bold text-white">What Sets Us Apart</h2>
              <div className="h-1 w-20 bg-shamaal-gold mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUES.map((val) => (
                <div key={val.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-shamaal-gold/50 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-500 group shadow-md hover:shadow-xl">
                  <div className="bg-shamaal-gold/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-shamaal-gold/30 transition-colors">
                    <val.icon className="w-8 h-8 text-shamaal-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
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
