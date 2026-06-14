"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Share2, MapPin, Check, X, Upload, Loader2 } from "lucide-react";

interface Memory {
  id: string | number;
  title: string;
  location: string;
  image: string;
  author: string;
  likes: number;
}

const FALLBACK_MEMORIES: Memory[] = [
  {
    id: 1,
    title: "Sunset at Attabad Lake",
    location: "Hunza Valley",
    image: "/images/destinations/attabad-lake.jpeg",
    author: "Zahid Khan",
    likes: 124
  },
  {
    id: 2,
    title: "Morning in Fairy Meadows",
    location: "Nanga Parbat Base",
    image: "/images/destinations/nanga-parbat.jpeg",
    author: "Ayesha Bibi",
    likes: 89
  },
  {
    id: 3,
    title: "Skardu Cold Desert Safari",
    location: "Skardu",
    image: "/images/destinations/cold-desert.jpeg",
    author: "Irfan Ali",
    likes: 215
  },
  {
    id: 4,
    title: "Autumn Colors",
    location: "Passu Cones",
    image: "/images/destinations/baldi-viewpoint.jpeg",
    author: "Sana Tariq",
    likes: 156
  }
];

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
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
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    author: "",
    image: null as File | null
  });

  const fetchMemories = async () => {
    try {
      const res = await fetch("/api/memories");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setMemories(data);
      } else {
        setMemories(FALLBACK_MEMORIES);
      }
    } catch (err) {
      console.error("Error fetching memories:", err);
      setMemories(FALLBACK_MEMORIES);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchMemories();
    };
    init();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.location || !formData.author) {
      alert("Please fill all fields and select an image.");
      return;
    }

    setIsUploading(true);
    const data = new FormData();
    data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("author", formData.author);

    try {
      const res = await fetch("/api/memories", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        setUploadSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setUploadSuccess(false);
          setFormData({ title: "", location: "", author: "", image: null });
          fetchMemories();
        }, 2000);
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed. Please check if your Database is running.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

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
            {memories.map((memory, index) => (
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-shamaal-gold text-shamaal-navy px-10 py-4 rounded-full font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-shamaal-gold/20"
              >
                Upload Your Memory
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUploading && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-shamaal-gold/5 blur-3xl rounded-full -mr-16 -mt-16" />
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white">Share a Memory</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {uploadSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-shamaal-navy dark:text-white mb-2">Memory Uploaded!</h3>
                  <p className="text-gray-500">Your story has been added to the gallery.</p>
                </div>
              ) : (
                <form onSubmit={handleUpload} className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Title of Memory</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Golden Hour at Attabad"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-shamaal-gold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Location</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Hunza Valley"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-shamaal-gold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="How should we credit you?"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-shamaal-gold transition-all"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${formData.image ? "border-green-500 bg-green-500/5" : "border-gray-200 dark:border-white/10 hover:border-shamaal-gold hover:bg-shamaal-gold/5"}`}
                      >
                        {formData.image ? (
                          <>
                            <Check className="w-8 h-8 text-green-500 mb-2" />
                            <span className="text-sm font-bold text-green-600 truncate max-w-xs">{formData.image.name}</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm font-bold text-gray-500">Click to upload photo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <button 
                    disabled={isUploading}
                    className="w-full bg-shamaal-navy dark:bg-shamaal-gold text-white dark:text-shamaal-navy py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Share Memory"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
