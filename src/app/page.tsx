import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TourCard from "@/components/tours/TourCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Globe, Award, Users, MessageCircle } from "lucide-react";

const FEATURED_TOURS = [
  {
    id: "1",
    title: "Hunza Valley Autumn Blossom Tour",
    slug: "hunza-valley-autumn",
    price: 150000,
    duration: 7,
    location: "Hunza, Gilgit",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "2",
    title: "K2 Base Camp Trek",
    slug: "k2-base-camp",
    price: 350000,
    duration: 21,
    location: "Skardu",
    difficulty: "Extreme",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 86,
  },
  {
    id: "3",
    title: "Fairy Meadows & Nanga Parbat Expedition",
    slug: "fairy-meadows",
    price: 95000,
    duration: 5,
    location: "Diamer",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
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
    tour: "Hunza Valley 7-Day Tour",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Hamid Nawaz",
    location: "Lahore",
    rating: 5,
    text: "Did the Fairy Meadows tour with my family. The views of Nanga Parbat at sunrise were something I will never forget. Shamaal's team was professional and caring throughout.",
    tour: "Fairy Meadows Expedition",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Zara Khan",
    location: "Dubai",
    rating: 5,
    text: "As a solo female traveller, I was initially nervous. Shamaal's team made me feel completely safe and taken care of. Skardu is now my favourite place on earth!",
    tour: "Skardu Cold Desert Safari",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const WHY_US = [
  { icon: Shield, title: "100% Safe & Certified", desc: "PTDC certified guides with full insurance coverage and 24/7 emergency support on all tours." },
  { icon: Globe, title: "Local Expertise", desc: "Born and raised in the north, our team offers authentic insights you won't find in guidebooks." },
  { icon: Award, title: "Award-Winning Service", desc: "TripAdvisor Travellers' Choice 2022, 2023 & 2024. Pakistan's highest-rated tour operator." },
  { icon: Users, title: "Personalised Journeys", desc: "Small groups and custom itineraries tailored exactly to your pace, interests, and budget." },
];

export default function Home() {
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Hunza Valley", slug: "hunza", img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800", tours: 18 },
                { name: "Skardu", slug: "skardu", img: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800", tours: 14 },
                { name: "Fairy Meadows", slug: "fairy-meadows", img: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800", tours: 8 },
              ].map((dest, i) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className={`group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer ${i === 1 ? "md:mt-8" : ""} ${i === 2 ? "md:mt-16" : ""}`}
                  style={{ height: "380px" }}
                >
                  <div className="absolute inset-0 bg-shamaal-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-shamaal-navy/90 via-shamaal-navy/30 to-transparent z-10" />
                  <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
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

        {/* Stats Banner */}
        <section className="bg-shamaal-navy py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: "1,200+", label: "Tours Completed" },
                { val: "50,000+", label: "Happy Travelers" },
                { val: "12+", label: "Years Experience" },
                { val: "4.9★", label: "Average Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-4xl md:text-5xl font-bold text-shamaal-gold mb-2">{s.val}</p>
                  <p className="text-gray-300 text-sm uppercase tracking-widest font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tours */}
        <section className="py-24 bg-shamaal-cream dark:bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm mb-3 block">Handpicked for You</span>
              <h2 className="text-4xl md:text-5xl font-bold text-shamaal-navy dark:text-white">Most Popular Tours</h2>
              <div className="h-1 w-20 bg-shamaal-gold mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_TOURS.map((tour) => (
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
                  src="https://images.unsplash.com/photo-1623862283088-e9f0d1a49f57?auto=format&fit=crop&q=80&w=900"
                  alt="Why choose Shamaal Tourism"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-shamaal-navy/70 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-5xl font-bold text-shamaal-gold">4.9</p>
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
                      <div className="bg-shamaal-cream dark:bg-white/10 group-hover:bg-shamaal-gold p-4 rounded-xl transition-colors shrink-0">
                        <item.icon className="w-6 h-6 text-shamaal-navy dark:text-white group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-2">{item.title}</h3>
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
                <div key={t.name} className="bg-white dark:bg-shamaal-navy/40 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/10 hover:border-shamaal-gold/30 transition-all duration-300 group hover:shadow-xl">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-shamaal-gold fill-current" />)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center space-x-4">
                    <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full border-2 border-shamaal-gold" unoptimized />
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
                href="https://wa.me/923001234567"
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

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/50 transition-all hover:scale-110"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </>
  );
}
