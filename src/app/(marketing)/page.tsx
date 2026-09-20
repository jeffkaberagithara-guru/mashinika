import Link from 'next/link'
import {
  Battery,
  Car,
  ChevronRight,
  ClipboardCheck,
  Gauge,
  LifeBuoy,
  Navigation,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { Timeline } from '@/components/ui/timeline'
import { ServiceCard } from '@/components/marketing/service-card'

const services = [
  {
    icon: LifeBuoy,
    title: 'Roadside assistance',
    description:
      'Battery, tyre, fuel, keys and breakdown help — dispatched from the nearest available technician.',
    href: '/services/roadside',
  },
  {
    icon: Battery,
    title: 'Mobile diagnostics',
    description:
      'Professional fault diagnosis at your doorstep, with a clear written report before any work is done.',
    href: '/services/diagnostics',
  },
  {
    icon: Truck,
    title: 'Towing & recovery',
    description:
      'Flatbed recovery from anywhere, tracked live, straight to the workshop you choose.',
    href: '/services/towing',
  },
  {
    icon: ClipboardCheck,
    title: 'Vehicle inspections',
    description:
      'Pre-purchase and condition inspections with a detailed report you can trust.',
    href: '/services/inspections',
  },
  {
    icon: ShieldCheck,
    title: 'Purchase advisory',
    description:
      'Valuation and negotiation support so you buy the right car at the right price.',
    href: '/services/advisory',
  },
  {
    icon: Users,
    title: 'Fleet management',
    description:
      'Maintenance schedules, service history and supervision for business fleets.',
    href: '/services/fleet',
  },
]

const howItWorks = [
  {
    id: 'issue',
    title: 'Tell us what happened',
    description: 'Select the problem. Confirm your location and vehicle.',
    tone: 'success' as const,
    state: 'completed' as const,
    icon: Search,
  },
  {
    id: 'match',
    title: 'We match a technician',
    description: 'The nearest skilled technician accepts your request.',
    tone: 'primary' as const,
    state: 'active' as const,
    icon: Navigation,
  },
  {
    id: 'track',
    title: 'Track them to you',
    description: 'Follow the technician live with route and ETA.',
    tone: 'neutral' as const,
    state: 'pending' as const,
    icon: Gauge,
  },
]

const stats = [
  { value: '17 min', label: 'average response' },
  { value: '800+', label: 'vetted technicians' },
  { value: '45+', label: 'towns covered' },
  { value: '4.9', label: 'average customer rating' },
]

export default function Home() {
  return (
    <div className="flex-1">
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="from-primary/10 via-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b to-transparent"
          />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pt-20 lg:pb-20">
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-5">
                <StatusBadge tone="success" dot pulse={false}>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="size-1.5 rounded-full bg-green-600"
                      aria-hidden="true"
                    />
                    Available now across major Kenyan towns
                  </span>
                </StatusBadge>

                <h1 className="text-foreground max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Stranded? Help is minutes away.
                </h1>

                <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                  Press once and the nearest skilled technician comes to you —
                  for a breakdown, a dead battery, a tow, or a second opinion.
                  No typing, no phone tag.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" render={<Link href="/request" />}>
                    Get help now
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    render={<Link href="/services" />}
                  >
                    Explore services
                  </Button>
                </div>

                <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Wrench
                      className="text-primary size-4"
                      aria-hidden="true"
                    />
                    Vetted, GPS-tracked mechanics
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Navigation
                      className="text-primary size-4"
                      aria-hidden="true"
                    />
                    Live tracking from dispatch
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck
                      className="text-primary size-4"
                      aria-hidden="true"
                    />
                    Recorded service history
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-border bg-card rounded-xl border p-5 shadow-sm">
                <div className="border-border flex items-center justify-between gap-3 border-b pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-subtle text-foreground ring-border flex size-9 items-center justify-center rounded-lg ring-1 ring-inset">
                      <Car className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        KDE 493M
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Toyota Axio · 2019
                      </p>
                    </div>
                  </div>
                  <StatusBadge tone="primary" pulse>
                    Technician en route
                  </StatusBadge>
                </div>
                <Timeline
                  mutedBehindActive
                  className="pt-5"
                  items={howItWorks}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
            <dl className="border-border bg-card grid grid-cols-2 gap-px overflow-hidden rounded-xl border shadow-sm lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-0.5 px-5 py-5"
                >
                  <dd className="text-foreground text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="text-muted-foreground text-sm">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-border bg-subtle/60 border-t">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="flex max-w-xl flex-col gap-2">
                <p className="text-primary text-sm font-medium">
                  One platform, every vehicle need
                </p>
                <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
                  Services built around how you actually drive
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/services" />}
              >
                View all services
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
