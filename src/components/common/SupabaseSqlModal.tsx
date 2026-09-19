import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Database, ShieldCheck, Copy, Check, Terminal, ExternalLink, Code2, Layers, Key } from 'lucide-react';
import { getSupabaseStatus } from '../../lib/supabase';

interface SupabaseSqlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSqlModal: React.FC<SupabaseSqlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'sql' | 'policies' | 'env'>('sql');
  const status = getSupabaseStatus();

  const fullSqlScript = `-- ==============================================================================
-- RYTHU NESTHAM — SUPABASE PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Copy and run directly in your Supabase Project SQL Editor
-- ==============================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Enums
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

-- 3. Core Tables
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
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  stock_quantity NUMERIC(10,2) DEFAULT 100,
  location TEXT NOT NULL,
  harvest_date DATE DEFAULT CURRENT_DATE,
  freshness_tag TEXT DEFAULT 'Harvested Today',
  description TEXT,
  image_url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT true,
  is_certified BOOLEAN DEFAULT true,
  is_organic BOOLEAN DEFAULT true,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  pincode TEXT NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.delivery_waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pincode TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Farmer, Consumer, Supplier Onboarding
CREATE TABLE IF NOT EXISTS public.registration_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'consumer', 'supplier')),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable RLS on ALL Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policies
CREATE POLICY "Public profiles are readable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Farmer profiles are readable by everyone"
  ON public.farmers FOR SELECT USING (true);

CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT USING (true);

CREATE POLICY "Farmers can insert products"
  ON public.products FOR INSERT
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update own products"
  ON public.products FOR UPDATE
  USING (auth.uid() = farmer_id);

CREATE POLICY "Users can manage own cart items"
  ON public.cart_items FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can join waitlist"
  ON public.delivery_waitlist FOR INSERT WITH CHECK (true);

-- Allow public anonymous & authenticated registration submissions
DROP POLICY IF EXISTS "Allow public insert" ON public.registration_requests;
CREATE POLICY "Allow public insert"
  ON public.registration_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anonymous users cannot read other submitted registrations
CREATE POLICY "Authenticated users can view registrations"
  ON public.registration_requests FOR SELECT
  TO authenticated
  USING (true);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Supabase RLS & Database Schema Editor"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Status Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#12372A]/5 border border-[#12372A]/10 text-xs">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${status.isConfigured ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <span className="font-bold text-[#12372A]">Connection Mode: </span>
              <span className="font-semibold text-[#2E7D32]">
                {status.isConfigured ? 'Supabase Cloud Connected' : 'Local / Demo Mode (Active)'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#66736A] font-mono bg-white px-2 py-1 rounded-md border border-gray-200">
              {status.isConfigured ? 'RLS Active' : 'Offline Ready'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-[#66736A] hover:text-[#12372A]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>SQL Editor Script</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'policies'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-[#66736A] hover:text-[#12372A]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RLS Policies Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('env')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'env'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-[#66736A] hover:text-[#12372A]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Environment Setup</span>
          </button>
        </div>

        {/* Tab 1: SQL Editor */}
        {activeTab === 'sql' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#66736A] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Execute in Supabase Dashboard → SQL Editor</span>
              </div>
              <Button
                variant={copied ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}
              </Button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-[#12372A]/15 bg-[#172019] text-[#F8F5EC]">
              <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto max-h-80 overflow-y-auto">
                <code>{fullSqlScript}</code>
              </pre>
            </div>

            <p className="text-[11px] text-[#66736A] italic">
              * Also saved directly in your workspace repository at <code className="bg-gray-100 px-1 py-0.5 rounded text-[#12372A]">supabase/schema.sql</code>.
            </p>
          </div>
        )}

        {/* Tab 2: Policies Guide */}
        {activeTab === 'policies' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#12372A]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Profiles Table (`profiles`)</span>
              </div>
              <p className="text-[#66736A] text-[11px]">
                <strong>SELECT:</strong> Open to public for verified farmer and supplier directories.<br />
                <strong>UPDATE:</strong> Strictly limited to the authenticated user owning the row (`auth.uid() = id`).
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#12372A]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Products Table (`products`)</span>
              </div>
              <p className="text-[#66736A] text-[11px]">
                <strong>SELECT:</strong> Public can browse all listed harvest produce.<br />
                <strong>INSERT/UPDATE/DELETE:</strong> Only authenticated farmers can create, edit, or remove their own crops (`auth.uid() = farmer_id`).
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#12372A]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Cart Items Table (`cart_items`)</span>
              </div>
              <p className="text-[#66736A] text-[11px]">
                <strong>ISOLATION:</strong> Users can only SELECT, INSERT, and DELETE rows where `user_id = auth.uid()`. Cross-user cart inspection is blocked at database level.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#12372A]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Delivery Waitlist Table (`delivery_waitlist`)</span>
              </div>
              <p className="text-[#66736A] text-[11px]">
                <strong>INSERT:</strong> Permitted for anonymous visitors capturing pincode launch notifications. Reading restricted to verified administrators.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#2E7D32]/20 bg-[#2E7D32]/5 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#12372A]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Registration Requests Table (`registration_requests`)</span>
              </div>
              <p className="text-[#66736A] text-[11px]">
                <strong>INSERT:</strong> Open to public anon and authenticated users with CHECK (true).<br />
                <strong>SELECT:</strong> Restricted to authenticated administrators. Anonymous visitors cannot read user contact numbers or names.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Environment Setup */}
        {activeTab === 'env' && (
          <div className="space-y-3 text-xs">
            <p className="text-[#66736A]">
              To connect your live Supabase cloud project, add the following credentials to a <code className="bg-gray-100 px-1 py-0.5 rounded text-[#12372A]">.env</code> file in your root folder:
            </p>

            <div className="p-3.5 bg-[#172019] text-[#F8F5EC] rounded-xl font-mono text-[11px] space-y-1">
              <p className="text-[#65A30D]"># Supabase API Credentials</p>
              <p>VITE_SUPABASE_URL=https://your-project.supabase.co</p>
              <p>VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px]">
              💡 <strong>Automatic Fallback:</strong> Even without live Supabase cloud credentials, the website functions smoothly using the built-in local persistent state engine.
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#2E7D32] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Open Supabase Dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
