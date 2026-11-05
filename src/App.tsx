import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { FaqContactPage } from './pages/FaqContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { OrderDetails } from './types';

function AppContent() {
  const { toastMessage, createOrder } = useStore();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentParam, setCurrentParam] = useState<string | undefined>(undefined);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Scroll to top on navigation
  const navigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setCurrentParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    createOrder(order);
    setCompletedOrder(order);
    navigate('order-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-paper text-brand-ink selection:bg-brand-red selection:text-white">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-ink text-brand-paper border-2 border-brand-red px-5 py-3 shadow-brutal font-mono text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Overlays */}
      <AnnouncementBar onNavigate={navigate} />
      <SiteHeader currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={navigate} />
        )}

        {(currentPage === 'shop' || currentPage === 'collections') && (
          <ShopPage
            initialCollection={currentParam}
            onNavigateToProduct={(slug) => navigate('product', slug)}
          />
        )}

        {currentPage === 'product' && currentParam && (
          <ProductDetailPage
            slug={currentParam}
            onNavigateToProduct={(slug) => navigate('product', slug)}
            onNavigateToShop={() => navigate('shop')}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onNavigateToProduct={(slug) => navigate('product', slug)}
            onNavigateToShop={() => navigate('shop')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onOrderSuccess={handleOrderSuccess}
            onNavigateToShop={() => navigate('shop')}
          />
        )}

        {currentPage === 'order-confirmation' && completedOrder && (
          <OrderConfirmationPage
            order={completedOrder}
            onNavigateToShop={() => navigate('shop')}
            onNavigateToTrack={() => navigate('track')}
          />
        )}

        {currentPage === 'track' && (
          <TrackOrderPage onNavigateToShop={() => navigate('shop')} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigateToShop={() => navigate('shop')} />
        )}

        {(currentPage === 'faq' || currentPage === 'contact') && (
          <FaqContactPage />
        )}

        {(currentPage === 'shipping' || currentPage === 'returns' || currentPage === 'privacy' || currentPage === 'terms') && (
          <LegalPage initialTab={currentPage} />
        )}

        {currentPage === 'admin' && (
          <AdminPage onNavigateHome={() => navigate('home')} />
        )}

        {currentPage === '404' && (
          <NotFoundPage
            onNavigateHome={() => navigate('home')}
            onNavigateShop={() => navigate('shop')}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => navigate('checkout')}
        onNavigateToShop={() => navigate('shop')}
      />

      {/* Search Dialog */}
      <SearchModal
        onSelectProduct={(slug) => navigate('product', slug)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        onNavigateToProduct={(slug) => navigate('product', slug)}
      />

      {/* Site Footer */}
      <SiteFooter onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
