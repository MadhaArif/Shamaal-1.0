"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Camera, Heart, Share2, MapPin, Check, X, Upload, Loader2,
  ZoomIn, ChevronLeft, ChevronRight, Play, Sparkles, Trash2
} from "lucide-react";
import {
  addOwnedMemory,
  getOwnedMemories,
  getDeleteToken,
  removeOwnedMemory,
} from "@/lib/memoryOwnership";

interface Memory {
  id: string | number;
  title: string;
  location: string;
  image: string;
  author: string;
  likes: number;
  category?: string;
  size?: "large" | "medium" | "small";
  deleteToken?: string;
}

function MemoryImage({
  src,
  alt,
  fill,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`${fill ? "absolute inset-0 h-full w-full" : ""} ${className || ""}`}
      />
    );
  }

  return (
    <Image src={src} alt={alt} fill={fill} className={className} sizes={sizes} />
  );
}

const FALLBACK_MEMORIES: Memory[] = [
  { id: 1, title: "Sunset at Attabad Lake", location: "Hunza Valley", image: "/images/destinations/attabad-lake.jpeg", author: "Zahid Khan", likes: 124, category: "Landscapes", size: "large" },
  { id: 2, title: "Nanga Parbat at Dawn", location: "Fairy Meadows", image: "/images/destinations/nanga-parbat.jpeg", author: "Ayesha Bibi", likes: 89, category: "Mountains", size: "medium" },
  { id: 3, title: "Cold Desert Safari", location: "Skardu", image: "/images/destinations/cold-desert.jpeg", author: "Irfan Ali", likes: 215, category: "Adventure", size: "small" },
  { id: 4, title: "Baldi Viewpoint Panorama", location: "Hunza", image: "/images/destinations/baldi-viewpoint.jpeg", author: "Sana Tariq", likes: 156, category: "Landscapes", size: "medium" },
  { id: 5, title: "Rainbow Lake Colors", location: "Naltar Valley", image: "/images/destinations/rainbow-lake.jpeg", author: "Hassan Raza", likes: 178, category: "Lakes", size: "large" },
  { id: 6, title: "Shangrilla Resort Dawn", location: "Skardu", image: "/images/destinations/shangrilla-resort.jpeg", author: "Maria Iqbal", likes: 143, category: "Resorts", size: "small" },
  { id: 7, title: "Deosai Plains Wildflowers", location: "Deosai National Park", image: "/images/destinations/deosai-plains.jpeg", author: "Omar Farooq", likes: 192, category: "Landscapes", size: "medium" },
  { id: 8, title: "Khaplu Fort History", location: "Khaplu", image: "/images/destinations/khaplu-fort.jpeg", author: "Fatima Shah", likes: 112, category: "Culture", size: "small" },
  { id: 9, title: "Saiful Maluk Serenity", location: "Naran Kaghan", image: "/images/destinations/saiful-malook.jpeg", author: "Ahmed Khan", likes: 234, category: "Lakes", size: "large" },
  { id: 10, title: "Babusar Top at 4100m", location: "Babusar Pass", image: "/images/destinations/babusar-top.jpeg", author: "Sara Ahmed", likes: 167, category: "Mountains", size: "medium" },
  { id: 11, title: "Malam Jabba Ski Slopes", location: "Swat Valley", image: "/images/destinations/malam-jabba.jpeg", author: "Daniyal Khan", likes: 145, category: "Adventure", size: "small" },
  { id: 12, title: "K2 Concordia Trek", location: "Skardu", image: "/images/destinations/k2-concordia.jpeg", author: "Sarah Khan", likes: 287, category: "Mountains", size: "large" },
  { id: 13, title: "Shangrilla Lake Mirror", location: "Kachura Lake, Skardu", image: "/images/destinations/shangrilla-lake.jpeg", author: "Bilal Shah", likes: 198, category: "Lakes", size: "medium" },
  { id: 14, title: "Kharphocho Fort View", location: "Skardu Fort", image: "/images/destinations/kharphocho-fort.jpeg", author: "Nadia Malik", likes: 134, category: "Culture", size: "small" },
  { id: 15, title: "Skardu Valley Vista", location: "Skardu Viewpoint", image: "/images/destinations/skardu-viewpoint.jpeg", author: "Kamran Ali", likes: 221, category: "Landscapes", size: "medium" },
];

