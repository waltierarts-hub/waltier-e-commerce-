import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, OrderDetails } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  orders: OrderDetails[];
  createOrder: (order: OrderDetails) => void;
  freeShippingThreshold: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('waltier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('waltier_wishlist');
      return saved ? JSON.parse(saved) : ['wal-01', 'wal-05'];
    } catch {
      return ['wal-01', 'wal-05'];
    }
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('waltier_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'WAL-8942',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          customer: {
            fullName: 'Kabir Malhotra',
            email: 'kabir.m@example.com',
            phone: '+91 98765 43210',
            address: 'Flat 402, Signature Towers, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038'
          },
          items: [
            {
              id: 'wal-01-A2-black',
              productId: 'wal-01',
              title: 'AFTER HOURS',
              image: 'after-hours',
              size: 'A2',
              framed: true,
              frameColor: 'Matte Black',
              price: 3299,
              quantity: 1
            }
          ],
          subtotal: 3299,
          shipping: 0,
          discount: 0,
          total: 3299,
          paymentMethod: 'UPI (Verified)',
          status: 'In Transit'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const freeShippingThreshold = 1499;

  useEffect(() => {
    try {
      localStorage.setItem('waltier_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('waltier_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('waltier_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.size}-${item.framed ? item.frameColor : 'unframed'}`;
    setCart((prev) => {
      const existing = prev.find((x) => x.id === id);
      if (existing) {
        return prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity + item.quantity } : x));
      }
      return [...prev, { ...item, id }];
    });
    showToast(`Added "${item.title}" (${item.size}) to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
    showToast('Item removed from cart');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((x) => {
          if (x.id === id) {
            const nextQty = x.quantity + delta;
            return nextQty > 0 ? { ...x, quantity: nextQty } : null;
          }
          return x;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const title = product ? product.title : 'Poster';
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed "${title}" from wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${title}" to your wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const createOrder = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isFilterOpen,
        setIsFilterOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
        orders,
        createOrder,
        freeShippingThreshold
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};

