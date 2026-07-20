"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, Minimize2 } from "lucide-react";

function BotAvatar({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/chatbot-logo.png"
      alt="Shamaal AI"
      width={size}
      height={size}
      className={`object-contain bg-transparent ${className}`}
    />
  );
}

type BotResponse = { text: string; quick?: string[] };

const QUICK_REPLIES = [
  "Popular tours 🏔️",
  "Pricing 💰",
  "Book a tour 📋",
  "Hunza Valley 🌄",
  "Skardu & K2 ⛰️",
  "Custom tours ✨",
  "Contact us 📞",
];

function getBotResponse(msg: string): BotResponse {
  const m = msg.toLowerCase().trim();

  if (/^(hi|hello|hey|salam|assalam|good\s?(morning|afternoon|evening|day)|howdy)/i.test(m)) {
    return {
      text: "👋 Assalam-o-Alaikum! Welcome to **Shamaal Tourism** — Pakistan's #1 premium tour operator!\n\nI'm your AI travel assistant. I can help you with:\n• 🏔️ Tour packages & destinations\n• 💰 Pricing & availability\n• 📋 Booking process\n• ✈️ Custom itineraries\n• 📞 Contact & support\n\nWhat would you like to explore today?",
      quick: QUICK_REPLIES,
    };
  }

  if (/popular|best|top|featured|recommend|tour packages?|packages?/i.test(m)) {
    return {
      text: "🌟 **Our Most Popular Tours:**\n\n1. 🏔️ **Hunza Extravaganza** — 7 Days | From PKR 45,000\n   Attabad Lake, Passu Cones, Altit Fort\n\n2. ⛰️ **Skardu & K2 Base Camp** — 10 Days | From PKR 75,000\n   Shangrilla, Cold Desert, Concordia Trek\n\n3. 🌿 **Fairy Meadows Trek** — 5 Days | From PKR 35,000\n   Base of Nanga Parbat, camping under stars\n\n4. 🚗 **Naran Kaghan Adventure** — 6 Days | From PKR 38,000\n   Lake Saiful Maluk, Babusar Top, Lulusar\n\n5. 🎭 **Chitral & Kalash** — 8 Days | From PKR 55,000\n   Shandur Polo Ground, Kalash Valleys",
      quick: ["Hunza Valley 🌄", "Skardu & K2 ⛰️", "Fairy Meadows 🌿", "Book a tour 📋", "Pricing 💰"],
    };
  }

  if (/hunza|attabad|passu|karimabad|altit|baltit|rakaposhi/i.test(m)) {
    return {
      text: "🏔️ **Hunza Valley — Valley of Eternal Youth**\n\n📍 Located in Gilgit-Baltistan at 2,438m elevation\n\n**What's Included:**\n✅ Transport from Lahore/Islamabad\n✅ 3-4 star hotel accommodation\n✅ Experienced local guide\n✅ All breakfasts & dinners\n✅ Attabad Lake boat ride\n✅ Passu Cones viewpoint visit\n✅ Altit & Baltit Fort entry\n\n**Duration:** 7 Days / 6 Nights\n**Price:** From PKR 45,000/person\n**Best Season:** April–October\n\n📌 Group discounts available for 4+ people!",
      quick: ["Book Hunza tour 📋", "Pricing 💰", "Custom tours ✨", "Contact us 📞"],
    };
  }

  if (/skardu|k2|concordia|shangrilla|cold desert|baltistan|deosai|shigar/i.test(m)) {
    return {
      text: "⛰️ **Skardu & K2 Base Camp — Throne of Mountains**\n\n📍 Home to the world's 2nd highest peak — K2 (8,611m)\n\n**Tour Highlights:**\n🏕️ Concordia — meeting point of 4 glaciers\n🏞️ Shangrilla Resort & Upper Kachura Lake\n🐪 Sarfaranga Cold Desert (world's highest)\n🏰 Kharphocho Fort with Indus valley views\n🌊 Deosai National Park\n\n**Duration:** 10 Days / 9 Nights\n**Price:** From PKR 75,000/person\n**Best Season:** June–September\n\n⚡ Limited spots — book 2 months in advance!",
      quick: ["Book Skardu tour 📋", "Pricing 💰", "Fairy Meadows 🌿", "Contact us 📞"],
    };
  }

  if (/fairy|meadow|nanga|parbat|raikot/i.test(m)) {
    return {
      text: "🌿 **Fairy Meadows — Base of the Killer Mountain**\n\n📍 At 3,300m, facing Nanga Parbat (8,126m)\n\n**Experience:**\n⛺ Glamping under a blanket of stars\n🌄 Breathtaking sunrise on Nanga Parbat\n🦅 Wildlife spotting — Markhor, Ibex\n🌸 Alpine meadows in full bloom\n🥾 Optional Nanga Parbat Base Camp trek\n\n**Duration:** 5 Days / 4 Nights\n**Price:** From PKR 35,000/person\n**Best Season:** May–September",
      quick: ["Book Fairy Meadows 📋", "Pricing 💰", "Popular tours 🏔️", "Contact us 📞"],
    };
  }

  if (/naran|kaghan|saiful|maluk|babusar|lulusar|ansoo/i.test(m)) {
    return {
      text: "🚗 **Naran Kaghan Adventure**\n\n📍 The Heart of the Himalayas\n\n**Tour Includes:**\n💎 Lake Saiful Malook at 3,224m\n🏔️ Babusar Top at 13,690 feet\n💧 Lulusar & Dudipatsar Lakes\n🌊 Ansoo Lake (Tear-shaped hidden gem)\n🎣 Kunhar River trout fishing\n\n**Duration:** 6 Days / 5 Nights\n**Price:** From PKR 38,000/person\n**Best Season:** June–September\n\nPerfect for families and first-time trekkers!",
      quick: ["Book Naran tour 📋", "Pricing 💰", "Popular tours 🏔️", "Contact us 📞"],
    };
  }

  if (/swat|kalam|malam|jabba|mingora|mahodand/i.test(m)) {
    return {
      text: "🌊 **Swat — Switzerland of Pakistan**\n\n📍 Khyber Pakhtunkhwa's crown jewel\n\n**Must-See Spots:**\n🏞️ Kalam Valley — lush alpine meadows\n⛷️ Malam Jabba Ski Resort\n💧 Mahodand Lake & Ushu Forest\n🏛️ Buddhist Archaeological sites\n🌺 Swat Meadows in spring bloom\n\n**Duration:** 5 Days / 4 Nights\n**Price:** From PKR 28,000/person\n**Best Season:** April–October",
      quick: ["Book Swat tour 📋", "Pricing 💰", "Popular tours 🏔️", "Contact us 📞"],
    };
  }

  if (/chitral|kalash|shandur|polo|bumburet|rumbur/i.test(m)) {
    return {
      text: "🎭 **Chitral & Kalash — Ancient Culture Meets Mountains**\n\n📍 Northwestern Pakistan near Afghan border\n\n**Cultural Highlights:**\n🎪 Kalash Festivals — Chilam Joshi & Uchal\n⛷️ Shandur Polo Festival\n🏛️ Chitral Fort & Museum\n🌺 Kalash Valleys — Bumburet, Rumbur, Birir\n🏔️ Tirich Mir viewpoints (7,708m)\n\n**Duration:** 8 Days / 7 Nights\n**Price:** From PKR 55,000/person\n**Best Season:** May–September",
      quick: ["Book Chitral tour 📋", "Pricing 💰", "Popular tours 🏔️", "Contact us 📞"],
    };
  }

  if (/price|pricing|cost|how much|rate|fee|budget|expensive|cheap|afford/i.test(m)) {
    return {
      text: "💰 **Shamaal Tourism — Price Guide**\n\n• Hunza Valley — 7 Days — PKR 45,000/person\n• Skardu & K2 — 10 Days — PKR 75,000/person\n• Fairy Meadows — 5 Days — PKR 35,000/person\n• Naran Kaghan — 6 Days — PKR 38,000/person\n• Swat Valley — 5 Days — PKR 28,000/person\n• Chitral Kalash — 8 Days — PKR 55,000/person\n• Custom Tour — Flexible — On Request\n\n✅ **All prices include:**\n• AC transport (coaster/hiace)\n• Hotel accommodation\n• Breakfast & dinner\n• Licensed tour guide\n• Permits & entry fees\n\n📌 Group discounts: 5% off for 4+, 10% off for 8+ people",
      quick: ["Book a tour 📋", "Custom tours ✨", "Popular tours 🏔️", "Contact us 📞"],
    };
  }

  if (/book|booking|reserve|reservation|register|how to book/i.test(m)) {
    return {
      text: "📋 **How to Book with Shamaal Tourism**\n\n**Step 1: Choose Your Tour**\nBrowse our packages or tell us your dream destination\n\n**Step 2: Confirm & Pay Advance**\n• 30% advance payment to reserve your spot\n• Remaining 70% before departure\n• EasyPaisa/JazzCash/Bank Transfer accepted\n\n**Step 3: Pack & Go!**\nWe handle everything — just bring your excitement! 🎒\n\n📞 **Book Now:**\n• Call/WhatsApp: **0318-0425044**\n• Email: **Shamaaltours@gmail.com**\n\nSpots fill up fast — book 4-6 weeks in advance!",
      quick: ["Contact us 📞", "Pricing 💰", "Custom tours ✨", "Popular tours 🏔️"],
    };
  }

  if (/custom|private|personal|honeymoon|family|corporate|group|bespoke|tailor/i.test(m)) {
    return {
      text: "✨ **Custom & Private Tours**\n\nWe specialize in tailor-made experiences for:\n\n💑 **Honeymoon Packages** — Romantic Hunza & Skardu\n👨‍👩‍👧 **Family Adventures** — Kid-friendly itineraries\n🏢 **Corporate Retreats** — Team building in nature\n👥 **Group Tours** — Customized for 10+ people\n🥾 **Trekking Expeditions** — K2, Nanga Parbat\n📸 **Photography Tours** — Golden-hour landscapes\n\n**We customize:**\n✅ Destination & duration\n✅ Accommodation level\n✅ Activities & pace\n✅ Meal preferences\n✅ Private transport",
      quick: ["Contact us 📞", "Pricing 💰", "Book a tour 📋", "Popular tours 🏔️"],
    };
  }

  if (/contact|phone|number|call|email|address|office|whatsapp|reach|location/i.test(m)) {
    return {
      text: "📞 **Contact Shamaal Tourism**\n\n🏢 **Office:**\nUG-18 Big City Plaza, Liberty Roundabout, Lahore\n\n📱 **Phone / WhatsApp:**\n• 0318-0425044\n• 0318-0425025\n\n📧 **Email:**\nShamaaltours@gmail.com\n\n🕐 **Office Hours:**\nMon–Sat: 9:00 AM – 7:00 PM\nSun: 11:00 AM – 5:00 PM\n\n💬 **Social Media:**\n• Instagram: @shamaaltourism\n• Facebook: /shamaaltourism\n• YouTube: @shamaaltourism",
      quick: ["Book a tour 📋", "Popular tours 🏔️", "Pricing 💰", "Custom tours ✨"],
    };
  }

  if (/about|who are you|company|shamaal|history|experience|certified|dts|licensed/i.test(m)) {
    return {
      text: "🏔️ **About Shamaal Tourism**\n\nPakistan's premier tour operator — connecting travellers to the breathtaking beauty of the Great North.\n\n🏆 **Our Credentials:**\n• DTS Licensed — Licence #10475\n• Pakistan Tourism Authority Verified\n• 12+ years of experience\n• 1,200+ tours completed\n• 50,000+ happy travellers\n• 4.9★ average rating (3,500+ reviews)\n\n🌟 **Why Choose Us:**\n✅ Safety-first approach\n✅ Expert local guides\n✅ Best price guarantee\n✅ 24/7 support on tour\n✅ Fully insured",
      quick: ["Popular tours 🏔️", "Pricing 💰", "Book a tour 📋", "Contact us 📞"],
    };
  }

  if (/season|weather|when|best time|month|summer|winter|spring|autumn/i.test(m)) {
    return {
      text: "🌤️ **Best Time to Visit**\n\n**Spring (April–May)**\n🌸 Cherry blossoms in Hunza & Skardu\nBest for: Hunza, Swat, Chitral\n\n**Summer (June–August)**\n☀️ Peak season — all routes open\nBest for: All destinations, K2 treks\n\n**Autumn (Sep–Oct)**\n🍂 Golden leaves, crisp air, best photography\nBest for: Hunza, Naran, Fairy Meadows\n\n**Winter (Nov–Mar)**\n❄️ Snow landscapes, skiing at Malam Jabba\nLimited routes available\n\n🎯 We operate tours year-round!",
      quick: ["Popular tours 🏔️", "Book a tour 📋", "Contact us 📞"],
    };
  }

  if (/safe|safety|insur|medical|emergency|risk/i.test(m)) {
    return {
      text: "🛡️ **Safety & Insurance**\n\nYour safety is our #1 priority:\n\n✅ Fully insured tours — travel & medical coverage\n✅ Experienced guides — min. 5 years experience\n✅ First aid trained staff on every tour\n✅ Emergency protocols — 24/7 support\n✅ Satellite communication for remote areas\n✅ DTS licensed & government registered\n✅ Vehicle safety checks before every departure\n\nHave a specific safety question? Contact our team!",
      quick: ["Contact us 📞", "Book a tour 📋", "About Shamaal 🏔️"],
    };
  }

  if (/food|meal|eat|lunch|dinner|breakfast|vegetarian|diet|halal/i.test(m)) {
    return {
      text: "🍽️ **Food & Meals on Tour**\n\n**Included in packages:**\n✅ Daily breakfast at hotel\n✅ Dinner at local restaurants\n\n**Northern Pakistani Cuisine:**\n🥘 Chapshuro (meat-filled bread)\n🍲 Harissa & local curries\n🫖 Hunza Doodh Pati tea\n🍑 Fresh Hunza apricots & mulberries\n\n**Dietary requirements:**\n✅ Halal food guaranteed\n✅ Vegetarian options available\n✅ Dietary restrictions — inform us at booking",
      quick: ["Popular tours 🏔️", "Book a tour 📋", "Pricing 💰"],
    };
  }

  if (/trek|trekking|hike|hiking|climb|adventure|concordia|base camp/i.test(m)) {
    return {
      text: "🥾 **Trekking & Adventure Tours**\n\n⛰️ **K2 Base Camp (Concordia)** — 12 Days\nDifficulty: Challenging | PKR 95,000+\n\n🏔️ **Nanga Parbat Base Camp** — 7 Days\nDifficulty: Moderate | PKR 50,000+\n\n🌿 **Deosai Plateau Crossing** — 3 Days\nDifficulty: Easy-Moderate | PKR 25,000+\n\n💎 **Ansoo Lake Trek** — 2 Days\nDifficulty: Moderate | PKR 18,000+\n\nAll treks include guide, porter, camping gear & meals",
      quick: ["Book a trek 📋", "Pricing 💰", "Custom tours ✨", "Contact us 📞"],
    };
  }

  if (/thank|thanks|jazakallah|shukria|great|awesome|perfect|wonderful/i.test(m)) {
    return {
      text: "😊 **You're most welcome!**\n\nWe're thrilled to assist you on your journey to Pakistan's magnificent North! 🏔️\n\nThe mountains are calling — and we're here to take you there safely and unforgettably.\n\nIs there anything else you'd like to know?\n\n📞 Or contact us directly: **0318-0425044**",
      quick: QUICK_REPLIES,
    };
  }

  if (/bye|goodbye|good night|take care|see you|later|khuda hafiz|allah hafiz/i.test(m)) {
    return {
      text: "👋 **Khuda Hafiz! Safe travels!**\n\nThank you for visiting Shamaal Tourism. We hope to see you on our next adventure! 🏔️\n\nWhenever you're ready to explore Pakistan's Great North, we'll be here.\n\nFollow us @shamaaltourism for stunning travel photos!",
      quick: ["Start over 🔄"],
    };
  }

  return {
    text: "🤔 I'd love to help with that! Let me connect you with our travel experts.\n\n📞 **Reach us directly:**\n• WhatsApp/Call: **0318-0425044**\n• Email: **Shamaaltours@gmail.com**\n\nOr try asking about:\n• Specific destinations (Hunza, Skardu, etc.)\n• Tour pricing & packages\n• Booking process\n• Custom/private tours",
    quick: QUICK_REPLIES,
  };
}

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  quick?: string[];
  time: string;
};

