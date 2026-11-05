import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC<{
  onNavigateToProduct: (slug: string) => void;
  onNavigateToShop: () => void;
}> = ({ onNavigateToProduct, onNavigateToShop }) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const favoriteProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    favoriteProducts.forEach((p) => {
      addToCart({
        productId: p.id,
        title: p.title,
        image: p.slug,
        size: 'A3',
        framed: false,
        price: p.basePrice + 400, // A3 unframed approximate
        quantity: 1
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b-2 border-brand-ink pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest mb-1">
            SAVED ARCHIVES
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-brand-ink uppercase">
            YOUR SAVED WALLS ({wishlist.length})
          </h1>
          <p className="font-sans text-sm text-brand-muted mt-1">
            Items saved locally to your device. No forced login required to browse and dream.
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="bg-brand-ink hover:bg-brand-red text-white font-mono text-xs font-bold px-6 py-3 uppercase tracking-wider shadow-brutal-sm transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>MOVE ALL TO CART (A3)</span>
          </button>
        )}
      </div>

      {/* Grid */}
      {favoriteProducts.length === 0 ? (
        <div className="bg-brand-pureWhite border-2 border-dashed border-brand-divider p-16 text-center space-y-4">
          <Heart className="w-12 h-12 text-brand-muted/40 mx-auto" />
          <h3 className="font-display font-black text-2xl text-brand-ink">
            YOUR WISHLIST IS COMPLETELY EMPTY
          </h3>
          <p className="font-sans text-sm text-brand-muted max-w-sm mx-auto">
            Click the heart icon on any poster to bookmark prints you like for later review.
          </p>
          <button
            onClick={onNavigateToShop}
            className="bg-brand-red hover:bg-brand-ink text-white font-mono text-xs font-bold px-8 py-3.5 uppercase shadow-brutal transition-colors"
          >
            DISCOVER NEW DROPS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={(slug) => onNavigateToProduct(slug)}
            />
          ))}
        </div>
      )}

    </div>
  );
};

