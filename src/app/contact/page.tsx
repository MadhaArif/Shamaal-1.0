"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import {
  Mail, Phone, MapPin, MessageCircle, Clock,
  Loader2, CheckCircle,
  Send, ArrowUpRight, ExternalLink, Navigation
} from "lucide-react";

const INTERESTED_OPTIONS = [
  "General Inquiry",
  "Tour Booking",
  "Custom Itinerary",
  "Group / Corporate Tour",
  "Honeymoon Package",
];

const INPUT_CLS =
  "w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-shamaal-navy dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-shamaal-gold/50 dark:focus:bg-white/[0.05] transition-all duration-300 text-sm";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interestedIn: "General Inquiry",
    message: "",
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", interestedIn: "General Inquiry", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to connect to the server. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-shamaal-cream dark:bg-[#060d1a]">
        <ContactHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* ── Contact Form ────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="relative rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden">
                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-60 h-60 bg-shamaal-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

                <h2 className="text-2xl font-black text-shamaal-navy dark:text-white mb-2">
                  Send us a <span className="text-gradient-gold">Message</span>
                </h2>
                <p className="text-gray-600 dark:text-white/35 text-sm mb-8">
                  We typically reply within 2-4 hours during business hours.
                </p>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-black text-shamaal-navy dark:text-white mb-3">Message Sent!</h3>
                      <p className="text-gray-600 dark:text-white/40 text-sm mb-8 max-w-xs mx-auto">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="px-8 py-3 rounded-full border border-shamaal-gold/40 text-shamaal-gold text-xs font-black tracking-[0.2em] uppercase hover:bg-shamaal-gold hover:text-shamaal-navy transition-all duration-400"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {error && (
                        <div className="px-5 py-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                          {error}
                        </div>
                      )}

                      {/* Name row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            placeholder="Ali"
                            className={INPUT_CLS}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            placeholder="Ahmed"
                            className={INPUT_CLS}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="ali@example.com"
                          className={INPUT_CLS}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+92 300 0000000"
                          className={INPUT_CLS}
                        />
                      </div>

                      {/* Interested In */}
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase mb-2">
                          Interested In
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {INTERESTED_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => update("interestedIn", opt)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                                formData.interestedIn === opt
                                  ? "bg-shamaal-gold text-shamaal-navy"
                                  : "border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/40 hover:border-shamaal-gold/40 hover:text-shamaal-navy dark:hover:text-white/70"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase mb-2">
                          Message *
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder="Tell us about your dream trip to Northern Pakistan..."
                          className={`${INPUT_CLS} resize-none`}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-shamaal-gold text-shamaal-navy font-black text-sm tracking-[0.15em] uppercase hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400 shadow-[0_0_30px_rgba(255,182,4,0.25)] hover:shadow-[0_0_50px_rgba(255,182,4,0.4)]"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <div className="space-y-5">

              {/* Contact Info Card */}
              <div className="relative rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-7 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shamaal-gold/30 to-transparent" />
                <h3 className="text-shamaal-navy dark:text-white font-black text-base mb-6">Contact Information</h3>
                <ul className="space-y-5">
                  {[
                    { icon: MapPin, label: "Our Office", val: "UG-18 Big City Plaza,\nLiberty Roundabout, Lahore.\nDTS # 10475" },
                    { icon: Phone, label: "Phone", val: "0318-0425044\n0318-0425025" },
                    { icon: Mail, label: "Email", val: "Shamaaltours@gmail.com" },
                    { icon: Clock, label: "Office Hours", val: "Mon – Sat: 9am – 7pm\nSunday: 10am – 4pm" },
                  ].map(({ icon: Icon, label, val }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-shamaal-gold/10 border border-shamaal-gold/20 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-shamaal-gold" />
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-white/30 text-[10px] font-black tracking-[0.2em] uppercase mb-0.5">{label}</p>
                        {val.split("\n").map((line, i) => (
                          <p key={i} className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office Google Map Card */}
              <div className="relative rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-shamaal-navy dark:text-white font-black text-sm">
                    <MapPin className="w-4 h-4 text-shamaal-gold" />
                    Office Location Map
                  </div>
                  <span className="text-[10px] text-shamaal-gold font-bold bg-shamaal-gold/10 px-2.5 py-0.5 rounded-full border border-shamaal-gold/20">Lahore</span>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 mb-4">
                  <iframe
                    title="Shamaal Tourism Office Google Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://maps.google.com/maps?q=UG-18+Big+City+Plaza+Liberty+Roundabout+Lahore&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=UG-18+Big+City+Plaza+Liberty+Roundabout+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-shamaal-gold text-shamaal-navy font-black text-[11px] uppercase tracking-wider hover:bg-yellow-400 transition-all text-center"
                  >
                    <span>Open Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=UG-18+Big+City+Plaza+Liberty+Roundabout+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-white/10 text-shamaal-navy dark:text-white font-bold text-[11px] hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-center"
                  >
                    <Navigation className="w-3 h-3 text-shamaal-gold" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/923180425044"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-2xl bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-400"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-shamaal-navy dark:text-white font-black text-sm">WhatsApp</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold">We&apos;re online now</span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 dark:text-white/30 group-hover:text-green-400 group-hover:rotate-45 transition-all duration-400" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

