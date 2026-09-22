'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useMounted } from '@/hooks/use-mounted'
import {
  sessionHome,
  useSessionStore,
  type SessionRole,
} from '@/features/authentication/store'

/**
 * Redirects users to the right home based on their signed-in session.
 *
 * - Signed out  -> /login
 * - Wrong role  -> their own home
 * - Correct     -> renders children
 *
 * Renders nothing until the client has mounted so the static prerender
 * (empty session) matches the first client render, avoiding hydration
 * mismatches. Navigation happens in an effect (an external-system sync,
 * not a state update) and unauthorized content is never rendered.
 */
export function RequireRole({
  allowed,
  children,
}: {
  allowed: SessionRole[]
  children: React.ReactNode
}) {
  const router = useRouter()
  const mounted = useMounted()
  const user = useSessionStore((state) => state.user)

  const allowedKey = allowed.join(',')
  const permitted =
    mounted && user !== null && allowedKey.includes(user.role)

  React.useEffect(() => {
    if (!mounted) return
    if (!user) {
      router.replace('/login')
      return
    }
    if (!allowedKey.includes(user.role)) {
      router.replace(sessionHome(user.role))
    }
  }, [mounted, user, allowedKey, router])

  if (!permitted) return null
  return <>{children}</>
}