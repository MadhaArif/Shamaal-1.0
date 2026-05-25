"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import Link from "next/link";

const REGIONS = ["Kashmir", "Naran", "Hunza", "Diamer", "Skardu", "Swat", "Chitral"];

export default function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentRegion = searchParams.get("region") || "";

  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentRegion === region) {
      params.delete("region");
    } else {
      params.set("region", region);
    }
    // Reset to first page if we had pagination
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-1/4">
      <div className="bg-white dark:bg-shamaal-navy/30 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 sticky top-28">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-bold text-shamaal-navy dark:text-white flex items-center">
            <Filter className="w-5 h-5 mr-2 text-shamaal-gold" />
            Filters
          </h2>
          <Link href="/tours" className="text-sm text-shamaal-sky hover:text-shamaal-gold transition-colors">
            Reset
          </Link>
        </div>
        
        <div className="mb-6">
          <h3 className="font-bold text-shamaal-navy dark:text-white mb-3 text-sm uppercase tracking-wider">Region</h3>
          <div className="space-y-2">
            {REGIONS.map((region) => (
              <label key={region} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={currentRegion === region}
                  onChange={() => handleRegionChange(region)}
                  className="form-checkbox h-4 w-4 text-shamaal-gold rounded border-gray-300 focus:ring-shamaal-gold bg-transparent" 
                />
                <span className={`text-sm transition-colors ${currentRegion === region ? "text-shamaal-gold font-bold" : "text-gray-600 dark:text-gray-300 group-hover:text-shamaal-navy dark:group-hover:text-white"}`}>
                  {region}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
