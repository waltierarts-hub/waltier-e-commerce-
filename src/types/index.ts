export interface ProductVariant {
  id: string;
  size: 'A4' | 'A3' | 'A2' | 'A1';
  framed: boolean;
  frameColor?: 'Matte Black' | 'Natural Oak' | 'Raw White';
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  collection: 'TYPE & ATTITUDE' | 'AFTER HOURS' | 'SOUND & RHYTHM' | 'STREET ENERGY' | 'MINIMAL MOOD' | 'ABSTRACT CHAOS';
  tags: string[];
  orientation: 'Portrait' | 'Landscape' | 'Square';
  basePrice: number;
  badge?: 'NEW' | 'POPULAR' | 'LIMITED' | 'DROP 04';
  palette: string[];
  specs: {
    paperWeight: string;
    finish: string;
    printTech: string;
    packaging: string;
  };
  mockups: {
    artwork: string;
    room: string;
    detail: string;
    scale: string;
  };
  variants: ProductVariant[];
  relatedIds: string[];
}

export interface CartItem {
  id: string; // generated unique key product.id + size + framed + frameColor
  productId: string;
  title: string;
  image: string;
  size: 'A4' | 'A3' | 'A2' | 'A1';
  framed: boolean;
  frameColor?: string;
  price: number;
  quantity: number;
}

export interface OrderDetails {
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
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Printing' | 'Packed' | 'In Transit' | 'Delivered';
}

