import React from 'react';

interface PosterSvgProps {
  id: string;
  className?: string;
  variant?: 'artwork' | 'room' | 'detail' | 'scale';
}

export const PosterArtSvg: React.FC<PosterSvgProps> = ({ id, className = "w-full h-full object-cover", variant = 'artwork' }) => {
  // Return tailored high-fidelity editorial poster art per ID
  switch (id) {
    case 'after-hours':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#101010" />
          <defs>
            <linearGradient id="g-ah" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EF171C" />
              <stop offset="100%" stopColor="#8A0004" />
            </linearGradient>
            <filter id="noise-ah">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
              <feComposite in2="SourceGraphic" in="glitch" operator="in" />
            </filter>
          </defs>
          <circle cx="350" cy="460" r="230" fill="url(#g-ah)" />
          {/* Brutalist typographic blocks */}
          <path d="M 120 280 Q 350 180 580 320 T 480 620" fill="none" stroke="#F4F2EC" strokeWidth="24" strokeLinecap="square" />
          <path d="M 200 480 C 280 360, 420 540, 520 420" fill="none" stroke="#101010" strokeWidth="18" strokeDasharray="12 8" />
          <text x="60" y="140" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="68" fontWeight="900" letterSpacing="-2">AFTER HOURS</text>
          <text x="60" y="180" fill="#EF171C" fontFamily="'JetBrains Mono', monospace" fontSize="16" letterSpacing="4">WALTIER ARCHIVE // VOL. 01</text>
          <rect x="60" y="210" width="120" height="4" fill="#EF171C" />
          <text x="60" y="850" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="130" fontWeight="900" opacity="0.85">02:47</text>
          <text x="60" y="890" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="14">TOKYO METROPOLITAN UNDERGROUND SOUNDSCAPE</text>
          {/* Halftone / barcode accents */}
          <rect x="540" y="810" width="100" height="60" fill="#F4F2EC" />
          <rect x="546" y="816" width="6" height="48" fill="#101010" />
          <rect x="556" y="816" width="3" height="48" fill="#101010" />
          <rect x="563" y="816" width="12" height="48" fill="#101010" />
          <rect x="580" y="816" width="4" height="48" fill="#101010" />
          <rect x="588" y="816" width="16" height="48" fill="#101010" />
          <rect x="610" y="816" width="8" height="48" fill="#101010" />
          <rect x="622" y="816" width="10" height="48" fill="#101010" />
        </svg>
      );

    case 'no-signal':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#F4F2EC" />
          {/* TV Test Pattern Bars */}
          <rect x="70" y="160" width="80" height="420" fill="#101010" />
          <rect x="150" y="160" width="80" height="420" fill="#EF171C" />
          <rect x="230" y="160" width="80" height="420" fill="#77736E" />
          <rect x="310" y="160" width="80" height="420" fill="#D8D4CC" />
          <rect x="390" y="160" width="80" height="420" fill="#101010" />
          <rect x="470" y="160" width="80" height="420" fill="#EF171C" />
          <rect x="550" y="160" width="80" height="420" fill="#101010" />
          
          <line x1="70" y1="370" x2="630" y2="370" stroke="#F4F2EC" strokeWidth="8" />
          
          <circle cx="350" cy="370" r="140" fill="none" stroke="#101010" strokeWidth="16" />
          <line x1="350" y1="210" x2="350" y2="530" stroke="#101010" strokeWidth="6" />
          <line x1="190" y1="370" x2="510" y2="370" stroke="#101010" strokeWidth="6" />
          
          <rect x="140" y="325" width="420" height="90" fill="#101010" />
          <text x="350" y="388" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="62" fontWeight="900" textAnchor="middle" letterSpacing="4">NO SIGNAL</text>
          
          <text x="70" y="110" fill="#101010" fontFamily="'JetBrains Mono', monospace" fontSize="22" fontWeight="700">CH-00 // FREQ 942.85 MHZ</text>
          <text x="70" y="680" fill="#101010" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="48" fontWeight="800" letterSpacing="-1">DISCONNECT TO RECONNECT</text>
          <text x="70" y="730" fill="#77736E" fontFamily="'General Sans', sans-serif" fontSize="18">Visual static as intentional meditation. High-frequency analog distortion.</text>
          <text x="70" y="870" fill="#EF171C" fontFamily="'JetBrains Mono', monospace" fontSize="18" fontWeight="600">[STANDBY MODE PERMANENT]</text>
        </svg>
      );

    case 'loud-silence':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#101010" />
          <circle cx="350" cy="400" r="280" fill="none" stroke="#333333" strokeWidth="2" />
          <circle cx="350" cy="400" r="210" fill="none" stroke="#EF171C" strokeWidth="4" strokeDasharray="14 10" />
          <circle cx="350" cy="400" r="140" fill="none" stroke="#F4F2EC" strokeWidth="8" />
          <circle cx="350" cy="400" r="70" fill="#EF171C" />

          {/* Bold Japanese / Kanji & typography */}
          <text x="350" y="720" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="82" fontWeight="900" textAnchor="middle" letterSpacing="-1">LOUD SILENCE</text>
          <text x="350" y="770" fill="#EF171C" fontFamily="'General Sans', sans-serif" fontSize="24" fontWeight="600" textAnchor="middle" letterSpacing="6">QUIET MINDS SPEAK VOLUMES</text>
          <text x="350" y="840" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="15" textAnchor="middle">WALTIER SOUND & RHYTHM SERIES — SPECIMEN 03</text>
          <rect x="250" y="870" width="200" height="3" fill="#EF171C" />
          <text x="350" y="905" fill="#F4F2EC" fontFamily="'JetBrains Mono', monospace" fontSize="12" textAnchor="middle">DECIBEL RATING: ZERO // IMPACT: INFINITE</text>
        </svg>
      );

    case 'stay-offline':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#F4F2EC" />
          {/* Diagonal bold hazard stripe */}
          <g transform="rotate(-7 350 450)">
            <rect x="-100" y="220" width="900" height="120" fill="#101010" />
            <text x="350" y="305" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="90" fontWeight="900" textAnchor="middle" letterSpacing="4">STAY OFFLINE</text>
            <rect x="-100" y="360" width="900" height="40" fill="#EF171C" />
            <text x="350" y="388" fill="#F4F2EC" fontFamily="'JetBrains Mono', monospace" fontSize="18" fontWeight="700" textAnchor="middle" letterSpacing="8">/// AIRPLANE MODE FOR LIFE ///</text>
          </g>
          
          <rect x="80" y="580" width="540" height="240" fill="none" stroke="#101010" strokeWidth="6" />
          <text x="120" y="650" fill="#101010" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="38" fontWeight="800">NO NOTIFICATIONS.</text>
          <text x="120" y="700" fill="#EF171C" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="38" fontWeight="800">NO ENDLESS SCROLL.</text>
          <text x="120" y="750" fill="#101010" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="38" fontWeight="800">JUST YOUR OWN THOUGHTS.</text>
          <text x="80" y="870" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="15">WALTIER TYPE & ATTITUDE // MANIFESTO POSTER</text>
        </svg>
      );

    case 'redline':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#EF171C" />
          {/* Heavy Black Typography and Abstract Slash */}
          <path d="M 0 0 L 700 950 L 580 950 L 0 160 Z" fill="#101010" />
          <text x="70" y="240" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="130" fontWeight="900" letterSpacing="-4">RED</text>
          <text x="70" y="350" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="130" fontWeight="900" letterSpacing="-4">LINE</text>
          <circle cx="520" cy="220" r="90" fill="#F4F2EC" />
          <text x="520" y="235" fill="#101010" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="48" fontWeight="900" textAnchor="middle">05</text>
          <text x="70" y="820" fill="#F4F2EC" fontFamily="'General Sans', sans-serif" fontSize="28" fontWeight="700">TACHOMETER PAST PEAK.</text>
          <text x="70" y="860" fill="#101010" fontFamily="'JetBrains Mono', monospace" fontSize="18" fontWeight="600">STREET ENERGY ARCHIVE EDITION / MAXIMUM VELOCITY</text>
        </svg>
      );

    case 'night-shift':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#101010" />
          <defs>
            <radialGradient id="ns-glow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#EF171C" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#2A0005" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#101010" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="350" cy="380" r="300" fill="url(#ns-glow)" />
          {/* Wireframe Grid */}
          <g stroke="#F4F2EC" strokeOpacity="0.2" strokeWidth="1.5">
            <line x1="70" y1="200" x2="630" y2="200" />
            <line x1="70" y1="280" x2="630" y2="280" />
            <line x1="70" y1="360" x2="630" y2="360" />
            <line x1="70" y1="440" x2="630" y2="440" />
            <line x1="70" y1="520" x2="630" y2="520" />
            <line x1="180" y1="120" x2="180" y2="600" />
            <line x1="290" y1="120" x2="290" y2="600" />
            <line x1="410" y1="120" x2="410" y2="600" />
            <line x1="520" y1="120" x2="520" y2="600" />
          </g>
          <text x="350" y="460" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="88" fontWeight="900" textAnchor="middle" letterSpacing="6">NIGHT SHIFT</text>
          <text x="350" y="760" fill="#EF171C" fontFamily="'JetBrains Mono', monospace" fontSize="20" textAnchor="middle" letterSpacing="8">CREATIVE HOURS : 11PM - 5AM</text>
          <text x="350" y="800" fill="#77736E" fontFamily="'General Sans', sans-serif" fontSize="16" textAnchor="middle">For those whose best thoughts begin after the world goes dark.</text>
        </svg>
      );

    case 'out-of-frame':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#F4F2EC" />
          {/* Frame outline broken open */}
          <rect x="100" y="140" width="500" height="660" fill="none" stroke="#101010" strokeWidth="12" />
          {/* A graphic bursting beyond the frame */}
          <rect x="420" y="80" width="220" height="260" fill="#EF171C" />
          <text x="440" y="160" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="48" fontWeight="900">OUT</text>
          <text x="440" y="210" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="48" fontWeight="900">OF</text>
          <text x="440" y="260" fill="#101010" fontFamily="'Cabinet Grotesk', sans-serif" fontSize="48" fontWeight="900">BOUNDS</text>
          
          <text x="140" y="600" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="64" fontWeight="900">CANNOT BE</text>
          <text x="140" y="660" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="64" fontWeight="900">CONTAINED.</text>
          <text x="140" y="730" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="15">MINIMAL MOOD // WALTIER CONCEPT PRINTS</text>
        </svg>
      );

    case 'static-dreams':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#101010" />
          {/* Abstract wavy lines */}
          <path d="M 50 200 Q 200 120 350 200 T 650 200" fill="none" stroke="#EF171C" strokeWidth="16" />
          <path d="M 50 260 Q 200 180 350 260 T 650 260" fill="none" stroke="#F4F2EC" strokeWidth="12" />
          <path d="M 50 320 Q 200 240 350 320 T 650 320" fill="none" stroke="#77736E" strokeWidth="8" />
          <path d="M 50 380 Q 200 300 350 380 T 650 380" fill="none" stroke="#EF171C" strokeWidth="4" />
          
          <rect x="70" y="550" width="560" height="3" fill="#333333" />
          <text x="70" y="660" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="76" fontWeight="900">STATIC DREAMS</text>
          <text x="70" y="720" fill="#EF171C" fontFamily="'General Sans', sans-serif" fontSize="24" fontWeight="600">ANALOG SYNTHETICS & MEMORY DISTORTION</text>
          <text x="70" y="840" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="16">SERIES: ABSTRACT CHAOS // CAT. NO. WAL-08</text>
        </svg>
      );

    case 'make-some-noise':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#EF171C" />
          <rect x="40" y="40" width="620" height="870" fill="none" stroke="#101010" strokeWidth="16" />
          <text x="70" y="240" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="95" fontWeight="900" letterSpacing="-2">MAKE</text>
          <text x="70" y="340" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="95" fontWeight="900" letterSpacing="-2">SOME</text>
          <text x="70" y="440" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="95" fontWeight="900" letterSpacing="-2">NOISE.</text>
          
          <circle cx="500" cy="300" r="110" fill="#101010" />
          <path d="M 450 300 L 550 300 M 500 250 L 500 350" stroke="#EF171C" strokeWidth="14" strokeLinecap="round" />
          
          <rect x="70" y="760" width="560" height="80" fill="#101010" />
          <text x="350" y="810" fill="#F4F2EC" fontFamily="'JetBrains Mono', monospace" fontSize="22" fontWeight="700" textAnchor="middle" letterSpacing="4">AMPLIFY YOUR ENVIRONMENT</text>
        </svg>
      );

    case 'soft-chaos':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#F4F2EC" />
          <defs>
            <linearGradient id="sc-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#101010" />
              <stop offset="100%" stopColor="#77736E" />
            </linearGradient>
          </defs>
          <ellipse cx="280" cy="360" rx="200" ry="240" fill="url(#sc-grad)" transform="rotate(-15 280 360)" />
          <circle cx="440" cy="460" r="140" fill="#EF171C" opacity="0.9" />
          <line x1="80" y1="120" x2="620" y2="780" stroke="#101010" strokeWidth="8" />
          <text x="80" y="840" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="68" fontWeight="900">SOFT CHAOS</text>
          <text x="80" y="880" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="16">TENSION, BALANCE & HARMONY IN UNORDERED NATURE</text>
        </svg>
      );

    case 'lost-in-type':
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#101010" />
          <text x="70" y="160" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900" opacity="0.15">FONT</text>
          <text x="70" y="270" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900" opacity="0.3">GLYPH</text>
          <text x="70" y="380" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900" opacity="0.6">KERNING</text>
          <text x="70" y="490" fill="#EF171C" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900">WALTIER</text>
          <text x="70" y="600" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900" opacity="0.8">LIGATURE</text>
          <text x="70" y="710" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900" opacity="0.4">LEAD</text>
          <text x="70" y="820" fill="#F4F2EC" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="110" fontWeight="900" opacity="0.2">PICA</text>
          <rect x="70" y="870" width="560" height="2" fill="#EF171C" />
          <text x="70" y="900" fill="#F4F2EC" fontFamily="'JetBrains Mono', monospace" fontSize="14">TYPE & ATTITUDE ARCHIVE // SPECIMEN NO. 11</text>
        </svg>
      );

    case 'wall-theory':
    default:
      return (
        <svg viewBox="0 0 700 950" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="950" fill="#F4F2EC" />
          {/* Brutalist geometric grid */}
          <rect x="70" y="70" width="260" height="260" fill="#101010" />
          <rect x="370" y="70" width="260" height="260" fill="#EF171C" />
          <rect x="70" y="370" width="260" height="260" fill="#D8D4CC" />
          <circle cx="500" cy="500" r="130" fill="#101010" />
          
          <text x="70" y="740" fill="#101010" fontFamily="'Cabinet Grotesk', Impact, sans-serif" fontSize="72" fontWeight="900">WALL THEORY</text>
          <text x="70" y="790" fill="#EF171C" fontFamily="'General Sans', sans-serif" fontSize="22" fontWeight="700">SPATIAL CONSTRUCTS // PROPORTION STUDY</text>
          <text x="70" y="850" fill="#77736E" fontFamily="'JetBrains Mono', monospace" fontSize="15">A room without deliberate artwork is just an empty corridor.</text>
        </svg>
      );
  }
};
