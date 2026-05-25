"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Heart, Share2, MapPin, Check } from "lucide-react";

const MEMORIES = [
  {
    id: 1,
    title: "Sunset at Attabad Lake",
    location: "Hunza Valley",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    author: "Zahid Khan",
    likes: 124
  },
  {
    id: 2,
    title: "Morning in Fairy Meadows",
    location: "Nanga Parbat Base",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800",
    author: "Ayesha Bibi",
    likes: 89
  },
  {
    id: 3,
    title: "Skardu Cold Desert Safari",
    location: "Skardu",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    author: "Irfan Ali",
    likes: 215
  },
  {
    id: 4,
    title: "Autumn Colors",
    location: "Passu Cones",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    author: "Sana Tariq",
    likes: 156
  }
];

function MemoryCard({ memory, index }: { memory: typeof MEMORIES[0]; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(memory.likes);
  const [isShared, setIsShared] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const shareData = {
      title: memory.title,
      text: `Check out this memory from ${memory.location} by ${memory.author} on Shamaal Tourism!`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
          src={memory.image} 
          alt={memory.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center space-x-2 text-shamaal-gold mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wider uppercase">{memory.location}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{memory.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-8 h-8 rounded-full bg-shamaal-gold/20 flex items-center justify-center border border-shamaal-gold/30">
                <span className="text-[10px] font-bold text-shamaal-gold">{memory.author[0]}</span>
              </div>
              <span className="text-sm font-medium">by {memory.author}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1.5 transition-all duration-300 ${isLiked ? "text-shamaal-gold scale-110" : "text-white/90 hover:text-shamaal-gold"}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-bold">{likeCount}</span>
              </button>
              <button 
                onClick={handleShare}
                className={`transition-all duration-300 ${isShared ? "text-green-500 scale-110" : "text-white/90 hover:text-shamaal-gold"}`}
                title={isShared ? "Link Copied!" : "Share Memory"}
              >
                {isShared ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 md:pt-40 pb-20 bg-shamaal-cream dark:bg-[#051024]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-shamaal-gold/10 text-shamaal-gold px-4 py-2 rounded-full mb-6"
            >
              <Camera className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Community Gallery</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-shamaal-navy dark:text-white mb-6"
            >
              Travel <span className="text-shamaal-gold">Memories</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Explore the breathtaking moments captured by our explorers across the Great North. 
              Every picture tells a story of adventure.
            </motion.p>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {MEMORIES.map((memory, index) => (
              <MemoryCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 p-12 bg-shamaal-navy rounded-[3rem] text-center border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-shamaal-gold/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Share Your Journey</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Upload your favorite travel moments and inspire others to explore the Great North.</p>
              <button className="bg-shamaal-gold text-shamaal-navy px-10 py-4 rounded-full font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-shamaal-gold/20">
                Upload Your Memory
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
