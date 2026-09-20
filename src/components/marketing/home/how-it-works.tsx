import Link from 'next/link'
import { CircleCheck, Navigation, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Press for help',
    description:
      'Pick the problem and confirm your location — no typing, no phone tag.',
  },
  {
    icon: Navigation,
    step: '02',
    title: 'Nearest tech dispatched',
    description:
      'A vetted technician accepts your request and heads to you with live tracking.',
  },
  {
    icon: CircleCheck,
    step: '03',
    title: 'Back on the road',
    description:
      'Pay safely on completion. Every job lands on your vehicle’s service record.',
  },
]

export function HomeHowItWorks() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-primary text-sm font-medium">How it works</p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Help is three taps away
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            From a midnight breakdown to a scheduled service — the flow is the
            same, and every step is on record.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((item) => (
            <li
              key={item.step}
              className="border-border bg-card group hover:border-primary/30 relative flex flex-col gap-4 overflow-hidden rounded-xl border p-6 shadow-sm transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-xl">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-muted-foreground/40 text-3xl font-semibold tracking-tight">
                  {item.step}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-foreground text-base font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button size="lg" render={<Link href="/request" />}>
            Start a request now
          </Button>
        </div>
      </div>
    </section>
  )
}
