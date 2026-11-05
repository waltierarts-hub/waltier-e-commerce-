import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, Clock, Search, RefreshCw, Key, ShieldCheck, ExternalLink, ArrowLeft, Database } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { supabase } from '../lib/supabase';

interface AdminOrder {
  orderId: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    id: string;
    productId: string;
    title: string;
    size: string;
    framed: boolean;
    frameColor?: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  fulfillmentStatus: string;
}

export const AdminPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const { showToast } = useStore();
  const [adminKey, setAdminKey] = useState<string>(() => {
    return localStorage.getItem('waltier_admin_key') || 'waltier_admin_2026';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [keyInput, setKeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const fetchOrders = async (keyToUse = adminKey) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'x-admin-key': keyToUse }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders || []);
        setIsAuthenticated(true);
        localStorage.setItem('waltier_admin_key', keyToUse);
        return;
      }
    } catch {}

    // Fallback directly to Supabase cloud if server endpoint unreachable
    try {
      const { data: supaOrders, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && supaOrders && supaOrders.length > 0) {
        const mapped: AdminOrder[] = supaOrders.map((s: any) => ({
          orderId: s.order_id,
          createdAt: s.created_at,
          customer: {
            fullName: s.customer_name,
            email: s.customer_email,
            phone: s.customer_phone,
            address: s.shipping_address,
            city: s.city,
            state: s.state,
            pincode: s.pincode
          },
          items: s.items || [],
          subtotal: Number(s.subtotal) || 0,
          discount: Number(s.discount) || 0,
          shipping: Number(s.shipping) || 0,
          total: Number(s.total) || 0,
          paymentMethod: s.payment_method || 'Razorpay',
          paymentStatus: s.payment_status || 'Paid',
          fulfillmentStatus: s.fulfillment_status || 'Confirmed'
        }));
        setOrders(mapped);
        setIsAuthenticated(true);
        return;
      }
    } catch {}

    setIsAuthenticated(false);
    setAuthError('Unauthorized admin access. Please check key.');
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders(adminKey);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setAdminKey(keyInput.trim());
    fetchOrders(keyInput.trim());
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Updated #${orderId} status to: ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o.orderId === orderId ? { ...o, fulfillmentStatus: newStatus } : o))
        );
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch {
      alert('Error updating order status');
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = selectedStatus === 'ALL' || o.fulfillmentStatus === selectedStatus;
    const q = searchFilter.toLowerCase();
    const matchesSearch =
      !q ||
      o.orderId.toLowerCase().includes(q) ||
      o.customer.fullName.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q) ||
      o.customer.phone.includes(q) ||
      o.customer.city.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-brand-pureWhite border-2 border-brand-ink p-8 shadow-brutal space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-brand-ink text-brand-paper rounded-full shadow-sm">
              <Key className="w-6 h-6 text-brand-red" />
            </div>
            <h1 className="font-display font-black text-2xl text-brand-ink uppercase">
              WALTIER STUDIO ADMIN
            </h1>
            <p className="font-mono text-xs text-brand-muted">
              Enter private studio key to manage orders and dispatch.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold text-brand-ink mb-1">
                ADMIN ACCESS KEY
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="waltier_admin_2026"
                className="w-full bg-brand-paper border-2 border-brand-ink p-3 font-mono text-sm focus:outline-none focus:border-brand-red"
              />
            </div>

            {authError && (
              <p className="font-mono text-xs text-brand-red font-bold">{authError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-red hover:bg-brand-ink text-white font-mono font-bold text-xs py-3.5 uppercase tracking-wider shadow-brutal-sm transition-colors"
            >
              {isLoading ? 'VERIFYING...' : 'LOGIN TO DASHBOARD'}
            </button>
          </form>

          <div className="pt-4 border-t border-brand-divider text-center">
            <button
              onClick={onNavigateHome}
              className="font-mono text-xs text-brand-muted hover:text-brand-ink underline"
            >
              ← Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-brand-ink gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs bg-brand-red text-white px-2 py-0.5 font-bold uppercase">
              STUDIO PORTAL
            </span>
            <span className="font-mono text-xs text-brand-muted">
              Live Fulfillment & Order Operations
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-ink uppercase mt-1">
            ORDERS & FULFILLMENT DESK
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchOrders()}
            disabled={isLoading}
            className="bg-brand-paper border border-brand-ink p-2 text-brand-ink hover:text-brand-red transition-colors shadow-sm flex items-center gap-1.5 font-mono text-xs font-bold"
            title="Refresh order database"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>REFRESH</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="bg-brand-ink hover:bg-brand-red text-white font-mono font-bold text-xs px-4 py-2 uppercase shadow-sm transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>VIEW STOREFRONT</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-brand-pureWhite border border-brand-divider p-4 shadow-sm">
          <span className="font-mono text-[11px] text-brand-muted uppercase block">TOTAL ORDERS</span>
          <span className="font-display font-black text-3xl text-brand-ink mt-1 block">
            {orders.length}
          </span>
        </div>

        <div className="bg-brand-pureWhite border border-brand-divider p-4 shadow-sm">
          <span className="font-mono text-[11px] text-brand-muted uppercase block">GROSS REVENUE</span>
          <span className="font-display font-black text-3xl text-emerald-700 mt-1 block">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-brand-pureWhite border border-brand-divider p-4 shadow-sm">
          <span className="font-mono text-[11px] text-brand-muted uppercase block">PENDING DISPATCH</span>
          <span className="font-display font-black text-3xl text-brand-red mt-1 block">
            {orders.filter((o) => o.fulfillmentStatus !== 'Delivered').length}
          </span>
        </div>

        <div className="bg-brand-pureWhite border border-brand-divider p-4 shadow-sm">
          <span className="font-mono text-[11px] text-brand-muted uppercase block">MERCHANT LINK</span>
          <a
            href="https://razorpay.me/@jayeshvaishnav"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-bold text-brand-ink hover:text-brand-red flex items-center gap-1 mt-3"
          >
            <span>razorpay.me/@jayeshvaishnav</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-brand-pureWhite border border-brand-divider p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search Order ID, Customer, Phone, City..."
            className="w-full bg-brand-paper border border-brand-divider pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-brand-ink"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['ALL', 'Confirmed', 'Printing', 'Framed', 'In Transit', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 text-xs font-mono uppercase font-bold border transition-colors ${
                selectedStatus === status
                  ? 'bg-brand-ink text-brand-paper border-brand-ink'
                  : 'bg-brand-paper text-brand-muted border-brand-divider hover:text-brand-ink'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-brand-pureWhite border-2 border-brand-ink shadow-brutal-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-ink text-brand-paper font-mono text-[11px] uppercase tracking-wider">
                <th className="p-4">ORDER ID & DATE</th>
                <th className="p-4">CUSTOMER & ADDRESS</th>
                <th className="p-4">ITEMS ORDERED</th>
                <th className="p-4">AMOUNT & PAYMENT</th>
                <th className="p-4">FULFILLMENT STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-divider font-sans text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-brand-muted">
                    No matching orders found in database.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-brand-paper/40 transition-colors">
                    <td className="p-4 align-top font-mono">
                      <span className="font-bold text-sm text-brand-ink block">
                        #{order.orderId}
                      </span>
                      <span className="text-[11px] text-brand-muted">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>

                    <td className="p-4 align-top">
                      <span className="font-bold text-brand-ink block">
                        {order.customer.fullName}
                      </span>
                      <span className="text-brand-muted block font-mono text-[11px]">
                        {order.customer.phone}
                      </span>
                      <span className="text-brand-muted block text-[11px]">
                        {order.customer.city}, {order.customer.state} ({order.customer.pincode})
                      </span>
                      <span className="text-brand-muted text-[10px] block mt-0.5 line-clamp-1">
                        {order.customer.address}
                      </span>
                    </td>

                    <td className="p-4 align-top space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="font-mono text-[11px]">
                          <span className="font-bold text-brand-ink">{item.quantity}x</span> {item.title}{' '}
                          <span className="text-brand-muted">
                            ({item.size} • {item.framed ? (item.frameColor || 'Framed') : 'Unframed'})
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="p-4 align-top font-mono">
                      <span className="font-black text-sm text-brand-red block">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-brand-muted block">
                        {order.paymentMethod}
                      </span>
                      <span className="inline-block mt-1 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        PAID / VERIFIED
                      </span>
                    </td>

                    <td className="p-4 align-top">
                      <select
                        value={order.fulfillmentStatus}
                        onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                        className="bg-brand-paper border border-brand-ink font-mono text-xs font-bold p-1.5 focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Printing">Printing (Giclée)</option>
                        <option value="Framed">Framed & Sealed</option>
                        <option value="In Transit">In Transit (Dispatched)</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

