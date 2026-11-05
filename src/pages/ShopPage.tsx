import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X, ArrowUpDown, Check } from 'lucide-react';
import { PRODUCTS, COLLECTIONS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  initialCollection?: string;
  onNavigateToProduct: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCollection, onNavigateToProduct }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection || 'ALL');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if initialCollection prop changes
  React.useEffect(() => {
    if (initialCollection) {
      if (initialCollection === 'new') {
        setSortBy('newest');
        setSelectedCollection('ALL');
      } else if (initialCollection === 'popular') {
        setSelectedCollection('ALL');
      } else {
        setSelectedCollection(initialCollection);
      }
    }
  }, [initialCollection]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCollection !== 'ALL' && p.collection !== selectedCollection) {
        return false;
      }
      if (selectedOrientation !== 'ALL' && p.orientation !== selectedOrientation) {
        return false;
      }
      if (selectedSize !== 'ALL') {
        const hasSize = p.variants.some((v) => v.size === selectedSize);
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return 0; // featured default
    });
  }, [selectedCollection, selectedSize, selectedOrientation, sortBy]);

  const activeFiltersCount = 
    (selectedCollection !== 'ALL' ? 1 : 0) + 
    (selectedSize !== 'ALL' ? 1 : 0) + 
    (selectedOrientation !== 'ALL' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCollection('ALL');
    setSelectedSize('ALL');
    setSelectedOrientation('ALL');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="border-b-2 border-brand-ink pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest mb-1">
            ARCHIVE INVENTORY // DROP 04
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-brand-ink tracking-tight uppercase">
            {selectedCollection === 'ALL' ? 'SHOP ALL PRINTS' : selectedCollection}
          </h1>
          <p className="font-sans text-sm text-brand-muted mt-1">
            Archival pigment prints on 300 GSM cotton stock. Available unframed or in gallery wood frames.
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 bg-brand-ink text-brand-paper py-2.5 px-4 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-brutal-sm"
          >
            <Filter className="w-4 h-4 text-brand-red" />
            <span>FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        </div>

        {/* Desktop Sort Dropdown */}
        <div className="hidden md:flex items-center gap-3 font-mono text-xs">
          <span className="text-brand-muted uppercase font-bold">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-brand-pureWhite border border-brand-ink px-3 py-2 font-mono font-bold text-brand-ink focus:outline-none focus:border-brand-red shadow-sm cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="newest">Latest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Desktop Filter Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-brand-divider">
            <span className="font-mono text-xs font-bold uppercase text-brand-ink flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-red" />
              REFINE CATALOG
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-mono text-brand-red hover:underline uppercase"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-brand-muted mb-2.5 tracking-wider">
              COLLECTION / VIBE
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCollection('ALL')}
                className={`w-full text-left font-mono text-xs py-1.5 px-2.5 transition-colors flex items-center justify-between ${
                  selectedCollection === 'ALL'
                    ? 'bg-brand-ink text-brand-paper font-bold'
                    : 'text-brand-ink hover:bg-brand-darkPaper'
                }`}
              >
                <span>ALL COLLECTIONS</span>
                <span>{PRODUCTS.length}</span>
              </button>
              {COLLECTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCollection(c.id)}
                  className={`w-full text-left font-mono text-xs py-1.5 px-2.5 transition-colors flex items-center justify-between ${
                    selectedCollection === c.id
                      ? 'bg-brand-ink text-brand-paper font-bold'
                      : 'text-brand-ink hover:bg-brand-darkPaper'
                  }`}
                >
                  <span className="truncate">{c.title}</span>
                  <span className="text-[11px] opacity-70">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-brand-muted mb-2.5 tracking-wider">
              POSTER SCALE
            </h4>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
              {['ALL', 'A4', 'A3', 'A2', 'A1'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 px-2 border transition-all text-center ${
                    selectedSize === size
                      ? 'bg-brand-ink text-brand-paper border-brand-ink font-bold shadow-brutal-sm'
                      : 'bg-brand-pureWhite text-brand-ink border-brand-divider hover:border-brand-ink'
                  }`}
                >
                  {size === 'ALL' ? 'ALL SIZES' : size}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Guarantee Box */}
          <div className="p-4 bg-brand-pureWhite border border-brand-divider space-y-2">
            <div className="font-mono text-xs font-bold text-brand-ink flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-red" />
              <span>THE WALTIER STANDARD</span>
            </div>
            <p className="font-sans text-xs text-brand-muted leading-relaxed">
              Every poster is custom-printed in India using non-fading archival mineral pigments on 300 GSM museum cotton stock.
            </p>
          </div>

        </div>

        {/* Product Grid Area (3 Cols) */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="font-mono text-xs text-brand-muted uppercase">ACTIVE:</span>
              {selectedCollection !== 'ALL' && (
                <span className="inline-flex items-center gap-1 bg-brand-ink text-brand-paper font-mono text-xs px-2.5 py-1">
                  {selectedCollection}
                  <X
                    className="w-3 h-3 cursor-pointer text-brand-red"
                    onClick={() => setSelectedCollection('ALL')}
                  />
                </span>
              )}
              {selectedSize !== 'ALL' && (
                <span className="inline-flex items-center gap-1 bg-brand-ink text-brand-paper font-mono text-xs px-2.5 py-1">
                  Size: {selectedSize}
                  <X
                    className="w-3 h-3 cursor-pointer text-brand-red"
                    onClick={() => setSelectedSize('ALL')}
                  />
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="font-mono text-xs text-brand-red hover:underline ml-2"
              >
                Reset
              </button>
            </div>
          )}

          {/* Grid Count */}
          <div className="font-mono text-xs text-brand-muted">
            SHOWING {filteredProducts.length} OF {PRODUCTS.length} PRINTS
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="bg-brand-pureWhite border-2 border-dashed border-brand-divider p-12 text-center space-y-4">
              <h3 className="font-display font-black text-2xl text-brand-ink">
                NO MATCHING ARTWORK FOUND
              </h3>
              <p className="font-sans text-sm text-brand-muted max-w-sm mx-auto">
                No posters match the current combination of filters. Try resetting the filters or switching collection.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-brand-ink hover:bg-brand-red text-brand-paper font-mono text-xs font-bold px-6 py-3 uppercase transition-colors"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={(slug) => onNavigateToProduct(slug)}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-brand-ink/75 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-brand-paper border-l-2 border-brand-ink p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-divider">
                <span className="font-display font-black text-xl text-brand-ink">
                  CATALOG FILTERS
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-brand-ink hover:text-brand-red"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Collections */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-brand-muted mb-2">
                  COLLECTION
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCollection('ALL')}
                    className={`w-full text-left font-mono text-xs py-2 px-3 ${
                      selectedCollection === 'ALL'
                        ? 'bg-brand-ink text-brand-paper font-bold'
                        : 'bg-brand-pureWhite text-brand-ink'
                    }`}
                  >
                    ALL COLLECTIONS
                  </button>
                  {COLLECTIONS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCollection(c.id)}
                      className={`w-full text-left font-mono text-xs py-2 px-3 ${
                        selectedCollection === c.id
                          ? 'bg-brand-ink text-brand-paper font-bold'
                          : 'bg-brand-pureWhite text-brand-ink'
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-brand-muted mb-2">
                  POSTER SIZE
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {['ALL', 'A4', 'A3', 'A2', 'A1'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono font-bold border ${
                        selectedSize === size
                          ? 'bg-brand-ink text-brand-paper'
                          : 'bg-brand-pureWhite text-brand-ink'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-divider space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-brand-red text-white font-mono font-bold py-3 text-xs uppercase"
              >
                SHOW {filteredProducts.length} PRINTS
              </button>
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full text-center font-mono text-xs text-brand-muted py-2 underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

