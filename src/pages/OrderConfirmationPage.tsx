import React from 'react';
import { CheckCircle, Truck, Package, ArrowRight, ShieldAlert, Copy } from 'lucide-react';
import { OrderDetails } from '../types';
import { PosterArtSvg } from '../components/PosterArtSvg';
import { useStore } from '../context/StoreContext';

interface OrderConfirmationPageProps {
  order: OrderDetails;
  onNavigateToShop: () => void;
  onNavigateToTrack: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onNavigateToShop,
  onNavigateToTrack
}) => {
  const { showToast } = useStore();

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      showToast(`Copied Order ID: ${order.orderId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Success Hero */}
      <div className="border-4 border-brand-ink bg-brand-pureWhite p-8 sm:p-12 text-center space-y-4 shadow-brutal-lg">
        <div className="w-16 h-16 bg-brand-ink text-white rounded-full flex items-center justify-center mx-auto shadow-brutal-sm">
          <CheckCircle className="w-8 h-8 text-brand-red" />
        </div>

        <div className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">
          ORDER VERIFIED & CONFIRMED // LIVE FULFILLMENT QUEUE
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-brand-ink uppercase tracking-tight">
          WALL UPGRADE CONFIRMED.
        </h1>

        <p className="font-sans text-base text-brand-muted max-w-lg mx-auto">
          Thank you, <strong className="text-brand-ink">{order.customer.fullName}</strong>. We've queued your art prints for museum-grade Giclée production.
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-3 bg-brand-paper border-2 border-brand-ink px-4 py-2 font-mono text-sm font-bold text-brand-ink shadow-brutal-sm">
          <span>ORDER ID: {order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="text-brand-muted hover:text-brand-red p-1"
            title="Copy Order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Breakdown Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Purchased Items */}
        <div className="bg-brand-pureWhite border border-brand-divider p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase text-brand-ink border-b border-brand-divider pb-3">
            ITEMS IN PRODUCTION ({order.items.length})
          </h3>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-14 h-18 bg-brand-ink flex-shrink-0">
                  <PosterArtSvg id={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-display font-black text-brand-ink text-sm">{item.title}</div>
                  <div className="font-mono text-brand-muted text-[11px]">
                    Size: {item.size} • {item.framed ? `Framed (${item.frameColor})` : 'Unframed Rolled'}
                  </div>
                  <div className="font-mono font-bold text-brand-ink mt-0.5">
                    Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-divider text-xs font-mono space-y-1">
            <div className="flex justify-between text-brand-muted">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-brand-muted">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base text-brand-ink pt-2 border-t border-brand-divider">
              <span>Total Paid</span>
              <span className="text-brand-red">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Info */}
        <div className="space-y-6">
          <div className="bg-brand-pureWhite border border-brand-divider p-6 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase text-brand-ink border-b border-brand-divider pb-3">
              DELIVERY DESTINATION
            </h3>
            <div className="font-sans text-xs text-brand-ink/80 space-y-1">
              <p className="font-bold text-brand-ink">{order.customer.fullName}</p>
              <p>{order.customer.address}</p>
              {order.customer.apartment && <p>{order.customer.apartment}</p>}
              <p>{order.customer.city}, {order.customer.state} — {order.customer.pincode}</p>
              <p className="font-mono text-brand-muted pt-1">Phone: {order.customer.phone}</p>
              <p className="font-mono text-brand-muted">Email: {order.customer.email}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-brand-paper border-2 border-brand-ink p-6 space-y-3">
            <div className="font-mono text-xs font-bold text-brand-ink uppercase">
              PAYMENT & DISPATCH ACTIONS:
            </div>
            
            <a
              href="https://razorpay.me/@jayeshvaishnav"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs py-3.5 uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal-sm transition-colors text-center"
            >
              <span>PAY / VERIFY VIA RAZORPAY PORTAL</span>
            </a>

            <button
              onClick={onNavigateToTrack}
              className="w-full bg-brand-ink hover:bg-brand-red text-white font-mono font-bold text-xs py-3.5 uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal-sm transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>TRACK LIVE DISPATCH STATUS</span>
            </button>
            <button
              onClick={onNavigateToShop}
              className="w-full bg-brand-pureWhite hover:bg-brand-paper text-brand-ink border border-brand-ink font-mono font-bold text-xs py-3 uppercase transition-colors"
            >
              CONTINUE BROWSING CATALOG
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

