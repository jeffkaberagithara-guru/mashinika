import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/service-landing'
import { CareBooking } from '@/features/care/care-booking'
import { getServiceBySlug, services } from '@/config/services'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Care',
  description:
    'Servicing, maintenance and repairs that match your life — at home, at work or at a partner workshop in Kenya.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    title: `Mashinika Care | ${siteConfig.name}`,
    description:
      'Servicing, repairs and maintenance on a schedule that matches you.',
  },
}

const care = getServiceBySlug('care')!
const related = services
  .filter((candidate) => candidate.slug !== 'care')
  .slice(0, 3)

export default function CarePage() {
  return (
    <ServiceLanding
      service={care}
      related={related}
      extra={
        <div className="flex flex-col gap-2">
          <p className="text-primary text-sm font-medium">Book a service</p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Care on your schedule
          </h2>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
            Appointment-based servicing and repairs at home, at work or at a
            partner workshop — with a quote before any work starts.
          </p>
          <div className="mt-6">
            <CareBooking />
          </div>
        </div>
      }
    />
  )
}
