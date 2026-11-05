import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame } from 'lucide-react';

export const AnnouncementBar: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const announcements = [
    { text: "FRESH ART. LOUD WALLS.", sub: "DROP 04 IS LIVE" },
    { text: "NEW DROP: AFTER HOURS & NO SIGNAL", sub: "EXPLORE NOW" },
    { text: "ALL INDIA EXPRESS DISPATCH", sub: "ORDERS > ₹1499 SHIP FREE" },
    { text: "300 GSM ARCHIVAL COTTON", sub: "ZERO COMPROMISE" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="bg-brand-ink text-brand-paper border-b border-brand-ink/80 text-xs font-mono py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-brand-muted text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span>NEW RELEASE // EDITION 2026</span>
        </div>

        <div className="flex-1 flex justify-center items-center gap-3 overflow-hidden text-center cursor-pointer" onClick={() => onNavigate('shop')}>
          <span className="font-bold tracking-wider text-brand-paper hover:text-brand-red transition-colors flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-brand-red" />
            {announcements[currentIndex].text}
          </span>
          <span className="hidden sm:inline text-brand-muted">//</span>
          <span className="hidden sm:inline text-brand-red font-semibold tracking-widest text-[11px] hover:underline flex items-center gap-1">
            {announcements[currentIndex].sub}
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-brand-muted text-[11px]">
          <button onClick={() => onNavigate('track')} className="hover:text-brand-paper transition-colors">
            TRACK ORDER
          </button>
          <span>/</span>
          <span className="text-brand-red font-bold">INR (₹)</span>
        </div>
      </div>
    </div>
  );
};

