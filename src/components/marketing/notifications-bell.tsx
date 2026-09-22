'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, CheckCheck, LifeBuoy, Wallet, Info } from 'lucide-react'
import { useNotificationsStore } from '@/features/notifications/store'
import { sessionHome, useSessionStore } from '@/features/authentication/store'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from 'cn'

const kindIcon = {
  rescue: LifeBuoy,
  quote: Wallet,
  system: Info,
}

const kindTone = {
  rescue: 'bg-primary/10 text-primary',
  quote: 'bg-success/10 text-success',
  system: 'bg-subtle text-muted-foreground ring-border ring-1 ring-inset',
}

function timeAgo(iso: string): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000),
  )
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function NotificationsBell() {
  const router = useRouter()
  const mounted = useMounted()
  const storeUser = useSessionStore((state) => state.user)
  const storeItems = useNotificationsStore((state) => state.items)
  const markRead = useNotificationsStore((state) => state.markRead)
  const markAllRead = useNotificationsStore((state) => state.markAllRead)
  const [open, setOpen] = React.useState(false)

  const user = mounted ? storeUser : null
  const items = mounted ? storeItems : []

  const unread = items.filter((item) => !item.read).length
  const home = user ? sessionHome(user.role) : '/login'

  function handleOpenItem(item: (typeof items)[number]) {
    markRead(item.id)
    setOpen(false)
    if (item.href) router.push(item.href)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        className="relative"
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="size-4" aria-hidden="true" />
        {unread > 0 ? (
          <span className="bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
            {unread > 9 ? '9+' : unread}
          </span>
        ) : null}
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-[60]"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          'border-border bg-card absolute top-14 right-4 z-[60] max-h-[70vh] w-[calc(100%-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border p-0 shadow-lg sm:right-6 lg:right-[max(1.5rem,calc((100vw-80rem)/2+2rem))]',
          open ? 'flex' : 'hidden',
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <p className="text-foreground text-sm font-semibold">Notifications</p>
          {unread > 0 ? (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <CheckCheck className="size-4" aria-hidden="true" />
              Mark all read
            </Button>
          ) : null}
        </div>

        <div className="scroll-area flex flex-col gap-1 overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <span className="bg-subtle text-muted-foreground flex size-10 items-center justify-center rounded-full">
                <Bell className="size-5" aria-hidden="true" />
              </span>
              <p className="text-muted-foreground text-sm">
                No notifications yet — rescue and payment updates land here.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const Icon = kindIcon[item.kind]
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleOpenItem(item)}
                  className={cn(
                    'flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    item.read
                      ? 'hover:bg-muted/60'
                      : 'bg-muted/40 hover:bg-muted/70',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full',
                      kindTone[item.kind],
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-foreground flex items-center justify-between gap-2 text-sm font-medium">
                      <span className="truncate">{item.title}</span>
                      <span className="text-muted-foreground shrink-0 text-[11px]">
                        {timeAgo(item.createdAt)}
                      </span>
                    </span>
                    <span className="text-muted-foreground line-clamp-2 text-xs">
                      {item.body}
                    </span>
                  </span>
                </button>
              )
            })
          )}
        </div>

        <div className="border-t px-2 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            render={<Link href={home} />}
          >
            {user ? 'Open my dashboard' : 'Sign in to see your dashboard'}
          </Button>
        </div>
      </div>
    </>
  )
}
