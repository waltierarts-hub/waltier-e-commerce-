import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
}

export const SiteHeader: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { cart, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key and body scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'SHOP ALL', page: 'shop' },
    { label: 'NEW DROPS', page: 'shop', filter: 'new' },
    { label: 'BESTSELLERS', page: 'shop', filter: 'popular' },
    { label: 'COLLECTIONS', page: 'collections' },
    { label: 'ABOUT', page: 'about' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-brand-paper/95 backdrop-blur-md shadow-sm border-brand-divider py-2.5'
          : 'bg-brand-paper border-brand-divider/70 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-brand-ink hover:text-brand-red transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Clickable Brand Logo */}
            <div
              className="cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <BrandLogo size={isScrolled ? 'md' : 'md'} />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page && !item.filter;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.page, item.filter)}
                  className={`font-mono text-xs tracking-wider uppercase font-semibold transition-all relative py-1 hover:text-brand-red nav-link-editorial ${
                    isActive ? 'text-brand-red font-bold active' : 'text-brand-ink'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-brand-ink hover:text-brand-red transition-colors flex items-center gap-1.5 rounded"
              title="Search catalog (Ctrl + K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2]" />
              <span className="hidden xl:inline font-mono text-[11px] text-brand-muted bg-brand-divider/40 px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('wishlist')}
              className={`p-2 relative transition-colors ${
                currentPage === 'wishlist' ? 'text-brand-red' : 'text-brand-ink hover:text-brand-red'
              }`}
              title="View saved wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-brand-red text-brand-red' : 'stroke-[2]'}`} />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 -right-0.5 w-4 h-4 bg-brand-red text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 relative bg-brand-ink text-brand-paper hover:bg-brand-red transition-colors px-3 py-1.5 flex items-center gap-2 text-xs font-mono font-bold shadow-brutal-sm"
              aria-label={`Cart with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">CART</span>
              <span className="bg-brand-red px-1.5 py-0.2 rounded-sm text-white text-[11px] font-mono">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-ink/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-brand-paper shadow-2xl flex flex-col justify-between border-r-2 border-brand-ink z-10 animate-in slide-in-from-left duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-brand-divider">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-brand-ink hover:text-brand-red"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4 font-mono text-[11px] text-brand-muted tracking-widest">
                ARCHIVE NAVIGATION // 2026
              </div>

              <div className="space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      onNavigate(link.page, link.filter);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left font-display text-2xl font-black text-brand-ink hover:text-brand-red transition-colors py-1 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-red transition-colors opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-brand-divider space-y-3">
                <button
                  onClick={() => {
                    onNavigate('wishlist');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-sm font-mono font-semibold py-2 text-brand-ink hover:text-brand-red"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-brand-red" />
                    SAVED WISHLIST
                  </span>
                  <span className="font-mono text-xs bg-brand-divider/50 px-2 py-0.5 rounded">
                    {wishlist.length} ITEMS
                  </span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('track');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-sm font-mono font-semibold py-2 text-brand-ink hover:text-brand-red"
                >
                  <span>TRACK YOUR ORDER</span>
                  <span className="text-xs text-brand-muted">FIND DISPATCH →</span>
                </button>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="p-6 bg-brand-darkPaper border-t border-brand-divider text-xs font-mono text-brand-muted">
              <div className="text-brand-ink font-bold mb-1">WALTIER POSTER CO.</div>
              <div>“Your walls deserve a personality.”</div>
              <div className="mt-2 text-[10px] text-brand-red font-semibold">ALL RIGHTS RESERVED // INDEPENDENT LABEL</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

