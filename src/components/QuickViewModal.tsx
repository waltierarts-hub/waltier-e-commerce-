import React, { useState } from 'react';
import { X, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PosterArtSvg } from './PosterArtSvg';

export const QuickViewModal: React.FC<{ onNavigateToProduct: (slug: string) => void }> = ({
  onNavigateToProduct
}) => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<'A4' | 'A3' | 'A2' | 'A1'>('A3');
  const [isFramed, setIsFramed] = useState(false);
  const [frameColor, setFrameColor] = useState<'Matte Black' | 'Natural Oak'>('Matte Black');

  if (!quickViewProduct) return null;

  // Calculate matching variant price
  const activeVariant = quickViewProduct.variants.find(
    (v) => v.size === selectedSize && v.framed === isFramed && (!isFramed || v.frameColor === frameColor)
  ) || quickViewProduct.variants[0];

  const handleAddToCart = () => {
    addToCart({
      productId: quickViewProduct.id,
      title: quickViewProduct.title,
      image: quickViewProduct.slug,
      size: selectedSize,
      framed: isFramed,
      frameColor: isFramed ? frameColor : undefined,
      price: activeVariant.price,
      quantity: 1
    });
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    const slug = quickViewProduct.slug;
    setQuickViewProduct(null);
    onNavigateToProduct(slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-ink/80 backdrop-blur-sm drawer-backdrop-fade"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-brand-paper border-2 border-brand-ink shadow-brutal-lg max-h-[90vh] overflow-y-auto modal-pop-center">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-brand-paper hover:bg-brand-ink hover:text-brand-paper border border-brand-ink transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Poster Artwork Showcase */}
          <div className="flex flex-col items-center justify-center bg-brand-pureWhite p-6 border border-brand-divider relative">
            <div className="w-full max-w-xs aspect-[3/4] shadow-xl relative border-4 border-white">
              <PosterArtSvg id={quickViewProduct.slug} className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 font-mono text-[11px] text-brand-muted uppercase text-center">
              PREVIEWING: {selectedSize} {isFramed ? `// ${frameColor} FRAME` : '// UNFRAMED TUBE'}
            </div>
          </div>

          {/* Configuration & Order Panel */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-block font-mono text-xs text-brand-red font-bold uppercase tracking-wider mb-1">
                {quickViewProduct.collection}
              </div>
              <h2 className="font-display font-black text-3xl text-brand-ink tracking-tight">
                {quickViewProduct.title}
              </h2>
              <p className="font-sans text-sm text-brand-muted mt-1">
                {quickViewProduct.subtitle}
              </p>

              <div className="mt-4 pb-4 border-b border-brand-divider flex items-baseline gap-3">
                <span className="font-mono text-2xl font-black text-brand-ink">
                  ₹{activeVariant.price.toLocaleString('en-IN')}
                </span>
                <span className="font-mono text-xs text-brand-muted">
                  GST INCLUDED // FREE DISPATCH OVER ₹1,499
                </span>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="font-bold text-brand-ink uppercase">1. CHOOSE SIZE</span>
                  <span className="text-brand-muted">
                    {selectedSize === 'A4' && '21 × 29.7 cm'}
                    {selectedSize === 'A3' && '29.7 × 42 cm'}
                    {selectedSize === 'A2' && '42 × 59.4 cm'}
                    {selectedSize === 'A1' && '59.4 × 84.1 cm'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['A4', 'A3', 'A2', 'A1'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-brutal-sm'
                          : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Framing Options */}
              <div className="mt-5">
                <div className="text-xs font-mono font-bold text-brand-ink uppercase mb-2">
                  2. FINISH / FRAMING
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsFramed(false)}
                    className={`py-2 px-3 text-xs font-mono font-bold border text-left flex items-center justify-between ${
                      !isFramed
                        ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-brutal-sm'
                        : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                    }`}
                  >
                    <span>UNFRAMED (ROLLED)</span>
                    {!isFramed && <Check className="w-3.5 h-3.5 text-brand-red" />}
                  </button>

                  <button
                    onClick={() => setIsFramed(true)}
                    className={`py-2 px-3 text-xs font-mono font-bold border text-left flex items-center justify-between ${
                      isFramed
                        ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-brutal-sm'
                        : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                    }`}
                  >
                    <span>GALLERY FRAMED</span>
                    {isFramed && <Check className="w-3.5 h-3.5 text-brand-red" />}
                  </button>
                </div>
              </div>

              {/* Frame Color (if framed) */}
              {isFramed && (
                <div className="mt-4 p-3 bg-brand-pureWhite border border-brand-divider">
                  <div className="text-[11px] font-mono font-bold text-brand-ink uppercase mb-2">
                    FRAME COLOR:
                  </div>
                  <div className="flex gap-2">
                    {(['Matte Black', 'Natural Oak'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setFrameColor(color)}
                        className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                          frameColor === color
                            ? 'bg-brand-ink text-white border-brand-ink'
                            : 'bg-brand-paper text-brand-ink border-brand-divider'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-brand-red hover:bg-brand-ink text-white py-3.5 px-4 font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-brutal transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART — ₹{activeVariant.price.toLocaleString('en-IN')}</span>
              </button>

              <button
                onClick={handleFullDetail}
                className="w-full py-2.5 text-xs font-mono font-bold text-brand-ink hover:text-brand-red flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>VIEW FULL PRODUCT SPECS & REVIEWS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

