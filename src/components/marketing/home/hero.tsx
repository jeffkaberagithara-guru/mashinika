import Link from 'next/link'
import {
  Car,
  ChevronRight,
  Gauge,
  Navigation,
  Search,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { Timeline } from '@/components/ui/timeline'

const heroSteps = [
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

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="from-primary/15 pointer-events-none absolute -top-48 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl"
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

            <h1 className="text-foreground max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Stranded? Help is{' '}
              <span className="from-primary bg-gradient-to-r to-orange-400 bg-clip-text text-transparent">
                minutes away.
              </span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              Press once and the nearest skilled technician comes to you — for a
              breakdown, a dead battery, a tow, or a second opinion. No typing,
              no phone tag.
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
                <Wrench className="text-primary size-4" aria-hidden="true" />
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
                <Car className="text-primary size-4" aria-hidden="true" />
                Recorded service history
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-border bg-card from-primary/10 relative overflow-hidden rounded-xl border bg-gradient-to-b to-transparent p-5 shadow-sm sm:p-6">
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
              <div className="flex flex-col items-end gap-1.5">
                <StatusBadge tone="primary" pulse>
                  Technician en route
                </StatusBadge>
                <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                  <Gauge className="text-primary size-3.5" aria-hidden="true" />
                  ETA ~12 min
                </span>
              </div>
            </div>
            <Timeline mutedBehindActive className="pt-5" items={heroSteps} />
            <p className="text-muted-foreground flex items-center justify-center gap-1.5 border-t pt-4 text-center text-xs">
              <Car className="text-primary size-3.5" aria-hidden="true" />
              Thika Road Mall · ground floor parking
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
