import type { Metadata } from 'next'
import { RescueWizard } from '@/features/request/components/rescue-wizard'
import { StatusBadge } from '@/components/ui/status-badge'

export const metadata: Metadata = {
  title: 'Request help',
  description:
    'Press once and the nearest vetted technician comes to you. Battery, tyre, fuel, towing, diagnostics and more.',
}

export default function RequestPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <StatusBadge tone="primary" pulse>
            Available now across major Kenyan towns
          </StatusBadge>
          <h1 className="text-foreground max-w-md text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Get help now — in three quick steps
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
            Tell us the problem, confirm the vehicle and location, and a vetted
            technician closest to you responds with an ETA and a price you
            approve before any work starts.
          </p>
          <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary size-2 rounded-full" />
              No hidden call-out fees
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary size-2 rounded-full" />
              Live tracking from dispatch
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary size-2 rounded-full" />
              Pay only when the job is done
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <RescueWizard />
        </div>
      </section>
    </div>
  )
}
