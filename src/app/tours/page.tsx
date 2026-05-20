import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/tours/TourCard";
import { Filter, SlidersHorizontal } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mock Data for fallback if database query fails or is empty
const FALLBACK_TOURS = [
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
    reviews: 124
  }
];

export const metadata = {
  title: "Explore Tours",
  description: "Browse our premium selection of tours across Northern Pakistan.",
};

export default async function ToursCatalog() {
  let tours = [];
  try {
    const dbTours = await prisma.tour.findMany({
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
    } else {
      tours = FALLBACK_TOURS;
    }
  } catch (error) {
    console.error("Failed to fetch tours from database, falling back to mock:", error);
    tours = FALLBACK_TOURS;
  }

  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 bg-shamaal-cream dark:bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-shamaal-navy dark:text-white mb-4 tracking-tight">
              Explore Our <span className="text-shamaal-gold">Tours</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
              From challenging treks to luxury retreats, discover the perfect journey tailored to your adventurous spirit.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white dark:bg-shamaal-navy/30 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 sticky top-28">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
                  <h2 className="text-lg font-bold text-shamaal-navy dark:text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-shamaal-gold" />
                    Filters
                  </h2>
                  <button className="text-sm text-shamaal-sky hover:text-shamaal-gold transition-colors">
                    Reset
                  </button>
                </div>
                
                {/* Region Filter */}
                <div className="mb-6">
                  <h3 className="font-bold text-shamaal-navy dark:text-white mb-3 text-sm uppercase tracking-wider">Region</h3>
                  <div className="space-y-2">
                    {["Hunza", "Skardu", "Swat", "Chitral", "Naran"].map((region) => (
                      <label key={region} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-shamaal-gold rounded border-gray-300 focus:ring-shamaal-gold bg-transparent" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-shamaal-navy dark:group-hover:text-white transition-colors">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Duration Filter */}
                <div className="mb-6">
                  <h3 className="font-bold text-shamaal-navy dark:text-white mb-3 text-sm uppercase tracking-wider">Duration</h3>
                  <div className="space-y-2">
                    {["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"].map((duration) => (
                      <label key={duration} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-shamaal-gold rounded border-gray-300 focus:ring-shamaal-gold bg-transparent" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-shamaal-navy dark:group-hover:text-white transition-colors">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="font-bold text-shamaal-navy dark:text-white mb-3 text-sm uppercase tracking-wider">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Easy", "Moderate", "Hard", "Extreme"].map((diff) => (
                      <button key={diff} className="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-shamaal-gold hover:text-shamaal-gold transition-colors">
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
                
              </div>
            </aside>
            
            {/* Tour Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Showing <span className="font-bold text-shamaal-navy dark:text-white">{tours.length}</span> tours
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Sort by:</span>
                  <select className="bg-transparent border-none font-bold text-shamaal-navy dark:text-white outline-none focus:ring-0 cursor-pointer">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration: Shortest</option>
                    <option>Duration: Longest</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {tours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 hover:bg-shamaal-gold hover:text-white hover:border-shamaal-gold transition-colors disabled:opacity-50">
                    &lt;
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-shamaal-gold text-white font-bold shadow-md">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-shamaal-gold hover:text-white hover:border-shamaal-gold transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-shamaal-gold hover:text-white hover:border-shamaal-gold transition-colors">
                    3
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 hover:bg-shamaal-gold hover:text-white hover:border-shamaal-gold transition-colors">
                    &gt;
                  </button>
                </nav>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
