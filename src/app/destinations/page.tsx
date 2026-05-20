import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sun, Thermometer, Camera, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
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
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    highlights: ["Attabad Lake", "Baltit Fort", "Rakaposhi View", "Cherry Blossoms"],
    tours: 18,
  },
  {
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    tagline: "Gateway to K2",
    bestTime: "June–September",
    temp: "10–22°C",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    highlights: ["Shangrila Lake", "Deosai Plains", "K2 Base Camp", "Cold Desert"],
    tours: 14,
  },
  {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer",
    tagline: "Nanga Parbat's Backyard",
    bestTime: "May–October",
    temp: "8–18°C",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
    highlights: ["Nanga Parbat View", "Beyal Camp", "Raikot Glacier", "Lush Meadows"],
    tours: 8,
  },
  {
    slug: "swat",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    tagline: "Switzerland of the East",
    bestTime: "April–October",
    temp: "18–28°C",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
    highlights: ["Malam Jabba", "Mahodand Lake", "Ushu Forest", "Mingora Bazaar"],
    tours: 11,
  },
  {
    slug: "chitral",
    name: "Chitral & Kalash",
    region: "Khyber Pakhtunkhwa",
    tagline: "Land of the Kalash People",
    bestTime: "May–September",
    temp: "12–25°C",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
    highlights: ["Kalash Valleys", "Tirich Mir View", "Chitral Fort", "Shandur Polo Festival"],
    tours: 9,
  },
  {
    slug: "naran",
    name: "Naran & Kaghan",
    region: "Mansehra",
    tagline: "Valley of Lakes",
    bestTime: "June–August",
    temp: "10–22°C",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800",
    highlights: ["Saif-ul-Malook Lake", "Babusar Pass", "Ansoo Lake", "Lulusar Lake"],
    tours: 12,
  },
  {
    slug: "gilgit",
    name: "Gilgit",
    region: "Gilgit-Baltistan",
    tagline: "Crossroads of Civilisations",
    bestTime: "April–October",
    temp: "15–28°C",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    highlights: ["Kargah Buddha", "Naltar Valley", "Gilgit Bazaar", "KKH Junction"],
    tours: 7,
  },
];

export default function DestinationsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-shamaal-cream dark:bg-[var(--background)]">
        {/* Hero Banner */}
        <section className="relative h-80 flex items-end justify-start overflow-hidden">
          <div className="absolute inset-0 bg-shamaal-navy/70 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=2000"
            alt="Pakistan Northern Areas"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-2">Explore Pakistan</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Our Destinations</h1>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mb-16">
            From the lush valleys of Swat to the rugged high-altitude deserts of Skardu, our curated destinations cover the most spectacular corners of the Great North.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group bg-white dark:bg-shamaal-navy/30 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-transparent hover:border-shamaal-gold/40 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-shamaal-gold text-xs font-semibold mb-1 uppercase tracking-wider">
                      <MapPin className="w-3 h-3 mr-1" />
                      {dest.region}
                    </div>
                    <h2 className="text-2xl font-bold">{dest.name}</h2>
                    <p className="text-gray-300 text-sm italic">&ldquo;{dest.tagline}&rdquo;</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-shamaal-gold text-shamaal-navy text-xs font-bold px-3 py-1 rounded-full">
                    {dest.tours} Tours
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Sun className="w-4 h-4 text-shamaal-gold mr-1" />
                      {dest.bestTime}
                    </span>
                    <span className="flex items-center">
                      <Thermometer className="w-4 h-4 text-shamaal-gold mr-1" />
                      {dest.temp}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {dest.highlights.map((h) => (
                      <span key={h} className="bg-shamaal-cream dark:bg-white/10 text-shamaal-navy dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                        <Camera className="w-3 h-3 mr-1 text-shamaal-gold" />
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-shamaal-sky dark:text-shamaal-gold font-semibold group-hover:underline underline-offset-2">
                      Explore destination
                    </span>
                    <div className="h-9 w-9 rounded-full bg-shamaal-cream dark:bg-white/10 flex items-center justify-center group-hover:bg-shamaal-gold transition-colors">
                      <ArrowRight className="w-4 h-4 text-shamaal-navy dark:text-white group-hover:text-shamaal-navy" />
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
