'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Fuel,
  Gauge,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sofa,
  Users,
  Wrench,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  formatKsh,
  formatMileage,
  type DemoListing,
} from '@/features/marketplace/listings'

export function ListingDetail({ listing }: { listing: DemoListing }) {
  const [sending, setSending] = React.useState(false)

  const specs = [
    { label: 'Body type', value: listing.body, icon: Sofa },
    { label: 'Fuel', value: listing.fuel, icon: Fuel },
    { label: 'Transmission', value: listing.transmission, icon: Gauge },
    { label: 'Seats', value: String(listing.seats), icon: Users },
  ]

  function handleCallback() {
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      toast.success(
        `Booking a viewing for the ${listing.make} ${listing.model} — our dealer will call you shortly.`,
      )
    }, 1100)
  }

  function handleInspect() {
    toast.info(
      'Book a Mashinika pre-purchase inspection before you pay a deposit.',
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div>
        <Button variant="ghost" size="sm" render={<Link href="/buy" />}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to all cars
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="border-border bg-subtle relative aspect-[16/10] w-full overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src={listing.image}
              alt={`${listing.make} ${listing.model}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {listing.certified ? (
                <StatusBadge tone="success">Mashinika Certified</StatusBadge>
              ) : (
                <StatusBadge tone="neutral">Not certified</StatusBadge>
              )}
              {listing.inspected ? (
                <StatusBadge tone="primary">Inspection passed</StatusBadge>
              ) : (
                <StatusBadge tone="neutral">Needs inspection</StatusBadge>
              )}
            </div>
          </div>

          <div className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              What&apos;s included
            </p>
            <ul className="text-foreground grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {[
                'Report from a Mashinika-trained inspector',
                'Free 10 km delivery within Nairobi',
                '14-day engine & gearbox warranty',
                'Full transfer assistance (registration service)',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="text-success size-4 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h1 className="text-foreground text-2xl font-semibold tracking-tight">
                {listing.make} {listing.model}
              </h1>
              <p className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                <MapPin className="size-3.5" aria-hidden="true" />
                {listing.location}
              </p>
            </div>
            <p className="text-primary text-3xl font-semibold tracking-tight">
              {formatKsh(listing.price)}
            </p>
            <p className="text-muted-foreground text-sm">
              {listing.description}
            </p>

            <dl className="grid grid-cols-2 gap-3">
              <div className="border-border bg-subtle flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
                <span className="bg-card text-foreground ring-border flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ring-inset">
                  <ClipboardCheck className="size-4" aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <dt className="text-muted-foreground text-[11px]">Year</dt>
                  <dd className="text-foreground text-sm font-semibold">
                    {listing.year}
                  </dd>
                </div>
              </div>
              <div className="border-border bg-subtle flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
                <span className="bg-card text-foreground ring-border flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ring-inset">
                  <Gauge className="size-4" aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <dt className="text-muted-foreground text-[11px]">Mileage</dt>
                  <dd className="text-foreground text-sm font-semibold">
                    {formatMileage(listing.mileage)}
                  </dd>
                </div>
              </div>
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="border-border bg-subtle flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                >
                  <span className="bg-card text-foreground ring-border flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ring-inset">
                    <spec.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <dt className="text-muted-foreground text-[11px]">
                      {spec.label}
                    </dt>
                    <dd className="text-foreground text-sm font-semibold">
                      {spec.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-2">
              <Button onClick={handleCallback}>
                <PhoneCall className="size-4" aria-hidden="true" />
                {sending ? 'Booking viewing…' : 'Arrange a viewing'}
              </Button>
              <Button variant="outline" onClick={handleInspect}>
                <Wrench className="size-4" aria-hidden="true" />
                Book a pre-purchase inspection
              </Button>
            </div>

            <p className="text-muted-foreground flex items-start gap-2 text-xs">
              <ShieldCheck
                className="text-success mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              Listed by a Mashinika-verified dealer. Inspect before you pay a
              deposit — we handle transfers at KSh 8,500.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
