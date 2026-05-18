"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Compass, Mail, Lock, ArrowRight, Chrome, ChevronLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Smooth transition simulation
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#06142e] px-4 overflow-hidden">
      {/* Background Image with Dark Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000"
          alt="Mountains Background"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shamaal-navy via-shamaal-navy/80 to-transparent" />
      </div>

      {/* Floating Back to Home button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center space-x-2 text-white/70 hover:text-shamaal-gold transition-colors font-medium text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/40">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-6">
            <Compass className="h-10 w-10 text-shamaal-gold group-hover:rotate-45 transition-transform duration-500" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-2xl leading-none tracking-wider text-white">
                SHAMAAL<span className="text-shamaal-gold">®</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-300">THE GREAT NORTH</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to manage your bookings and rewards</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ali@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-shamaal-gold focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest">Password</label>
              <a href="#" className="text-xs font-semibold text-shamaal-gold hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-shamaal-gold focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-2xl py-4 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-shamaal-gold/20 disabled:opacity-50"
          >
            <span>{isLoading ? "Signing in..." : "Sign In"}</span>
            {!isLoading && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative px-4 bg-[#0a1f44] text-xs font-semibold text-gray-400 uppercase tracking-wider">or continue with</span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl py-3.5 transition-all duration-300"
        >
          <Chrome className="w-5 h-5 text-shamaal-gold" />
          <span>Google Account</span>
        </button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/dashboard" className="text-shamaal-gold hover:underline font-bold">
            Explore Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
