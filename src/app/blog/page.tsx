import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Blog & Guides",
  description: "Pakistan travel guides, packing lists, destination tips, and trip reports from Shamaal Tourism's expert team.",
};

const POSTS = [
  {
    slug: "ultimate-guide-hunza-valley",
    title: "The Ultimate Guide to Hunza Valley in 2026",
    excerpt: "Everything you need to know before visiting Hunza — best time, what to pack, where to stay, and the hidden gems most tourists miss.",
    category: "Destination Guide",
    readTime: "8 min read",
    date: "15 May 2026",
    image: "/images/destinations/baldi-viewpoint.jpeg",
    featured: true,
  },
  {
    slug: "k2-base-camp-packing-list",
    title: "K2 Base Camp Packing List: What You Really Need",
    excerpt: "After dozens of guided treks, our expert team has compiled the definitive packing list for the K2 Base Camp expedition.",
    category: "Packing Guide",
    readTime: "6 min read",
    date: "10 May 2026",
    image: "/images/destinations/k2-concordia.jpeg",
    featured: false,
  },
  {
    slug: "fairy-meadows-sunrise",
    title: "How to Photograph Nanga Parbat at Sunrise From Fairy Meadows",
    excerpt: "A professional photographer's guide to capturing the world's ninth-highest mountain in its most dramatic light.",
    category: "Photography",
    readTime: "5 min read",
    date: "5 May 2026",
    image: "/images/destinations/nanga-parbat.jpeg",
    featured: false,
  },
  {
    slug: "pakistan-north-budget-travel",
    title: "Northern Pakistan on a Budget: The Complete 2026 Guide",
    excerpt: "Yes, you can explore the world's greatest mountain landscapes on a budget. Here's how to do it without sacrificing the experience.",
    category: "Travel Tips",
    readTime: "10 min read",
    date: "28 Apr 2026",
    image: "/images/destinations/deosai-plains.jpeg",
    featured: false,
  },
  {
    slug: "chitral-kalash-festivals",
    title: "Kalash Festivals: A Guide to the Unique Culture of Chitral",
    excerpt: "The Kalash people of Chitral celebrate three major festivals a year. Here's everything you need to know to attend them respectfully.",
    category: "Culture",
    readTime: "7 min read",
    date: "20 Apr 2026",
    image: "/images/destinations/khaplu-fort.jpeg",
    featured: false,
  },
];

const CATEGORIES = ["All", "Destination Guide", "Packing Guide", "Travel Tips", "Photography", "Culture"];

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 md:pt-40 pb-20 bg-shamaal-cream dark:bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-16">
            <span className="text-shamaal-gold font-bold tracking-widest uppercase text-sm block mb-3">Stories & Guides</span>
            <h1 className="text-5xl font-bold text-shamaal-navy dark:text-white mb-4">Travel <span className="text-shamaal-gold">Blog</span></h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">Expert advice, destination guides, and inspiring stories from the Great North.</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${cat === "All" ? "bg-shamaal-gold text-shamaal-navy shadow-md" : "border border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-shamaal-gold hover:text-shamaal-gold"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-16 rounded-2xl overflow-hidden shadow-xl relative h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-r from-shamaal-navy/90 via-shamaal-navy/50 to-transparent z-10" />
              <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority sizes="100vw" />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="p-12 max-w-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-shamaal-gold text-shamaal-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</span>
                    <span className="text-gray-300 text-sm">{featured.category}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4 leading-snug group-hover:text-shamaal-gold transition-colors">{featured.title}</h2>
                  <p className="text-gray-300 text-lg mb-6 line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white dark:bg-shamaal-navy/30 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-white/10 hover:border-shamaal-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-shamaal-gold/90 backdrop-blur-sm text-shamaal-navy text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Tag className="w-3 h-3 mr-1" /> {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-shamaal-navy dark:text-white mb-3 group-hover:text-shamaal-sky transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center text-shamaal-sky font-semibold text-sm group-hover:text-shamaal-gold transition-colors">
                      Read more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
