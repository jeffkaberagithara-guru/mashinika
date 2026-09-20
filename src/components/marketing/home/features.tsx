import {
  BadgeCheck,
  CircleDollarSign,
  History,
  LifeBuoy,
  Navigation,
  Wrench,
} from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'

const features = [
  {
    icon: Wrench,
    title: 'Mobile mechanics',
    description:
      'Qualified technicians come to your vehicle — home, office or roadside.',
  },
  {
    icon: Navigation,
    title: 'Live tracking',
    description:
      'Watch your technician move toward you with a real ETA at every step.',
  },
  {
    icon: CircleDollarSign,
    title: 'Upfront pricing',
    description:
      'Approve the price before any work starts. No hidden call-out fees.',
  },
  {
    icon: BadgeCheck,
    title: 'Vetted & rated',
    description:
      'Every technician is vetted, GPS-tracked and rated by other customers.',
  },
  {
    icon: History,
    title: 'Recorded history',
    description:
      'Every job is added to your vehicle’s service record automatically.',
  },
  {
    icon: LifeBuoy,
    title: '24/7 emergency',
    description:
      'Day or night — a single press connects you to the nearest help.',
  },
]

export function HomeFeatures() {
  return (
    <section className="border-border bg-subtle/60 border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
          <div className="flex max-w-xl flex-col gap-2">
            <StatusBadge tone="primary">Why Mashinika</StatusBadge>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything a roadside rescue should be
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built for Kenyan roads and Kenyan drivers — transparent, fast and
              safe from the first tap to the final receipt.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-border bg-card hover:border-primary/30 flex flex-col gap-3 rounded-xl border p-5 shadow-sm transition-colors"
            >
              <span className="bg-subtle text-foreground ring-border flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-foreground text-sm font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
