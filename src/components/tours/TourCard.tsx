import { MapPin, Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TourCardProps {
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

export default function TourCard({
  title,
  slug,
  price,
  duration,
  location,
  difficulty,
  image,
  rating,
  reviews
}: TourCardProps) {
  return (
    <Link href={`/tours/${slug}`} className="group flex flex-col bg-white dark:bg-shamaal-navy/30 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-shamaal-gold/50">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" /> {/* Placeholder background */}
        {/* Replace with actual next/image when images are available */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-shamaal-navy/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-shamaal-navy dark:text-white flex items-center space-x-1 shadow-sm">
          <Star className="w-3 h-3 text-shamaal-gold fill-current" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-gray-500 font-normal">({reviews})</span>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <span className="bg-shamaal-gold text-shamaal-navy text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
            {difficulty}
          </span>
        </div>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 z-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4 uppercase tracking-wider font-semibold">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-shamaal-gold" />
            {location}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-shamaal-gold" />
            {duration} Days
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-2 group-hover:text-shamaal-sky transition-colors line-clamp-2">
          {title}
        </h3>
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100 dark:border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Starting from</span>
            <span className="text-2xl font-bold text-shamaal-navy dark:text-white">
              <span className="text-sm font-normal mr-1">PKR</span>
              {price.toLocaleString()}
            </span>
          </div>
          <div className="h-10 w-10 rounded-full bg-shamaal-cream dark:bg-white/10 flex items-center justify-center group-hover:bg-shamaal-gold group-hover:text-shamaal-navy transition-colors">
            <Calendar className="w-5 h-5 text-shamaal-navy dark:text-white group-hover:text-shamaal-navy" />
          </div>
        </div>
      </div>
    </Link>
  );
}