function formatText(text: string) {
  return text.split("\n").map((line, i) => {
    const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (line === "") return <div key={i} className="h-1" />;
    return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "👋 Assalam-o-Alaikum! I'm **Shamaal AI** — your personal travel guide for Pakistan's Great North!\n\nAsk me about tours, pricing, destinations, or booking! 🏔️",
  quick: QUICK_REPLIES,
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages, open, minimized]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimized]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
    const response = getBotResponse(text);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      text: response.text,
      quick: response.quick,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, botMsg]);
    setTyping(false);
  }, []);

  const reset = () => {
    setMessages([{ ...WELCOME, id: Date.now().toString() }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button — stacked above WhatsApp */}
      <motion.button
        onClick={() => { setOpen(true); setMinimized(false); }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-[7.25rem] right-6 z-50 group"
        aria-label="Open Shamaal AI chat"
        title="Chat with Shamaal AI"
        style={{ display: open ? "none" : undefined }}
      >
        <span className="absolute inset-0 rounded-full bg-shamaal-gold/30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-shamaal-gold/15 animate-ping" style={{ animationDelay: "0.6s" }} />
        <div className="relative w-[72px] h-[72px] flex items-center justify-center overflow-visible">
          <BotAvatar size={88} className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] scale-110" />
        </div>
        <span className="absolute right-[5.25rem] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#060d1a] text-white text-xs font-bold px-3 py-1.5 rounded-full border border-shamaal-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none">
          💬 Ask Shamaal AI
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 z-[60] w-[360px] max-w-[calc(100vw-1.75rem)] rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-white/[0.06] flex flex-col"
            style={{ maxHeight: minimized ? "auto" : "min(600px, calc(100vh - 2rem))" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#060d1a] via-[#0d1a30] to-[#060d1a] px-4 py-3.5 flex items-center gap-3 border-b border-white/[0.06]">
              <div className="relative w-12 h-12 shrink-0">
                <BotAvatar size={48} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#060d1a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-sm tracking-wide leading-tight">Shamaal AI</p>
                <p className="text-green-400 text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                  Online — replies instantly
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} title="Reset chat" className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/50 hover:text-white">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setMinimized(!minimized)} title="Minimize" className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/50 hover:text-white">
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setOpen(false)} title="Close" className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/50 hover:text-red-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence>
              {!minimized && (
                <motion.div
                  key="body"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex flex-col overflow-hidden"
                  style={{ maxHeight: "calc(min(600px, 100vh - 2rem) - 72px)" }}
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-[#070f1d]">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {msg.role === "bot" && (
                          <div className="w-9 h-9 shrink-0 mt-1">
                            <BotAvatar size={36} />
                          </div>
                        )}
                        <div className={`flex flex-col gap-1.5 max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                          <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed space-y-0.5 ${
                            msg.role === "user"
                              ? "bg-gradient-to-br from-shamaal-gold to-amber-500 text-[#060d1a] font-semibold rounded-tr-sm shadow-[0_4px_16px_rgba(255,182,4,0.25)]"
                              : "bg-white/[0.06] border border-white/[0.07] text-white/90 rounded-tl-sm"
                          }`}>
                            {msg.role === "bot" ? formatText(msg.text) : msg.text}
                          </div>
                          <span className="text-white/25 text-[9px]">{msg.time}</span>
                          {msg.quick && msg.role === "bot" && (
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {msg.quick.map((q) => (
                                <button key={q} onClick={() => sendMessage(q)}
                                  className="text-[10px] px-2.5 py-1 rounded-full border border-shamaal-gold/30 text-shamaal-gold/90 bg-shamaal-gold/5 hover:bg-shamaal-gold hover:text-[#060d1a] transition-all duration-300 font-semibold whitespace-nowrap">
                                  {q}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {typing && (
                      <div className="flex gap-2.5">
                        <div className="w-9 h-9 shrink-0">
                          <BotAvatar size={36} />
                        </div>
                        <div className="bg-white/[0.06] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                          {[0, 0.18, 0.36].map((d) => (
                            <motion.span key={d} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                              className="w-1.5 h-1.5 bg-shamaal-gold/60 rounded-full block" />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Input Bar */}
                  <div className="bg-[#060d1a] border-t border-white/[0.06] p-3 flex items-center gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                      placeholder="Ask about tours, pricing, destinations..."
                      className="flex-1 bg-white/[0.06] border border-white/[0.07] rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-shamaal-gold/40 focus:bg-white/[0.09] transition-all duration-300"
                    />
                    <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}
                      className="w-9 h-9 rounded-full bg-shamaal-gold disabled:opacity-40 flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300 shadow-[0_0_16px_rgba(255,182,4,0.3)] shrink-0">
                      <Send className="w-3.5 h-3.5 text-[#060d1a]" />
                    </button>
                  </div>

                  <div className="bg-[#060d1a] text-center py-1.5 text-[9px] text-white/20 border-t border-white/[0.04]">
                    Powered by <span className="text-shamaal-gold/50">Shamaal AI</span> · Pakistan&apos;s #1 Tour Operator
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
