'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, LogOut, LayoutGrid } from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'
import {
  sessionHome,
  SESSION_ROLE_LABELS,
  useSessionStore,
} from '@/features/authentication/store'
import { cn } from 'cn'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function UserMenu() {
  const router = useRouter()
  const mounted = useMounted()
  const user = useSessionStore((state) => state.user)
  const signOut = useSessionStore((state) => state.signOut)
  const [open, setOpen] = React.useState(false)

  if (!mounted || !user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="hidden min-[480px]:inline-flex"
        render={<Link href="/login" />}
      >
        Login
      </Button>
    )
  }

  const home = sessionHome(user.role)

  function handleSignOut() {
    setOpen(false)
    signOut()
    toast.success('Signed out — see you soon!')
    router.push('/')
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={`Signed in as ${user.name}`}
            className="hover:bg-muted flex items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors"
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {initials(user.name) || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="hidden max-w-28 flex-col items-start sm:flex">
              <span className="text-foreground truncate text-xs leading-4 font-semibold">
                {user.name}
              </span>
              <span
                className={cn(
                  'text-[10px] leading-3',
                  user.role === 'dispatcher'
                    ? 'text-warning'
                    : 'text-muted-foreground',
                )}
              >
                {SESSION_ROLE_LABELS[user.role]}
              </span>
            </span>
            <ChevronDown
              className="text-muted-foreground hidden size-3.5 sm:block"
              aria-hidden="true"
            />
          </button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setOpen(false)}
          render={<Link href={home} />}
        >
          <LayoutGrid className="size-4" aria-hidden="true" />
          My dashboard
        </DropdownMenuItem>
        <DropdownMenuItemSignOut
          onClick={() => handleSignOut()}
          label="Sign out"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuItemSignOut({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  return (
    <DropdownMenuItem variant="destructive" onClick={onClick}>
      <LogOut className="size-4" aria-hidden="true" />
      {label}
    </DropdownMenuItem>
  )
}