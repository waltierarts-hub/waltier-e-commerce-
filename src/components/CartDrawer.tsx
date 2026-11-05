import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PosterArtSvg } from './PosterArtSvg';

export const CartDrawer: React.FC<{ onNavigateToCheckout: () => void; onNavigateToShop: () => void }> = ({
  onNavigateToCheckout,
  onNavigateToShop
}) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, freeShippingThreshold } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-ink/75 backdrop-blur-sm drawer-backdrop-fade"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-paper border-l-2 border-brand-ink shadow-2xl flex flex-col justify-between drawer-slide-right">
          
          {/* Header */}
          <div className="p-5 border-b border-brand-divider bg-brand-pureWhite flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-red" />
              <h2 className="font-display font-black text-xl text-brand-ink tracking-tight">
                YOUR WALL CART
              </h2>
              <span className="font-mono text-xs bg-brand-ink text-brand-paper px-2 py-0.5 rounded-sm">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-brand-ink hover:text-brand-red transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Meter */}
          <div className="bg-brand-darkPaper px-5 py-3 border-b border-brand-divider text-xs font-mono">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-brand-ink font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-red" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-black">QUALIFIED FOR FREE EXPRESS SHIPPING!</span>
                ) : (
                  <span>Add ₹{remainingForFreeShipping.toLocaleString('en-IN')} more for FREE shipping</span>
                )}
              </span>
              <span className="text-brand-muted">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-brand-divider h-1.5 overflow-hidden">
              <div
                className="bg-brand-red h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-20 bg-brand-darkPaper border-2 border-dashed border-brand-muted/40 mx-auto flex items-center justify-center">
                  <span className="font-mono text-xs text-brand-muted">EMPTY</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-brand-ink">
                    PLAIN WALLS? HARD PASS.
                  </h3>
                  <p className="font-sans text-xs text-brand-muted mt-1 max-w-xs mx-auto">
                    Your cart is completely empty. Explore our latest drops and give your space an attitude upgrade.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="inline-flex items-center gap-2 bg-brand-ink hover:bg-brand-red text-white font-mono text-xs font-bold px-6 py-3 transition-colors shadow-brutal-sm"
                >
                  <span>BROWSE ARCHIVE PRINTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-brand-pureWhite border border-brand-divider relative group"
                >
                  {/* Poster Thumbnail */}
                  <div className="w-16 h-22 bg-brand-ink border border-brand-divider flex-shrink-0">
                    <PosterArtSvg id={item.image} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-black text-sm text-brand-ink leading-tight">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-brand-muted hover:text-brand-red transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono text-[11px] text-brand-muted mt-0.5 space-x-1">
                        <span className="bg-brand-paper px-1 border border-brand-divider font-bold">
                          {item.size}
                        </span>
                        <span>
                          {item.framed ? `Framed (${item.frameColor})` : 'Unframed Rolled'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-brand-divider/50">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand-divider font-mono text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 bg-brand-paper hover:bg-brand-darkPaper text-brand-ink font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold bg-brand-pureWhite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 bg-brand-paper hover:bg-brand-darkPaper text-brand-ink font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-sm font-black text-brand-ink">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t-2 border-brand-ink bg-brand-pureWhite space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-brand-muted">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-brand-ink">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>ESTIMATED SHIPPING</span>
                  <span className="font-bold text-brand-ink">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '₹149'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-ink pt-2 border-t border-brand-divider">
                  <span>TOTAL (INR)</span>
                  <span className="font-black text-brand-red text-lg">
                    ₹{(subtotal + (subtotal >= freeShippingThreshold ? 0 : 149)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToCheckout();
                  }}
                  className="w-full bg-brand-red hover:bg-brand-ink text-white font-mono font-black py-4 px-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal transition-all"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="w-full text-center text-xs font-mono text-brand-muted hover:text-brand-ink py-1 underline"
                >
                  Continue Browsing Wall Art
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-brand-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% TRANSIT DAMAGE REPLACEMENT GUARANTEE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

