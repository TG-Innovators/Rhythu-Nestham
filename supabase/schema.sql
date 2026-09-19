-- ==============================================================================
-- RYTHU NESTHAM — SUPABASE PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- From the Farm. With Trust.
-- ==============================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Types & Enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('farmer', 'consumer', 'supplier', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'harvested', 'dispatched', 'delivered', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('cod_inspection', 'direct_farmer_upi', 'whatsapp_direct', 'escrow');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. Tables Definition
-- ==============================================================================

-- PROFILES (Linked 1:1 with Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'consumer',
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  district TEXT,
  mandal TEXT,
  state TEXT DEFAULT 'Telangana',
  pincode TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FARMERS METADATA (Extends profiles for farmers)
CREATE TABLE IF NOT EXISTS public.farmers (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  farm_name TEXT,
  specialty TEXT DEFAULT 'Natural & Organic Produce',
  bio TEXT,
  experience_years INTEGER DEFAULT 5,
  acres_cultivated NUMERIC(6,2) DEFAULT 0,
  primary_crops TEXT[] DEFAULT '{}',
  whatsapp_phone TEXT NOT NULL,
  rating NUMERIC(3,2) DEFAULT 5.00,
  reviews_count INTEGER DEFAULT 0,
  products_sold_count INTEGER DEFAULT 0,
  soil_health_card_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUPPLIERS METADATA (Extends profiles for equipment & inputs suppliers)
CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  gstin TEXT,
  specialties TEXT[] DEFAULT '{}',
  rating NUMERIC(3,2) DEFAULT 5.00,
  products_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  icon TEXT,
  item_count INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  unit TEXT NOT NULL DEFAULT 'kg',
  stock_quantity NUMERIC(10,2) DEFAULT 100,
  minimum_order TEXT DEFAULT '1 kg',
  location TEXT NOT NULL,
  harvest_date DATE DEFAULT CURRENT_DATE,
  freshness_tag TEXT DEFAULT 'Harvested Today',
  description TEXT,
  nutritional_highlight TEXT,
  image_url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT true,
  is_certified BOOLEAN DEFAULT true,
  is_organic BOOLEAN DEFAULT true,
  in_stock BOOLEAN DEFAULT true,
  rating NUMERIC(3,2) DEFAULT 5.00,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCT CERTIFICATIONS & AUDIT PROOF
CREATE TABLE IF NOT EXISTS public.product_certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  certification_name TEXT NOT NULL,
  issuing_body TEXT NOT NULL,
  certificate_number TEXT,
  verified_by TEXT DEFAULT 'Rythu Nestham Agronomist Team',
  verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- CART ITEMS
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  district TEXT NOT NULL,
  pincode TEXT NOT NULL,
  delivery_slot TEXT DEFAULT 'Morning 7-10 AM',
  total_amount NUMERIC(10,2) NOT NULL,
  payment_method payment_method DEFAULT 'whatsapp_direct',
  status order_status DEFAULT 'pending',
  order_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  farmer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL
);

-- REGIONAL DELIVERY WAITLIST (When delivery not yet available in pincode)
CREATE TABLE IF NOT EXISTS public.delivery_waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pincode TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  district TEXT,
  notified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WHATSAPP COMMUNITY LEADS
CREATE TABLE IF NOT EXISTS public.whatsapp_community_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  phone TEXT NOT NULL,
  role_interest user_role DEFAULT 'consumer',
  district TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- REGISTRATION REQUESTS (Farmer, Consumer, Supplier onboarding)
CREATE TABLE IF NOT EXISTS public.registration_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'consumer', 'supplier')),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on ALL tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_community_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- RLS: PROFILES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public profiles are readable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- RLS: FARMERS & SUPPLIERS
-- ------------------------------------------------------------------------------
CREATE POLICY "Farmer profiles are readable by everyone"
  ON public.farmers FOR SELECT
  USING (true);

CREATE POLICY "Supplier profiles are readable by everyone"
  ON public.suppliers FOR SELECT
  USING (true);

CREATE POLICY "Farmers can update own profile"
  ON public.farmers FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Suppliers can update own profile"
  ON public.suppliers FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Farmers can insert own farmer record"
  ON public.farmers FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Suppliers can insert own supplier record"
  ON public.suppliers FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- RLS: CATEGORIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Categories are readable by everyone"
  ON public.categories FOR SELECT
  USING (true);

-- ------------------------------------------------------------------------------
-- RLS: PRODUCTS
-- ------------------------------------------------------------------------------
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Farmers can insert products"
  ON public.products FOR INSERT
  WITH CHECK (
    auth.uid() = farmer_id AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('farmer', 'supplier')
    )
  );

CREATE POLICY "Farmers can update own products"
  ON public.products FOR UPDATE
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete own products"
  ON public.products FOR DELETE
  USING (auth.uid() = farmer_id);

