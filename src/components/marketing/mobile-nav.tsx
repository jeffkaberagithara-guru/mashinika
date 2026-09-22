'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CarFront,
  GraduationCap,
  Home,
  LayoutGrid,
  LifeBuoy,
} from 'lucide-react'
import { cn } from 'cn'
import type { LucideIcon } from 'lucide-react'

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  exact?: boolean
}

const items: NavItem[] = [
  { label: 'Home', href: '/', icon: Home, exact: true },
  { label: 'Services', href: '/services', icon: LayoutGrid },
]

const emergency: NavItem = {
  label: 'Help',
  href: '/customer/emergency',
  icon: LifeBuoy,
}

const trailing: NavItem[] = [
  { label: 'Rescues', href: '/customer', icon: CarFront },
  { label: 'Academy', href: '/academy', icon: GraduationCap },
]

export function MobileNav() {
  const pathname = usePathname()

  function isActive(href: string, exact = false) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="bg-background/95 border-border z-mobile-nav fixed inset-x-0 bottom-0 border-t backdrop-blur-sm lg:hidden"
    >
      <div className="mx-auto grid h-16 w-full max-w-md grid-cols-5 items-center px-2">
        {items.map((item) => (
          <MobileLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item.href, item.exact)}
          >
            <item.icon className="size-5" aria-hidden="true" />
          </MobileLink>
        ))}

        <Link
          href={emergency.href}
          aria-label={`${emergency.label} — emergency request`}
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <span className="bg-primary text-primary-foreground shadow-primary/40 flex size-12 items-center justify-center rounded-full shadow-lg">
            <emergency.icon className="size-5" aria-hidden="true" />
          </span>
          <span className="text-primary text-[10px] font-semibold">
            {emergency.label}
          </span>
        </Link>

        {trailing.map((item) => (
          <MobileLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item.href)}
          >
            <item.icon className="size-5" aria-hidden="true" />
          </MobileLink>
        ))}
      </div>
    </nav>
  )
}

function MobileLink({
  href,
  label,
  active,
  children,
}: {
  href: string
  label: string
  active: boolean
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 transition-colors',
        active ? 'text-primary' : 'text-muted-foreground',
      )}
    >
      {children}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  )
}
