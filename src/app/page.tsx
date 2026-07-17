import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsBanner from "@/components/home/StatsBanner";
import VibeFinder from "@/components/home/VibeFinder";
import TourCard from "@/components/tours/TourCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star, Shield, Globe, Award, Users, MessageCircle, Quote, CheckCircle, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";

const FEATURED_TOURS = [
  {
    id: "1",
    title: "Kashmir • Neelum Valley Tour",
    slug: "kashmir-neelum-valley",
    price: 18000,
    duration: 3,
    location: "Kashmir",
    difficulty: "Easy",
    image: "/images/destinations/saiful-malook.jpeg",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "2",
    title: "Naran Valley Tour",
    slug: "naran-valley",
    price: 18000,
    duration: 3,
    location: "Naran",
    difficulty: "Easy",
    image: "/images/destinations/babusar-top.jpeg",
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
    image: "/images/destinations/shangrilla-lake.jpeg",
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
  { icon: Award, title: "Tailored Travel Experts", desc: "We understand every traveller is unique. That's why we design packages that match your style, budget, and purpose, whether it's a holiday to Pakistan or an overseas trip." },
  { icon: Shield, title: "Trusted Local Experience", desc: "Based in Pakistan, we're a top-rated travel agency in Pakistan, with years of hands-on experience and knowledge of hidden gems." },
  { icon: Users, title: "Competitive Pricing", desc: "No hidden charges. You get exactly what you pay for, with competitive rates on tours, hotels, and flights." },
  { icon: Globe, title: "Comprehensive Services", desc: "Flights, tours, visas, insurance, hotel bookings—we do it all in one place. We're the best tour company in Pakistan, trusted by locals and expats alike." },
  { icon: MessageCircle, title: "24/7 Customer Support", desc: "Our support team is always ready to assist, making sure your journey—from planning to return—is smooth and memorable." },
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
        image: t.images.split(",")[0] || "/images/destinations/attabad-lake.jpeg",
        rating: 4.9,
        reviews: 124
      }));
    } else {
      featuredTours = FEATURED_TOURS;
    }
  } catch (error) {
    // Log a simple warning instead of the full error during development if DB is not reachable
    if (process.env.NODE_ENV === 'development') {
      console.warn("Database not reachable, using featured tours fallback data.");
    } else {
      console.error("Failed to fetch featured tours from database:", error);
    }
    featuredTours = FEATURED_TOURS;
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with 3D Mountains */}
        <HeroSection />

        {/* Featured Destinations */}
        <section className="relative py-28 bg-[#07101f] overflow-hidden">
          {/* Subtle grid bg */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "radial-gradient(rgba(255,182,4,0.8) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-5">
                <Sparkles className="w-3.5 h-3.5 text-shamaal-gold" />
                <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Explore Pakistan</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Popular <span className="text-gradient-gold">Destinations</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "Attabad Lake", sub: "Hunza Valley", slug: "hunza", img: "/images/destinations/attabad-lake.jpeg", tours: 5 },
                { name: "Shangrilla Lake", sub: "Skardu, Baltistan", slug: "skardu", img: "/images/destinations/shangrilla-lake.jpeg", tours: 4 },
                { name: "Nanga Parbat", sub: "Fairy Meadows Base", slug: "fairy-meadows", img: "/images/destinations/nanga-parbat.jpeg", tours: 3 },
              ].map((dest, i) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className={`group relative rounded-2xl overflow-hidden border border-white/[0.05] hover:border-shamaal-gold/30 transition-all duration-500 ${i === 1 ? "lg:mt-10" : ""} ${i === 2 ? "lg:mt-20" : ""}`}
                  style={{ height: "400px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/95 via-[#07101f]/20 to-transparent z-10" />
                  <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.2s]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                  {/* Tour count badge */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 text-[10px] font-bold">
                    {dest.tours} Tours
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
                    <p className="text-shamaal-gold text-[10px] font-black tracking-[0.2em] uppercase mb-1 opacity-70 group-hover:opacity-100 transition-opacity duration-400">{dest.sub}</p>
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-shamaal-gold/90 transition-colors duration-400">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom gold rule */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-shamaal-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                </Link>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/destinations" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white/60 font-black text-xs tracking-[0.2em] uppercase hover:border-shamaal-gold/50 hover:text-shamaal-gold transition-all duration-400">
                View All Destinations
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Vibe Finder */}
        <VibeFinder />

        {/* Stats Banner */}
        <StatsBanner />

        {/* Popular Tours */}
        <section className="relative py-28 bg-[#060d1a] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-shamaal-gold/[0.03] rounded-full blur-[140px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-5">
                <Star className="w-3.5 h-3.5 text-shamaal-gold fill-shamaal-gold" />
                <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Handpicked for You</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Most Popular <span className="text-gradient-gold">Tours</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/tours" className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-shamaal-gold text-shamaal-navy font-black text-xs tracking-[0.2em] uppercase hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(255,182,4,0.4)] transition-all duration-400">
                Browse All Tours
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative py-28 bg-[#07101f] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-shamaal-gold/[0.04] rounded-full blur-[130px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-5">
                <Award className="w-3.5 h-3.5 text-shamaal-gold" />
                <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Why We Stand Out</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white max-w-2xl mx-auto leading-tight">
                Why Choose <span className="text-gradient-gold">Shamaal Tourism?</span>
              </h2>
              <p className="text-white/35 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Choosing Shamaal Tourism means choosing experience, convenience, and complete peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_US.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-shamaal-gold/20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-shamaal-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Number + Icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-shamaal-gold/10 border border-shamaal-gold/20 flex items-center justify-center group-hover:bg-shamaal-gold/15 transition-colors duration-400">
                      <item.icon className="w-5 h-5 text-shamaal-gold" />
                    </div>
                    <span className="text-shamaal-gold/30 font-black text-4xl leading-none">0{index + 1}</span>
                  </div>

                  <h3 className="text-white font-black text-lg mb-3 group-hover:text-shamaal-gold/90 transition-colors duration-400">{item.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>

                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-shamaal-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}

              {/* Decorative trust card */}
              <div className="relative p-7 rounded-2xl border border-shamaal-gold/20 bg-gradient-to-br from-shamaal-gold/[0.08] to-transparent overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-shamaal-gold/10 rounded-full blur-2xl -mr-4 -mt-4 pointer-events-none" />
                <div className="text-shamaal-gold mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-white font-black text-xl mb-3">DTS Verified</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">
                  Pakistan Tourism Authority verified operator. Licence #10475.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-shamaal-gold/15 border border-shamaal-gold/25">
                  <span className="w-2 h-2 rounded-full bg-shamaal-gold animate-pulse" />
                  <span className="text-shamaal-gold font-black text-[10px] tracking-widest uppercase">Licensed & Insured</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-28 bg-[#060d1a] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-shamaal-gold/[0.03] rounded-full blur-[150px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-5">
                <Quote className="w-3.5 h-3.5 text-shamaal-gold" />
                <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Real Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">
                What Our <span className="text-gradient-gold">Travellers Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="group relative p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-shamaal-gold/20 hover:bg-white/[0.04] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Giant quote icon */}
                  <Quote className="absolute right-5 top-5 w-16 h-16 text-white/[0.03] group-hover:text-shamaal-gold/[0.07] group-hover:scale-110 transition-all duration-700 pointer-events-none" />

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-shamaal-gold fill-shamaal-gold" />
                    ))}
                  </div>

                  {/* Tour tag */}
                  <p className="text-shamaal-gold/60 text-[10px] font-black tracking-[0.2em] uppercase mb-4">{t.tour}</p>

                  <p className="text-white/50 text-sm leading-relaxed mb-7 italic">&ldquo;{t.text}&rdquo;</p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-5 border-t border-white/[0.05]">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full border-2 border-shamaal-gold/30 group-hover:border-shamaal-gold/60 transition-all duration-400"
                    />
                    <div>
                      <p className="text-white font-black text-sm">{t.name}</p>
                      <p className="text-white/30 text-xs">{t.location}</p>
                    </div>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-shamaal-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-28 bg-[#07101f] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=2000"
              alt="Northern Pakistan"
              fill
              className="object-cover opacity-[0.06]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07101f] via-transparent to-[#07101f]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-shamaal-gold/[0.06] rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shamaal-gold/25 bg-shamaal-gold/5 mb-7">
              <Sparkles className="w-3.5 h-3.5 text-shamaal-gold" />
              <span className="text-shamaal-gold text-[10px] font-black tracking-[0.3em] uppercase">Start Your Journey</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Ready to Explore{" "}
              <span className="text-gradient-gold">The Great North?</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Let us craft your perfect Pakistani adventure. Speak to our travel experts today — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/tours"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-shamaal-gold text-shamaal-navy font-black tracking-[0.15em] uppercase hover:bg-yellow-400 hover:shadow-[0_0_50px_rgba(255,182,4,0.5)] transition-all duration-400 text-sm"
              >
                Browse Tours
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
              <a
                href="https://wa.me/923180425044"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-black tracking-[0.15em] uppercase hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-400 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
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
