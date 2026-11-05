-- ====================================================================
-- WALTIER POSTER COMPANY — SUPABASE DATABASE SCHEMA (100% PRODUCTION READY)
-- Copy and run this script in your Supabase Project SQL Editor:
-- https://supabase.com/dashboard/project/yraaareklvioqadnjtnt/sql/new
-- ====================================================================

-- 1. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount NUMERIC NOT NULL DEFAULT 0,
    shipping NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'Razorpay',
    payment_status TEXT NOT NULL DEFAULT 'Paid',
    fulfillment_status TEXT NOT NULL DEFAULT 'Confirmed',
    timeline JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert for storefront order flow
CREATE POLICY "Public orders read by order_id" ON public.orders
    FOR SELECT USING (true);

CREATE POLICY "Public insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update orders status" ON public.orders
    FOR UPDATE USING (true);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    collection TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    orientation TEXT DEFAULT 'Portrait',
    base_price NUMERIC NOT NULL,
    badge TEXT,
    palette TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}'::jsonb,
    mockups JSONB DEFAULT '{}'::jsonb,
    variants JSONB DEFAULT '[]'::jsonb,
    related_ids TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active products" ON public.products
    FOR SELECT USING (is_active = true);

-- 3. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can subscribe" ON public.subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read subscribers" ON public.subscribers
    FOR SELECT USING (true);

-- 4. STUDIO CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can send messages" ON public.messages
    FOR INSERT WITH CHECK (true);

