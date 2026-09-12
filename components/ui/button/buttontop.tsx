"use client";

import { ArrowUp } from "lucide-react";

export default function ButtonTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 
      items-center justify-center overflow-hidden 
      rounded-full border border-[#1f6feb]/30 bg-[#0969da] 
      font-semibold text-white shadow-[0_2px_8px_rgba(9,105,218,0.3)] 
      transition-all duration-300 hover:w-36 hover:rounded-full 
      hover:bg-[#218bff] hover:shadow-[0_4px_12px_rgba(9,105,218,0.4)]"
    >
      <ArrowUp
        size={18}
        strokeWidth={2}
        className="text-white transition-transform duration-300 group-hover:-translate-y-[200%]"
      />

      <span className="absolute text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
        Back to Top
      </span>
    </button>
  );
}
