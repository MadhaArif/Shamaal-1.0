"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative h-[52vh] min-h-[380px] flex items-end overflow-hidden mb-0">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/destinations/attabad-lake.jpeg"
            alt="Contact Shamaal Tourism"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/70 via-[#060d1a]/30 to-[#060d1a]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a]/60 via-transparent to-[#060d1a]/40" />
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-shamaal-gold/30"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 20}%` }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/8 mb-5">
            <Mail className="w-3 h-3 text-shamaal-gold" />
            <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">
              We&apos;d love to hear from you
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] mb-6">
            Get in <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Have a question about a tour? Our team is ready to help you plan your perfect Pakistan adventure.
          </p>
        </motion.div>

        {/* Quick contact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {[
            { icon: Phone, label: "0318-0425044", href: "tel:03180425044" },
            { icon: Mail, label: "Shamaaltours@gmail.com", href: "mailto:Shamaaltours@gmail.com" },
            { icon: MapPin, label: "Lahore, Pakistan", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-white/60 text-xs font-semibold hover:text-shamaal-gold hover:border-shamaal-gold/30 transition-all duration-400"
            >
              <Icon className="w-3.5 h-3.5 text-shamaal-gold" />
              {label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom gold rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shamaal-gold/30 to-transparent" />
    </section>
  );
}
