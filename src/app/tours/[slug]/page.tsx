import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { MapPin, Calendar, Clock, Star, Users, Check, X, ChevronDown, Download } from "lucide-react";
import prisma from "@/lib/prisma";
import BookingWidget from "@/components/tours/BookingWidget";

// Dynamic Realistic Data Generator based on Slug
const getRealisticTourData = (slug: string) => {
  const allTours = [
    {
      id: "hunza-valley",
      title: "Hunza Valley Tour",
      slug: "hunza-valley",
      price: 30000,
      duration: 5,
      location: "Hunza",
      difficulty: "Moderate",
      groupSize: "10 - 12",
      season: "April - October",
      rating: 4.8,
      reviews: 86,
      images: ["/images/destinations/attabad-lake.jpeg", "/images/destinations/baldi-viewpoint.jpeg", "/images/destinations/passu-cones.jpeg"],
      description: "Experience the magic of Hunza Valley. Visit the turquoise Attabad Lake, the historic Baltit Fort, and witness the majestic Passu Cones. This tour offers a perfect blend of culture, history, and breathtaking landscapes.",
      itinerary: [
        { day: 1, title: "Arrival in Gilgit & Drive to Hunza", desc: "Arrive at Gilgit airport and drive to Karimabad. Evening walk in the local bazaar." },
        { day: 2, title: "Altit & Baltit Forts", desc: "Explore the ancient Altit and Baltit forts, learning about the rich history of the Hunza Kingdom." },
        { day: 3, title: "Attabad Lake & Passu", desc: "Visit the stunning Attabad Lake for boating and then drive to the iconic Passu Cones." },
        { day: 4, title: "Eagle's Nest Sunrise", desc: "Early morning drive to Duikar for a panoramic sunrise view of the entire valley." },
        { day: 5, title: "Departure", desc: "Drive back to Gilgit for your flight back home with unforgettable memories." }
      ],
      included: ["Luxury Transport", "Top-rated Hotels", "Breakfast & Dinner", "Professional Guide", "Jeep Safari"],
      excluded: ["Lunch", "Personal Shopping", "Travel Insurance"]
    },
    {
      id: "skardu-tour",
      title: "Skardu & Baltistan Expedition",
      slug: "skardu-tour",
      price: 32000,
      duration: 6,
      location: "Skardu",
      difficulty: "Moderate",
      groupSize: "8 - 10",
      season: "June - September",
      rating: 5.0,
      reviews: 215,
      images: ["/images/destinations/shangrilla-lake.jpeg", "/images/destinations/cold-desert.jpeg", "/images/destinations/kharphocho-fort.jpeg"],
      description: "Journey to the Throne of Mountains. Skardu offers some of the world's most unique landscapes, from the world's highest cold deserts to the serene Shangrilla Resort.",
      itinerary: [
        { day: 1, title: "Arrival in Skardu", desc: "Landing at Skardu airport is an adventure in itself. Check-in at the resort and relax by the lake." },
        { day: 2, title: "Shangrilla & Upper Kachura", desc: "Full day exploring the famous Shangrilla Resort and the crystal clear Upper Kachura Lake." },
        { day: 3, title: "Sarfaranga Cold Desert", desc: "Experience the unique dunes of the world's highest cold desert and enjoy local Balti cuisine." },
        { day: 4, title: "Kharphocho Fort & Manthal", desc: "Hike up to the ancient Kharphocho Fort for a panoramic view of the Indus River." },
        { day: 5, title: "Deosai Plains Safari", desc: "A full-day jeep safari to the breathtaking Deosai Plains, the Land of Giants." },
        { day: 6, title: "Final Farewell", desc: "Morning shopping for local gems and dry fruits before your flight." }
      ],
      included: ["Airport Transfers", "Premium Accommodation", "All Meals", "4x4 Jeep for Deosai", "Entry Permits"],
      excluded: ["Extra Beverages", "Tips", "Laundry Services"]
    },
    {
      id: "kashmir-neelum-valley",
      title: "Kashmir • Neelum Valley Tour",
      slug: "kashmir-neelum-valley",
      price: 18000,
      duration: 3,
      location: "Kashmir",
      difficulty: "Easy",
      groupSize: "12 - 15",
      season: "Spring/Summer",
      rating: 4.9,
      reviews: 124,
      images: ["/images/destinations/saiful-malook.jpeg", "/images/destinations/deosai-plains.jpeg", "/images/destinations/babusar-top.jpeg"],
      description: "Explore the breathtaking Neelum Valley, known as the Blue Gem of Kashmir. Lush green meadows, gushing rivers, and welcoming local culture await you.",
      itinerary: [
        { day: 1, title: "Islamabad to Keran", desc: "Scenic drive through Muzaffarabad along the Neelum River to reach the riverside town of Keran." },
        { day: 2, title: "Sharda & Kel", desc: "Visit the historic Sharda Peeth university ruins and then head to Kel for a cable car ride to Arang Kel." },
        { day: 3, title: "Return Journey", desc: "Enjoy the morning mist by the river before driving back to Islamabad." }
      ],
      included: ["Hotel Accommodation", "Luxury Transportation", "Breakfast & Dinner", "Professional Guide"],
      excluded: ["Personal Expenses", "Chairlift Tickets", "Lunch"]
    },
    {
      id: "naran-valley",
      title: "Naran Valley Expedition",
      slug: "naran-valley",
      price: 25000,
      duration: 3,
      location: "Naran",
      difficulty: "Easy",
      groupSize: "10 - 15",
      season: "June - August",
      rating: 4.7,
      reviews: 98,
      images: ["/images/destinations/saiful-malook.jpeg", "/images/destinations/babusar-top.jpeg", "/images/destinations/rainbow-lake.jpeg"],
      description: "A classic getaway to the heart of the Himalayas. Naran is the gateway to some of the most beautiful lakes and passes in Pakistan.",
      itinerary: [
        { day: 1, title: "Islamabad to Naran", desc: "Travel through Abbottabad and Balakot to reach the bustling town of Naran." },
        { day: 2, title: "Saif-ul-Malook Lake", desc: "A jeep ride to the legendary lake of fairies. Spend the day hiking or boating." },
        { day: 3, title: "Babusar Top & Lulusar", desc: "Drive to the highest point of the valley, Babusar Top, and visit the serene Lulusar Lake." }
      ],
      included: ["Transport", "Standard Hotels", "Breakfast", "Guide"],
      excluded: ["Jeep Rents", "Meals during travel", "Personal Gear"]
    },
    {
      id: "swat-valley",
      title: "Swat & Malam Jabba",
      slug: "swat-valley",
      price: 22000,
      duration: 4,
      location: "Swat",
      difficulty: "Easy",
      groupSize: "10 - 12",
      season: "Year Round",
      rating: 4.9,
      reviews: 156,
      images: ["/images/destinations/malam-jabba.jpeg", "/images/destinations/kalash-valley.jpeg", "/images/destinations/rainbow-lake.jpeg"],
      description: "Discover the Switzerland of the East. From the ski slopes of Malam Jabba to the crystal waters of Mahodand Lake, Swat is a year-round paradise.",
      itinerary: [
        { day: 1, title: "Drive to Mingora", desc: "Travel via the Swat Expressway to reach the heart of the valley." },
        { day: 2, title: "Malam Jabba Ski Resort", desc: "Enjoy the chairlift and various activities at Pakistan's premier ski resort." },
        { day: 3, title: "Kalam Valley", desc: "Drive to the scenic Kalam valley and visit the Ushu forest." },
        { day: 4, title: "Return to Islamabad", desc: "Shopping at Mingora Bazaar before heading back." }
      ],
      included: ["Luxury Coaster", "Hotel Stay", "All Meals", "Local Guide"],
      excluded: ["Activity Tickets", "Personal Expenses"]
    }
  ];

  return allTours.find(t => t.slug === slug) || allTours[0];
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const dbTour = await prisma.tour.findUnique({
      where: { slug }
    });
    return {
      title: dbTour ? dbTour.title : getRealisticTourData(slug).title,
    };
  } catch (error) {
    return {
      title: getRealisticTourData(slug).title,
    };
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let tour = getRealisticTourData(slug);

  try {
    const dbTour = await prisma.tour.findUnique({
      where: { slug }
    });

    if (dbTour) {
      // Split images and ensure we use local paths correctly
      const dbImages = dbTour.images.split(",").map(img => img.trim()).filter(Boolean);
      const fallback = getRealisticTourData(slug);
      
      // Ensure we have at least 3 images, using fallbacks if needed
      const finalImages = [...dbImages];
      while (finalImages.length < 3) {
        finalImages.push(fallback.images[finalImages.length]);
      }
      
      tour = {
        ...fallback,
        id: dbTour.id,
        title: dbTour.title,
        slug: dbTour.slug,
        price: dbTour.price,
        duration: dbTour.duration,
        location: dbTour.location,
        difficulty: dbTour.difficulty,
        images: finalImages,
        description: dbTour.description,
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Database not reachable for slug "${slug}", using mock tour data.`);
    } else {
      console.error("Failed to query tour detail by slug, using mock:", error);
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="flex-grow bg-shamaal-cream dark:bg-[var(--background)]">
        
        {/* Image Gallery Hero - Adjusted to start right under Navbar */}
        <div className="relative h-[50vh] min-h-[400px] w-full group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-shamaal-navy/80 z-10" />
          <Image
            src={tour.images[0]}
            alt={tour.title}
            fill
            className="object-cover object-[center_40%] transition-transform duration-1000"
            priority
            quality={100}
            sizes="100vw"
          />
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-shamaal-navy to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-shamaal-gold mb-3 text-sm font-bold tracking-widest uppercase shadow-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{tour.location}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap items-center space-x-6 text-white/90 font-medium">
                    <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 text-shamaal-gold mr-1.5 fill-current" />
                      <span>{tour.rating.toFixed(1)} <span className="text-white/60 font-normal">({tour.reviews} reviews)</span></span>
                    </div>
                  </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 p-6 bg-white dark:bg-shamaal-navy/30 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Location</span>
            <span className="font-bold text-shamaal-navy dark:text-white">{tour.location}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Best Season</span>
            <span className="font-bold text-shamaal-navy dark:text-white">{tour.season}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1 flex items-center"><Users className="w-3 h-3 mr-1" /> Group Size</span>
            <span className="font-bold text-shamaal-navy dark:text-white">{tour.groupSize}</span>
          </div>
        </div>
              
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Overview</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                  {tour.description}
                </p>
                
                {/* Additional Gallery Grid */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {tour.images.slice(1, 3).map((img, i) => (
                    <div key={i} className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                      <Image 
                        src={img} 
                        alt={`${tour.title} gallery ${i}`} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        quality={90}
                      />
                    </div>
                  ))}
                </div>
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
                    <Check className="w-5 h-5 text-green-500 mr-2" /> What&apos;s Included
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
                    <X className="w-5 h-5 text-red-500 mr-2" /> What&apos;s Excluded
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
              <BookingWidget tourId={tour.id} price={tour.price} />
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
