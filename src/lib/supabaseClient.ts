import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If variables are missing (e.g. during Vercel build before setting them), 
// we return a dummy client so the build doesn't crash.
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          order: () => ({ limit: () => Promise.resolve({ data: null, error: null }) }),
          count: () => Promise.resolve({ count: 0, error: null })
        })
      })
    } as any;
