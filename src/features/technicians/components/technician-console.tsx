'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  BadgeCheck,
  MapPin,
  Star,
  UserRound,
  Wallet,
  Wrench,
} from 'lucide-react'
import { useRequestsStore } from '@/features/requests/store'
import { useNotificationsStore } from '@/features/notifications/store'
import { demoTechnicians } from '@/features/technicians/data'
import { getServiceBySlug } from '@/config/services'
import { formatKsh } from '@/features/request/simulation'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { cn } from 'cn'

export type TechnicianConsoleProps = {
  technicianId: string | null
}

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

export function TechnicianConsole({ technicianId }: TechnicianConsoleProps) {
  const requests = useRequestsStore((state) => state.requests)

  const me = demoTechnicians.find(
    (technician) => technician.id === technicianId,
  )
  const openJobs = Object.values(requests).filter(
    (request) => request.status === 'SEARCHING_FOR_TECHNICIAN',
  )
  const myJobs = Object.values(requests).filter(
    (request) =>
      request.technicianId === technicianId &&
      !['COMPLETED', 'CANCELLED'].includes(request.status),
  )

  const earnings = Object.values(requests)
    .filter(
      (request) =>
        request.technicianId === technicianId &&
        request.quoteAmount &&
        request.quoteApprovedAt,
    )
    .reduce((sum, request) => sum + (request.quoteAmount ?? 0), 0)

  const accept = useRequestsStore((state) => state.acceptRequest)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pt-10 pb-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Dispatch console
          </h1>
          <p className="text-muted-foreground text-sm">
            {me
              ? `Signed in as ${me.name} — ${me.specialty}`
              : 'Open rescue jobs near you'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/technician" />}
        >
          Become a technician
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-1.5 lg:col-span-7">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Open jobs · {openJobs.length}
          </p>
          {openJobs.length === 0 ? (
            <div className="border-border bg-card rounded-xl border p-6 text-center shadow-sm">
              <p className="text-muted-foreground text-sm">
                No open requests right now. New rescues appear here for you to
                accept.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {openJobs.map((request) => {
                const service = getServiceBySlug(request.serviceType)
                const urgent = request.priority === 'URGENT'
                return (
                  <div
                    key={request.id}
                    className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                        <Wrench className="size-5" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-foreground truncate text-sm font-semibold">
                          {service?.name ?? request.serviceType}
                          {urgent ? (
                            <span className="text-destructive ml-2 text-xs font-semibold">
                              · Urgent
                            </span>
                          ) : null}
                        </p>
                        <p className="text-muted-foreground truncate text-sm">
                          {request.vehicle.registration ||
                            [request.vehicle.make, request.vehicle.model]
                              .filter(Boolean)
                              .join(' ') ||
                            'Vehicle not specified'}{' '}
                          · {request.locationLabel}
                        </p>
                        <p className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                          <MapPin className="size-3" aria-hidden="true" />
                          {timeAgo(request.createdAt)}
                        </p>
                        {request.photos?.length ? (
                          <div className="flex items-center gap-1.5 pt-0.5">
                            {request.photos.slice(0, 4).map((src, index) => (
                              <span
                                key={src}
                                className="border-border relative size-10 overflow-hidden rounded-md border"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={src}
                                  alt={`Vehicle photo ${index + 1}`}
                                  className="size-full object-cover"
                                />
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        onClick={() => {
                          if (!technicianId) return
                          accept(request.id, technicianId)
                          useNotificationsStore.getState().notify({
                            kind: 'rescue',
                            title: 'Job accepted',
                            body: `${request.locationLabel} — you are now responsible for this rescue.`,
                            href: `/request/${request.id}`,
                          })
                        }}
                        disabled={!technicianId}
                      >
                        <UserRound className="size-4" aria-hidden="true" />
                        Accept
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              My jobs · {myJobs.length}
            </p>
            {myJobs.length === 0 ? (
              <div className="border-border bg-card rounded-xl border p-6 text-center shadow-sm">
                <p className="text-muted-foreground text-sm">
                  Accept a job above and it lands here with live tracking.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myJobs.map((request) => {
                  const service = getServiceBySlug(request.serviceType)
                  return (
                    <div
                      key={request.id}
                      className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="bg-success/10 text-success flex size-10 shrink-0 items-center justify-center rounded-lg">
                          <BadgeCheck className="size-5" aria-hidden="true" />
                        </span>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="text-foreground truncate text-sm font-semibold">
                            {service?.name ?? request.serviceType}
                          </p>
                          <p className="text-muted-foreground truncate text-sm">
                            {request.vehicle.registration ||
                              [request.vehicle.make, request.vehicle.model]
                                .filter(Boolean)
                                .join(' ') ||
                              'Vehicle not specified'}{' '}
                            · {request.locationLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge>{request.status}</StatusBadge>
                        <Button
                          size="sm"
                          variant="outline"
                          render={<Link href={`/request/${request.id}`} />}
                        >
                          Track
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
            <span className="bg-success/10 text-success flex size-11 shrink-0 items-center justify-center rounded-lg">
              <Wallet className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <p className="text-foreground text-xl font-semibold tracking-tight">
                {technicianId ? formatKsh(earnings) : '—'}
              </p>
              <p className="text-muted-foreground text-xs">
                Confirmed earnings from approved quotes
              </p>
            </div>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Technician roster
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {demoTechnicians.map((technician) => {
                const active = technician.id === technicianId
                return (
                  <div
                    key={technician.id}
                    className="border-border bg-subtle flex items-center gap-3 rounded-lg border px-4 py-3"
                  >
                    <span
                      className={cn(
                        'text-foreground bg-card flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset',
                        active ? 'ring-primary text-primary' : 'ring-border',
                      )}
                    >
                      <UserRound className="size-4.5" aria-hidden="true" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-foreground text-sm font-semibold">
                        {technician.name}
                        {active ? (
                          <span className="text-primary ml-1.5 text-xs font-semibold">
                            · you
                          </span>
                        ) : null}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {technician.specialty}
                      </p>
                    </div>
                    <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                      <Star
                        className="text-warning size-3.5 fill-current"
                        aria-hidden="true"
                      />
                      {technician.rating.toFixed(1)}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-muted-foreground mt-4 text-xs">
              You&apos;re acting as one of the demo technicians. Pick a roster
              identity via the URL, or switch in your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
