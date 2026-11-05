import React from 'react';
import { Eye, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { PosterArtSvg } from './PosterArtSvg';

interface ProductCardProps {
  product: Product;
  onSelect: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { isInWishlist, toggleWishlist, setQuickViewProduct, addToCart } = useStore();
  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.slug,
      size: defaultVariant.size,
      framed: defaultVariant.framed,
      frameColor: defaultVariant.frameColor,
      price: defaultVariant.price,
      quantity: 1
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product.slug)}
      className="product-card-hover group cursor-pointer flex flex-col bg-brand-pureWhite border border-brand-divider hover:border-brand-ink transition-all duration-300 relative shadow-sm hover:shadow-brutal"
    >
      {/* Tape or Sticker badge */}
      {product.badge && (
        <div className="absolute -top-3 left-4 z-20">
          <span
            className={`font-mono text-[10px] font-black tracking-widest px-2.5 py-0.5 shadow-sm transform -rotate-1 inline-block ${
              product.badge === 'NEW'
                ? 'bg-brand-red text-white'
                : product.badge === 'POPULAR'
                ? 'bg-brand-ink text-brand-paper'
                : 'bg-brand-paper text-brand-ink border border-brand-ink'
            }`}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Floating Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="btn-tactile absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-brand-paper/90 backdrop-blur-sm border border-brand-divider flex items-center justify-center text-brand-ink hover:text-brand-red hover:border-brand-ink transition-colors"
        title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-brand-red text-brand-red' : ''}`} />
      </button>

      {/* Poster Image Box */}
      <div className="relative aspect-[3/4] w-full bg-[#1e1e1e] overflow-hidden flex items-center justify-center p-3 sm:p-5 group-hover:bg-[#161616] transition-colors">
        {/* Subtle white mounting mat effect */}
        <div className="artwork-img-scale relative w-full h-full shadow-lg overflow-hidden">
          <PosterArtSvg id={product.slug} className="w-full h-full object-cover" />
        </div>

        {/* Hover Quick View Button */}
        <div className="absolute inset-x-4 bottom-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="btn-tactile flex-1 bg-brand-paper text-brand-ink hover:bg-brand-ink hover:text-brand-paper border border-brand-ink py-2 text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="btn-tactile bg-brand-red text-white hover:bg-black p-2 border border-brand-ink flex items-center justify-center"
            title="Instant Add A4 Unframed"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-brand-pureWhite border-t border-brand-divider">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted uppercase mb-1">
            <span>{product.collection}</span>
            <span>A4 - A1</span>
          </div>

          <h3 className="font-display font-black text-lg text-brand-ink group-hover:text-brand-red transition-colors tracking-tight line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-brand-muted line-clamp-1 mt-0.5 font-sans">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-divider/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-brand-muted uppercase block">FROM</span>
            <span className="font-mono text-sm font-bold text-brand-ink">
              ₹{product.basePrice.toLocaleString('en-IN')}
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-brand-ink group-hover:text-brand-red flex items-center gap-1 transition-colors">
            VIEW DETAILS
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};

