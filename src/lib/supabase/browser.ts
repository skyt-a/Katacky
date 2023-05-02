import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createClientBrowser = () =>
  createBrowserSupabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  });
