import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sun, Thermometer, Camera, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | Shamaal Tourism",
  description: "Discover the most breathtaking destinations in Northern Pakistan — Hunza, Skardu, Fairy Meadows, Swat, Chitral, Gilgit, and Naran.",
};

const DESTINATIONS = [
  {
    slug: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    tagline: "Heaven on Earth",
    bestTime: "April–May, Oct–Nov",
    temp: "15–25°C",
    image: "/images/destinations/attabad-lake.jpeg",
    highlights: ["Baskochi View", "Attabad Lake", "Baltit Fort", "Passu Cones"],
    tours: 5,
  },
  {
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    tagline: "Gateway to K2",
    bestTime: "June–September",
    temp: "10–22°C",
    image: "/images/destinations/skardu-viewpoint.jpeg",
    highlights: ["K2 Concordia", "Cold Desert", "Khaplu Fort", "Shangrilla Lake"],
    tours: 4,
  },
  {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer",
    tagline: "Nanga Parbat's Backyard",
    bestTime: "May–October",
    temp: "8–18°C",
    image: "/images/destinations/nanga-parbat.jpeg",
    highlights: ["Nanga Parbat View", "Beyal Camp", "Raikot Glacier", "Lush Meadows"],
    tours: 3,
  },
  {
    slug: "swat",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    tagline: "Switzerland of the East",
    bestTime: "April–October",
    temp: "18–28°C",
    image: "/images/destinations/malam-jabba.jpeg",
    highlights: ["Malam Jabba", "Mahodand Lake", "Ushu Forest", "Kalam Valley"],
    tours: 6,
  },
  {
    slug: "chitral",
    name: "Chitral & Kalash",
    region: "Khyber Pakhtunkhwa",
    tagline: "Land of the Kalash People",
    bestTime: "May–September",
    temp: "12–25°C",
    image: "/images/destinations/deosai-plains.jpeg",
    highlights: ["Kalash Valleys", "Tirich Mir View", "Chitral Fort", "Shandur Polo"],
    tours: 4,
  },
  {
    slug: "naran",
    name: "Naran & Kaghan",
    region: "Mansehra",
    tagline: "Valley of Lakes",
    bestTime: "June–August",
    temp: "10–22°C",
    image: "/images/destinations/saiful-malook.jpeg",
    highlights: ["Saif-ul-Malook", "Babusar Top", "Ansoo Lake", "Lulusar Lake"],
    tours: 5,
  },
  {
    slug: "gilgit",
    name: "Gilgit",
    region: "Gilgit-Baltistan",
    tagline: "Crossroads of Civilisations",
    bestTime: "April–October",
    temp: "15–28°C",
    image: "/images/destinations/rainbow-lake.jpeg",
    highlights: ["Rainbow Lake", "Naltar Valley", "Kargah Buddha", "Phander Lake"],
    tours: 3,
  },
];

export default function DestinationsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-shamaal-cream dark:bg-[#060d1a] overflow-x-hidden">
        {/* Hero Banner - No gap from navbar */}
        <DestinationsHero />

        {/* Destinations Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-gray-600 dark:text-white/40 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            From the lush valleys of Swat to the rugged high-altitude deserts of Skardu, our curated destinations cover the most spectacular corners of the Great North.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-white/[0.02] hover:border-shamaal-gold/25 transition-all duration-500 flex flex-col hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden shrink-0">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#060d1a]/20 to-transparent" />
                  
                  {/* Regions info */}
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <div className="flex items-center text-shamaal-gold text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {dest.region}
                    </div>
                    <h2 className="text-2xl font-black">{dest.name}</h2>
                    <p className="text-white/50 text-xs italic mt-0.5">&ldquo;{dest.tagline}&rdquo;</p>
                  </div>
                  
                  {/* Tour count badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    {dest.tours} Tours
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex flex-col flex-grow relative">
                  {/* Hover accent glow */}
                  <div className="absolute inset-0 rounded-b-2xl bg-shamaal-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Temperature / Best Time */}
                  <div className="flex items-center space-x-6 text-[11px] font-bold text-gray-500 dark:text-white/40 mb-4">
                    <span className="flex items-center">
                      <Sun className="w-4 h-4 text-shamaal-gold mr-1.5" />
                      {dest.bestTime}
                    </span>
                    <span className="flex items-center">
                      <Thermometer className="w-4 h-4 text-shamaal-gold mr-1.5" />
                      {dest.temp}
                    </span>
                  </div>

                  {/* Highlight pill items */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {dest.highlights.map((h) => (
                      <span 
                        key={h} 
                        className="bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] text-gray-600 dark:text-white/50 text-[10px] font-bold px-3 py-1 rounded-full flex items-center"
                      >
                        <Camera className="w-3 h-3 mr-1.5 text-shamaal-gold" />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/[0.04] flex items-center justify-between">
                    <span className="text-xs text-shamaal-gold font-black tracking-wider uppercase group-hover:text-yellow-400 transition-colors">
                      Explore destination
                    </span>
                    <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-shamaal-gold group-hover:bg-shamaal-gold group-hover:text-shamaal-navy transition-all duration-400">
                      <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white group-hover:text-shamaal-navy" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
