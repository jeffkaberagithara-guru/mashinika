import Link from 'next/link'
import Image from 'next/image'
import { Check, ChevronRight, ClipboardCheck, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'

const checks = [
  {
    label: 'Body & structural inspection',
    tone: 'success' as const,
    value: 'No accident indicators',
  },
  {
    label: 'Engine & drivetrain',
    tone: 'success' as const,
    value: 'Healthy',
  },
  {
    label: 'Brakes, tyres & suspension',
    tone: 'warning' as const,
    value: 'Service soon',
  },
  {
    label: 'Electrical systems',
    tone: 'success' as const,
    value: 'Passed',
  },
  {
    label: 'Underbody & fluids',
    tone: 'success' as const,
    value: 'Passed',
  },
]

export function HomeExpertise() {
  return (
    <section className="border-border bg-subtle/60 border-t">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-6">
          <p className="text-primary text-sm font-medium">
            Inspect &amp; technical expertise
          </p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Independent eyes, professional answers
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Before you buy, sell or keep driving, know the truth about the
            vehicle. Certified inspectors go through every system and hand you a
            photo-backed report — from which you can negotiate, repair or walk
            away with confidence.
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              'Full condition report with photos',
              'Mileage and history verification',
              'Fair market valuation included',
              'Same-day digital delivery',
            ].map((item) => (
              <li
                key={item}
                className="text-foreground flex items-start gap-2.5 text-sm"
              >
                <span className="bg-success/10 text-success mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/inspect" />}>
              BOOK AN INSPECTION
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/services/diagnostics" />}
            >
              Mobile diagnostics
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl">
            <Image
              src="/media/nairobi-traffic.jpg"
              alt="Inspector assessing a vehicle in Nairobi"
              width={1920}
              height={1280}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-[420px] w-full object-cover object-[58%_center] opacity-75 sm:h-[500px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0">
              <div className="p-5 sm:p-6">
                <div className="border-border/15 rounded-xl border bg-slate-950/85 p-5 text-white shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/90 flex size-8 items-center justify-center rounded-lg">
                        <ClipboardCheck className="size-4" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-white">
                          Inspection report
                        </p>
                        <p className="text-xs text-white/60">
                          Toyota Axio · KDE 493M
                        </p>
                      </div>
                    </div>
                    <StatusBadge tone="primary" pulse={false}>
                      Verified
                    </StatusBadge>
                  </div>
                  <ul className="flex flex-col gap-2.5 pt-4">
                    {checks.map((check) => (
                      <li
                        key={check.label}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="flex items-center gap-2 text-white/75">
                          <ScanLine
                            className="size-3.5 text-white/50"
                            aria-hidden="true"
                          />
                          {check.label}
                        </span>
                        <span
                          className={
                            check.tone === 'success'
                              ? 'text-green-400'
                              : 'text-amber-400'
                          }
                        >
                          {check.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
