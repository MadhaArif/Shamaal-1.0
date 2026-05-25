import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/tours/TourCard";
import TourFilters from "@/components/tours/TourFilters";
import ToursHero from "@/components/tours/ToursHero";
import { Filter } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

const FALLBACK_TOURS = [
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
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 86
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

async function ToursList({ searchParams }: { searchParams: Promise<{ query?: string; region?: string }> }) {
  const params = await searchParams;
  const query = params.query || '';
  const region = params.region || '';
  
  let tours: Tour[] = [];
  try {
    const whereClause: {
      OR?: Array<{ title?: { contains: string }; location?: { contains: string }; description?: { contains: string } }>;
      location?: { contains: string };
    } = {};
    
    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { location: { contains: query } },
        { description: { contains: query } },
      ];
    }
    
    if (region) {
      whereClause.location = { contains: region };
    }

    const dbTours = await prisma.tour.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    });

    if (dbTours.length > 0) {
      tours = dbTours.map((t) => ({
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
    } else if (!query && !region) {
      tours = FALLBACK_TOURS;
    }
  } catch (error) {
    console.error("Failed to fetch tours from database:", error);
    tours = FALLBACK_TOURS;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Suspense fallback={<div className="w-full lg:w-1/4 animate-pulse bg-gray-200 h-96 rounded-2xl" />}>
        <TourFilters />
      </Suspense>

      <div className="w-full lg:w-3/4">
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {tours.length} tours found {query || region ? "matching your criteria" : ""}
          </p>
        </div>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-shamaal-navy/30 rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-white/10">
            <div className="bg-shamaal-cream dark:bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-shamaal-gold" />
            </div>
            <h3 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-2">No tours found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">We couldn&apos;t find any tours matching your search criteria. Try adjusting your filters or search term.</p>
            <Link href="/tours" className="inline-flex items-center px-8 py-3 bg-shamaal-gold text-shamaal-navy font-bold rounded-xl hover:bg-yellow-500 transition-all">
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
      
      <main className="flex-grow bg-shamaal-cream dark:bg-[var(--background)]">
        {/* Modern Hero Section for Tours */}
        <ToursHero 
          title={query || region 
            ? `Results for ${[query, region].filter(Boolean).map(s => `"${s}"`).join(" in ")}` 
            : <>Explore Our <span className="text-shamaal-gold">Tours</span></>
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
