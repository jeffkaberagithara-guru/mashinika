import type { Metadata } from "next"
import Link from "next/link"
import {
  BadgeCheck,
  Check,
  CreditCard,
  MapPin,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Become a technician",
  description:
    "Join the Mashinika technician network. Vetted mechanics earn well, work near home and grow with the platform.",
}

const benefits = [
  {
    icon: MapPin,
    title: "Work near home",
    detail: "Jobs are dispatched to the closest available technician. Less driving, less dead time.",
  },
  {
    icon: CreditCard,
    title: "Get paid reliably",
    detail: "Transparent per-job pricing you approve, with prompt settlement and a full earnings record.",
  },
  {
    icon: BadgeCheck,
    title: "Build a reputation",
    detail: "Every completed job adds to your rating and track record — better jobs come to top-rated techs.",
  },
  {
    icon: ShieldCheck,
    title: "Backed by the platform",
    detail: "We vouch for you to customers, verify each job, and handle disputes so you stay focused on the work.",
  },
]

const requirements = [
  "Relevant mechanical, electrical or diagnostics experience",
  "Own reliable transport to reach customers",
  "Basic tools for on-site jobs",
  "Smartphone for dispatch, tracking and payments",
  "Commitment to vetted, professional service",
]

const specialties = [
  "Roadside rescue",
  "Mobile diagnostics",
  "Mechanical repairs",
  "Electrical & software",
  "Towing & recovery",
  "Tyres & batteries",
  "Fuel delivery",
  "Vehicle inspections",
]

export default function TechnicianPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <StatusBadge tone="primary">Technician network</StatusBadge>
          <h1 className="text-foreground max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Turn your skills into steady, closer-to-home work
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            {siteConfig.name} matches vetted technicians with customers who
            need them — right in your neighbourhood. You take the jobs you
            want, set fair rates, and get paid for every one.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/request" />}>
              Apply to join
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/services" />}>
              See the services
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <h2 className="text-foreground mb-4 text-base font-semibold">
              What we look for
            </h2>
            <ul className="flex flex-col gap-3">
              {requirements.map((requirement) => (
                <li key={requirement} className="flex items-start gap-2.5">
                  <span className="bg-success/10 text-success mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">Why technicians choose us</p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Built to make your work worth it
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5"
              >
                <span className="bg-subtle text-foreground ring-border flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                  <benefit.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-foreground text-sm font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-subtle/60 border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">Skills in demand</p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Pick the work you&apos;re best at
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="border-border bg-card text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
              >
                <Wrench className="text-primary size-4" aria-hidden="true" />
                {specialty}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/academy" />}
            >
              <Users className="size-4" aria-hidden="true" />
              Not yet certified? Train at Mashinika Academy
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}