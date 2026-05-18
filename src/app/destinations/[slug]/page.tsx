import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/tours/TourCard";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sun, Thermometer, Clock, ArrowLeft, Camera, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const DESTINATIONS: Record<string, {
  slug: string; name: string; region: string; tagline: string;
  bestTime: string; temp: string; altitude: string; language: string;
  heroImage: string; galleryImages: string[];
  description: string; localTips: string[]; highlights: string[];
  tours: { id: string; title: string; slug: string; price: number; duration: number; location: string; difficulty: string; image: string; rating: number; reviews: number }[];
}> = {
  hunza: {
    slug: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    tagline: "Heaven on Earth",
    bestTime: "April–May (Blossom) & October–November (Autumn)",
    temp: "15–25°C",
    altitude: "2,438m",
    language: "Burushaski, Urdu",
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1623862283088-e9f0d1a49f57?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Hunza Valley is a mountainous valley in the Gilgit-Baltistan region of Pakistan, often called 'Heaven on Earth'. Enclosed by some of the world's highest peaks including Rakaposhi, Ultar Sar and Ladyfinger Peak, the valley is famous for its spectacular autumn colours, ancient forts, and the legendary longevity of its people — the Hunzakuts.",
    localTips: [
      "Visit Eagle's Nest at sunrise for the best panoramic view of the entire valley.",
      "Try the local Hunza water (non-alcoholic apricot wine) and dried apricots.",
      "The CNIC / Passport is required to enter some restricted areas beyond Sust.",
      "Book hotels in advance for October — it is peak autumn tourism season.",
      "Bring warm clothes even in summer — nights can drop below 10°C.",
    ],
    highlights: ["Attabad Lake", "Baltit Fort", "Altit Fort", "Eagle's Nest", "Rakaposhi View", "Cherry Blossom Season", "Passu Cones", "Khunjerab Pass"],
    tours: [
      { id: "1", title: "Hunza Valley Autumn Blossom Tour", slug: "hunza-valley-autumn", price: 150000, duration: 7, location: "Hunza, Gilgit", difficulty: "Easy", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800", rating: 4.9, reviews: 124 },
      { id: "5", title: "Hunza to Khunjerab Pass Adventure", slug: "hunza-khunjerab", price: 180000, duration: 10, location: "Hunza", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800", rating: 4.8, reviews: 67 },
    ],
  },
  skardu: {
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    tagline: "Gateway to K2",
    bestTime: "June–September",
    temp: "10–22°C",
    altitude: "2,228m",
    language: "Balti, Urdu",
    heroImage: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1623862283088-e9f0d1a49f57?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Skardu is a city and the capital of Skardu District in Gilgit-Baltistan, Pakistan. At an elevation of 2,228m, it serves as the base for expeditions to K2 — the world's second highest mountain. With the Shangri-La resort, Deosai National Park, and Satpara Lake, Skardu is a paradise for adventure seekers and nature lovers.",
    localTips: [
      "The PIA flight to Skardu offers stunning mountain views — always request a window seat.",
      "Deosai plateau is only accessible June–September due to heavy snowfall.",
      "Bring UV-protection sunscreen — the high altitude sun is intense.",
      "Carry cash — ATMs are unreliable beyond Skardu city.",
      "Book Concordia and K2 Base Camp treks at least 6 months in advance.",
    ],
    highlights: ["Shangrila Lake", "Deosai National Park", "K2 Base Camp", "Cold Desert", "Satpara Lake", "Katchura Lake", "Skardu Fort", "Concordia"],
    tours: [
      { id: "2", title: "K2 Base Camp Trek", slug: "k2-base-camp", price: 350000, duration: 21, location: "Skardu", difficulty: "Extreme", image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800", rating: 4.8, reviews: 86 },
      { id: "6", title: "Skardu Cold Desert Safari", slug: "skardu-safari", price: 110000, duration: 5, location: "Skardu", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1623862283088-e9f0d1a49f57?auto=format&fit=crop&q=80&w=800", rating: 4.6, reviews: 78 },
    ],
  },
  "fairy-meadows": {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Diamer District",
    tagline: "Nanga Parbat's Backyard",
    bestTime: "May–October",
    temp: "8–18°C",
    altitude: "3,300m",
    language: "Shina, Urdu",
    heroImage: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601614532158-b6481cc1c6cc?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Fairy Meadows (Joot) is a lush green plateau at 3,300m, offering some of the most dramatic views of Nanga Parbat (8,126m) — the world's ninth-highest mountain. The journey itself is an adventure: a 4WD jeep ride on a cliff-hugging road followed by a 3-hour hike through pine forests to the meadows.",
    localTips: [
      "The jeep track to Tato village is considered one of the most dangerous roads in the world — it's an adventure in itself.",
      "Camp overnight to witness the full moon over Nanga Parbat — an otherworldly experience.",
      "Altitude sickness can affect some visitors — acclimatise in Raikot first.",
      "The meadows can get extremely cold at night even in July — pack a warm sleeping bag.",
      "Hikers can continue to Beyal Camp (4,300m) for even closer views of the Raikot glacier.",
    ],
    highlights: ["Nanga Parbat View", "Beyal Camp", "Raikot Glacier", "Lush Green Meadows", "Tato Village", "Pine Forests", "Moonrise Views", "Fairy Lake"],
    tours: [
      { id: "3", title: "Fairy Meadows & Nanga Parbat Expedition", slug: "fairy-meadows", price: 95000, duration: 5, location: "Diamer", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800", rating: 5.0, reviews: 215 },
    ],
  },
  swat: {
    slug: "swat",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    tagline: "Switzerland of the East",
    bestTime: "April–October",
    temp: "18–28°C",
    altitude: "980m",
    language: "Pashto, Urdu",
    heroImage: "https://images.unsplash.com/photo-1601614532158-b6481cc1c6cc?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560249826-a070ccb53f65?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Swat Valley — once called the Switzerland of the East — is a breathtakingly green valley in Khyber Pakhtunkhwa, Pakistan. With pine-forested mountains, gushing rivers, ancient Buddhist ruins, and the ski resort of Malam Jabba, Swat offers something for every type of traveller.",
    localTips: [
      "Malam Jabba ski resort operates December–February for winter sports enthusiasts.",
      "Visit Mahodand Lake for camping and trout fishing — a hidden gem.",
      "Kalam is the ideal base for exploring the upper Swat valley.",
      "The Swat Expressway has reduced travel time from Islamabad to 4 hours.",
      "Try the local trout fish — freshly caught from the Swat River.",
    ],
    highlights: ["Malam Jabba Ski Resort", "Mahodand Lake", "Ushu Forest", "Kalam Valley", "Swat Museum", "Mingora Bazaar", "Fizagat Park", "Bahrain"],
    tours: [
      { id: "4", title: "Swat Valley Winter Retreat", slug: "swat-winter", price: 85000, duration: 4, location: "Swat", difficulty: "Easy", image: "https://images.unsplash.com/photo-1601614532158-b6481cc1c6cc?auto=format&fit=crop&q=80&w=800", rating: 4.7, reviews: 92 },
    ],
  },
  chitral: {
    slug: "chitral",
    name: "Chitral & Kalash",
    region: "Khyber Pakhtunkhwa",
    tagline: "Land of the Kalash People",
    bestTime: "May–September",
    temp: "12–25°C",
    altitude: "1,497m",
    language: "Khowar, Kalasha, Urdu",
    heroImage: "https://images.unsplash.com/photo-1560249826-a070ccb53f65?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601614532158-b6481cc1c6cc?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Chitral is one of Pakistan's most culturally unique destinations — home to the ancient Kalash people, the world's only surviving pre-Islamic indigenous culture in the region. Visit the three Kalash valleys (Bumburet, Rumbur, Birir) and the legendary Shandur Polo Festival at the world's highest polo ground.",
    localTips: [
      "The Kalash Chilam Joshi festival (May) is a spectacular cultural event — book months in advance.",
      "Shandur Polo Festival happens in early July — the world's highest polo ground at 3,700m.",
      "Respect Kalash customs — ask permission before photographing people.",
      "The road via Lowari Pass is open June–October; alternatively, PIA flies Chitral year-round.",
      "Try the local walnut bread and dried mulberries — unique to this region.",
    ],
    highlights: ["Kalash Valleys", "Tirich Mir View", "Chitral Fort", "Shandur Polo Festival", "Shahi Mosque", "Chitral Museum", "Bumburet Valley", "Mastuj"],
    tours: [
      { id: "5", title: "Chitral & Kalash Festival Tour", slug: "chitral-kalash", price: 120000, duration: 6, location: "Chitral", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1560249826-a070ccb53f65?auto=format&fit=crop&q=80&w=800", rating: 4.9, reviews: 156 },
    ],
  },
  naran: {
    slug: "naran",
    name: "Naran & Kaghan",
    region: "Mansehra, KPK",
    tagline: "Valley of Lakes",
    bestTime: "June–August",
    temp: "10–22°C",
    altitude: "2,409m",
    language: "Gojri, Hindko, Urdu",
    heroImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601614532158-b6481cc1c6cc?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Naran and the Kaghan Valley is one of Pakistan's most popular tourist destinations — a 155km long valley filled with emerald lakes, roaring rivers, glaciers, and alpine meadows. The highlight is the legendary Saif-ul-Malook Lake, set against the backdrop of glaciers and surrounded by local folklore.",
    localTips: [
      "Saif-ul-Malook Lake is accessible by jeep from Naran — hiring a local jeep is a must-do adventure.",
      "Visit at dawn before tourist crowds arrive at Saif-ul-Malook for the perfect reflection.",
      "Ansoo Lake (Tear Lake, 4,245m) is a 2-day trek from Naran — hire a local guide.",
      "July–August is peak season — book accommodation weeks in advance.",
      "The drive from Balakot to Naran via Kaghan is itself a scenic highlight.",
    ],
    highlights: ["Saif-ul-Malook Lake", "Babusar Pass", "Ansoo Lake", "Lulusar Lake", "Kaghan Valley", "Kunhar River", "Batakundi Meadows", "Shogran"],
    tours: [
      { id: "7", title: "Naran & Saif-ul-Malook Lake Tour", slug: "naran-saiful-malook", price: 75000, duration: 4, location: "Naran, KPK", difficulty: "Easy", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800", rating: 4.7, reviews: 189 },
    ],
  },
  gilgit: {
    slug: "gilgit",
    name: "Gilgit",
    region: "Gilgit-Baltistan",
    tagline: "Crossroads of Civilisations",
    bestTime: "April–October",
    temp: "15–28°C",
    altitude: "1,500m",
    language: "Shina, Urdu",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000",
    galleryImages: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
    ],
    description: "Gilgit is the capital of Gilgit-Baltistan and the historic gateway to the ancient Silk Road. It sits at the convergence of three of the world's greatest mountain ranges — the Karakoram, Hindu Kush, and the Himalayas. The city is a vibrant hub for mountaineering, trekking, and cultural exploration.",
    localTips: [
      "Gilgit Bazaar has excellent handcrafted gemstone jewellery from local artisans.",
      "The Naltar Valley (via helicopter or jeep) is stunning for wildflower meadows.",
      "Visit the 7th-century Kargah Buddha — a rock carving overlooking the Gilgit River.",
      "Local polo matches happen on the main polo ground on weekends — free entry.",
      "Gilgit airport can close due to weather — always have backup road plans.",
    ],
    highlights: ["Kargah Buddha", "Naltar Valley", "Gilgit Bazaar", "KKH Junction", "Polo Ground", "Nomal Valley", "Bar Valley", "Haramosh Peak View"],
    tours: [
      { id: "8", title: "Gilgit & Naltar Valley Tour", slug: "gilgit-naltar", price: 90000, duration: 5, location: "Gilgit", difficulty: "Easy", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800", rating: 4.6, reviews: 54 },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS[slug];
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: dest.name,
    description: `Explore ${dest.name} — ${dest.tagline}. Best time: ${dest.bestTime}. Book tours with Shamaal Tourism.`,
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = DESTINATIONS[slug];
  if (!dest) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-shamaal-cream dark:bg-[var(--background)]">

        {/* Hero */}
        <section className="relative h-[65vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-shamaal-navy/50 z-10" />
          <Image
            src={dest.heroImage}
            alt={dest.name}
            fill className="object-cover"
            unoptimized priority
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link href="/destinations" className="inline-flex items-center text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> All Destinations
            </Link>
            <div className="flex items-center text-shamaal-gold text-sm font-bold tracking-widest uppercase mb-3">
              <MapPin className="w-4 h-4 mr-1" /> {dest.region}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-3">{dest.name}</h1>
            <p className="text-xl text-gray-200 italic">&ldquo;{dest.tagline}&rdquo;</p>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-shamaal-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              <div className="py-6 px-8">
                <span className="text-gray-400 text-xs uppercase tracking-wider flex items-center mb-1"><Sun className="w-3 h-3 mr-1" />Best Time</span>
                <p className="text-white font-bold text-sm">{dest.bestTime}</p>
              </div>
              <div className="py-6 px-8">
                <span className="text-gray-400 text-xs uppercase tracking-wider flex items-center mb-1"><Thermometer className="w-3 h-3 mr-1" />Temperature</span>
                <p className="text-white font-bold text-sm">{dest.temp}</p>
              </div>
              <div className="py-6 px-8">
                <span className="text-gray-400 text-xs uppercase tracking-wider flex items-center mb-1"><Clock className="w-3 h-3 mr-1" />Altitude</span>
                <p className="text-white font-bold text-sm">{dest.altitude}</p>
              </div>
              <div className="py-6 px-8">
                <span className="text-gray-400 text-xs uppercase tracking-wider flex items-center mb-1"><MapPin className="w-3 h-3 mr-1" />Language</span>
                <p className="text-white font-bold text-sm">{dest.language}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Left: Description + Tips + Highlights */}
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-shamaal-navy dark:text-white mb-6">About {dest.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{dest.description}</p>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-3xl font-bold text-shamaal-navy dark:text-white mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-shamaal-gold" /> Photo Gallery
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {dest.galleryImages.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden h-48 group">
                      <Image src={img} alt={`${dest.name} ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Tips */}
              <div>
                <h2 className="text-3xl font-bold text-shamaal-navy dark:text-white mb-6">Insider Tips</h2>
                <div className="space-y-4">
                  {dest.localTips.map((tip, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 bg-white dark:bg-shamaal-navy/30 rounded-xl border border-gray-100 dark:border-white/10">
                      <div className="bg-shamaal-gold/20 text-shamaal-gold font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm">
                        {i + 1}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Highlights + Book CTA */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-shamaal-navy/30 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/10">
                <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-6">Top Highlights</h3>
                <ul className="space-y-3">
                  {dest.highlights.map((h) => (
                    <li key={h} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-shamaal-gold shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-shamaal-navy rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-3">Ready to Visit?</h3>
                <p className="text-gray-300 text-sm mb-6">Browse our curated tours to {dest.name} and book your adventure today.</p>
                <Link href="/tours" className="block w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-xl py-3 transition-all duration-300">
                  Browse {dest.name} Tours
                </Link>
                <Link href="/contact" className="block mt-3 w-full border border-white/20 hover:border-white text-white font-medium rounded-xl py-3 transition-all duration-300 text-sm">
                  Request Custom Itinerary
                </Link>
              </div>
            </div>
          </div>

          {/* Tours for this destination */}
          {dest.tours.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-shamaal-navy dark:text-white mb-10">
                Tours in <span className="text-shamaal-gold">{dest.name}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dest.tours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
