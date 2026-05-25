import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsBanner from "@/components/home/StatsBanner";
import AnimatedRating from "@/components/home/AnimatedRating";
import VibeFinder from "@/components/home/VibeFinder";
import TourCard from "@/components/tours/TourCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Globe, Award, Users, MessageCircle, Quote } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FEATURED_TOURS = [
  {
    id: "1",
    title: "Kashmir • Neelum Valley Tour",
    slug: "kashmir-neelum-valley",
    price: 18000,
    duration: 3,
    location: "Kashmir",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "2",
    title: "Hunza Valley Tour",
    slug: "hunza-valley",
    price: 30000,
    duration: 5,
    location: "Hunza",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 86,
  },
  {
    id: "3",
    title: "Skardu Tour",
    slug: "skardu-tour",
    price: 32000,
    duration: 6,
    location: "Skardu",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviews: 215,
  },
];

const TESTIMONIALS = [
  {
    name: "Sana Tariq",
    location: "Karachi",
    rating: 5,
    text: "Shamaal Tourism made our Hunza trip absolutely magical. The guide was knowledgeable, the hotel was premium, and every detail was perfectly organised. Will definitely book again!",
    tour: "Hunza Valley Tour",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Hamid Nawaz",
    location: "Lahore",
    rating: 5,
    text: "Did the Neelum Valley tour with my family. The rivers and lush green mountains were breathtaking. Shamaal's team was professional and caring throughout.",
    tour: "Kashmir • Neelum Valley Tour",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Zara Khan",
    location: "Dubai",
    rating: 5,
    text: "As a solo female traveller, I was initially nervous. Shamaal's team made me feel completely safe and taken care of. Skardu is now my favourite place on earth!",
    tour: "Skardu Tour",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const WHY_US = [
  { icon: Shield, title: "100% Safe & Certified", desc: "PTDC certified guides with full insurance coverage and 24/7 emergency support on all tours." },
  { icon: Globe, title: "Local Expertise", desc: "Born and raised in the north, our team offers authentic insights you won't find in guidebooks." },
  { icon: Award, title: "Award-Winning Service", desc: "TripAdvisor Travellers' Choice 2022, 2023 & 2024. Pakistan's highest-rated tour operator." },
  { icon: Users, title: "Personalised Journeys", desc: "Small groups and custom itineraries tailored exactly to your pace, interests, and budget." },
];

export default async function Home() {
  let featuredTours = [];
  try {
    const dbFeatured = await prisma.tour.findMany({
      where: { featured: true },
      take: 3
    });
    if (dbFeatured.length > 0) {
      featuredTours = dbFeatured.map((t) => ({
        id: t.id,
        title: t.title,
        slug: t.slug,
        price: t.price,
        duration: t.duration,
        location: t.location,
        difficulty: t.difficulty,
        image: t.images.split(",")[0] || "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 124
      }));
    } else {
      featuredTours = FEATURED_TOURS;
    }
  } catch (error) {
    console.error("Failed to fetch featured tours from database:", error);
    featuredTours = FEATURED_TOURS;
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with 3D Mountains */}
        <HeroSection />

        {/* Featured Destinations */}
        <section className="py-24 bg-shamaal-cream dark:bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm mb-3 block">Explore Pakistan</span>
              <h2 className="text-4xl md:text-5xl font-bold text-shamaal-navy dark:text-white">Popular Destinations</h2>
              <div className="h-1 w-20 bg-shamaal-gold mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: "Hunza Valley", slug: "hunza", img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800", tours: 5 },
                { name: "Skardu", slug: "skardu", img: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800", tours: 4 },
                { name: "Fairy Meadows", slug: "fairy-meadows", img: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800", tours: 3 },
              ].map((dest, i) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className={`group relative rounded-2xl overflow-hidden border border-transparent hover:border-shamaal-gold/45 shadow-lg hover:shadow-2xl hover:-translate-y-2 cursor-pointer transition-all duration-500 ${i === 1 ? "lg:mt-8" : ""} ${i === 2 ? "lg:mt-16" : ""}`}
                  style={{ height: "380px" }}
                >
                  <div className="absolute inset-0 bg-shamaal-navy/30 group-hover:bg-shamaal-navy/10 transition-colors duration-500 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-shamaal-navy/90 via-shamaal-navy/20 to-transparent z-10" />
                  <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white mb-2">{dest.name}</h3>
                    <p className="text-shamaal-gold text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">{dest.tours} tours available →</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/destinations" className="inline-flex items-center px-8 py-4 border-2 border-shamaal-navy dark:border-white text-shamaal-navy dark:text-white font-bold rounded-full hover:bg-shamaal-navy hover:text-white dark:hover:bg-white dark:hover:text-shamaal-navy transition-all duration-300 group">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Vibe Finder */}
        <VibeFinder />

        {/* Stats Banner */}
        <StatsBanner />

        {/* Popular Tours */}
        <section className="py-24 bg-shamaal-cream dark:bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm mb-3 block">Handpicked for You</span>
              <h2 className="text-4xl md:text-5xl font-bold text-shamaal-navy dark:text-white">Most Popular Tours</h2>
              <div className="h-1 w-20 bg-shamaal-gold mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/tours" className="inline-flex items-center px-8 py-4 bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-full transition-all duration-300 shadow-md shadow-shamaal-gold/30 group">
                Browse All Tours
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-white dark:bg-shamaal-navy/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=900"
                  alt="Why choose Shamaal Tourism"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-shamaal-navy/70 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <AnimatedRating value={4.9} />
                  <div className="flex items-center space-x-1 my-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-shamaal-gold fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-200">Based on 3,500+ verified reviews</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-4">Why Shamaal?</span>
                <h2 className="text-4xl font-bold text-shamaal-navy dark:text-white mb-12 leading-snug">
                  Pakistan&apos;s Most Trusted<br />Tour Operator
                </h2>
                <div className="space-y-8">
                  {WHY_US.map((item) => (
                    <div key={item.title} className="flex items-start space-x-5 group">
                      <div className="bg-shamaal-cream dark:bg-white/10 group-hover:bg-shamaal-gold group-hover:scale-110 group-hover:rotate-6 p-4 rounded-xl transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-md">
                        <item.icon className="w-6 h-6 text-shamaal-navy dark:text-white group-hover:text-shamaal-navy transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-2 group-hover:text-shamaal-gold transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-shamaal-cream dark:bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm mb-3 block">Real Stories</span>
              <h2 className="text-4xl md:text-5xl font-bold text-shamaal-navy dark:text-white">What Our Travellers Say</h2>
              <div className="h-1 w-20 bg-shamaal-gold mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="relative bg-white dark:bg-shamaal-navy/40 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/10 hover:border-shamaal-gold/30 hover:-translate-y-2 transition-all duration-500 group hover:shadow-2xl overflow-hidden">
                  <Quote className="absolute right-6 top-6 w-12 h-12 text-gray-100 dark:text-white/5 group-hover:text-shamaal-gold/10 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
                  <div className="flex items-center space-x-1 mb-6 relative z-10">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-shamaal-gold fill-current" />)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-8 relative z-10">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center space-x-4 relative z-10">
                    <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full border-2 border-shamaal-gold group-hover:scale-105 transition-transform duration-300" />
                    <div>
                      <p className="font-bold text-shamaal-navy dark:text-white">{t.name}</p>
                      <p className="text-xs text-shamaal-gold">{t.location} · {t.tour}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 bg-shamaal-navy relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=2000" alt="Background" fill className="object-cover" unoptimized />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Explore <span className="text-shamaal-gold">The Great North?</span>
            </h2>
            <p className="text-gray-300 text-xl mb-10">
              Let us craft your perfect Pakistani adventure. Speak to our travel experts today — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tours" className="px-8 py-4 bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-full transition-all duration-300 shadow-lg shadow-shamaal-gold/30 text-lg">
                Browse Tours
              </Link>
              <a
                href="https://wa.me/923180425044"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
