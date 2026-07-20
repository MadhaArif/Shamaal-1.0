import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/tours/TourCard";
import TourFilters from "@/components/tours/TourFilters";
import ToursHero from "@/components/tours/ToursHero";
import { Filter } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import prisma from "@/lib/prisma";

const FALLBACK_TOURS = [
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
    reviews: 124
  },
  {
    id: "2",
    title: "Hunza Valley Tour",
    slug: "hunza-valley",
    price: 30000,
    duration: 5,
    location: "Hunza",
    difficulty: "Moderate",
    image: "/images/destinations/attabad-lake.jpeg",
    rating: 4.8,
    reviews: 86
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
    reviews: 215
  },
  {
    id: "4",
    title: "Naran Valley Expedition",
    slug: "naran-valley",
    price: 25000,
    duration: 3,
    location: "Naran",
    difficulty: "Easy",
    image: "/images/destinations/babusar-top.jpeg",
    rating: 4.7,
    reviews: 98
  },
  {
    id: "5",
    title: "Swat & Malam Jabba",
    slug: "swat-valley",
    price: 22000,
    duration: 4,
    location: "Swat",
    difficulty: "Easy",
    image: "/images/destinations/malam-jabba.jpeg",
    rating: 4.9,
    reviews: 156
  }
];

export const metadata = {
  title: "Explore Tours",
  description: "Browse our premium selection of tours across Northern Pakistan.",
};

interface Tour {
  id: string;
  title: string;
  slug: string;
  price: number;
  duration: number;
  location: string;
  difficulty: string;
  image: string;
  rating: number;
  reviews: number;
}

async function ToursList({ searchParams }: { searchParams: Promise<{ query?: string; region?: string; difficulty?: string }> }) {
  const params = await searchParams;
  const query = params.query || '';
  const region = params.region || '';
  const difficulty = params.difficulty || '';
  
  let tours: Tour[] = [];
  try {
    // Build where conditions cleanly
    const whereConditions: object[] = [];

    if (query) {
      whereConditions.push({
        OR: [
          { title: { contains: query } },
          { location: { contains: query } },
          { description: { contains: query } },
        ],
      });
    }

    if (region) {
      whereConditions.push({ location: { contains: region } });
    }

    if (difficulty) {
      whereConditions.push({ difficulty: { equals: difficulty } });
    }

    const dbTours = await prisma.tour.findMany({
      where: whereConditions.length > 0 ? { AND: whereConditions } : {},
      orderBy: { createdAt: "desc" },
    });
    
    tours = dbTours.map(t => ({
      ...t,
      image: t.images.split(',')[0],
      rating: 4.8,
      reviews: 120,
    })) as Tour[];
  } catch (error: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Database not reachable, using tours fallback data.");
    } else {
      console.error("Database error, using fallbacks:", error);
    }
    // Apply client-side filtering on fallback data too
    let filtered = FALLBACK_TOURS;
    if (query) filtered = filtered.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.location.toLowerCase().includes(query.toLowerCase()));
    if (region) filtered = filtered.filter(t => t.location.toLowerCase().includes(region.toLowerCase()));
    if (difficulty) filtered = filtered.filter(t => t.difficulty.toLowerCase() === difficulty.toLowerCase());
    tours = filtered;
  }

  const activeFilters = [query, region, difficulty].filter(Boolean);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Suspense fallback={<div className="w-full lg:w-1/4 animate-pulse bg-gray-200 h-96 rounded-2xl" />}>
        <TourFilters />
      </Suspense>

      <div className="w-full lg:w-3/4">
        <div className="mb-6">
          <p className="text-gray-500 dark:text-white/40 text-sm font-bold tracking-wider uppercase">
            {tours.length} tour{tours.length !== 1 ? "s" : ""} found{activeFilters.length > 0 ? ` — filtered by: ${activeFilters.join(", ")}` : ""}
          </p>
        </div>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] backdrop-blur-sm p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-shamaal-gold/10 border border-shamaal-gold/20 flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-shamaal-gold" />
            </div>
            <h3 className="text-2xl font-black text-shamaal-navy dark:text-white mb-2">No tours found</h3>
            <p className="text-gray-500 dark:text-white/45 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any tours matching your search criteria. Try adjusting filters or search term.
            </p>
            <Link href="/tours" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-shamaal-gold text-shamaal-navy font-black text-xs tracking-[0.2em] uppercase hover:bg-yellow-400 transition-all duration-400">
              View All Tours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ToursCatalog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.query === 'string' ? params.query : '';
  const region = typeof params.region === 'string' ? params.region : '';

  return (
    <>
      <Navbar />
      
      <main className="flex-grow bg-shamaal-cream dark:bg-[#060d1a]">
        {/* Modern Hero Section for Tours */}
        <ToursHero 
          title={query || region 
            ? `Results for ${[query, region].filter(Boolean).map(s => `"${s}"`).join(" in ")}` 
            : <>Explore Our <span className="text-gradient-gold">Tours</span></>
          } 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-shamaal-gold"></div></div>}>
            <ToursList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
