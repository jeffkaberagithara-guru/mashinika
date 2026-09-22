import Link from 'next/link'
import Image from 'next/image'
import {
  Car,
  ChevronRight,
  Gauge,
  MapPin,
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
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-aura from-primary/20 pointer-events-none absolute -top-48 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-70"
      />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pt-20 lg:pb-20">
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-5">
            <StatusBadge tone="success" pulse>
              Available now across major Kenyan towns
            </StatusBadge>

            <h1 className="text-foreground max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              YOUR CAR.{' '}
              <span className="from-primary bg-gradient-to-r to-orange-400 bg-clip-text text-transparent">
                OUR EXPERTISE.
              </span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              Mobile automotive assistance, diagnostics, inspections, repairs
              and vehicle services — built for Kenya. Press once, the nearest
              vetted technician comes to you.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" render={<Link href="/customer/emergency" />}>
                GET HELP NOW
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/services/assist" />}
              >
                BOOK A MECHANIC
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/inspect" />}
              >
                INSPECT A CAR
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
          <div className="hero-visual group shadow-primary/10 relative min-h-[470px] overflow-hidden rounded-2xl bg-slate-950 shadow-2xl sm:min-h-[520px]">
            <Image
              src="/media/nairobi-traffic.jpg"
              alt="Traffic moving through Nairobi"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[58%_center] opacity-80 transition-transform duration-1000 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="to-primary/35 absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/50"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgb(251_146_60_/_0.6),transparent_24%)]"
            />
            <span className="map-ping bg-primary text-primary-foreground shadow-primary/50 absolute top-[17%] right-[17%] flex size-12 items-center justify-center rounded-full shadow-lg">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <span className="map-ping map-ping-delayed text-primary absolute bottom-[24%] left-[15%] flex size-9 items-center justify-center rounded-full bg-white shadow-lg">
              <Car className="size-4" aria-hidden="true" />
            </span>
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-slate-950/80 p-5 text-white shadow-2xl backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20 ring-inset">
                    <Car className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">KDE 493M</p>
                    <p className="text-xs text-white/65">Toyota Axio · 2019</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <StatusBadge tone="primary" pulse>
                    Technician en route
                  </StatusBadge>
                  <span className="inline-flex items-center gap-1 text-xs text-white/70">
                    <Gauge
                      className="size-3.5 text-orange-300"
                      aria-hidden="true"
                    />
                    ETA ~12 min
                  </span>
                </div>
              </div>
              <Timeline mutedBehindActive className="pt-5" items={heroSteps} />
              <p className="flex items-center justify-center gap-1.5 border-t border-white/10 pt-4 text-center text-xs text-white/65">
                <Car className="size-3.5 text-orange-300" aria-hidden="true" />
                Thika Road Mall · ground floor parking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
