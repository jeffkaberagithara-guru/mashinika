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
import { NotificationsBell } from '@/components/marketing/notifications-bell'
import { cn } from 'cn'

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="bg-background/80 border-border z-sticky sticky top-0 border-b backdrop-blur-sm">
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

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                index < 5 ? 'lg:block' : 'hidden xl:block',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <NotificationsBell />
          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            className="hidden min-[480px]:inline-flex"
            render={<Link href={siteConfig.login.href} />}
          >
            {siteConfig.login.label}
          </Button>

          <Button
            size="sm"
            className="hidden min-[400px]:inline-flex"
            render={<Link href={siteConfig.cta.getHelpHref} />}
          >
            {siteConfig.cta.getHelpLabel}
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
                {siteConfig.nav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-muted flex items-center justify-between gap-3 rounded-lg px-3 py-3 transition-colors"
                  >
                    <span className="text-foreground text-sm font-medium">
                      {link.label}
                    </span>
                    <ChevronRight
                      className="text-muted-foreground size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
                <Link
                  href="/customer"
                  onClick={() => setOpen(false)}
                  className="hover:bg-muted flex items-center justify-between gap-3 rounded-lg px-3 py-3 transition-colors"
                >
                  <span className="text-foreground text-sm font-medium">
                    My rescues
                  </span>
                  <ChevronRight
                    className="text-muted-foreground size-4 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/technician"
                  onClick={() => setOpen(false)}
                  className="hover:bg-muted flex items-center justify-between gap-3 rounded-lg px-3 py-3 transition-colors"
                >
                  <span className="text-foreground text-sm font-medium">
                    Join as a technician
                  </span>
                  <ChevronRight
                    className="text-muted-foreground size-4 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t px-2 pt-4 pb-2">
                <Button
                  size="lg"
                  render={<Link href={siteConfig.cta.getHelpHref} />}
                >
                  {siteConfig.cta.getHelpLabel}
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
