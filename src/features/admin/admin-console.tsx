'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Activity,
  CheckCircle2,
  CircleX,
  Gauge,
  MapPin,
  Star,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react'
import { useRequestsStore } from '@/features/requests/store'
import { demoTechnicians } from '@/features/technicians/data'
import { getServiceBySlug } from '@/config/services'
import { formatKsh } from '@/features/request/simulation'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { cn } from 'cn'

const isTerminal = (status: string) =>
  status === 'COMPLETED' || status === 'CANCELLED'

function timeAgo(iso: string): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000),
  )
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function AdminConsole() {
  const requests = useRequestsStore((state) => state.requests)
  const acceptRequest = useRequestsStore((state) => state.acceptRequest)
  const updateStatus = useRequestsStore((state) => state.updateStatus)

  const all = React.useMemo(
    () =>
      Object.values(requests).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [requests],
  )

  const active = all.filter((request) => !isTerminal(request.status))
  const unassigned = all.filter(
    (request) => request.status === 'SEARCHING_FOR_TECHNICIAN',
  )
  const completed = all.filter((request) => request.status === 'COMPLETED')
  const revenue = all
    .filter((request) => request.quoteAmount && request.quoteApprovedAt)
    .reduce((sum, request) => sum + (request.quoteAmount ?? 0), 0)

  const statCards = [
    {
      label: 'Active rescues',
      value: active.length,
      icon: Activity,
      tone: 'bg-primary/10 text-primary',
    },
    {
      label: 'Awaiting assignment',
      value: unassigned.length,
      icon: Users,
      tone: 'bg-warning/10 text-warning',
    },
    {
      label: 'Completed jobs',
      value: completed.length,
      icon: CheckCircle2,
      tone: 'bg-success/10 text-success',
    },
    {
      label: 'Confirmed revenue',
      value: formatKsh(revenue),
      icon: Wallet,
      tone: 'bg-primary/10 text-primary',
    },
  ]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pt-10 pb-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Admin console
          </h1>
          <p className="text-muted-foreground text-sm">
            Platform overview — dispatch, revenue and live requests
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/technician/console" />}
        >
          <Gauge className="size-4" aria-hidden="true" />
          Dispatch console
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="border-border bg-card flex items-center gap-3 rounded-xl border p-4 shadow-sm"
          >
            <span
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-full',
                card.tone,
              )}
            >
              <card.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col">
              <p className="text-muted-foreground truncate text-xs">
                {card.label}
              </p>
              <p className="text-foreground truncate text-xl font-semibold">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          All requests · {all.length}
        </p>
        {all.length === 0 ? (
          <div className="border-border bg-card rounded-xl border p-6 text-center shadow-sm">
            <p className="text-muted-foreground text-sm">
              No requests yet. Create one from the rescue page and it will show
              up here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {all.map((request) => {
              const service = getServiceBySlug(request.serviceType)
              const technician = request.technicianId
                ? demoTechnicians.find(
                    (entry) => entry.id === request.technicianId,
                  )
                : undefined
              const isUnassigned = request.status === 'SEARCHING_FOR_TECHNICIAN'
              return (
                <div
                  key={request.id}
                  className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                        <MapPin className="size-5" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-foreground truncate text-sm font-semibold">
                          {service?.name ?? request.serviceType}
                          {request.priority === 'URGENT' ? (
                            <span className="text-destructive ml-2 text-xs font-semibold">
                              · Urgent
                            </span>
                          ) : null}
                        </p>
                        <p className="text-muted-foreground truncate text-sm">
                          {request.name} ·{' '}
                          {request.vehicle.registration ||
                            [request.vehicle.make, request.vehicle.model]
                              .filter(Boolean)
                              .join(' ') ||
                            'Vehicle not specified'}{' '}
                          · {request.locationLabel}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {timeAgo(request.createdAt)} ·{' '}
                          {request.quoteAmount && request.quoteApprovedAt
                            ? `${formatKsh(request.quoteAmount)} approved`
                            : 'No quote approved yet'}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <StatusBadge>{request.status}</StatusBadge>
                      {request.technicianId && technician ? (
                        <span className="bg-subtle border-border text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
                          <UserRound className="size-3.5" aria-hidden="true" />
                          {technician.name}
                          <Star
                            className="text-warning size-3 fill-current"
                            aria-hidden="true"
                          />
                          {technician.rating.toFixed(1)}
                        </span>
                      ) : null}
                      {request.technicianId ? (
                        <Button
                          size="sm"
                          variant="outline"
                          render={<Link href={`/request/${request.id}`} />}
                        >
                          Track
                        </Button>
                      ) : null}
                      {!isTerminal(request.status) ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            updateStatus(request.id, 'CANCELLED')
                          }}
                        >
                          <CircleX className="size-4" aria-hidden="true" />
                          Cancel
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  {isUnassigned ? (
                    <div className="border-border bg-subtle flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-muted-foreground text-xs font-medium">
                        Assign dispatch:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {demoTechnicians.map((entry) => (
                          <Button
                            key={entry.id}
                            size="sm"
                            variant="outline"
                            className="gap-1.5"
                            onClick={() => acceptRequest(request.id, entry.id)}
                          >
                            <UserRound
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            {entry.name}
                            <span className="text-muted-foreground">
                              {entry.rating.toFixed(1)}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
