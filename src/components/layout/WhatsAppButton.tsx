"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923180425044"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-3.5 md:p-4 rounded-full shadow-2xl shadow-green-500/50 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-bold">
        Chat with us
      </span>
    </a>
  );
}
