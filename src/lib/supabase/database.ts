/**
 * Placeholder Supabase Database type (satisfies @supabase/ssr's
 * `GenericSchema` constraint so the server/browser/middleware clients are
 * fully typed before a live Supabase project exists).
 *
 * Replace with generated types once a project is live:
 *
 *   npx supabase gen types typescript --project-id <ref>
 *        --schema public > src/lib/supabase/database.ts
 *
 * The real schema is authored in Drizzle (src/lib/db/) ? this file only
 * describes what Supabase's PostgREST layer exposes, and mostly the auth
 * schema whose types our generated client won't cover on its own.
 */
export type Database = {
  public: {
    Row: Record<string, unknown>
    Insert: Record<string, unknown>
    Update: Record<string, unknown>
  }
}