-- ------------------------------------------------------------------------------
-- RLS: PRODUCT CERTIFICATIONS
-- ------------------------------------------------------------------------------
CREATE POLICY "Certifications are viewable by everyone"
  ON public.product_certifications FOR SELECT
  USING (true);

CREATE POLICY "Farmers can manage own product certifications"
  ON public.product_certifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE products.id = product_certifications.product_id
      AND products.farmer_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- RLS: CART ITEMS
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view own cart items"
  ON public.cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON public.cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON public.cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON public.cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- RLS: ORDERS & ORDER ITEMS
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (false); /* Must use checkout function */

CREATE POLICY "Order items viewable by customer or farmer"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
    OR
    farmer_id = auth.uid()
  );

CREATE POLICY "Order items can be inserted with orders"
  ON public.order_items FOR INSERT
  WITH CHECK (false); /* Must use checkout function */

-- ------------------------------------------------------------------------------
-- RLS: DELIVERY WAITLIST & COMMUNITY LEADS
-- ------------------------------------------------------------------------------
CREATE POLICY "Anyone can join delivery waitlist"
  ON public.delivery_waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit WhatsApp community interest"
  ON public.whatsapp_community_leads FOR INSERT
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- RLS: REGISTRATION REQUESTS (Farmer, Consumer, Supplier onboarding)
-- ------------------------------------------------------------------------------
-- Allow anyone (public anon visitors + authenticated users) to submit registration
DROP POLICY IF EXISTS "Allow public insert" ON public.registration_requests;
CREATE POLICY "Allow public insert"
  ON public.registration_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Protect submitted registration requests: anonymous visitors cannot read registrations
DROP POLICY IF EXISTS "Authenticated users can view registrations" ON public.registration_requests;
CREATE POLICY "Authenticated users can view registrations"
  ON public.registration_requests FOR SELECT
  TO authenticated
  USING (true);

-- ==============================================================================
-- 5. AUTOMATED TRIGGERS & FUNCTIONS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Rythu Member'),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'consumer')
  );

  IF (new.raw_user_meta_data->>'role') = 'farmer' THEN
    INSERT INTO public.farmers (id, whatsapp_phone, farm_name)
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'phone', new.phone, '+91 98765 43210'),
      COALESCE(new.raw_user_meta_data->>'farm_name', 'Deccan Organic Farm')
    );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- CHECKOUT FUNCTION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.checkout_cart(
  p_customer_name TEXT,
  p_customer_phone TEXT,
  p_delivery_address TEXT,
  p_district TEXT,
  p_pincode TEXT,
  p_delivery_slot TEXT,
  p_payment_method TEXT,
  p_order_notes TEXT
) RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_order_id UUID;
  v_order_number TEXT;
  v_total_amount NUMERIC(10,2) := 0;
  v_cart_item RECORD;
  v_product RECORD;
  v_subtotal NUMERIC(10,2);
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Generate order number
  v_order_number := 'ORD-' || to_char(NOW(), 'YYMMDD') || '-' || upper(substring(md5(random()::text) from 1 for 6));

  -- Create order draft
  INSERT INTO public.orders (
    order_number, user_id, customer_name, customer_phone, delivery_address,
    district, pincode, delivery_slot, total_amount, payment_method, status, order_notes
  ) VALUES (
    v_order_number, v_user_id, p_customer_name, p_customer_phone, p_delivery_address,
    p_district, p_pincode, p_delivery_slot, 0, p_payment_method::payment_method, 'pending', p_order_notes
  ) RETURNING id INTO v_order_id;

  -- Loop through cart items
  FOR v_cart_item IN SELECT * FROM public.cart_items WHERE user_id = v_user_id LOOP
    -- Get product
    SELECT * INTO v_product FROM public.products WHERE id = v_cart_item.product_id;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product % not found', v_cart_item.product_id;
    END IF;

    IF v_product.stock_quantity < v_cart_item.quantity THEN
      RAISE EXCEPTION 'Not enough stock for %', v_product.name;
    END IF;

    v_subtotal := v_product.price * v_cart_item.quantity;
    v_total_amount := v_total_amount + v_subtotal;

    -- Insert order item
    INSERT INTO public.order_items (
      order_id, product_id, farmer_id, product_name, unit_price, quantity, subtotal
    ) VALUES (
      v_order_id, v_product.id, v_product.farmer_id, v_product.name, v_product.price, v_cart_item.quantity, v_subtotal
    );

    -- Update stock
    UPDATE public.products SET stock_quantity = stock_quantity - v_cart_item.quantity WHERE id = v_product.id;
  END LOOP;

  IF v_total_amount = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;

  -- Update order total
  UPDATE public.orders SET total_amount = v_total_amount WHERE id = v_order_id;

  -- Clear cart
  DELETE FROM public.cart_items WHERE user_id = v_user_id;

  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
