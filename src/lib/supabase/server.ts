import { cookies } from 'next/headers'

import { createServerClient } from '@supabase/ssr'

import type { Database } from '@/lib/supabase/database'

/**
 * Server-side Supabase client bound to the request's cookie jar.
 * Call `await cookies()` before first use (Next 15 made it async).
 */
export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component during rendering; the session is
            // refreshed on the next request via middleware.
          }
        },
      },
    },
  )
}
