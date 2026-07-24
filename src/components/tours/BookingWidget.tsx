"use client";

import { useState } from "react";
import { Calendar, Users, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingWidgetProps {
  tourId: string;
  price: number;
}

export default function BookingWidget({ tourId, price }: BookingWidgetProps) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `/book?tourId=${tourId}&date=${date}&travelers=${travelers}`;
    router.push(url);
  };

  return (
    <div className="sticky top-28 bg-white dark:bg-shamaal-navy/50 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/10">
      <div className="mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider block mb-1">Price per person</span>
        <div className="flex items-end text-shamaal-navy dark:text-white">
          <span className="text-xl font-medium mr-1 mb-1">PKR</span>
          <span className="text-4xl font-bold">{price.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      <form className="space-y-4" onSubmit={handleBookNow}>
        <div>
          <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Select Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy focus:outline-none focus:ring-2 focus:ring-shamaal-gold text-shamaal-navy dark:text-white" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Travelers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select 
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy focus:outline-none focus:ring-2 focus:ring-shamaal-gold text-shamaal-navy dark:text-white appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="pt-4">
          <button 
            type="submit"
            className="block text-center w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-md shadow-shamaal-gold/30"
          >
            Book Now
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">You won&apos;t be charged yet</p>
        <button onClick={() => router.push('/contact')} className="text-sm text-shamaal-sky font-semibold hover:text-shamaal-gold transition-colors">
          Have a question? Contact us
        </button>
      </div>
    </div>
  );
}
