import type { Metadata } from 'next'
import {
  Activity,
  ArrowLeftRight,
  Car,
  CircleDollarSign,
  ClipboardCheck,
  LifeBuoy,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'
import { ServiceCard } from '@/components/marketing/service-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { services } from '@/config/services'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Roadside rescue, diagnostics, towing, inspections, fleet care and more from one platform.',
}

const serviceIcons: Record<string, typeof LifeBuoy> = {
  rescue: LifeBuoy,
  roadside: LifeBuoy,
  diagnostics: Activity,
  towing: Truck,
  inspections: ClipboardCheck,
  inspect: ClipboardCheck,
  advisory: ShieldCheck,
  buy: CircleDollarSign,
  care: Wrench,
  trade: ArrowLeftRight,
  fleet: Users,
  assist: Car,
}

export default function ServicesPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <StatusBadge tone="primary">
            One platform, every vehicle need
          </StatusBadge>
          <h1 className="text-foreground max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Every service your vehicle needs
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            From an emergency rescue at midnight to a scheduled service at your
            office — {siteConfig.name} covers the whole life of your car, with
            vetted professionals and recorded history on every job.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/request" />}>
              Get help now
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/customer/emergency" />}
            >
              I have an emergency
            </Button>
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                icon={serviceIcons[service.slug] ?? Wrench}
                title={service.brand}
                description={service.blurb}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
