import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/service-landing'
import { InspectBooking } from '@/features/inspect/inspect-booking'
import { getServiceBySlug, services } from '@/config/services'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Inspect',
  description:
    'Professional vehicle inspections and pre-purchase checks with a report you can trust — from certified inspectors across Kenya.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    title: `Mashinika Inspect | ${siteConfig.name}`,
    description:
      "Know exactly what you're buying, selling or driving — from certified inspectors.",
  },
}

const inspect = getServiceBySlug('inspect')!
const related = services
  .filter((candidate) => candidate.slug !== 'inspect')
  .slice(0, 3)

export default function InspectPage() {
  return (
    <ServiceLanding
      service={inspect}
      related={related}
      extra={
        <div className="flex flex-col gap-2">
          <p className="text-primary text-sm font-medium">
            Book a certified inspection
          </p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Know exactly what you&apos;re buying
          </h2>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
            Pick a package, tell us where to meet the car, and you get a scored
            report with a clear verdict — before you part with any money.
          </p>
          <div className="mt-6">
            <InspectBooking />
          </div>
        </div>
      }
    />
  )
}
