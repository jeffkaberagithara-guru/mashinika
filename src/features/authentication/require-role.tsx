'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
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
 * Navigation happens in an effect (an external-system sync, not a state
 * update) and unauthorized content is never rendered.
 */
export function RequireRole({
  allowed,
  children,
}: {
  allowed: SessionRole[]
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = useSessionStore((state) => state.user)

  const permitted = user !== null && allowed.includes(user.role)

  React.useEffect(() => {
    if (!user) {
      router.replace('/login')
      return
    }
    if (!allowed.includes(user.role)) {
      router.replace(sessionHome(user.role))
    }
  }, [user, allowed, router])

  if (!permitted) return null
  return <>{children}</>
}