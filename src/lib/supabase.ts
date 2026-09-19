import { createClient } from '@supabase/supabase-js';

// Environment variables from Vite (.env) or Vercel Supabase integration
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  '';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseUrl !== 'https://your-project.supabase.co'
);

// Diagnostic warning in console
if (!isSupabaseConfigured) {
  console.warn(
    '[Rythu Nestham - Supabase Client] Warning: Supabase credentials are not configured or are placeholder values.\n' +
    'To connect Supabase:\n' +
    '1. If using Vercel: ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_URL and SUPABASE_ANON_KEY) are set in Vercel Project Settings > Environment Variables.\n' +
    '2. If developing locally: create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
} else {
  console.info('[Rythu Nestham - Supabase Client] Initialized successfully with endpoint:', supabaseUrl);
}

// Create Supabase client (or dummy fallback if env vars not yet configured)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string;
  hasAnonKey: boolean;
  mode: 'connected' | 'demo_local';
}

export const getSupabaseStatus = (): SupabaseConfigStatus => ({
  isConfigured: isSupabaseConfigured,
  url: isSupabaseConfigured ? supabaseUrl : 'Not configured (Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)',
  hasAnonKey: Boolean(supabaseAnonKey),
  mode: isSupabaseConfigured ? 'connected' : 'demo_local',
});

