import Link from 'next/link'
import { Check, ChevronRight, Wrench } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { ServiceCard } from '@/components/marketing/service-card'
import type { ServiceDefinition } from '@/config/services'
import { serviceConfig, serviceIcons } from '@/config/marketing'
import { HomeCta } from '@/components/marketing/home/cta'

type ServiceLandingProps = {
  service: ServiceDefinition
  related: ServiceDefinition[]
  /** Optional interactive section rendered between "Explore more services" and the closing CTA. */
  extra?: React.ReactNode
}

export function ServiceLanding({
  service,
  related,
  extra,
}: ServiceLandingProps) {
  const Icon = serviceIcons[service.slug] ?? Wrench

  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-12 lg:pb-20">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              tone={service.emergency ? 'danger' : 'primary'}
              pulse={service.emergency}
            >
              {service.brand}
            </StatusBadge>
          </div>

          <h1 className="text-foreground max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {service.title}
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            {service.description}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href={service.ctaHref} />}>
              {service.ctaLabel}
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/services" />}
            >
              View all services
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-border bg-card relative overflow-hidden rounded-xl border shadow-sm">
            <div
              aria-hidden="true"
              className="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b to-transparent"
            />
            <div className="relative flex flex-col gap-5 p-6">
              <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-foreground text-base font-semibold">
                  What&apos;s included
                </h2>
                <p className="text-muted-foreground text-xs">
                  Everything covered in {service.brand}.
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="bg-success/10 text-success mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">How it works</p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Three simple steps
            </h2>
          </div>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {service.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-border bg-card flex flex-col gap-2 rounded-xl border p-5"
              >
                <span className="text-primary text-sm font-semibold">
                  Step {index + 1}
                </span>
                <h3 className="text-foreground text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-border bg-subtle/60 border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">
              {serviceConfig.systemLabel}
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Explore more services
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((candidate) => (
              <ServiceCard
                key={candidate.slug}
                icon={serviceIcons[candidate.slug] ?? Wrench}
                title={candidate.brand}
                description={candidate.blurb}
                href={`/services/${candidate.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {extra ? (
        <section className="border-border border-t">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            {extra}
          </div>
        </section>
      ) : null}

      <HomeCta />
    </div>
  )
}
