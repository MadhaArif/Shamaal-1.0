"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import { Mail, Phone, MapPin, MessageCircle, Clock, Loader2, CheckCircle } from "lucide-react";

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
    message: ""
  });

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
          name: `${formData.firstName} ${formData.lastName}`.trim()
        })
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interestedIn: "General Inquiry",
          message: ""
        });
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-shamaal-cream dark:bg-[var(--background)]">
        {/* Cinematic Header for Contact */}
        <ContactHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto text-center mb-16">
            Have questions about a tour? Ready to plan your dream trip? Our team is here to help you every step of the way.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white dark:bg-shamaal-navy/30 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/10">
              <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-8">Send us a Message</h2>
              
              {success ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-shamaal-navy text-white px-8 py-3 rounded-full font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="Ali"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Ahmed"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="ali@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Interested In</label>
                    <select 
                      value={formData.interestedIn}
                      onChange={(e) => setFormData({...formData, interestedIn: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                    >
                      <option>General Inquiry</option>
                      <option>Tour Booking</option>
                      <option>Custom Itinerary</option>
                      <option>Group / Corporate Tour</option>
                      <option>Honeymoon Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your dream trip..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-md shadow-shamaal-gold/30 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="bg-shamaal-navy rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-shamaal-gold/20 p-3 rounded-xl">
                      <MapPin className="w-5 h-5 text-shamaal-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Our Office</p>
                      <p className="text-gray-300 text-sm">UG-18 Big City Plaza,<br />Liberty Roundabout, Lahore.</p>
                      <p className="text-gray-400 text-[10px] mt-2 font-bold uppercase tracking-widest">DTS # 10475</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-shamaal-gold/20 p-3 rounded-xl">
                      <Phone className="w-5 h-5 text-shamaal-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Phone</p>
                      <p className="text-gray-300 text-sm">0318-0425044</p>
                      <p className="text-gray-300 text-sm">0318-0425025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-shamaal-gold/20 p-3 rounded-xl">
                      <Mail className="w-5 h-5 text-shamaal-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Email</p>
                      <p className="text-gray-300 text-sm">Shamaaltours@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-shamaal-gold/20 p-3 rounded-xl">
                      <Clock className="w-5 h-5 text-shamaal-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Office Hours</p>
                      <p className="text-gray-300 text-sm">Mon – Sat: 9am – 7pm</p>
                      <p className="text-gray-300 text-sm">Sunday: 10am – 4pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/923180425044"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl p-6 transition-colors shadow-md shadow-green-500/30"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Map Placeholder */}
              <div className="bg-gray-200 dark:bg-white/10 rounded-2xl overflow-hidden h-48 flex items-center justify-center border border-gray-200 dark:border-white/10">
                <span className="text-gray-400 text-sm">Interactive Map (Google Maps)</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
