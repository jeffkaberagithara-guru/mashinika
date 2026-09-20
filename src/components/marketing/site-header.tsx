'use client'

import * as React from 'react'
import Link from 'next/link'
import { Car, ChevronRight, Menu, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from '@/components/marketing/theme-toggle'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Rescue', href: '/customer/emergency' },
  { label: 'Academy', href: '/academy' },
  { label: 'Technicians', href: '/technician' },
  { label: 'Dispatch console', href: '/technician/console' },
]

const mobileLinks = [
  {
    label: 'Services',
    href: '/services',
    description: 'Rescue, diagnostics, towing and more',
  },
  {
    label: 'Emergency help',
    href: '/customer/emergency',
    description: 'Help in minutes, 24/7',
  },
  {
    label: 'My rescues',
    href: '/customer',
    description: 'Track your active and past requests',
  },
  {
    label: 'Academy',
    href: '/academy',
    description: 'Courses for owners and technicians',
  },
  {
    label: 'Become a technician',
    href: '/technician',
    description: 'Join the vetted network',
  },
  {
    label: 'Dispatch console',
    href: '/technician/console',
    description: 'Accept rescue jobs live',
  },
  {
    label: 'Fleet management',
    href: '/services/fleet',
    description: 'Servicing for business fleets',
  },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
            <Car className="size-4.5" aria-hidden="true" />
          </span>
          <span className="text-foreground truncate text-[15px] font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            className="hidden xl:inline-flex"
            render={<Link href="/customer" />}
          >
            My rescues
          </Button>

          <Button
            size="sm"
            className="hidden min-[400px]:inline-flex"
            render={<Link href="/request" />}
          >
            Get help now
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Open menu"
                  className="lg:hidden"
                >
                  <Menu className="size-4" aria-hidden="true" />
                </Button>
              }
            />
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                    <Car className="size-4" aria-hidden="true" />
                  </span>
                  {siteConfig.name}
                </SheetTitle>
                <SheetDescription>
                  Roadside rescue &amp; vehicle care, minutes away.
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-2" aria-label="Mobile">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-muted flex items-center justify-between gap-3 rounded-lg px-3 py-3 transition-colors"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-foreground text-sm font-medium">
                        {link.label}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {link.description}
                      </span>
                    </span>
                    <ChevronRight
                      className="text-muted-foreground size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t px-2 pt-4 pb-2">
                <Button size="lg" render={<Link href="/request" />}>
                  Get help now
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  render={<a href="tel:+254700000000" />}
                >
                  <PhoneCall className="size-4" aria-hidden="true" />
                  Call +254 700 000 000
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
