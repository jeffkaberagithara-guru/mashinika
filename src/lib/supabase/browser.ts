import { createBrowserClient } from "@supabase/ssr"

import type { Database } from "@/lib/supabase/database"

/** Browser-side Supabase client. Safe to call in client components. */
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )