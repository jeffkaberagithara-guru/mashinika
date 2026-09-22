'use client'

import * as React from 'react'

/**
 * Returns `false` on the server and during hydration, then `true` after the
 * component has mounted on the client.
 *
 * Use it to gate UI that reads from client-only sources (e.g. persisted
 * stores, theme, location) so the server-rendered HTML matches the first
 * client render and avoids React hydration mismatches.
 */
export function useMounted() {
  const subscribe = React.useCallback(() => () => {}, [])
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}