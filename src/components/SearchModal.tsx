import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { PosterArtSvg } from './PosterArtSvg';

export const SearchModal: React.FC<{ onSelectProduct: (slug: string) => void }> = ({ onSelectProduct }) => {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd/Ctrl + K or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });

  const popularSearches = ['After Hours', 'Redline', 'Brutalist', 'Typographic', 'Drop 04', 'No Signal'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-ink/80 backdrop-blur-sm drawer-backdrop-fade"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Container */}
      <div className="relative z-10 w-full max-w-2xl bg-brand-paper border-2 border-brand-ink shadow-brutal-lg overflow-hidden modal-pop-center">
        {/* Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b-2 border-brand-ink bg-brand-pureWhite">
          <Search className="w-5 h-5 text-brand-muted mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, collection, aesthetic, tag..."
            autoFocus
            className="w-full bg-transparent font-sans text-base text-brand-ink placeholder-brand-muted/70 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-brand-muted hover:text-brand-ink mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-mono font-bold text-brand-muted hover:text-brand-red ml-2 uppercase"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <div className="font-mono text-[11px] text-brand-muted uppercase tracking-wider mb-2">
                POPULAR ARCHIVE SEARCHES:
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-brand-pureWhite border border-brand-divider text-xs font-mono text-brand-ink hover:border-brand-ink hover:text-brand-red transition-colors"
                  >
                    <Tag className="w-3 h-3 text-brand-red" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-brand-divider">
                <div className="font-mono text-[11px] text-brand-muted uppercase tracking-wider mb-2">
                  CURATED HIGHLIGHTS:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        onSelectProduct(p.slug);
                      }}
                      className="p-2 border border-brand-divider hover:border-brand-ink bg-brand-pureWhite flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-14 bg-brand-ink flex-shrink-0">
                        <PosterArtSvg id={p.slug} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-display font-black text-sm text-brand-ink truncate">
                          {p.title}
                        </div>
                        <div className="font-mono text-[11px] text-brand-muted">
                          ₹{p.basePrice}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="font-display font-black text-xl text-brand-ink">
                NO ARTWORK FOUND
              </div>
              <p className="font-sans text-sm text-brand-muted mt-1 max-w-sm mx-auto">
                No matching posters for "{query}". Try checking spelling or browse all releases.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="font-mono text-[11px] text-brand-muted uppercase tracking-wider mb-2">
                FOUND {filteredProducts.length} POSTERS:
              </div>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSelectProduct(p.slug);
                  }}
                  className="p-3 bg-brand-pureWhite border border-brand-divider hover:border-brand-ink flex items-center justify-between cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-brand-ink border border-brand-divider flex-shrink-0">
                      <PosterArtSvg id={p.slug} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-brand-red uppercase font-bold">
                        {p.collection}
                      </div>
                      <div className="font-display font-black text-base text-brand-ink group-hover:text-brand-red transition-colors">
                        {p.title}
                      </div>
                      <div className="font-sans text-xs text-brand-muted">
                        {p.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-brand-ink">
                      ₹{p.basePrice}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Shortcut Note */}
        <div className="px-4 py-2 bg-brand-darkPaper border-t border-brand-divider flex justify-between items-center text-[10px] font-mono text-brand-muted">
          <span>PRESS [ESC] TO CLOSE</span>
          <span>WALTIER ARCHIVE SEARCH ENGINE</span>
        </div>
      </div>
    </div>
  );
};

