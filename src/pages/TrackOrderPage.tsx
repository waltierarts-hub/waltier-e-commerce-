import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PosterArtSvg } from '../components/PosterArtSvg';
import { fetchOrderFromSupabase } from '../lib/supabase';

export const TrackOrderPage: React.FC<{ onNavigateToShop: () => void }> = ({ onNavigateToShop }) => {
  const { orders } = useStore();
  const [searchQuery, setSearchQuery] = useState(orders[0]?.orderId || 'WAL-8942');
  const [searchedOrder, setSearchedOrder] = useState<any>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toLowerCase();
    
    // First check client store
    const localFound = orders.find(
      (o) => o.orderId.toLowerCase() === query
    );
    if (localFound) {
      setSearchedOrder(localFound);
      return;
    }

    // Fallback to server DB lookup
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success && data.order) {
        setSearchedOrder(data.order);
        return;
      }
    } catch {}

    // Fallback direct to Supabase
    try {
      const supabaseOrder = await fetchOrderFromSupabase(searchQuery.trim());
      if (supabaseOrder) {
        setSearchedOrder(supabaseOrder);
        return;
      }
    } catch {}

    setSearchedOrder(null);
  };

  const steps = [
    { label: 'Order Confirmed', date: 'Day 1, 10:30 AM', completed: true },
    { label: 'Printed & Inspected (Giclée)', date: 'Day 1, 4:15 PM', completed: true },
    { label: 'Framed & Packaging Sealed', date: 'Day 2, 11:00 AM', completed: true },
    { label: 'Handed to Bluedart / Delhivery', date: 'Day 2, 6:30 PM', completed: true },
    { label: 'Out for Delivery', date: 'Estimated Tomorrow', completed: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Search Header */}
      <div className="border-b-2 border-brand-ink pb-6 text-center space-y-3">
        <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
          LOGISTICS & DISPATCH PORTAL
        </span>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-brand-ink uppercase">
          TRACK YOUR POSTER SHIPMENT
        </h1>
        <p className="font-sans text-sm text-brand-muted max-w-md mx-auto">
          Enter your order confirmation number (e.g., WAL-8942) to check live printing and courier status.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2 pt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="WAL-8942"
            className="flex-1 bg-brand-pureWhite border-2 border-brand-ink p-3 font-mono text-sm uppercase focus:outline-none focus:border-brand-red"
          />
          <button
            type="submit"
            className="bg-brand-red hover:bg-brand-ink text-white font-mono font-bold text-xs px-6 uppercase shadow-brutal-sm transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>TRACK</span>
          </button>
        </form>
      </div>

      {/* Result Display */}
      {searchedOrder ? (
        <div className="bg-brand-pureWhite border-2 border-brand-ink p-6 sm:p-8 space-y-8 shadow-brutal">
          
          {/* Header Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-divider gap-4">
            <div>
              <div className="font-mono text-xs text-brand-red font-bold">
                SHIPMENT IN TRANSIT
              </div>
              <h2 className="font-display font-black text-2xl text-brand-ink">
                ORDER #{searchedOrder.orderId}
              </h2>
              <div className="font-mono text-xs text-brand-muted">
                Recipient: {searchedOrder.customer.fullName} • Destination: {searchedOrder.customer.city}
              </div>
            </div>

            <div className="bg-brand-paper border border-brand-divider px-4 py-2 font-mono text-xs text-right">
              <span className="text-brand-muted block text-[10px]">ESTIMATED ARRIVAL</span>
              <span className="font-bold text-brand-ink">24-48 HOURS</span>
            </div>
          </div>

          {/* Timeline Steps */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase text-brand-muted mb-6 tracking-wider">
              PRINT & COURIER TIMELINE
            </h3>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-brand-divider">
              {steps.map((step, idx) => (
                <div key={step.label} className="relative flex items-start gap-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center z-10 font-mono text-xs font-bold ${
                      step.completed
                        ? 'bg-brand-ink text-brand-paper shadow-sm'
                        : 'bg-brand-paper border-2 border-brand-divider text-brand-muted'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div
                      className={`font-mono text-sm font-bold ${
                        step.completed ? 'text-brand-ink' : 'text-brand-muted'
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="font-sans text-xs text-brand-muted">
                      {step.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items in this parcel */}
          <div className="pt-6 border-t border-brand-divider">
            <h4 className="font-mono text-xs font-bold uppercase text-brand-ink mb-4">
              PACKAGE CONTENTS ({searchedOrder.items.length})
            </h4>

            <div className="space-y-3">
              {searchedOrder.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-brand-paper border border-brand-divider">
                  <div className="w-10 h-14 bg-brand-ink flex-shrink-0">
                    <PosterArtSvg id={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs font-mono">
                    <div className="font-bold text-brand-ink">{item.title}</div>
                    <div className="text-brand-muted text-[11px]">
                      {item.size} • {item.framed ? `Framed (${item.frameColor})` : 'Unframed'} • Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-xs text-brand-ink">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : hasSearched ? (
        <div className="bg-brand-pureWhite border-2 border-dashed border-brand-divider p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-brand-muted mx-auto" />
          <h3 className="font-display font-black text-2xl text-brand-ink">
            ORDER NOT FOUND
          </h3>
          <p className="font-sans text-sm text-brand-muted max-w-sm mx-auto">
            We couldn't locate an order with ID "{searchQuery}". Please check your order confirmation email or try searching with our sample ID <code>WAL-8942-DEMO</code>.
          </p>
        </div>
      ) : null}

    </div>
  );
};

