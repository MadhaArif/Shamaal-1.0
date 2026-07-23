"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siInstagram, siFacebook, siYoutube } from "simple-icons";

const DESTINATIONS = [
  { name: "Hunza Valley", href: "/destinations/hunza" },
  { name: "Skardu & K2 Base Camp", href: "/destinations/skardu" },
  { name: "Fairy Meadows", href: "/destinations/fairy-meadows" },
  { name: "Swat Valley", href: "/destinations/swat" },
  { name: "Chitral & Kalash", href: "/destinations/chitral" },
];

const COMPANY = [
  { name: "About Us", href: "/about" },
  { name: "All Tours", href: "/tours" },
  { name: "Custom Itineraries", href: "/custom-tours" },
  { name: "Travel Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const SOCIALS = [
  { icon: siInstagram, full: "Instagram", href: "https://instagram.com/shamaaltourism" },
  { icon: siFacebook, full: "Facebook",  href: "https://facebook.com/shamaaltourism" },
  { icon: siYoutube, full: "YouTube",   href: "https://youtube.com/@shamaaltourism" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#060d1a]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-shamaal-gold/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-shamaal-navy/5 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Top gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-shamaal-gold/40 to-transparent" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase mb-3 flex items-center gap-2 justify-center md:justify-start">
              <Star className="w-3 h-3 fill-current" /> Pakistan's #1 Tour Operator
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Ready for Your Next<br />
              <span className="text-gradient-gold">Adventure?</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/tours"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-shamaal-gold text-shamaal-navy font-black rounded-full hover:shadow-[0_0_40px_rgba(255,182,4,0.3)] transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-shamaal-gold to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-xs tracking-[0.2em] uppercase">Explore Tours</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-white/80 font-bold rounded-full hover:border-shamaal-gold/50 hover:text-shamaal-gold transition-all duration-500 text-xs tracking-[0.2em] uppercase"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand – 4 cols */}
          <div className="lg:col-span-4 space-y-7">
            <Link href="/" className="inline-block group">
              <div className="relative h-20 w-44">
                <Image
                  src="/logo.png"
                  alt="Shamaal Tourism"
                  fill
                  className="object-contain transition-all duration-500 group-hover:brightness-125"
                  sizes="176px"
                />
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Premium guided adventures across Pakistan's legendary Great North — Hunza, Skardu, Fairy Meadows and beyond.
            </p>

            {/* Rating badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="glass-gold px-4 py-2 rounded-full">
                <p className="text-shamaal-gold text-xs font-black tracking-wider">★ 4.9 / 5.0</p>
                <p className="text-shamaal-navy/40 text-[9px] tracking-widest uppercase">3,500+ Reviews</p>
              </div>
              <div className="px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03]">
                <p className="text-white text-xs font-black tracking-wider">DTS #10475</p>
                <p className="text-white/40 text-[9px] tracking-widest uppercase">Licensed Operator</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon, full, href }) => (
                <a
                  key={full}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={full}
                  className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-shamaal-gold/50 hover:bg-shamaal-gold/10 transition-all duration-400 text-white/40 hover:text-shamaal-gold [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-current"
                >
                  <div 
                    className="w-6 h-6"
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations – 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-white/60 font-black text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="vline-gold h-4 inline-block" />
              Destinations
            </h3>
            <ul className="space-y-3">
              {DESTINATIONS.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-shamaal-gold transition-all duration-300"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company – 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="text-white/60 font-black text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="vline-gold h-4 inline-block" />
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-shamaal-gold transition-all duration-300"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact – 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-white/60 font-black text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="vline-gold h-4 inline-block" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/55">
                <MapPin className="w-4 h-4 text-shamaal-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">UG-18 Big City Plaza,<br />Liberty Roundabout, Lahore.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/55">
                <Phone className="w-4 h-4 text-shamaal-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:03180425044" className="block hover:text-shamaal-gold transition-colors">0318-0425044</a>
                  <a href="tel:03180425025" className="block hover:text-shamaal-gold transition-colors">0318-0425025</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Mail className="w-4 h-4 text-shamaal-gold shrink-0" />
                <a href="mailto:Shamaaltours@gmail.com" className="hover:text-shamaal-gold transition-colors">Shamaaltours@gmail.com</a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/923180425044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-400"
                >
                  <span className="relative w-2 h-2">
                    <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
                    <span className="relative block w-2 h-2 bg-green-400 rounded-full" />
                  </span>
                  WhatsApp Online
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} Shamaal Tourism Pakistan (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-white/10">|</span>
            <span>Made with ♥ in Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
