import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, ChevronDown, 
  ChevronUp, Check, Eye, Maximize2, Share2, Sparkles, Layers 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { PosterArtSvg } from '../components/PosterArtSvg';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  onNavigateToProduct: (slug: string) => void;
  onNavigateToShop: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigateToProduct,
  onNavigateToShop
}) => {
  const { addToCart, isInWishlist, toggleWishlist, showToast } = useStore();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [activeImageTab, setActiveImageTab] = useState<'artwork' | 'room' | 'detail' | 'scale'>('artwork');
  const [selectedSize, setSelectedSize] = useState<'A4' | 'A3' | 'A2' | 'A1'>('A3');
  const [isFramed, setIsFramed] = useState(false);
  const [frameColor, setFrameColor] = useState<'Matte Black' | 'Natural Oak'>('Matte Black');
  const [quantity, setQuantity] = useState(1);
  const [showWallSimulator, setShowWallSimulator] = useState(false);
  const [wallColor, setWallColor] = useState('#222222');
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const isFavorited = isInWishlist(product.id);

  // Derive active variant
  const activeVariant = product.variants.find(
    (v) => v.size === selectedSize && v.framed === isFramed && (!isFramed || v.frameColor === frameColor)
  ) || product.variants[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.slug,
      size: selectedSize,
      framed: isFramed,
      frameColor: isFramed ? frameColor : undefined,
      price: activeVariant.price,
      quantity
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => product.relatedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Strip */}
      <div className="flex items-center gap-2 text-xs font-mono text-brand-muted pb-4 border-b border-brand-divider">
        <button onClick={onNavigateToShop} className="hover:text-brand-ink">ARCHIVE</button>
        <span>/</span>
        <button onClick={onNavigateToShop} className="hover:text-brand-ink">{product.collection}</button>
        <span>/</span>
        <span className="text-brand-ink font-bold">{product.title}</span>
      </div>

      {/* Main 2-Column Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Gallery & Interactive Wall Preview */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Display Area */}
          <div className="relative bg-[#181818] border-2 border-brand-ink p-6 sm:p-10 flex items-center justify-center min-h-[460px] sm:min-h-[560px] shadow-sm">
            
            {/* Tag Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-20 bg-brand-red text-white font-mono text-xs font-black px-2.5 py-1 tracking-widest">
                {product.badge}
              </div>
            )}

            {/* Interactive Wall Preview Button */}
            <button
              onClick={() => setShowWallSimulator(!showWallSimulator)}
              className="absolute top-4 right-4 z-20 bg-brand-paper hover:bg-brand-ink hover:text-brand-paper border border-brand-ink px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-brand-red" />
              <span>{showWallSimulator ? 'EXIT PREVIEW' : 'PREVIEW ON A WALL'}</span>
            </button>

            {/* Display Mode: Wall Simulator or Product Photo */}
            {showWallSimulator ? (
              <div 
                className="w-full h-full min-h-[440px] flex flex-col items-center justify-center p-6 relative transition-colors duration-300"
                style={{ backgroundColor: wallColor }}
              >
                {/* Wall Color Selectors */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-brand-ink/90 p-2 border border-brand-muted/40 z-20">
                  <span className="text-[10px] font-mono text-brand-paper uppercase">WALL:</span>
                  {[
                    { color: '#222222', label: 'Dark Charcoal' },
                    { color: '#F4F2EC', label: 'Warm Paper' },
                    { color: '#3A4454', label: 'Slate Blue' },
                    { color: '#353935', label: 'Industrial Ash' }
                  ].map((w) => (
                    <button
                      key={w.color}
                      onClick={() => setWallColor(w.color)}
                      style={{ backgroundColor: w.color }}
                      className={`w-5 h-5 rounded-full border-2 ${
                        wallColor === w.color ? 'border-brand-red scale-110' : 'border-white/50'
                      }`}
                      title={w.label}
                    />
                  ))}
                </div>

                {/* Scaled Poster on simulated wall */}
                <div
                  className={`aspect-[3/4] shadow-2xl transition-all duration-300 border-4 ${
                    isFramed
                      ? frameColor === 'Matte Black'
                        ? 'border-[#101010] p-1.5 bg-[#101010]'
                        : 'border-[#c2a27d] p-1.5 bg-[#c2a27d]'
                      : 'border-white'
                  }`}
                  style={{
                    width:
                      selectedSize === 'A4'
                        ? '160px'
                        : selectedSize === 'A3'
                        ? '210px'
                        : selectedSize === 'A2'
                        ? '270px'
                        : '330px'
                  }}
                >
                  <PosterArtSvg id={product.slug} className="w-full h-full object-cover" />
                </div>

                <div className="mt-4 bg-brand-ink/80 text-brand-paper px-3 py-1 font-mono text-[10px] text-center max-w-xs">
                  APPROX. SCALE PREVIEW // {selectedSize} ON {wallColor === '#222222' ? 'CHARCOAL' : 'STUDIO'} WALL
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                {activeImageTab === 'artwork' && (
                  <div
                    className={`max-w-sm w-full aspect-[3/4] shadow-2xl transition-all ${
                      isFramed
                        ? frameColor === 'Matte Black'
                          ? 'border-[12px] border-[#101010] p-2 bg-white'
                          : 'border-[12px] border-[#be9a75] p-2 bg-white'
                        : 'border-4 border-white'
                    }`}
                  >
                    <PosterArtSvg id={product.slug} className="w-full h-full object-cover" />
                  </div>
                )}

                {activeImageTab === 'room' && (
                  <div className="w-full max-w-lg aspect-[4/3] bg-brand-ink overflow-hidden border-2 border-brand-paper shadow-xl">
                    <img
                      src={product.mockups.room}
                      alt={`${product.title} styled in modern living space`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {activeImageTab === 'detail' && (
                  <div className="w-full max-w-lg aspect-[4/3] bg-brand-ink overflow-hidden border-2 border-brand-paper shadow-xl">
                    <img
                      src={product.mockups.detail}
                      alt={`${product.title} paper and print texture detail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {activeImageTab === 'scale' && (
                  <div className="w-full max-w-lg aspect-[4/3] bg-brand-ink overflow-hidden border-2 border-brand-paper shadow-xl">
                    <img
                      src={product.mockups.scale}
                      alt={`${product.title} size comparison in bedroom`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Gallery Thumbnail Selectors */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'artwork', label: '1. ARTWORK', sub: 'High-res vector' },
              { id: 'room', label: '2. ROOM MOCKUP', sub: 'Loft environment' },
              { id: 'detail', label: '3. PAPER GRAIN', sub: '300 GSM texture' },
              { id: 'scale', label: '4. SCALE VIEW', sub: 'Real proportions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setShowWallSimulator(false);
                  setActiveImageTab(tab.id as any);
                }}
                className={`p-2.5 border text-left transition-all ${
                  activeImageTab === tab.id && !showWallSimulator
                    ? 'bg-brand-pureWhite border-brand-ink shadow-brutal-sm'
                    : 'bg-brand-paper border-brand-divider hover:border-brand-ink'
                }`}
              >
                <div className="font-mono text-xs font-bold text-brand-ink">{tab.label}</div>
                <div className="font-sans text-[10px] text-brand-muted">{tab.sub}</div>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Configuration & Purchase Details */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-brand-red tracking-widest">
                {product.collection}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1.5 text-brand-muted hover:text-brand-ink border border-brand-divider"
                  title="Share poster link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 border transition-colors ${
                    isFavorited
                      ? 'border-brand-red text-brand-red bg-brand-red/10'
                      : 'border-brand-divider text-brand-muted hover:text-brand-red'
                  }`}
                  title="Save to wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-brand-red' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-ink tracking-tight mt-1">
              {product.title}
            </h1>
            <p className="font-sans text-sm text-brand-muted mt-1">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-brand-pureWhite border border-brand-divider flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-brand-muted uppercase block">ACTIVE SELECTION</span>
              <span className="font-mono text-3xl font-black text-brand-ink">
                ₹{activeVariant.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right font-mono text-xs text-brand-muted">
              <span className="text-emerald-700 font-bold block">IN STOCK // READY TO PRINT</span>
              <span>INCLUSIVE OF ALL TAXES</span>
            </div>
          </div>

          {/* Step 1: Size Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-brand-ink uppercase">1. SELECT POSTER SIZE</span>
              <span className="text-brand-muted">
                {selectedSize === 'A4' && '21 × 29.7 cm (Desk / Shelf)'}
                {selectedSize === 'A3' && '29.7 × 42 cm (Studio Wall)'}
                {selectedSize === 'A2' && '42 × 59.4 cm (Statement Size)'}
                {selectedSize === 'A1' && '59.4 × 84.1 cm (Hero Wall Size)'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {(['A4', 'A3', 'A2', 'A1'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-2 border text-center font-mono transition-all ${
                    selectedSize === size
                      ? 'bg-brand-ink text-brand-paper border-brand-ink font-bold shadow-brutal-sm'
                      : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                  }`}
                >
                  <div className="text-sm font-bold">{size}</div>
                  <div className="text-[10px] opacity-70">
                    {size === 'A4' && '21×30cm'}
                    {size === 'A3' && '30×42cm'}
                    {size === 'A2' && '42×59cm'}
                    {size === 'A1' && '59×84cm'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Framing Selector */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-brand-ink uppercase">
              2. SELECT MOUNTING & FINISH
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsFramed(false)}
                className={`p-3 border text-left font-mono transition-all flex items-center justify-between ${
                  !isFramed
                    ? 'bg-brand-ink text-brand-paper border-brand-ink font-bold shadow-brutal-sm'
                    : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">ROLLED ART PRINT</div>
                  <div className="text-[10px] opacity-70">Shipped in protective rigid tube</div>
                </div>
                {!isFramed && <Check className="w-4 h-4 text-brand-red" />}
              </button>

              <button
                onClick={() => setIsFramed(true)}
                className={`p-3 border text-left font-mono transition-all flex items-center justify-between ${
                  isFramed
                    ? 'bg-brand-ink text-brand-paper border-brand-ink font-bold shadow-brutal-sm'
                    : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">GALLERY WOOD FRAME</div>
                  <div className="text-[10px] opacity-70">Ready to hang with acrylic glass</div>
                </div>
                {isFramed && <Check className="w-4 h-4 text-brand-red" />}
              </button>
            </div>
          </div>

          {/* Step 3: Frame Color (if framed) */}
          {isFramed && (
            <div className="p-3 bg-brand-pureWhite border border-brand-divider space-y-2">
              <div className="text-xs font-mono font-bold text-brand-ink uppercase">
                FRAME FINISH:
              </div>
              <div className="flex gap-2 font-mono text-xs">
                {(['Matte Black', 'Natural Oak'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setFrameColor(color)}
                    className={`px-3 py-1.5 border transition-all ${
                      frameColor === color
                        ? 'bg-brand-ink text-white border-brand-ink font-bold'
                        : 'bg-brand-paper text-brand-ink border-brand-divider'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border-2 border-brand-ink bg-brand-pureWhite font-mono text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 hover:bg-brand-darkPaper font-bold"
                >
                  -
                </button>
                <span className="px-4 py-3 font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 hover:bg-brand-darkPaper font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-red hover:bg-brand-ink text-white font-mono font-black text-sm py-4 px-6 uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART — ₹{(activeVariant.price * quantity).toLocaleString('en-IN')}</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-brand-muted">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-red" />
                <span>Dispatches within 24-48 hrs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
                <span>Safe delivery guaranteed</span>
              </div>
            </div>
          </div>

          {/* Accordion Specifications */}
          <div className="border-t border-brand-divider pt-6 space-y-3 font-mono text-xs">
            
            {/* Specs Accordion */}
            <div className="border border-brand-divider bg-brand-pureWhite">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                className="w-full p-3 flex items-center justify-between font-bold text-brand-ink uppercase"
              >
                <span>PRINT SPECIFICATIONS & PAPER</span>
                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'specs' && (
                <div className="p-3 pt-0 border-t border-brand-divider space-y-2 text-brand-ink/80">
                  <p><strong>Stock:</strong> {product.specs.paperWeight}</p>
                  <p><strong>Finish:</strong> {product.specs.finish}</p>
                  <p><strong>Technology:</strong> {product.specs.printTech}</p>
                  <p><strong>Packaging:</strong> {product.specs.packaging}</p>
                </div>
              )}
            </div>

            {/* Size Guide Accordion */}
            <div className="border border-brand-divider bg-brand-pureWhite">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'size' ? null : 'size')}
                className="w-full p-3 flex items-center justify-between font-bold text-brand-ink uppercase"
              >
                <span>SIZE & PROPORTION GUIDE</span>
                {openAccordion === 'size' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'size' && (
                <div className="p-3 pt-0 border-t border-brand-divider space-y-1.5 text-brand-ink/80">
                  <p>• <strong>A4:</strong> 21.0 × 29.7 cm (8.3 × 11.7 in) — Great on desks or shelves</p>
                  <p>• <strong>A3:</strong> 29.7 × 42.0 cm (11.7 × 16.5 in) — Standard studio wall poster</p>
                  <p>• <strong>A2:</strong> 42.0 × 59.4 cm (16.5 × 23.4 in) — Statement living room centerpiece</p>
                  <p>• <strong>A1:</strong> 59.4 × 84.1 cm (23.4 × 33.1 in) — Large format hero gallery wall</p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border border-brand-divider bg-brand-pureWhite">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full p-3 flex items-center justify-between font-bold text-brand-ink uppercase"
              >
                <span>SHIPPING & DAMAGE COVER</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="p-3 pt-0 border-t border-brand-divider space-y-1.5 text-brand-ink/80">
                  <p>• Free express delivery across India on all orders over ₹1,499.</p>
                  <p>• Orders under ₹1,499 ship at a flat rate of ₹149.</p>
                  <p>• If your poster or frame arrives dented or damaged, snap a photo and email us for an instant replacement.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Same Energy / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t-2 border-brand-ink space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-3xl text-brand-ink uppercase">
              SAME ENERGY
            </h3>
            <span className="font-mono text-xs text-brand-muted">
              CURATED COMPANION PRINTS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(s) => onNavigateToProduct(s)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

