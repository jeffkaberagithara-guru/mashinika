import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/service-landing'
import { TradeInForm } from '@/features/marketplace/trade-in-form'
import { getServiceBySlug, services } from '@/config/services'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Trade',
  description:
    'Vehicle valuation, trade-in and swapping guidance in Kenya — move on, on your terms.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    title: `Mashinika Trade | ${siteConfig.name}`,
    description:
      "Valuation, trade-in and vehicle swapping for when it's time to move on.",
  },
}

const trade = getServiceBySlug('trade')!
const related = services
  .filter((candidate) => candidate.slug !== 'trade')
  .slice(0, 3)

export default function TradePage() {
  return (
    <ServiceLanding
      service={trade}
      related={related}
      extra={
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
          <p className="text-primary text-sm font-medium">Trade-in estimator</p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            What&apos;s your car worth?
          </h2>
          <div className="mt-4">
            <TradeInForm />
          </div>
        </div>
      }
    />
  )
}
