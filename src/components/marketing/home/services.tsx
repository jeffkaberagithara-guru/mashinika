import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { serviceIcons, serviceConfig } from '@/config/marketing'
import type { LucideIcon } from 'lucide-react'
import { Wrench } from 'lucide-react'

type BrandCard = {
  slug: string
  title: string
  blurb: string
  href: string
  action: string
  emergency: boolean
}

const brandCards: BrandCard[] = [
  {
    slug: 'rescue',
    title: 'Mashinika Rescue',
    blurb:
      'Roadside assistance, mobile diagnosis, towing and recovery — help is minutes away.',
    href: '/rescue',
    action: 'Get help now',
    emergency: true,
  },
  {
    slug: 'care',
    title: 'Mashinika Care',
    blurb:
      'Servicing, maintenance and repairs that match your life — at home or at work.',
    href: '/care',
    action: 'Book a service',
    emergency: false,
  },
  {
    slug: 'inspect',
    title: 'Mashinika Inspect',
    blurb:
      'Professional vehicle inspections and pre-purchase checks with reports you trust.',
    href: '/inspect',
    action: 'Book an inspection',
    emergency: false,
  },
  {
    slug: 'buy',
    title: 'Mashinika Buy',
    blurb:
      'Vehicle buying guidance based on budget and needs. Verification and valuation.',
    href: '/buy',
    action: 'Buy with backup',
    emergency: false,
  },
  {
    slug: 'trade',
    title: 'Mashinika Trade',
    blurb:
      'Vehicle valuation, trade-in and swapping guidance for when it’s time to move on.',
    href: '/trade',
    action: 'Value my car',
    emergency: false,
  },
  {
    slug: 'fleet',
    title: 'Mashinika Fleet',
    blurb:
      'Fleet monitoring, maintenance and service management for operators.',
    href: '/fleet',
    action: 'Talk to fleet',
    emergency: false,
  },
  {
    slug: 'academy',
    title: 'Mashinika Academy',
    blurb:
      'Automotive training and professional skills development for owners and technicians.',
    href: '/academy',
    action: 'Explore courses',
    emergency: false,
  },
]

const core = brandCards.slice(0, 3)
const extended = brandCards.slice(3)

function brandIcon(slug: string, fallback: LucideIcon): LucideIcon {
  return serviceIcons[slug] ?? fallback
}

export function HomeServices() {
  return (
    <section className="border-border bg-subtle/60 border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">
              {serviceConfig.systemLabel}
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              The whole life of your car, one platform
            </h2>
          </div>
          <Button variant="ghost" size="sm" render={<Link href="/services" />}>
            View all services
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {core.map((card) => {
            const Icon = brandIcon(card.slug, Wrench)
            return (
              <Link
                key={card.slug}
                href={card.href}
                className="border-border bg-card group hover:border-primary/30 relative flex flex-col gap-4 overflow-hidden rounded-xl border p-6 shadow-sm transition-colors"
              >
                {card.emergency ? (
                  <div className="from-primary absolute top-0 right-0 left-0 h-1 bg-gradient-to-r to-orange-400" />
                ) : null}
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <ChevronRight
                    className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-foreground text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.blurb}
                  </p>
                </div>
                <span className="text-primary text-sm font-medium">
                  {card.action} →
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {extended.map((card) => {
            const Icon = brandIcon(card.slug, Wrench)
            return (
              <Link
                key={card.slug}
                href={card.href}
                className="border-border bg-card group hover:border-primary/30 flex flex-col gap-3 rounded-xl border p-5 shadow-sm transition-colors"
              >
                <span className="bg-subtle text-foreground ring-border group-hover:text-primary flex size-10 items-center justify-center rounded-lg ring-1 transition-colors ring-inset">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground text-sm font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.blurb}
                  </p>
                </div>
                <span className="text-primary mt-auto text-sm font-medium">
                  {card.action} →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
