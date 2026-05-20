"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  User, MapPin, Calendar, Star, Settings, LogOut,
  Clock, CheckCircle, XCircle, ChevronRight, Bell
} from "lucide-react";

const MOCK_BOOKINGS = [
  {
    id: "BK-2026-001",
    tour: "Hunza Valley Autumn Blossom Tour",
    location: "Hunza, Gilgit",
    startDate: "2026-10-04",
    duration: 7,
    travelers: 2,
    totalPrice: 300000,
    status: "CONFIRMED",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "BK-2026-002",
    tour: "Fairy Meadows & Nanga Parbat Expedition",
    location: "Diamer",
    startDate: "2026-08-15",
    duration: 5,
    travelers: 1,
    totalPrice: 95000,
    status: "COMPLETED",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "BK-2025-089",
    tour: "Swat Valley Winter Retreat",
    location: "Swat",
    startDate: "2025-12-20",
    duration: 4,
    travelers: 3,
    totalPrice: 255000,
    status: "COMPLETED",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=400",
  },
];

const STATUS_STYLES: Record<string, { label: string; className: string; Icon: React.ComponentType<{ className?: string }> }> = {
  CONFIRMED: { label: "Confirmed", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", Icon: CheckCircle },
  PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", Icon: Clock },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", Icon: XCircle },
  COMPLETED: { label: "Completed", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", Icon: CheckCircle },
};

const NAV_ITEMS = [
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "upcoming", label: "Upcoming Trips", icon: MapPin },
  { id: "reviews", label: "My Reviews", icon: Star },
  { id: "settings", label: "Profile Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBookings(data);
        } else {
          setBookings(MOCK_BOOKINGS);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setBookings(MOCK_BOOKINGS);
      })
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter((b) => b.status === "CONFIRMED");
  const past = bookings.filter((b) => b.status === "COMPLETED");

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-shamaal-cream dark:bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Profile Header */}
          <div className="bg-shamaal-navy rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-full bg-shamaal-gold flex items-center justify-center text-shamaal-navy font-bold text-2xl shrink-0">
                A
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Ali Ahmed</h1>
                <p className="text-gray-400 text-sm">ali.ahmed@example.com</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="bg-shamaal-gold/20 text-shamaal-gold text-xs font-bold px-3 py-1 rounded-full">⭐ Premium Member</span>
                  <span className="text-gray-400 text-xs">Member since 2023</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-shamaal-gold">{bookings.length}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Total Trips</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-shamaal-gold">2</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-shamaal-gold">650</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Reward Pts</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Nav */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white dark:bg-shamaal-navy/30 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/10">
                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        activeTab === item.id
                          ? "bg-shamaal-gold text-shamaal-navy shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:bg-shamaal-cream dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  ))}
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/10">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>

              {/* Notification Card */}
              <div className="mt-4 bg-shamaal-navy rounded-2xl p-5 border border-white/10">
                <div className="flex items-center space-x-2 mb-3">
                  <Bell className="w-4 h-4 text-shamaal-gold" />
                  <span className="text-white text-sm font-bold">Notification</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">Your Hunza tour departs in <strong className="text-shamaal-gold">43 days</strong>. Complete your travel checklist.</p>
                <Link href="/book" className="block mt-3 text-center text-xs font-bold text-shamaal-gold hover:text-yellow-400 transition-colors">
                  View Checklist →
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow">

              {/* My Bookings */}
              {activeTab === "bookings" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white">All Bookings</h2>
                    <Link href="/tours" className="text-sm font-semibold text-shamaal-sky hover:text-shamaal-gold transition-colors">+ Book New Tour</Link>
                  </div>
                  {bookings.map((booking) => {
                    const status = STATUS_STYLES[booking.status];
                    return (
                      <div key={booking.id} className="bg-white dark:bg-shamaal-navy/30 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:border-shamaal-gold/30 transition-all flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                          <Image src={booking.image} alt={booking.tour} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <h3 className="font-bold text-shamaal-navy dark:text-white text-lg">{booking.tour}</h3>
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${status.className}`}>
                              <status.Icon className="w-3.5 h-3.5" />
                              <span>{status.label}</span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-shamaal-gold" />{booking.location}</span>
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-shamaal-gold" />{booking.startDate}</span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-shamaal-gold" />{booking.duration} days</span>
                            <span className="flex items-center"><User className="w-4 h-4 mr-1 text-shamaal-gold" />{booking.travelers} travelers</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Booking ID: </span>
                              <span className="text-xs font-bold text-shamaal-navy dark:text-white">{booking.id}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="font-bold text-shamaal-navy dark:text-white">PKR {booking.totalPrice.toLocaleString()}</span>
                              {booking.status === "COMPLETED" && (
                                <button className="text-xs font-semibold text-shamaal-sky hover:text-shamaal-gold border border-shamaal-sky/30 hover:border-shamaal-gold px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1">
                                  <Star className="w-3.5 h-3.5" />
                                  <span>Write Review</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Upcoming Trips */}
              {activeTab === "upcoming" && (
                <div>
                  <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Upcoming Trips</h2>
                  {upcoming.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-shamaal-navy/30 rounded-2xl border border-gray-100 dark:border-white/10">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No upcoming trips yet.</p>
                      <Link href="/tours" className="mt-4 inline-block text-shamaal-sky font-semibold hover:text-shamaal-gold">Browse tours →</Link>
                    </div>
                  ) : upcoming.map((booking) => (
                    <div key={booking.id} className="bg-white dark:bg-shamaal-navy/30 rounded-2xl p-6 shadow-sm border border-shamaal-gold/30 mb-4">
                      <h3 className="font-bold text-shamaal-navy dark:text-white text-lg mb-2">{booking.tour}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Departing <strong className="text-shamaal-navy dark:text-white">{booking.startDate}</strong> · {booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">My Reviews</h2>
                  <div className="text-center py-16 bg-white dark:bg-shamaal-navy/30 rounded-2xl border border-gray-100 dark:border-white/10">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">You haven&apos;t written any reviews yet.</p>
                    <p className="text-gray-400 text-sm mt-1">Complete a tour to share your experience.</p>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Profile Settings</h2>
                  <div className="bg-white dark:bg-shamaal-navy/30 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">First Name</label>
                        <input type="text" defaultValue="Ali" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Last Name</label>
                        <input type="text" defaultValue="Ahmed" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Email Address</label>
                      <input type="email" defaultValue="ali.ahmed@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Phone</label>
                      <input type="tel" defaultValue="+92 300 1234567" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                    </div>
                    <button className="px-8 py-3 bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-xl transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
