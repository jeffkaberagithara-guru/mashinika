import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench } from 'lucide-react'
import { FleetDashboard } from '@/features/fleet/fleet-dashboard'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { serviceConfig } from '@/config/marketing'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Fleet',
  description:
    'Enterprise fleet management in Kenya: maintenance schedules, service history and roadside response, one dashboard.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: siteConfig.name,
    title: `Mashinika Fleet | ${siteConfig.name}`,
    description:
      'Maintenance schedules, service history and supervision for business fleets.',
  },
}

export default function FleetPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-4 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-4 lg:col-span-6 lg:pt-4">
          <StatusBadge tone="primary">
            {serviceConfig.systemLabel} Fleet
          </StatusBadge>
          <h1 className="text-foreground max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Keep every van, truck and utility on the road
          </h1>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            Track maintenance schedules, see live roadside incidents and act
            fast when a vehicle breaks down anywhere in the country.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/customer/emergency" />}>
              <Wrench className="size-4" aria-hidden="true" />
              Report a fleet incident
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/contact" />}
            >
              Talk to Fleet sales
            </Button>
          </div>
        </div>
      </section>

      <FleetDashboard />
    </div>
  )
}
