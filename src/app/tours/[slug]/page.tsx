import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { MapPin, Calendar, Clock, Star, Users, Check, X, ChevronDown, Share2, Heart, Download } from "lucide-react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// In a real app, this would be fetched from the database/CMS
const MOCK_TOUR_DETAIL = {
  id: "1",
  title: "Hunza Valley Autumn Blossom Tour",
  slug: "hunza-valley-autumn",
  price: 150000,
  duration: 7,
  location: "Hunza, Gilgit",
  difficulty: "Easy",
  groupSize: "12 - 15",
  season: "Autumn (Oct - Nov)",
  rating: 4.9,
  reviews: 124,
  images: [
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
  ],
  description: "Experience the magic of Hunza Valley during the autumn season. Watch the entire valley transform into a spectacular canvas of gold, orange, and red hues. This easy-paced tour is perfect for families and photography enthusiasts, taking you through ancient forts, crystal clear lakes, and offering majestic views of Rakaposhi and Ladyfinger Peak.",
  itinerary: [
    { day: 1, title: "Arrival in Islamabad & Drive to Naran", desc: "Welcome to Islamabad! We begin our journey early morning via the scenic Hazara Motorway and Karakoram Highway to Naran." },
    { day: 2, title: "Babusar Pass & Chilas", desc: "Crossing the majestic Babusar Pass (4,173m) offering panoramic views. Descend to Chilas for overnight stay." },
    { day: 3, title: "Arrival in Hunza (Karimabad)", desc: "Drive alongside the mighty Indus River with view point stops at Nanga Parbat and Rakaposhi. Arrive in Karimabad, Hunza." },
    { day: 4, title: "Exploring Altit & Baltit Forts", desc: "A day dedicated to history and culture. Visit the 800-year-old Baltit Fort and the 1000-year-old Altit Fort. Evening at Eagle's Nest for sunset." },
    { day: 5, title: "Attabad Lake & Passu Cones", desc: "Drive to the mesmerizing turquoise waters of Attabad Lake. Continue to Passu to witness the magnificent Cathedral Peaks." },
    { day: 6, title: "Drive back to Besham", desc: "Begin our journey back via the Karakoram Highway, staying overnight in Besham." },
    { day: 7, title: "Return to Islamabad", desc: "Final leg of the journey back to the capital. Farewell dinner and drop-off." }
  ],
  included: [
    "Luxury transportation (Prado/Coaster)",
    "Accommodation in premium hotels",
    "Daily breakfast and dinner",
    "Professional tour guide",
    "First aid kit and basic medical supplies",
    "Entry tickets to forts and national parks"
  ],
  excluded: [
    "Domestic/International flights",
    "Lunch and snacks",
    "Personal expenses (laundry, phone calls)",
    "Tips for guide and driver",
    "Travel insurance"
  ]
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const dbTour = await prisma.tour.findUnique({
      where: { slug }
    });
    return {
      title: dbTour ? dbTour.title : MOCK_TOUR_DETAIL.title,
    };
  } catch (error) {
    return {
      title: MOCK_TOUR_DETAIL.title,
    };
  }
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let tour = MOCK_TOUR_DETAIL;

  try {
    const dbTour = await prisma.tour.findUnique({
      where: { slug }
    });

    if (dbTour) {
      tour = {
        ...MOCK_TOUR_DETAIL,
        id: dbTour.id,
        title: dbTour.title,
        slug: dbTour.slug,
        price: dbTour.price,
        duration: dbTour.duration,
        location: dbTour.location,
        difficulty: dbTour.difficulty,
        images: dbTour.images.split(","),
        description: dbTour.description,
      };
    }
  } catch (error) {
    console.error("Failed to query tour detail by slug, using mock:", error);
  }

  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-20 bg-shamaal-cream dark:bg-[var(--background)]">
        
        {/* Image Gallery Hero */}
        <div className="relative h-[60vh] min-h-[500px] w-full group overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 z-10 opacity-30" />
          <Image
            src={tour.images[0]}
            alt={tour.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-shamaal-navy to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-shamaal-gold mb-3 text-sm font-bold tracking-widest uppercase shadow-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{tour.location}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap items-center space-x-6 text-white/90 font-medium">
                    <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 text-shamaal-gold mr-1.5 fill-current" />
                      <span>{tour.rating.toFixed(1)} <span className="text-white/60 font-normal">({tour.reviews} reviews)</span></span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-shamaal-gold mr-1.5" />
                      <span>{tour.duration} Days</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-shamaal-gold text-shamaal-navy px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider">{tour.difficulty}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex items-center space-x-4">
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-colors border border-white/20">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-colors border border-white/20">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Details */}
            <div className="w-full lg:w-2/3">
              
              {/* Quick Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-white dark:bg-shamaal-navy/30 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Clock className="w-3 h-3 mr-1" /> Duration</span>
                  <span className="font-bold text-shamaal-navy dark:text-white">{tour.duration} Days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Users className="w-3 h-3 mr-1" /> Group Size</span>
                  <span className="font-bold text-shamaal-navy dark:text-white">{tour.groupSize}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Best Season</span>
                  <span className="font-bold text-shamaal-navy dark:text-white">{tour.season}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Start/End</span>
                  <span className="font-bold text-shamaal-navy dark:text-white">Islamabad</span>
                </div>
              </div>
              
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-4">Overview</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {tour.description}
                </p>
              </div>
              
              {/* Itinerary */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white">Itinerary</h2>
                  <button className="flex items-center text-sm font-medium text-shamaal-sky hover:text-shamaal-gold transition-colors">
                    <Download className="w-4 h-4 mr-1" /> Download PDF
                  </button>
                </div>
                
                <div className="space-y-4">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-shamaal-navy/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10 group cursor-pointer hover:border-shamaal-gold/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-shamaal-navy text-shamaal-gold font-bold h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                            D{item.day}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-shamaal-navy dark:text-white mb-2 group-hover:text-shamaal-sky transition-colors">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronDown className="text-gray-400 h-5 w-5 shrink-0 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Inclusions / Exclusions */}
              <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-shamaal-navy/30 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-white/10">
                  <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-6 flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" /> What's Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.included.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-1" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-shamaal-navy/30 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-white/10">
                  <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-6 flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" /> What's Excluded
                  </h3>
                  <ul className="space-y-3">
                    {tour.excluded.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <X className="w-4 h-4 text-red-500 mr-2 shrink-0 mt-1" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
            </div>
            
            {/* Right Column: Booking Widget Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-28 bg-white dark:bg-shamaal-navy/50 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/10">
                <div className="mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider block mb-1">Price per person</span>
                  <div className="flex items-end text-shamaal-navy dark:text-white">
                    <span className="text-xl font-medium mr-1 mb-1">PKR</span>
                    <span className="text-4xl font-bold">{tour.price.toLocaleString()}</span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Select Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" placeholder="Check availability" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy focus:outline-none focus:ring-2 focus:ring-shamaal-gold text-shamaal-navy dark:text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy focus:outline-none focus:ring-2 focus:ring-shamaal-gold text-shamaal-navy dark:text-white appearance-none cursor-pointer">
                        <option>1 Adult</option>
                        <option>2 Adults</option>
                        <option>3 Adults</option>
                        <option>4 Adults</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Link href="/book" className="block text-center w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-md shadow-shamaal-gold/30">
                      Book Now
                    </Link>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">You won't be charged yet</p>
                  <Link href="/contact" className="text-sm text-shamaal-sky font-semibold hover:text-shamaal-gold transition-colors">
                    Have a question? Contact us
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
