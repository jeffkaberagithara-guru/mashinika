import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/service-landing'
import { getServiceBySlug, services } from '@/config/services'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Rescue',
  description:
    'Emergency roadside rescue in Kenya: battery, tyre, fuel, keys, breakdown and towing — help is minutes away.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    title: `Mashinika Rescue | ${siteConfig.name}`,
    description:
      'Battery, tyre, fuel, keys and breakdown help — dispatched from the nearest available technician.',
  },
}

const rescue = getServiceBySlug('rescue')!
const related = services
  .filter((candidate) => candidate.slug !== 'rescue')
  .slice(0, 3)

export default function RescuePage() {
  return <ServiceLanding service={rescue} related={related} />
}
