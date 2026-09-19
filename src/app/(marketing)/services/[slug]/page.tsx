import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Activity,
  ArrowLeftRight,
  Car,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  LifeBuoy,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { ServiceCard } from "@/components/marketing/service-card"
import { getServiceBySlug, services } from "@/config/services"
import { siteConfig } from "@/config/site"

const serviceIcons: Record<string, typeof LifeBuoy> = {
  rescue: LifeBuoy,
  roadside: LifeBuoy,
  diagnostics: Activity,
  towing: Truck,
  inspections: ClipboardCheck,
  inspect: ClipboardCheck,
  advisory: ShieldCheck,
  buy: CircleDollarSign,
  care: Wrench,
  trade: ArrowLeftRight,
  fleet: Users,
  assist: Car,
}

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: "Service not found",
      description: "The service you are looking for does not exist.",
    }
  }

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      type: "website",
      locale: "en_KE",
      siteName: siteConfig.name,
      title: `${service.name} | ${siteConfig.name}`,
      description: service.description,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const related = services
    .filter((candidate) => candidate.slug !== service.slug)
    .slice(0, 3)

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
              tone={service.emergency ? "danger" : "primary"}
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
            <Button
              size="lg"
              variant={service.emergency ? "default" : "default"}
              render={<Link href={service.ctaHref} />}
            >
              {service.ctaLabel}
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/services" />}>
              View all services
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <h2 className="text-foreground mb-4 text-base font-semibold">
              What&apos;s included
            </h2>
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
      </section>

      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            How it works
          </h2>
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
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex max-w-xl flex-col gap-2">
              <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                Explore more services
              </h2>
              <p className="text-muted-foreground text-sm">
                One platform, every vehicle need.
              </p>
            </div>
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
    </div>
  )
}