import Link from 'next/link'
import {
  BatteryCharging,
  Car,
  ChevronRight,
  CloudSun,
  Fuel,
  ShieldAlert,
  Thermometer,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

const scenarios = [
  {
    icon: Car,
    title: 'Breakdown on the highway',
    detail:
      'Engine dies at night on the A104. The nearest technician is on the way before you finish the call.',
  },
  {
    icon: BatteryCharging,
    title: 'Dead battery at the mall',
    detail:
      'Parked, doors locked, one click. A jump or replacement arrives with tools and a new battery.',
  },
  {
    icon: CloudSun,
    title: 'Flat tyre in the rain',
    detail:
      'No jack, no spare confidence. A tyre change or puncture repair is handled safely at the roadside.',
  },
  {
    icon: Thermometer,
    title: 'Overheating in traffic',
    detail:
      'Temperature climbing in a Jamhuri jam — a technician diagnoses the cause before you drive again.',
  },
  {
    icon: Fuel,
    title: 'Ran dry, miles from a station',
    detail:
      'Fuel delivery comes to your exact location — no walking, no guesswork on the highway.',
  },
  {
    icon: ShieldAlert,
    title: 'Accident recovery',
    detail:
      'A flatbed team manages the scene, secures the vehicle and takes it where you trust.',
  },
]

export function HomeContext() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">
              Real Kenyan roads
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for what actually happens here
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Long drives, busy estates, highway jams and remote roads — these
              are the moments {siteConfig.name} exists for.
            </p>
          </div>
          <Button render={<Link href="/customer/emergency" />}>
            GET HELP NOW
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <div
              key={scenario.title}
              className="border-border bg-card flex flex-col gap-3 rounded-xl border p-6"
            >
              <span className="bg-subtle text-foreground ring-border flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                <scenario.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-foreground text-base font-semibold">
                {scenario.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {scenario.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
