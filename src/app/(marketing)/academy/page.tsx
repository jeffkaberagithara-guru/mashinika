import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, GraduationCap, ShieldCheck, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Training that turns everyday owners into confident technicians. Courses, certification and hands-on skills from Mashinika.",
}

const programs = [
  {
    icon: BookOpen,
    title: "Owner maintenance",
    detail: "Fluids, filters, tyres, batteries and simple checks — keep your own car healthy and avoid surprises.",
  },
  {
    icon: GraduationCap,
    title: "Technician certification",
    detail: "A practical pathway from apprentice to certified technician, ready for the Mashinika network.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & roadside skills",
    detail: "Accident-site basics, safe jacking, first response and handling breakdowns without risk.",
  },
  {
    icon: Trophy,
    title: "Advanced diagnostics",
    detail: "Fault codes, electrical systems and professional reporting for the mobile diagnostics track.",
  },
]

export default function AcademyPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <StatusBadge tone="primary">Mashinika Academy</StatusBadge>
          <h1 className="text-foreground max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Training that turns everyday owners into confident technicians
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            Practice-led courses, real vehicles and certified skills — whether
            you want to look after your own car or launch a serious career in
            vehicle care on the {siteConfig.name} network.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/request" />}>
              Enquire about courses
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/technician" />}>
              Become a technician
            </Button>
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">What we teach</p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Courses for every level
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <div
                key={program.title}
                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5"
              >
                <span className="bg-subtle text-foreground ring-border flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                  <program.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-foreground text-sm font-semibold">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {program.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-subtle/60 border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-2">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tell us what you aim to do and we&apos;ll recommend a learning
              path — for owners, apprentices or certified technicians.
            </p>
          </div>
          <Button size="lg" render={<Link href="/request" />}>
            Get learning advice
          </Button>
        </div>
      </section>
    </div>
  )
}