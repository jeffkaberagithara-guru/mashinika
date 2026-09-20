import Link from 'next/link'
import {
  Battery,
  ChevronRight,
  ClipboardCheck,
  LifeBuoy,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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

export function HomeServices() {
  return (
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
          <Button variant="ghost" size="sm" render={<Link href="/services" />}>
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
  )
}
