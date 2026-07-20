"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Users, Heart, Building2, Compass, Send } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const PACKAGES = [
  {
    icon: Heart,
    title: "Honeymoon Packages",
    desc: "Romantic getaways to the world's most stunning landscapes. Private jeep, luxury camps, candle-lit dinners under the stars.",
    features: ["Private transport", "Luxury accommodation", "Romantic setups", "Personalised experiences"],
    color: "rose",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=900",
  },
  {
    icon: Building2,
    title: "Corporate Retreats",
    desc: "Strengthen team bonds through adventure. We organise everything from transport to team-building activities for groups of 10–100.",
    features: ["Group transport & logistics", "Team-building activities", "Flexible itineraries", "Conference facilities"],
    color: "sky",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=900",
  },
  {
    icon: Users,
    title: "Family Tours",
    desc: "Kid-friendly paced itineraries with safe activities, comfortable stays, and memories the whole family will treasure forever.",
    features: ["Child-safe activities", "Comfortable pacing", "Family rooms", "Flexible schedule"],
    color: "amber",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900",
  },
  {
    icon: Compass,
    title: "Fully Custom Itinerary",
    desc: "Have a specific dream in mind? Tell us and our travel designers will craft a bespoke tour just for you — any destination, any budget.",
    features: ["Any destination", "Any duration", "Any group size", "Full personalisation"],
    color: "navy",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=900",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CustomToursContent() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pb-20 bg-shamaal-cream dark:bg-[#060d1a]">

        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-24 bg-shamaal-navy overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="/images/destinations/nanga-parbat.jpeg" alt="Custom Tours Background" fill className="object-cover" priority sizes="100vw" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Tailored For You</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Custom & Group <span className="text-shamaal-gold">Tours</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Your dream trip, your way. Our expert travel designers craft personalised itineraries for every type of traveller and every occasion.
            </p>
          </motion.div>
        </section>

        {/* Package Types */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-shamaal-navy dark:text-white mb-4">Our Specialisations</h2>
            <div className="h-1 w-20 bg-shamaal-gold mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PACKAGES.map((pkg, index) => (
              <motion.div 
                key={pkg.title} 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group bg-white dark:bg-white/[0.04] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.06] hover:border-shamaal-gold/40 hover:shadow-[0_0_40px_rgba(255,182,4,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 192px" />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-shamaal-gold/15 p-3 rounded-xl border border-shamaal-gold/20">
                      <pkg.icon className="w-6 h-6 text-shamaal-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-shamaal-navy dark:text-white">{pkg.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-white/50 text-sm mb-4 leading-relaxed">{pkg.desc}</p>
                  <ul className="space-y-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="text-xs text-shamaal-gold/80 font-medium flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-shamaal-gold mr-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Custom Itinerary Request Form */}
        <section className="py-24 bg-gray-50 dark:bg-[#07101f]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Get Started</span>
              <h2 className="text-4xl font-bold text-shamaal-navy dark:text-white">Request Your Custom Itinerary</h2>
              <p className="text-gray-600 dark:text-white/40 mt-4 max-w-xl mx-auto">Fill in the form below and one of our travel designers will get back to you within 24 hours with a personalised proposal.</p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/[0.04] rounded-2xl p-10 border border-gray-200 dark:border-white/[0.06] space-y-6 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Full Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-shamaal-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-shamaal-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Tour Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c1525] text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all">
                    <option>Honeymoon Package</option>
                    <option>Corporate Retreat</option>
                    <option>Family Tour</option>
                    <option>Custom Itinerary</option>
                    <option>Group Adventure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Number of Travelers</label>
                  <input type="number" min="1" placeholder="e.g. 4" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-shamaal-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Preferred Destinations</label>
                  <input type="text" placeholder="e.g. Hunza, Skardu, Chitral" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-shamaal-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Budget (PKR per person)</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c1525] text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all">
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
                <textarea rows={5} placeholder="Describe your ideal journey — dates, special occasions, accommodation preferences, activities you love..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-shamaal-navy dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition-all resize-none" />
              </div>

              <button type="submit" className="w-full bg-shamaal-gold hover:bg-yellow-400 text-shamaal-navy font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-[0_0_30px_rgba(255,182,4,0.3)] hover:shadow-[0_0_50px_rgba(255,182,4,0.5)] hover:scale-[1.01] flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Submit My Request</span>
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
