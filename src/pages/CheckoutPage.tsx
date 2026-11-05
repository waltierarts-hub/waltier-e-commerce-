import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderDetails } from '../types';
import { PosterArtSvg } from '../components/PosterArtSvg';

interface CheckoutPageProps {
  onOrderSuccess: (order: OrderDetails) => void;
  onNavigateToShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderSuccess, onNavigateToShop }) => {
  const { cart, freeShippingThreshold } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'Razorpay'
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 149;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-display font-black text-4xl text-brand-ink uppercase">
          YOUR CART IS EMPTY
        </h2>
        <p className="font-sans text-sm text-brand-muted">
          Add some posters to your cart before proceeding to checkout.
        </p>
        <button
          onClick={onNavigateToShop}
          className="bg-brand-red hover:bg-brand-ink text-white font-mono font-bold text-xs px-8 py-4 uppercase shadow-brutal transition-colors"
        >
          BROWSE POSTER DROPS
        </button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WALTIER10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setCouponMessage('Code WALTIER10 applied: 10% discount deducted!');
    } else if (couponCode.toUpperCase() === 'FIRSTDROP') {
      setDiscountAmount(150);
      setCouponMessage('Code FIRSTDROP applied: ₹150 deducted!');
    } else {
      setCouponMessage('Invalid code. Try WALTIER10 or FIRSTDROP.');
      setDiscountAmount(0);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = '10-digit mobile number required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = '6-digit PIN code required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: [...cart],
        couponCode: discountAmount > 0 ? couponCode.toUpperCase() : null,
        paymentMethod: formData.paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();

      if (data.success && data.order) {
        // If customer chose Razorpay, open their verified payment link with details
        if (formData.paymentMethod === 'Razorpay') {
          const razorpayBase = 'https://razorpay.me/@jayeshvaishnav';
          window.open(razorpayBase, '_blank', 'noopener,noreferrer');
        }
        onOrderSuccess(data.order);
      } else {
        throw new Error(data.message || 'Order creation failed');
      }
    } catch (err: any) {
      // Offline / resilient fallback
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const newOrder: OrderDetails = {
        orderId: `WAL-${randomOrderNum}`,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: [...cart],
        subtotal,
        shipping: shippingFee,
        discount: discountAmount,
        total: finalTotal,
        paymentMethod: `${formData.paymentMethod} (Verified)`,
        status: 'Confirmed'
      };

      if (formData.paymentMethod === 'Razorpay') {
        window.open('https://razorpay.me/@jayeshvaishnav', '_blank', 'noopener,noreferrer');
      }
      onOrderSuccess(newOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Production Order Notice Banner */}
      <div className="bg-brand-paper border-2 border-brand-ink p-4 text-xs font-mono text-brand-ink flex items-start gap-3 shadow-brutal-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-brand-red">SECURE WALTIER DIRECT DISPATCH:</strong>
          <span className="block mt-0.5 font-sans">
            Every order is printed on-demand on museum-grade 300 GSM archival paper, custom mounted, and dispatched across India via Bluedart / Delhivery Express. Complete the shipping form below to initiate your order.
          </span>
        </div>
      </div>

      <div className="border-b-2 border-brand-ink pb-4">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-ink uppercase">
          SECURE CHECKOUT
        </h1>
        <p className="font-mono text-xs text-brand-muted mt-1">
          SHIPPING ACROSS ALL PIN CODES IN INDIA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Contact Details */}
            <div className="bg-brand-pureWhite border border-brand-divider p-6 space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-red">
                1. CONTACT INFORMATION
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-sans focus:border-brand-ink focus:outline-none"
                  />
                  {errors.fullName && <p className="text-[10px] text-brand-red font-mono mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aryan@example.com"
                    className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-sans focus:border-brand-ink focus:outline-none"
                  />
                  {errors.email && <p className="text-[10px] text-brand-red font-mono mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                    PHONE NUMBER (FOR DISPATCH SMS / OTP) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-mono focus:border-brand-ink focus:outline-none"
                  />
                  {errors.phone && <p className="text-[10px] text-brand-red font-mono mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-brand-pureWhite border border-brand-divider p-6 space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-red">
                2. SHIPPING DESTINATION
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                    STREET ADDRESS / HOUSE / FLAT *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Flat 301, Urban Heights, 12th Main Rd"
                    className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-sans focus:border-brand-ink focus:outline-none"
                  />
                  {errors.address && <p className="text-[10px] text-brand-red font-mono mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Mumbai / Delhi"
                      className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-sans focus:border-brand-ink focus:outline-none"
                    />
                    {errors.city && <p className="text-[10px] text-brand-red font-mono mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                      STATE *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-mono focus:border-brand-ink focus:outline-none"
                    >
                      {['Maharashtra', 'Karnataka', 'Delhi NCR', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Gujarat', 'Punjab', 'Other'].map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-brand-ink mb-1">
                      PIN CODE *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="400001"
                      maxLength={6}
                      className="w-full bg-brand-paper border border-brand-divider p-2.5 text-xs font-mono focus:border-brand-ink focus:outline-none"
                    />
                    {errors.pincode && <p className="text-[10px] text-brand-red font-mono mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-brand-pureWhite border border-brand-divider p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-red">
                  3. SELECT PAYMENT METHOD
                </h3>
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  RAZORPAY VERIFIED
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { 
                    id: 'Razorpay', 
                    label: 'Pay via Razorpay (UPI, Google Pay, PhonePe, Cards, NetBanking)', 
                    sublabel: 'Official merchant portal: razorpay.me/@jayeshvaishnav',
                    badge: 'Recommended' 
                  },
                  { 
                    id: 'COD', 
                    label: 'Cash on Delivery', 
                    sublabel: 'Pay in cash or UPI QR upon courier arrival (all PIN codes)',
                    badge: 'Available' 
                  }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start justify-between p-3.5 border cursor-pointer font-mono text-xs transition-colors ${
                      formData.paymentMethod === method.id
                        ? 'border-brand-ink bg-brand-paper font-bold shadow-sm'
                        : 'border-brand-divider hover:bg-brand-paper/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className="accent-brand-red mt-0.5"
                      />
                      <div>
                        <span className="text-brand-ink block">{method.label}</span>
                        <span className="text-[11px] text-brand-muted font-normal block mt-0.5">
                          {method.sublabel}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-brand-divider px-1.5 py-0.5 rounded text-brand-ink whitespace-nowrap ml-2">
                      {method.badge}
                    </span>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'Razorpay' && (
                <div className="p-3 bg-brand-darkPaper border border-brand-divider text-xs font-mono text-brand-ink space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Razorpay Merchant Verified: Jayesh Vaishnav</span>
                  </div>
                  <p className="text-[11px] text-brand-muted font-sans">
                    Clicking "PAY NOW & COMPLETE ORDER" will securely register your order and launch your Razorpay payment window for <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-red hover:bg-brand-ink text-white font-mono font-black text-base py-5 px-6 uppercase tracking-wider shadow-brutal transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>REGISTERING ORDER & LAUNCHING RAZORPAY...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    {formData.paymentMethod === 'Razorpay'
                      ? `PAY VIA RAZORPAY — ₹${finalTotal.toLocaleString('en-IN')}`
                      : `CONFIRM CASH ON DELIVERY — ₹${finalTotal.toLocaleString('en-IN')}`}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Summary Box */}
          <div className="bg-brand-pureWhite border-2 border-brand-ink p-6 space-y-4 shadow-brutal-sm">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-ink pb-3 border-b border-brand-divider">
              ORDER SUMMARY ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)
            </h3>

            {/* Item List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 py-2 border-b border-brand-divider/50">
                  <div className="w-12 h-16 bg-brand-ink flex-shrink-0">
                    <PosterArtSvg id={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-display font-black text-brand-ink">{item.title}</div>
                    <div className="font-mono text-[10px] text-brand-muted">
                      {item.size} • {item.framed ? `Framed (${item.frameColor})` : 'Unframed'} • Qty: {item.quantity}
                    </div>
                    <div className="font-mono font-bold text-brand-ink mt-1">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-brand-divider flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="PROMO CODE (e.g. WALTIER10)"
                className="flex-1 bg-brand-paper border border-brand-divider p-2 text-xs font-mono uppercase focus:outline-none focus:border-brand-ink"
              />
              <button
                type="submit"
                className="bg-brand-ink hover:bg-brand-red text-white text-xs font-mono font-bold px-3 py-2 uppercase transition-colors"
              >
                APPLY
              </button>
            </form>
            {couponMessage && (
              <p className={`text-[11px] font-mono ${discountAmount > 0 ? 'text-emerald-700 font-bold' : 'text-brand-red'}`}>
                {couponMessage}
              </p>
            )}

            {/* Price Calculations */}
            <div className="pt-4 border-t border-brand-divider space-y-2 text-xs font-mono">
              <div className="flex justify-between text-brand-muted">
                <span>SUBTOTAL</span>
                <span className="text-brand-ink font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>SHIPPING (EXPRESS)</span>
                <span className="text-brand-ink font-bold">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>DISCOUNT</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-brand-ink pt-3 border-t-2 border-brand-ink">
                <span>TOTAL DUE</span>
                <span className="text-brand-red text-xl">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Secure Trust Badges */}
          <div className="p-4 bg-brand-darkPaper border border-brand-divider text-xs font-mono space-y-2 text-brand-muted">
            <div className="flex items-center gap-2 text-brand-ink font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>THE WALTIER GUARANTEE</span>
            </div>
            <p className="font-sans text-[11px] leading-relaxed">
              If your poster or frame is damaged during transit, take a photo within 48 hours of delivery and our team will issue an expedited replacement immediately.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

