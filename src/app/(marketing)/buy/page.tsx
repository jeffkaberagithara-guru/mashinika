import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/service-landing'
import { BuyListings } from '@/features/marketplace/buy-listings'
import { getServiceBySlug, services } from '@/config/services'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Buy',
  description:
    'Buying advisory for Kenya: vehicle verification, fair market valuation, risk flagging and negotiation support.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    title: `Mashinika Buy | ${siteConfig.name}`,
    description:
      'Valuation, due diligence and guidance for your biggest vehicle decision.',
  },
}

const buy = getServiceBySlug('buy')!
const related = services
  .filter((candidate) => candidate.slug !== 'buy')
  .slice(0, 3)

export default function BuyPage() {
  return (
    <ServiceLanding
      service={buy}
      related={related}
      extra={
        <div className="flex flex-col gap-2">
          <p className="text-primary text-sm font-medium">Featured cars</p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Verified cars for sale
          </h2>
          <div className="mt-6">
            <BuyListings />
          </div>
        </div>
      }
    />
  )
}
