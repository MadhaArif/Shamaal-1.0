import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shamaal Tourism. Book a custom tour, ask about destinations, or plan your dream trip to Northern Pakistan.",
};

export default function ContactPage() {
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Ali"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Ahmed"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="ali@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Interested In</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition">
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
                    placeholder="Tell us about your dream trip..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-md shadow-shamaal-gold/30"
                >
                  Send Message
                </button>
              </form>
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
