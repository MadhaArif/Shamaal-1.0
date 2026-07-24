"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Users, 
  BarChart3, 
  Camera, 
  Download, 
  CheckCircle, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AdminData {
  error?: string;
  stats?: {
    totalBookings: number;
    totalLeads: number;
    totalMemories: number;
    revenue: number;
  };
  bookings?: any[];
  leads?: any[];
  memories?: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Admin error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060d1a]">
        <Loader2 className="w-12 h-12 animate-spin text-shamaal-gold" />
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060d1a] p-4">
        <div className="bg-shamaal-navy/30 p-8 rounded-3xl border border-white/10 shadow-xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Database Connection Issue</h1>
          <p className="text-white/60 mb-6">Make sure your database is running to see admin stats.</p>
          <button onClick={() => window.location.reload()} className="bg-shamaal-gold text-shamaal-navy px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  const stats = data?.stats || { totalBookings: 0, totalLeads: 0, totalMemories: 0, revenue: 0 };
  const bookings = data?.bookings || [];
  const leads = data?.leads || [];
  const memories = data?.memories || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-shamaal-cream dark:bg-[#051024]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-shamaal-navy dark:text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-500">Track all your business data in real-time.</p>
            </div>
            <a 
              href="/api/leads/export" 
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
            >
              <Download className="w-5 h-5" />
              <span>Export Leads to Excel</span>
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Revenue", value: `Rs. ${stats.revenue.toLocaleString('en-IN')}`, icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Total Bookings", value: stats.totalBookings, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
              { label: "New Leads", value: stats.totalLeads, icon: Mail, color: "text-shamaal-gold", bg: "bg-shamaal-gold/10" },
              { label: "Shared Memories", value: stats.totalMemories, icon: Camera, color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="bg-white dark:bg-white/5 p-6 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm"
              >
                <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-shamaal-navy dark:text-white">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Tabs Nav */}
          <div className="flex space-x-4 mb-8 bg-white/50 dark:bg-white/5 p-2 rounded-2xl w-fit">
            {["bookings", "leads", "memories"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all uppercase tracking-wider ${
                  activeTab === tab 
                    ? "bg-shamaal-navy text-white shadow-lg" 
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table Area */}
          <div className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              {activeTab === "bookings" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">User / Tour</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Details</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="p-6">
                          <div className="font-bold text-shamaal-navy dark:text-white">{b.user?.name || "Guest"}</div>
                          <div className="text-xs text-gray-500">{b.tour?.title}</div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-2 text-shamaal-gold" />
                            {new Date(b.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <Users className="w-4 h-4 mr-2 text-shamaal-gold" />
                            {b.travelers} Travelers
                          </div>
                        </td>
                        <td className="p-6 font-bold text-shamaal-navy dark:text-white">Rs. {b.totalPrice.toLocaleString('en-IN')}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            b.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-12 text-center text-gray-500 italic">No bookings found yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === "leads" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Lead Info</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Contact</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Interested In</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Message</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="p-6">
                          <div className="font-bold text-shamaal-navy dark:text-white">{l.firstName} {l.lastName}</div>
                          <div className="text-xs text-gray-400">Added: {new Date(l.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 mr-2 text-shamaal-gold" />
                            {l.email}
                          </div>
                          {l.phone && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <Phone className="w-4 h-4 mr-2 text-shamaal-gold" />
                              {l.phone}
                            </div>
                          )}
                        </td>
                        <td className="p-6">
                          <div className="text-sm font-medium text-shamaal-navy dark:text-white">{l.tourId || "General Inquiry"}</div>
                        </td>
                        <td className="p-6 max-w-xs">
                          <div className="text-sm text-gray-600 dark:text-gray-400 truncate hover:whitespace-normal cursor-help" title={l.message}>
                            {l.message || "-"}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {l.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-12 text-center text-gray-500 italic">No leads found yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === "memories" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Memory</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Author / Location</th>
                      <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Approved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {memories.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image src={m.image} alt={m.title} fill className="object-cover" />
                            </div>
                            <div className="font-bold text-shamaal-navy dark:text-white">{m.title}</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-sm font-medium text-shamaal-navy dark:text-white">by {m.author}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            {m.location}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${m.approved ? "bg-green-500" : "bg-yellow-500"}`} />
                            <span className="text-xs font-bold uppercase tracking-widest">{m.approved ? "Yes" : "Pending"}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {memories.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-12 text-center text-gray-500 italic">No memories uploaded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
