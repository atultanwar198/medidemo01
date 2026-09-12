"use client";

import { useEffect, useState } from "react";

export default function Scroll() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-transparent">
      <div
        className="h-full bg-[#0969da] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
