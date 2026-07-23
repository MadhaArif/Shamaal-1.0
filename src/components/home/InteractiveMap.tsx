"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Compass, Sparkles, Building2, Mountain, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export interface MapLocation {
  id: string;
  name: string;
  region: string;
  type: "office" | "destination";
  coordinates: string;
  mapQuery: string;
  googleMapsUrl: string;
  directionsUrl: string;
  description: string;
  image: string;
  highlights: string[];
}

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: "office",
    name: "Shamaal Tourism Main Office",
    region: "Lahore, Punjab",
    type: "office",
    coordinates: "31.5113° N, 74.3468° E",
    mapQuery: "Big City Plaza Liberty Roundabout Lahore",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UG-18+Big+City+Plaza+Liberty+Roundabout+Lahore",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UG-18+Big+City+Plaza+Liberty+Roundabout+Lahore",
    description: "Visit our headquarters in Liberty Roundabout Lahore to meet our travel experts, discuss custom itineraries, or finalize tour bookings in person.",
    image: "/images/destinations/skardu-viewpoint.jpeg",
    highlights: ["UG-18 Big City Plaza", "Liberty Roundabout", "DTS Licence #10475", "In-person Booking Support"],
  },
  {
    id: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    type: "destination",
    coordinates: "36.3167° N, 74.6500° E",
    mapQuery: "Hunza Valley Gilgit Baltistan Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hunza+Valley+Gilgit+Baltistan",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Hunza+Valley+Gilgit+Baltistan",
    description: "Heaven on Earth! Surrounded by Rakaposhi, Passu Cones, and Attabad Lake, Hunza is Pakistan's premier mountain paradise.",
    image: "/images/destinations/attabad-lake.jpeg",
    highlights: ["Attabad Lake", "Baltit Fort", "Passu Cones", "Khunjerab Pass"],
  },
  {
    id: "skardu",
    name: "Skardu & Deosai",
    region: "Gilgit-Baltistan",
    type: "destination",
    coordinates: "35.2971° N, 75.6333° E",
    mapQuery: "Skardu Gilgit Baltistan Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Skardu+Gilgit+Baltistan",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Skardu+Gilgit+Baltistan",
    description: "The Gateway to K2! Home to Shangrila Lake, Cold Desert, and the world's second-highest plateau, Deosai National Park.",
    image: "/images/destinations/shangrilla-lake.jpeg",
    highlights: ["Shangrila Lake", "Deosai Plains", "Katpana Cold Desert", "Satpara Lake"],
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer District, GB",
    type: "destination",
    coordinates: "35.3853° N, 74.5828° E",
    mapQuery: "Fairy Meadows Nanga Parbat Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Fairy+Meadows+Nanga+Parbat",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Fairy+Meadows+Nanga+Parbat",
    description: "Dramatic green meadows at the base of Nanga Parbat (8,126m), offering thrilling 4WD jeep tracks and pine forest hikes.",
    image: "/images/destinations/nanga-parbat.jpeg",
    highlights: ["Nanga Parbat Base View", "Beyal Camp", "Raikot Glacier", "Pine Forests"],
  },
  {
    id: "swat",
    name: "Swat & Kalam",
    region: "Khyber Pakhtunkhwa",
    type: "destination",
    coordinates: "35.2227° N, 72.4258° E",
    mapQuery: "Kalam Swat Valley Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kalam+Swat+Valley",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kalam+Swat+Valley",
    description: "Switzerland of the East featuring lush pine valleys, Mahodand Lake, Ushu forest, and Malam Jabba ski slopes.",
    image: "/images/destinations/malam-jabba.jpeg",
    highlights: ["Malam Jabba Ski Resort", "Mahodand Lake", "Kalam Valley", "Ushu Forest"],
  },
  {
    id: "naran",
    name: "Naran & Kaghan",
    region: "Mansehra, KPK",
    type: "destination",
    coordinates: "34.9085° N, 73.6520° E",
    mapQuery: "Naran Valley Mansehra Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Naran+Valley+Pakistan",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Naran+Valley+Pakistan",
    description: "Fabled valley of emerald lakes, roaring Kunhar river, Saif-ul-Malook lake, and scenic Babusar Top pass.",
    image: "/images/destinations/saiful-malook.jpeg",
    highlights: ["Saif-ul-Malook Lake", "Babusar Top", "Lulusar Lake", "Kunhar River"],
  },
  {
    id: "neelum",
    name: "Neelum Valley",
    region: "Azad Kashmir",
    type: "destination",
    coordinates: "34.5857° N, 73.9073° E",
    mapQuery: "Neelum Valley Azad Kashmir Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Neelum+Valley+Azad+Kashmir",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Neelum+Valley+Azad+Kashmir",
    description: "Lush green forests, cascading waterfalls, and turquoise rivers winding through Keran, Upper Neelum, and Arang Kel.",
    image: "/images/destinations/babusar-top.jpeg",
    highlights: ["Arang Kel", "Kutton Waterfall", "Keran River", "Ratti Gali Lake"],
  },
  {
    id: "chitral",
    name: "Chitral & Kalash",
    region: "Khyber Pakhtunkhwa",
    type: "destination",
    coordinates: "35.8510° N, 71.7869° E",
    mapQuery: "Kalash Valley Chitral Pakistan",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kalash+Valley+Chitral",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kalash+Valley+Chitral",
    description: "Unique cultural hub home to the ancient Kalash people, Tirich Mir view, and the world's highest polo ground at Shandur.",
    image: "/images/destinations/khaplu-fort.jpeg",
    highlights: ["Kalash Valleys", "Shandur Polo Pass", "Chitral Fort", "Tirich Mir"],
  },
];

