import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BadgeCheck,
  Car,
  MapPin,
  Navigation,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { serviceConfig } from '@/config/marketing'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    "Mashinika is Kenya's automotive technology platform — connecting vehicle owners, technicians, inspectors, towing operators and fleet managers.",
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust first',
    detail:
      'Every service is delivered by vetted professionals with records you can verify — and a history your vehicle carries forward.',
  },
  {
    icon: Wrench,
    title: 'Expert craft',
    detail:
      'Mechanics, inspectors and instructors who treat your vehicle like their own, backed by an academy that trains the next generation.',
  },
  {
    icon: Navigation,
    title: 'Built for Kenya',
    detail:
      'From a Nairobi estate to a Narok highway, dispatching, tracking and payments are designed around Kenyan roads and realities.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <p className="text-primary text-sm font-medium">About Mashinika</p>
          <h1 className="text-foreground max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {serviceConfig.tagline}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            {siteConfig.name} is a Kenyan automotive technology platform
            connecting vehicle owners with mobile mechanics, vetted technicians,
            inspectors, towing operators and fleet professionals — all on one
            trusted, tracked platform.
          </p>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            When your car has a problem, these are the people you trust. We
            built {siteConfig.name} so that help is a tap away, every technician
            is verified, every price is agreed before work starts, and every job
            lands on your vehicle&apos;s service record.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="border-border bg-card relative overflow-hidden rounded-xl border shadow-sm">
            <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
              <Car className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1 pt-4">
              <h2 className="text-foreground text-base font-semibold">
                One platform, every vehicle need
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Rescue, care, inspect, buy, trade, fleet and academy — the whole
                life of your vehicle, managed from one place.
              </p>
            </div>
            <div className="border-border mt-5 flex flex-col gap-3 border-t pt-4 text-sm">
              {serviceConfig.trust.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <BadgeCheck
                    className="text-success size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-foreground font-medium">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">
              What we stand for
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Trust, craft and Kenyan roads
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-6"
              >
                <span className="bg-subtle text-foreground ring-border flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                  <value.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-foreground text-base font-semibold">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-subtle/60 border-t">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-3 lg:col-span-7">
            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MapPin className="text-primary size-4" aria-hidden="true" />
              Headquarters
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Built in Nairobi, for Kenya
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our operations team coordinates rescue dispatch, inspections and
              fleet support across the country. New towns are added monthly as
              the technician network grows.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6">
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground text-sm font-semibold">
                  Want to work with us?
                </span>
                <span className="text-muted-foreground text-sm">
                  Join the network as a technician, inspector or instructor.
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button render={<Link href="/technician" />}>
                  Join the network
                </Button>
                <Button variant="outline" render={<Link href="/contact" />}>
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
