import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Users, Heart, Building2, Compass, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom & Group Tours",
  description: "Plan a bespoke tour of Northern Pakistan with Shamaal Tourism — corporate retreats, honeymoon packages, family tours, and fully custom itineraries.",
};

const PACKAGES = [
  {
    icon: Heart,
    title: "Honeymoon Packages",
    desc: "Romantic getaways to the world's most stunning landscapes. Private jeep, luxury camps, candle-lit dinners under the stars.",
    features: ["Private transport", "Luxury accommodation", "Romantic setups", "Personalised experiences"],
    color: "rose",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600",
  },
  {
    icon: Building2,
    title: "Corporate Retreats",
    desc: "Strengthen team bonds through adventure. We organise everything from transport to team-building activities for groups of 10–100.",
    features: ["Group transport & logistics", "Team-building activities", "Flexible itineraries", "Conference facilities"],
    color: "sky",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=600",
  },
  {
    icon: Users,
    title: "Family Tours",
    desc: "Kid-friendly paced itineraries with safe activities, comfortable stays, and memories the whole family will treasure forever.",
    features: ["Child-safe activities", "Comfortable pacing", "Family rooms", "Flexible schedule"],
    color: "amber",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=600",
  },
  {
    icon: Compass,
    title: "Fully Custom Itinerary",
    desc: "Have a specific dream in mind? Tell us and our travel designers will craft a bespoke tour just for you — any destination, any budget.",
    features: ["Any destination", "Any duration", "Any group size", "Full personalisation"],
    color: "navy",
    image: "https://images.unsplash.com/photo-1601614532158-b6481cc1c6cc?auto=format&fit=crop&q=80&w=600",
  },
];

export default function CustomToursPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-shamaal-cream dark:bg-[var(--background)]">

        {/* Hero */}
        <section className="relative pt-32 pb-24 bg-shamaal-navy overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=2000" alt="Custom Tours Background" fill className="object-cover" unoptimized />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Tailored For You</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Custom & Group <span className="text-shamaal-gold">Tours</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Your dream trip, your way. Our expert travel designers craft personalised itineraries for every type of traveller and every occasion.
            </p>
          </div>
        </section>

        {/* Package Types */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-shamaal-navy dark:text-white mb-4">Our Specialisations</h2>
            <div className="h-1 w-20 bg-shamaal-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.title} className="group bg-white dark:bg-shamaal-navy/30 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-white/10 hover:border-shamaal-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-shamaal-gold/20 p-3 rounded-xl">
                      <pkg.icon className="w-6 h-6 text-shamaal-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-shamaal-navy dark:text-white">{pkg.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{pkg.desc}</p>
                  <ul className="space-y-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="text-xs text-shamaal-sky dark:text-shamaal-gold font-medium flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-shamaal-gold mr-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Itinerary Request Form */}
        <section className="py-24 bg-white dark:bg-shamaal-navy/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Get Started</span>
              <h2 className="text-4xl font-bold text-shamaal-navy dark:text-white">Request Your Custom Itinerary</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">Fill in the form below and one of our travel designers will get back to you within 24 hours with a personalised proposal.</p>
            </div>

            <form className="bg-white dark:bg-shamaal-navy/40 rounded-2xl p-10 shadow-xl border border-gray-100 dark:border-white/10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Full Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Tour Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold">
                    <option>Honeymoon Package</option>
                    <option>Corporate Retreat</option>
                    <option>Family Tour</option>
                    <option>Custom Itinerary</option>
                    <option>Group Adventure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Number of Travelers</label>
                  <input type="number" min="1" placeholder="e.g. 4" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Preferred Destinations</label>
                  <input type="text" placeholder="e.g. Hunza, Skardu, Chitral" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Budget (PKR per person)</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold">
                    <option>Under PKR 75,000</option>
                    <option>PKR 75,000 – 150,000</option>
                    <option>PKR 150,000 – 300,000</option>
                    <option>PKR 300,000+</option>
                    <option>No Budget Limit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Tell Us About Your Dream Trip</label>
                <textarea rows={5} placeholder="Describe your ideal journey — dates, special occasions, accommodation preferences, activities you love..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold resize-none" />
              </div>

              <button type="submit" className="w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-md shadow-shamaal-gold/30 flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Submit My Request</span>
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
