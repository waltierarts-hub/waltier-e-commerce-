import React, { useState } from 'react';
import { ArrowRight, Flame, Layers, Sparkles, Plus, Check } from 'lucide-react';
import { PRODUCTS, COLLECTIONS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PosterArtSvg } from '../components/PosterArtSvg';
import { useStore } from '../context/StoreContext';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToCart, showToast } = useStore();
  const [selectedWallSize, setSelectedWallSize] = useState<'A3' | 'A2'>('A3');
  const [wallBundleAdded, setWallBundleAdded] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply tiny micro parallax on desktop
    if (window.innerWidth < 1024) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const xRel = (clientX - rect.left) / rect.width - 0.5;
    const yRel = (clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: xRel * 12, y: yRel * 12 });
  };

  const handleHeroMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
  };

  // Shop The Wall poster IDs
  const wallProductIds = ['wal-01', 'wal-02', 'wal-03'];
  const wallProducts = PRODUCTS.filter((p) => wallProductIds.includes(p.id));

  // Compute wall bundle price
  const bundleItemPrice = selectedWallSize === 'A3' ? 1199 : 1799;
  const bundleTotalPrice = bundleItemPrice * 3;

  const handleAddWholeWall = () => {
    wallProducts.forEach((p) => {
      addToCart({
        productId: p.id,
        title: p.title,
        image: p.slug,
        size: selectedWallSize,
        framed: true,
        frameColor: 'Matte Black',
        price: selectedWallSize === 'A3' ? 2199 : 3299,
        quantity: 1
      });
    });
    setWallBundleAdded(true);
    showToast(`Added Complete Gallery Wall (3 framed posters) to Cart!`);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* ==================================================
          C. HERO SECTION (EDITORIAL & POSTER-LED)
      ================================================== */}
      <section 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 noise-bg opacity-70 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Typographic Rebel Manifesto */}
          <div className="lg:col-span-6 space-y-6 z-10">
            
            {/* Small Editorial Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ink text-brand-paper border border-brand-ink text-xs font-mono font-bold tracking-widest shadow-brutal-sm">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span>WALTIER / WALL CULTURE // DROP 04</span>
            </div>

            {/* Oversized Typographic Statement with Masked Entrance */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-brand-ink tracking-tight leading-[0.88] uppercase overflow-hidden">
              <span className="block overflow-hidden"><span className="animate-mask-line-1">BORING</span></span>
              <span className="block overflow-hidden"><span className="animate-mask-line-2">WALLS.</span></span>
              <span className="block overflow-hidden">
                <span className="animate-mask-line-3 text-brand-red inline-block relative">
                  NOT ALLOWED.
                  <span className="block h-1.5 sm:h-2 bg-brand-ink animate-brush-strike mt-1" />
                </span>
              </span>
            </h1>

            {/* Supporting Copy with Attitude */}
            <p className="animate-hero-sub font-sans text-lg sm:text-xl text-brand-ink/80 max-w-lg leading-relaxed font-normal">
              Original energy for your room, your corner, your world. Museum-grade archival prints designed for people who take their personal space seriously.
            </p>

            {/* Action Buttons */}
            <div className="animate-hero-cta flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="btn-tactile bg-brand-red hover:bg-brand-ink text-white font-mono font-black text-sm px-8 py-4 uppercase tracking-wider shadow-brutal hover:shadow-brutal-sm flex items-center gap-2 group"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('collections')}
                className="btn-tactile bg-brand-paper hover:bg-brand-ink hover:text-brand-paper text-brand-ink border-2 border-brand-ink font-mono font-bold text-sm px-6 py-4 uppercase tracking-wider shadow-brutal-sm"
              >
                <span>FIND YOUR VIBE</span>
              </button>
            </div>

            {/* Small Specs Proof Strip */}
            <div className="animate-hero-cta pt-6 border-t border-brand-divider grid grid-cols-3 gap-2 font-mono text-xs text-brand-muted">
              <div>
                <span className="font-bold text-brand-ink block">300 GSM</span>
                <span>Archival Cotton</span>
              </div>
              <div>
                <span className="font-bold text-brand-ink block">12-COLOR</span>
                <span>Giclée Inks</span>
              </div>
              <div>
                <span className="font-bold text-brand-ink block">ALL INDIA</span>
                <span>Express Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Poster Collage with Tape & Editorial Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6 sm:py-10">
            
            {/* The Central Trio Collage with subtle parallax */}
            <div 
              className="relative w-full max-w-lg h-[460px] sm:h-[540px] transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mouseParallax.x * 0.5}px, ${mouseParallax.y * 0.5}px, 0)`
              }}
            >
              
              {/* Poster 1 (Left tilted, dark After Hours) */}
              <div
                onClick={() => onNavigate('product', 'after-hours')}
                className="hero-poster-1 absolute left-0 top-12 w-48 sm:w-60 aspect-[3/4] bg-brand-ink shadow-2xl border-4 border-brand-pureWhite transform -rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer tape-top"
                style={{
                  transform: `translate3d(${mouseParallax.x * -0.8}px, ${mouseParallax.y * -0.8}px, 0) rotate(-6deg)`
                }}
              >
                <PosterArtSvg id="after-hours" className="w-full h-full object-cover" />
                <div className="absolute -bottom-3 right-2 bg-brand-red text-white text-[10px] font-mono px-2 py-0.5 font-bold shadow-sm">
                  AFTER HOURS
                </div>
              </div>

              {/* Poster 2 (Center prominent, Redline) */}
              <div
                onClick={() => onNavigate('product', 'redline')}
                className="hero-poster-2 absolute left-1/2 -translate-x-1/2 top-4 w-52 sm:w-68 aspect-[3/4] bg-brand-pureWhite shadow-brutal-lg border-4 border-brand-ink z-20 hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  transform: `translate3d(calc(-50% + ${mouseParallax.x * 0.3}px), ${mouseParallax.y * 0.3}px, 0)`
                }}
              >
                <div className="absolute -top-3 left-4 bg-brand-ink text-brand-paper text-[10px] font-mono px-2 py-0.5 font-black uppercase">
                  DROP 04 HERO
                </div>
                <PosterArtSvg id="redline" className="w-full h-full object-cover" />
              </div>

              {/* Poster 3 (Right tilted, No Signal) */}
              <div
                onClick={() => onNavigate('product', 'no-signal')}
                className="hero-poster-3 absolute right-0 top-20 w-44 sm:w-56 aspect-[3/4] bg-brand-paper shadow-2xl border-4 border-brand-pureWhite transform rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer"
                style={{
                  transform: `translate3d(${mouseParallax.x * 0.9}px, ${mouseParallax.y * 0.9}px, 0) rotate(6deg)`
                }}
              >
                <PosterArtSvg id="no-signal" className="w-full h-full object-cover" />
                <div className="absolute -bottom-3 left-2 bg-brand-ink text-brand-paper text-[10px] font-mono px-2 py-0.5 font-bold shadow-sm">
                  NO SIGNAL
                </div>
              </div>

              {/* Decorative Stamp Element */}
              <div className="absolute bottom-2 left-6 z-30 bg-brand-red text-white font-mono text-xs px-3 py-1.5 uppercase font-bold tracking-wider shadow-brutal-sm -rotate-3">
                ★ 100% ORIGINAL ARTWORK
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          D. BRAND MARQUEE (RESTRAINED SCROLLING STRIP)
      ================================================== */}
      <section className="bg-brand-ink text-brand-paper border-y-2 border-brand-ink py-4 overflow-hidden select-none">
        <div className="animate-marquee-loop font-display font-black text-2xl sm:text-3xl tracking-wider text-brand-paper/90 space-x-8 uppercase">
          <span>YOUR WALL. YOUR RULES.</span>
          <span className="text-brand-red">/</span>
          <span>WALTIER POSTER COMPANY</span>
          <span className="text-brand-red">/</span>
          <span>MAKE SPACE FOR ART</span>
          <span className="text-brand-red">/</span>
          <span>BORING WALLS. NOT ALLOWED.</span>
          <span className="text-brand-red">/</span>
          <span>300 GSM ARCHIVAL COTTON</span>
          <span className="text-brand-red">/</span>
          <span>YOUR WALL. YOUR RULES.</span>
          <span className="text-brand-red">/</span>
          <span>WALTIER POSTER COMPANY</span>
          <span className="text-brand-red">/</span>
          <span>MAKE SPACE FOR ART</span>
          <span className="text-brand-red">/</span>
          <span>BORING WALLS. NOT ALLOWED.</span>
          <span className="text-brand-red">/</span>
          <span>300 GSM ARCHIVAL COTTON</span>
          <span className="text-brand-red">/</span>
        </div>
      </section>

      {/* ==================================================
          E. SHOP BY VIBE (COLLECTION TILES)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-brand-ink">
          <div>
            <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest block">
              CURATED MOODS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-ink tracking-tight uppercase">
              SHOP BY VIBE
            </h2>
          </div>
          <p className="font-mono text-xs text-brand-muted mt-2 md:mt-0">
            6 AESTHETIC REALMS // ZERO GENERIC WALL DECOR
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((c) => (
            <div
              key={c.id}
              onClick={() => onNavigate('shop', c.id)}
              className="group cursor-pointer border-2 border-brand-ink bg-brand-pureWhite shadow-sm hover:shadow-brutal transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Header preview & crop */}
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] bg-brand-ink text-brand-paper px-2 py-0.5 uppercase tracking-wider font-bold">
                    {c.tag}
                  </span>
                  <span className="font-mono text-xs text-brand-muted">
                    {c.count} PRINTS
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-ink group-hover:text-brand-red transition-colors tracking-tight">
                  {c.title}
                </h3>
                
                <p className="font-sans text-xs text-brand-muted mt-2 leading-relaxed">
                  {c.description}
                </p>
              </div>

              {/* Artwork Preview Strip */}
              <div className="h-44 bg-brand-ink/90 overflow-hidden relative border-t-2 border-brand-ink flex items-center justify-center p-3">
                <div className="w-32 h-44 shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                  <PosterArtSvg id={c.previewSvgId} className="w-full h-full object-cover" />
                </div>

                <div className="absolute inset-0 bg-brand-ink/40 group-hover:bg-transparent transition-colors flex items-end p-4 justify-between">
                  <span className="font-mono text-xs font-bold text-white bg-brand-ink/80 px-2 py-1">
                    EXPLORE COLLECTION →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          F. FEATURED DROP: "THE CURRENT OBSESSION"
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-brand-ink">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-brand-red" />
              <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
                DROP 04 CATALOG
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-ink tracking-tight uppercase">
              THE CURRENT OBSESSION
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-3 sm:mt-0 font-mono text-xs font-bold text-brand-ink hover:text-brand-red flex items-center gap-1 group uppercase"
          >
            <span>VIEW ALL 12 ARCHIVES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-8 Highlighted Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.slice(0, 8).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={(slug) => onNavigate('product', slug)}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          G. SHOP THE WALL (INTERACTIVE ROOM SCENE)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-4 border-brand-ink bg-brand-paper shadow-brutal-lg overflow-hidden">
          
          <div className="p-6 md:p-8 bg-brand-ink text-brand-paper border-b-2 border-brand-ink flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
                CURATED COMPOSITION
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-paper tracking-tight uppercase">
                SHOP THE WALL: “AFTER MIDNIGHT”
              </h2>
              <p className="font-sans text-xs text-brand-paper/70 mt-1">
                A cohesive 3-piece layout curated by the Waltier design team. Ready to hang together.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#1b1b1b] p-3 border border-brand-muted/30">
              <div>
                <span className="text-[10px] font-mono text-brand-muted uppercase block">TRIO BUNDLE</span>
                <span className="text-xl font-mono font-black text-brand-paper">
                  ₹{bundleTotalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleAddWholeWall}
                className="bg-brand-red hover:bg-white hover:text-brand-ink text-white font-mono text-xs font-bold px-4 py-2.5 uppercase transition-colors flex items-center gap-1.5"
              >
                {wallBundleAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{wallBundleAdded ? 'ADDED WALL!' : 'GET THE WHOLE WALL'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Styled Wall Display */}
            <div className="lg:col-span-7 bg-[#21201d] p-8 sm:p-12 relative flex items-center justify-center min-h-[380px]">
              <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
                
                {/* Wall Item 1 */}
                <div
                  onClick={() => onNavigate('product', 'after-hours')}
                  className="w-1/3 aspect-[3/4] bg-brand-pureWhite p-1 shadow-2xl border-2 border-brand-ink cursor-pointer hover:scale-105 transition-transform group relative"
                >
                  <PosterArtSvg id="after-hours" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-ink text-white text-[9px] font-mono px-1.5 py-0.5 whitespace-nowrap">
                    1. AFTER HOURS
                  </div>
                </div>

                {/* Wall Item 2 */}
                <div
                  onClick={() => onNavigate('product', 'no-signal')}
                  className="w-1/3 aspect-[3/4] bg-brand-pureWhite p-1 shadow-2xl border-2 border-brand-ink cursor-pointer hover:scale-105 transition-transform group relative -translate-y-4"
                >
                  <PosterArtSvg id="no-signal" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-ink text-white text-[9px] font-mono px-1.5 py-0.5 whitespace-nowrap">
                    2. NO SIGNAL
                  </div>
                </div>

                {/* Wall Item 3 */}
                <div
                  onClick={() => onNavigate('product', 'loud-silence')}
                  className="w-1/3 aspect-[3/4] bg-brand-pureWhite p-1 shadow-2xl border-2 border-brand-ink cursor-pointer hover:scale-105 transition-transform group relative"
                >
                  <PosterArtSvg id="loud-silence" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-ink text-white text-[9px] font-mono px-1.5 py-0.5 whitespace-nowrap">
                    3. LOUD SILENCE
                  </div>
                </div>

              </div>
            </div>

            {/* Bundle Specs and Individual Breakdown */}
            <div className="lg:col-span-5 p-6 bg-brand-paper flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-brand-ink">
              <div>
                <h4 className="font-mono text-xs font-bold text-brand-ink uppercase tracking-wider mb-3">
                  INCLUDED IN THIS WALL SET:
                </h4>

                <div className="space-y-3">
                  {wallProducts.map((p, idx) => (
                    <div
                      key={p.id}
                      onClick={() => onNavigate('product', p.slug)}
                      className="p-3 bg-brand-pureWhite border border-brand-divider hover:border-brand-ink flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-brand-red">0{idx + 1}</span>
                        <div>
                          <div className="font-display font-black text-sm text-brand-ink">{p.title}</div>
                          <div className="font-sans text-xs text-brand-muted">{p.collection}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-brand-ink">
                        ₹{p.basePrice}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Size Choice for Wall */}
                <div className="mt-5 pt-4 border-t border-brand-divider">
                  <div className="text-xs font-mono font-bold text-brand-ink uppercase mb-2">
                    SELECT WALL SCALE:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedWallSize('A3')}
                      className={`py-2 text-xs font-mono font-bold border transition-all ${
                        selectedWallSize === 'A3'
                          ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-brutal-sm'
                          : 'bg-brand-pureWhite text-brand-ink border-brand-divider'
                      }`}
                    >
                      A3 TRIO (29.7 × 42 cm)
                    </button>
                    <button
                      onClick={() => setSelectedWallSize('A2')}
                      className={`py-2 text-xs font-mono font-bold border transition-all ${
                        selectedWallSize === 'A2'
                          ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-brutal-sm'
                          : 'bg-brand-pureWhite text-brand-ink border-brand-divider'
                      }`}
                    >
                      A2 TRIO (42 × 59.4 cm)
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-divider">
                <button
                  onClick={handleAddWholeWall}
                  className="w-full bg-brand-ink hover:bg-brand-red text-white font-mono font-black py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD ALL 3 PRINTS TO CART</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          H. BRAND STORY (EDITORIAL & AUTHENTIC)
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-brand-pureWhite border-2 border-brand-ink p-8 sm:p-12 shadow-brutal">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
              THE WALTIER THESIS
            </span>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-brand-ink tracking-tight uppercase leading-[0.9]">
              NOT JUST DECOR.<br />
              A WHOLE PERSONALITY.
            </h2>

            <p className="font-sans text-base text-brand-ink/80 leading-relaxed">
              We started WALTIER because mainstream home decor was sterile, boring, and emotionally flat. Mass-produced generic city maps and quote posters don't say anything about who you are.
            </p>

            <p className="font-sans text-base text-brand-ink/80 leading-relaxed">
              Our prints are made like indie magazine covers and streetwear drops — deliberate brutalist typography, gritty ink-black contrasts, and heavy archival paper that feels substantive when you hold it.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="bg-brand-ink hover:bg-brand-red text-brand-paper font-mono font-bold text-xs px-6 py-3 uppercase tracking-wider shadow-brutal-sm transition-colors flex items-center gap-2"
              >
                <span>MEET WALTIER POSTER CO.</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Studio Card */}
            <div className="w-full max-w-sm aspect-[4/5] bg-brand-ink p-6 relative border-4 border-brand-paper shadow-2xl flex flex-col justify-between">
              <div className="font-mono text-[10px] text-brand-red tracking-widest uppercase">
                PRINT LAB SPECIFICATION // 2026
              </div>

              <div className="my-auto py-6 text-center">
                <img
                  src="/images/logo.png"
                  alt="Waltier Identity Mark"
                  className="w-40 mx-auto filter invert contrast-125 mb-4"
                />
                <div className="font-mono text-xs text-brand-paper/80">
                  “The brush mark represents the raw, imperfect, human stroke that machines can never simulate.”
                </div>
              </div>

              <div className="pt-4 border-t border-brand-paper/20 flex justify-between text-[10px] font-mono text-brand-muted">
                <span>NEW DELHI / BANGALORE</span>
                <span>AUTHENTIC PRINTWORK</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          I. COMMUNITY / ROOM INSPIRATION
      ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-brand-ink">
          <div>
            <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
              CURATED SPACES
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-ink tracking-tight uppercase">
              GOOD TASTE. GREAT WALLS.
            </h2>
          </div>
          <span className="font-mono text-xs text-brand-muted mt-2 sm:mt-0">
            [STYLED INSPIRATION FROM OUR CREATIVE DIRECTORS]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Inspiration 1 */}
          <div className="border border-brand-divider bg-brand-pureWhite p-4 space-y-3 group hover:border-brand-ink transition-colors">
            <div className="aspect-[4/3] bg-brand-ink overflow-hidden relative">
              <img
                src="/images/hero-room.jpg"
                alt="Styled loft living room with Waltier posters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-brand-ink">01 // THE BRUTALIST LOFT</span>
              <span className="text-brand-muted">A1 SCALE</span>
            </div>
            <p className="font-sans text-xs text-brand-muted">
              Featuring oversized dark prints paired with exposed concrete and warm task lighting.
            </p>
          </div>

          {/* Inspiration 2 */}
          <div className="border border-brand-divider bg-brand-pureWhite p-4 space-y-3 group hover:border-brand-ink transition-colors">
            <div className="aspect-[4/3] bg-brand-ink overflow-hidden relative">
              <img
                src="/images/study-desk.jpg"
                alt="Creative studio desk setup with framed print"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-brand-ink">02 // THE DEEP WORK CORNER</span>
              <span className="text-brand-muted">A3 MATTE BLACK</span>
            </div>
            <p className="font-sans text-xs text-brand-muted">
              Minimalist desk architecture paired with typographic warning pieces for uninterrupted flow.
            </p>
          </div>

          {/* Inspiration 3 */}
          <div className="border border-brand-divider bg-brand-pureWhite p-4 space-y-3 group hover:border-brand-ink transition-colors">
            <div className="aspect-[4/3] bg-brand-ink overflow-hidden relative">
              <img
                src="/images/bedroom-duo.jpg"
                alt="Bedroom duo framed prints"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-brand-ink">03 // BEDROOM SYMMETRY</span>
              <span className="text-brand-muted">A2 PAIR</span>
            </div>
            <p className="font-sans text-xs text-brand-muted">
              Balanced two-poster layout bringing visual weight and texture above the headboard.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