const CATEGORIES = ["All", "Landscapes", "Mountains", "Lakes", "Adventure", "Culture", "Resorts"];

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({
  memories, activeIndex, onClose, onPrev, onNext, canDelete, onDelete,
}: {
  memories: Memory[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canDelete?: boolean;
  onDelete?: () => void;
}) {
  const m = memories[activeIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white/50 text-xs tracking-widest font-bold">
        {String(activeIndex + 1).padStart(2, "0")} / {String(memories.length).padStart(2, "0")}
      </div>

      {/* Close */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        {canDelete && onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/40 backdrop-blur flex items-center justify-center transition-all border border-red-400/30"
            title="Delete your memory"
          >
            <Trash2 className="w-5 h-5 text-red-300" />
          </button>
        )}
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition-all border border-white/10"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-shamaal-gold/80 backdrop-blur flex items-center justify-center transition-all border border-white/10 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:text-shamaal-navy" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-shamaal-gold/80 backdrop-blur flex items-center justify-center transition-all border border-white/10 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:text-shamaal-navy" />
      </button>

      {/* Image + Info */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex flex-col items-center max-w-5xl w-full px-4"
      >
        <div className="relative w-full" style={{ maxHeight: "72vh" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]" style={{ height: "72vh" }}>
            <MemoryImage src={m.image} alt={m.title} fill className="object-cover" sizes="90vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Caption bar */}
        <div className="flex items-center justify-between w-full mt-5 px-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-shamaal-gold" />
              <span className="text-shamaal-gold text-xs font-bold tracking-widest uppercase">{m.location}</span>
            </div>
            <h3 className="text-white text-xl font-bold">{m.title}</h3>
            <p className="text-white/50 text-sm mt-0.5">by {m.author}</p>
          </div>
          <div className="flex items-center gap-2 text-shamaal-gold font-bold text-lg">
            <Heart className="w-5 h-5 fill-current" />
            {m.likes}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Film Strip ─────────────────────────────────────────────────────────────
function FilmStrip({ memories }: { memories: Memory[] }) {
  const strip = [...memories, ...memories];
  return (
    <div className="w-full overflow-hidden py-2 relative">
      {/* Edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030b1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030b1a] to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {strip.map((m, i) => (
          <div
            key={i}
            className="relative h-28 w-44 shrink-0 rounded-xl overflow-hidden border-2 border-white/10"
          >
            <MemoryImage src={m.image} alt={m.title} fill className="object-cover opacity-70" sizes="176px" />
            {/* Sprocket holes */}
            <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around pointer-events-none">
              {[0, 1, 2, 3].map((h) => (
                <div key={h} className="w-2 h-3 rounded-sm bg-black/70 border border-white/20" />
              ))}
            </div>
            <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around pointer-events-none">
              {[0, 1, 2, 3].map((h) => (
                <div key={h} className="w-2 h-3 rounded-sm bg-black/70 border border-white/20" />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Memory Card ────────────────────────────────────────────────────────────
function MemoryCard({
  memory, index, onClick, canDelete, onDelete,
}: {
  memory: Memory;
  index: number;
  onClick: () => void;
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(memory.likes);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikeCount((p) => (isLiked ? p - 1 : p + 1));
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDelete || isDeleting) return;
    if (!window.confirm("Delete this memory? This cannot be undone.")) return;
    setIsDeleting(true);
    await onDelete(String(memory.id));
    setIsDeleting(false);
  };

  // Varied heights for masonry feel
  const heights = ["h-72", "h-80", "h-64", "h-96", "h-72", "h-80", "h-64", "h-72", "h-96", "h-80", "h-64", "h-72", "h-80", "h-64", "h-96"];
  const h = heights[index % heights.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: (index % 6) * 0.07, type: "spring", stiffness: 70 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className={`group relative ${h} rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition-shadow duration-700`}
    >
      <MemoryImage
        src={memory.image}
        alt={memory.title}
        fill
        className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Base gradient always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Category badge */}
      {memory.category && (
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
          {memory.category}
        </div>
      )}

      {/* Top actions */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete your memory"
            className="w-9 h-9 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 border border-red-400/40 disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Trash2 className="w-4 h-4 text-white" />}
          </button>
        )}
        <div className="w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-0 group-hover:backdrop-blur-md flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 border border-white/0 group-hover:border-white/30">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-1.5">
          <MapPin className="w-3 h-3 text-shamaal-gold shrink-0" />
          <span className="text-shamaal-gold text-[10px] font-bold tracking-widest uppercase truncate">{memory.location}</span>
        </div>
        <h3 className="text-white text-base font-bold leading-tight mb-3 line-clamp-1">{memory.title}</h3>

        <div className="flex items-center justify-between">
          {/* Author avatar */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-shamaal-gold to-yellow-600 flex items-center justify-center shrink-0">
              <span className="text-shamaal-navy text-[10px] font-black">{memory.author[0]}</span>
            </div>
            <span className="text-white/70 text-xs truncate max-w-[90px]">{memory.author}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button onClick={handleLike} className={`flex items-center gap-1 transition-colors ${isLiked ? "text-red-400" : "text-white/80 hover:text-red-400"}`}>
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs font-bold">{likeCount}</span>
            </button>
            <button onClick={handleShare} className={`transition-colors ${copied ? "text-green-400" : "text-white/80 hover:text-shamaal-gold"}`}>
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Like count always visible */}
          <div className="flex items-center gap-1 text-white/60 opacity-100 group-hover:opacity-0 absolute right-5 transition-opacity">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-xs">{likeCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Upload Modal ────────────────────────────────────────────────────────────
function UploadModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (memory: Memory) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ title: "", location: "", author: "", image: null as File | null });

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Image must be smaller than 4MB.");
      return;
    }
    setError("");
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setError("Please select a photo to upload.");
      return;
    }
    setIsUploading(true);
    setError("");
    const data = new FormData();
    data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("author", formData.author);
    try {
      const res = await fetch("/api/memories", { method: "POST", body: data });
      const result = await res.json();
      if (res.ok && result.memory) {
        setUploadSuccess(true);
        onSuccess(result.memory);
        setTimeout(onClose, 1800);
      } else {
        setError(result.error || "Upload failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-[#040f21] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-shamaal-gold to-transparent" />

        {/* Glow bg */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-shamaal-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-shamaal-gold text-[10px] font-black tracking-[0.25em] uppercase mb-1">Share Your Journey</p>
              <h2 className="text-2xl font-black text-white">Upload a Memory</h2>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {uploadSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Memory Shared!</h3>
              <p className="text-white/50">Your photo is now live in the gallery.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}
              {/* Drag & Drop Upload */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 border-dashed transition-all duration-300 ${
                  preview ? "border-shamaal-gold/60" : "border-white/10 hover:border-shamaal-gold/40"
                }`}
                style={{ height: preview ? "200px" : "130px" }}
              >
                {preview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-shamaal-gold/20 border border-shamaal-gold/50 text-shamaal-gold px-4 py-2 rounded-full text-xs font-bold backdrop-blur">
                        Click to change photo
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-3 text-white/40">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold">Drop photo here or <span className="text-shamaal-gold">browse</span></p>
                    <p className="text-xs">JPG, PNG, WEBP · Max 4MB</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/*" className="hidden" onChange={handleFileInput} />

              {/* Fields */}
              {[
                { label: "Memory Title", key: "title", placeholder: "e.g. Golden Hour at Attabad Lake" },
                { label: "Location", key: "location", placeholder: "e.g. Hunza Valley" },
                { label: "Your Name", key: "author", placeholder: "How to credit you?" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-white/50 tracking-widest uppercase mb-2">{f.label}</label>
                  <input
                    type="text"
                    required
                    placeholder={f.placeholder}
                    value={(formData as any)[f.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-shamaal-gold/60 focus:bg-white/8 rounded-xl px-5 py-3.5 text-white placeholder-white/20 outline-none transition-all duration-300 text-sm"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isUploading || !formData.image || !formData.title || !formData.location || !formData.author}
                className="w-full bg-gradient-to-r from-shamaal-gold via-yellow-400 to-shamaal-gold text-shamaal-navy font-black rounded-xl py-4 flex items-center justify-center gap-2 hover:shadow-[0_8px_40px_rgba(255,182,4,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isUploading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
                ) : (
                  <><Camera className="w-5 h-5" /> Share My Memory</>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const SIZES: ("large" | "medium" | "small")[] = ["large", "medium", "small", "medium", "large", "small"];

function normalizeMemory(item: Memory, index: number): Memory {
  return {
    ...item,
    size: item.size || SIZES[index % SIZES.length],
    category: item.category || "Landscapes",
    likes: item.likes ?? 0,
  };
}

function mergeMemories(userMemories: Memory[]): Memory[] {
  const normalizedUser = userMemories.map((item, i) => normalizeMemory(item, i));
  const userIds = new Set(normalizedUser.map((m) => String(m.id)));
  const fallbacks = FALLBACK_MEMORIES.filter((m) => !userIds.has(String(m.id)));
  return [...normalizedUser, ...fallbacks];
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>(FALLBACK_MEMORIES);
  const [filtered, setFiltered] = useState<Memory[]>(FALLBACK_MEMORIES);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 120]);

  const loadMemories = useCallback(async () => {
    try {
      const res = await fetch("/api/memories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMemories(mergeMemories(data));
      }
    } catch {
      setMemories(FALLBACK_MEMORIES);
    }
  }, []);

  const handleUploadSuccess = useCallback((memory: Memory) => {
    if (memory.deleteToken) {
      addOwnedMemory(String(memory.id), memory.deleteToken);
      setOwnedIds((prev) => new Set([...prev, String(memory.id)]));
    }
    setMemories((prev) => {
      const normalized = normalizeMemory(memory, 0);
      const rest = prev.filter((m) => String(m.id) !== String(memory.id));
      return [normalized, ...rest];
    });
    setActiveCategory("All");
    loadMemories();
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [loadMemories]);

  const handleDeleteMemory = useCallback(async (id: string) => {
    const deleteToken = getDeleteToken(id);
    if (!deleteToken) {
      alert("You can only delete memories that you uploaded.");
      return;
    }

    try {
      const res = await fetch(`/api/memories/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteToken }),
      });
      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Could not delete this memory.");
        return;
      }

      removeOwnedMemory(id);
      setOwnedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setMemories((prev) => prev.filter((m) => String(m.id) !== id));
      setLightboxIndex(null);
    } catch {
      alert("Something went wrong while deleting.");
    }
  }, []);

  useEffect(() => {
    setOwnedIds(new Set(getOwnedMemories().map((m) => m.id)));
  }, []);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(memories);
    } else {
      setFiltered(memories.filter((m) => m.category === activeCategory));
    }
  }, [activeCategory, memories]);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i === null || i === 0 ? filtered.length - 1 : i - 1)), [filtered]);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length)), [filtered]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-shamaal-cream dark:bg-[#030b1a] text-shamaal-navy dark:text-white overflow-x-hidden">

        {/* ── Cinematic Hero ── */}
        <section ref={heroRef} className="relative h-[92vh] flex items-end pb-20 overflow-hidden">
          {/* Background collage */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-40">
            {memories.slice(0, 6).map((m, i) => (
              <div key={i} className="relative overflow-hidden">
                <MemoryImage src={m.image} alt={m.title} fill className="object-cover scale-110" sizes="33vw" />
              </div>
            ))}
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030b1a]/60 via-[#030b1a]/40 to-[#030b1a]" />
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,182,4,0.08)_0%,_transparent_70%)]" />

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-shamaal-gold/60" />
              <span className="text-shamaal-gold text-xs font-black tracking-[0.3em] uppercase">Traveller Gallery</span>
              <Sparkles className="w-4 h-4 text-shamaal-gold" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] mb-6"
            >
              <span className="block text-shamaal-navy dark:text-white">Stories</span>
              <span className="block">from the <span className="text-shamaal-gold">North</span></span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-gray-600 dark:text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            >
              {memories.length.toLocaleString('en-IN')}+ breathtaking moments captured by real explorers
              across Pakistan's magnificent Great North.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-3 bg-shamaal-gold hover:bg-yellow-400 text-shamaal-navy font-black px-8 py-4 rounded-full transition-all duration-500 hover:shadow-[0_10px_50px_rgba(255,182,4,0.4)] hover:scale-105 active:scale-95"
              >
                <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Share Your Memory
              </button>
              <button
                type="button"
                className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-shamaal-navy dark:text-white font-bold px-8 py-4 rounded-full border border-gray-200 dark:border-white/10 transition-all"
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="w-4 h-4" />
                View Gallery
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-white/30"
          >
            <div className="w-5 h-8 rounded-full border border-gray-300 dark:border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-shamaal-gold" />
            </div>
          </motion.div>
        </section>

        {/* ── Film Strip ── */}
        <section className="bg-[#030b1a] py-6 border-y border-white/5">
          <div className="flex items-center gap-4 max-w-7xl mx-auto px-6 mb-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-white/20 text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-2">
              <Camera className="w-3 h-3" /> Recent Captures
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <FilmStrip memories={memories} />
        </section>

        {/* ── Category Filter + Gallery ── */}
        <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-shamaal-navy"
                    : "text-gray-600 dark:text-white/50 hover:text-shamaal-navy dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-shamaal-gold"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}

            <div className="ml-auto text-gray-500 dark:text-white/30 text-sm font-bold">
              {filtered.length} photos
            </div>
          </div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
            >
              {filtered.map((memory, index) => (
                <div key={memory.id} className="break-inside-avoid mb-5">
                  <MemoryCard
                    memory={memory}
                    index={index}
                    onClick={() => openLightbox(index)}
                    canDelete={ownedIds.has(String(memory.id))}
                    onDelete={handleDeleteMemory}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-32 text-gray-500 dark:text-white/30">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-bold">No memories in this category yet.</p>
            </div>
          )}
        </section>

        {/* ── CTA Banner ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d1f3e 0%, #1b2f5a 50%, #0d1f3e 100%)" }}
          >
            {/* Background mosaic */}
            <div className="absolute inset-0 grid grid-cols-4 gap-0.5 opacity-20">
              {memories.slice(0, 8).map((m, i) => (
                <div key={i} className="relative overflow-hidden">
                  <MemoryImage src={m.image} alt="" fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-shamaal-navy/95 via-shamaal-navy/80 to-shamaal-navy/95" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-shamaal-gold/60 to-transparent" />
            {/* Gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-shamaal-gold/10 blur-[120px] rounded-full" />

            <div className="relative z-10 text-center py-20 px-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-shamaal-gold/10 border border-shamaal-gold/30 text-shamaal-gold px-5 py-2.5 rounded-full text-xs font-black tracking-[0.25em] uppercase mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Be Part of the Story
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Your Journey Deserves<br />to be <span className="text-shamaal-gold">Remembered</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Upload your favourite travel photo from any Shamaal tour and inspire thousands of future explorers.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-3 bg-shamaal-gold hover:bg-yellow-400 text-shamaal-navy font-black px-10 py-5 rounded-full text-lg transition-all duration-500 hover:shadow-[0_15px_60px_rgba(255,182,4,0.4)] hover:scale-105 active:scale-95"
              >
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Upload Your Memory
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            memories={filtered}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
            canDelete={ownedIds.has(String(filtered[lightboxIndex]?.id))}
            onDelete={() => {
              const id = String(filtered[lightboxIndex!]?.id);
              if (window.confirm("Delete this memory? This cannot be undone.")) {
                handleDeleteMemory(id);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <UploadModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}
