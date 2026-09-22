'use client'

import * as React from 'react'
import Link from 'next/link'
import { CarFront, ChevronRight, Eye, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { Input } from '@/components/ui/input'
import { cn } from 'cn'
import Image from 'next/image'
import {
  formatKsh,
  formatMileage,
  demoListings,
} from '@/features/marketplace/listings'

const budgets = [
  { label: 'Any budget', value: 0 },
  { label: 'Under KSh 1.2M', value: 1200000 },
  { label: 'Under KSh 1.8M', value: 1800000 },
  { label: 'Under KSh 2.5M', value: 2500000 },
  { label: 'KSh 2.5M+', value: 2500001 },
]

export function BuyListings() {
  const [query, setQuery] = React.useState('')
  const [budget, setBudget] = React.useState(0)

  const filtered = demoListings.filter((listing) => {
    const text = `${listing.make} ${listing.model}`.toLowerCase()
    const matchesQuery =
      !query.trim() || text.includes(query.trim().toLowerCase())
    if (!matchesQuery) return false
    if (budget === 0) return true
    return budget === 2500001
      ? listing.price >= 2500000
      : listing.price < budget
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Every listed car carries a {''}
          <span className="text-foreground font-medium">
            verified inspection
          </span>{' '}
          — no surprises when you arrive.
        </p>
        <div className="relative sm:w-64">
          <CarFront
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            className="pl-8"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search make or model"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {budgets.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => setBudget(option.value)}
            aria-pressed={budget === option.value}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
              budget === option.value
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border text-muted-foreground hover:bg-muted/50',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border-border bg-card rounded-xl border p-10 text-center shadow-sm">
          <CarFront
            className="text-muted-foreground mx-auto size-6"
            aria-hidden="true"
          />
          <p className="text-foreground mt-3 text-sm font-semibold">
            No cars match your filters
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Broaden the budget or clear the search — listings refresh often.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={listing.image}
                  alt={`${listing.make} ${listing.model}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="bg-subtle text-foreground ring-border flex size-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                  <CarFront className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {listing.certified ? (
                    <StatusBadge tone="success">Certified</StatusBadge>
                  ) : null}
                  {listing.inspected ? (
                    <StatusBadge tone="primary">Inspection passed</StatusBadge>
                  ) : (
                    <StatusBadge tone="neutral">Needs inspection</StatusBadge>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <h3 className="text-foreground text-base font-semibold">
                  {listing.make} {listing.model}
                </h3>
                <p className="text-primary text-lg font-semibold tracking-tight">
                  {formatKsh(listing.price)}
                </p>
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span>{listing.year}</span>
                <span>· {formatMileage(listing.mileage)}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3" aria-hidden="true" />
                  {listing.location}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3">
                <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                  <Star
                    className="text-warning size-3.5 fill-current"
                    aria-hidden="true"
                  />
                  Inspection report included
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  render={<Link href={`/buy/${listing.id}`} />}
                >
                  <Eye className="size-4" aria-hidden="true" />
                  View car
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