export default function InteractiveMap() {
  const [activeLoc, setActiveLoc] = useState<MapLocation>(MAP_LOCATIONS[0]);

  return (
    <section className="relative py-28 bg-[#060d1a] overflow-hidden text-white">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-shamaal-gold/[0.04] rounded-full blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-shamaal-gold/30 bg-shamaal-gold/10 mb-5">
            <Compass className="w-4 h-4 text-shamaal-gold" />
            <span className="text-shamaal-gold text-[11px] font-black tracking-[0.3em] uppercase">Interactive Location Map</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Explore Locations on <span className="text-gradient-gold">Google Maps</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Click on any office or tourism destination below to view its location on Google Maps or open direct turn-by-turn navigation.
          </p>
        </div>

        {/* Quick Location Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {MAP_LOCATIONS.map((loc) => {
            const isActive = activeLoc.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLoc(loc)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${
                  isActive
                    ? "bg-shamaal-gold text-shamaal-navy shadow-[0_0_25px_rgba(255,182,4,0.4)] scale-105"
                    : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-shamaal-gold/40 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {loc.type === "office" ? (
                  <Building2 className={`w-3.5 h-3.5 ${isActive ? "text-shamaal-navy" : "text-shamaal-gold"}`} />
                ) : (
                  <Mountain className={`w-3.5 h-3.5 ${isActive ? "text-shamaal-navy" : "text-shamaal-gold"}`} />
                )}
                <span>{loc.name}</span>
                {loc.type === "office" && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${isActive ? "bg-shamaal-navy/20 text-shamaal-navy" : "bg-shamaal-gold/20 text-shamaal-gold"}`}>
                    Office
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Map Box & Info Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          {/* Left / Top: Interactive Embedded Map */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] lg:h-full rounded-2xl overflow-hidden border border-white/10 group min-h-[380px]">
            {/* Embedded Google Map iframe */}
            <iframe
              key={activeLoc.id}
              title={`Google Map - ${activeLoc.name}`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "brightness(0.92) contrast(1.05)" }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLoc.mapQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full"
            />

            {/* Floating Quick Action over Map */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex flex-wrap gap-2">
              <a
                href={activeLoc.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-shamaal-gold text-shamaal-navy font-black text-xs tracking-wider uppercase shadow-[0_0_30px_rgba(255,182,4,0.5)] hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={activeLoc.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white font-bold text-xs hover:bg-black/90 transition-all duration-300"
              >
                <Navigation className="w-4 h-4 text-shamaal-gold" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right / Bottom: Location Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shamaal-gold/15 border border-shamaal-gold/30 text-shamaal-gold text-[10px] font-black tracking-widest uppercase">
                  <MapPin className="w-3 h-3" />
                  {activeLoc.region}
                </div>
                <span className="text-white/40 text-[10px] font-mono font-bold tracking-wider">
                  {activeLoc.coordinates}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {activeLoc.name}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {activeLoc.description}
              </p>

              {/* Location Highlights */}
              <div className="mb-6">
                <p className="text-shamaal-gold text-[10px] font-black tracking-[0.2em] uppercase mb-3">Key Landmarks / Highlights</p>
                <div className="grid grid-cols-2 gap-2">
                  {activeLoc.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-white/80 bg-white/[0.04] border border-white/[0.06] px-3 py-2 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-shamaal-gold shrink-0" />
                      <span className="truncate font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Link Action Box */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-white font-black text-sm mb-0.5">Want exact GPS location?</p>
                  <p className="text-white/40 text-xs">Tap to view live on Google Maps App</p>
                </div>

                <a
                  href={activeLoc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-shamaal-gold text-shamaal-navy font-black text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
