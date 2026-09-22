'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Star,
  UserRound,
  Wallet,
  Wrench,
} from 'lucide-react'
import { toast } from 'sonner'
import { useRequestsStore } from '@/features/requests/store'
import { useNotificationsStore } from '@/features/notifications/store'
import { useSessionStore } from '@/features/authentication/store'
import { demoTechnicians } from '@/features/technicians/data'
import { getServiceBySlug } from '@/config/services'
import {
  nextStatus,
  statusSequence,
  formatKsh,
} from '@/features/request/simulation'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { cn } from 'cn'

export type TechnicianConsoleProps = {
  techParam?: string
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

export function TechnicianConsole({ techParam }: TechnicianConsoleProps) {
  const router = useRouter()
  const requests = useRequestsStore((state) => state.requests)
  const user = useSessionStore((state) => state.user)
  const setTechnician = useSessionStore((state) => state.setTechnician)

  const technicianId =
    user && user.role !== 'customer'
      ? (user.technicianId ?? techParam ?? null)
      : null

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

  const acceptRequest = useRequestsStore((state) => state.acceptRequest)
  const updateStatus = useRequestsStore((state) => state.updateStatus)

  function switchTechnician(id: string) {
    setTechnician(id)
    router.replace(`/technician/console?tech=${id}`)
  }

  function handleAccept(requestId: string) {
    if (!technicianId) return
    acceptRequest(requestId, technicianId)
    useNotificationsStore.getState().notify({
      kind: 'rescue',
      title: 'Job accepted',
      body: `${requests[requestId]?.locationLabel} — you are now responsible for this rescue.`,
      href: `/request/${requestId}`,
    })
    toast.success('Job accepted — tracking it as yours.')
  }

  function handleAdvance(requestId: string) {
    const request = requests[requestId]
    if (!request) return
    const next = nextStatus(request.status, request.serviceType)
    if (!next) return
    updateStatus(requestId, next)
    const service = getServiceBySlug(request.serviceType)
    useNotificationsStore.getState().notify({
      kind: 'rescue',
      title: `${me?.name ?? 'Technician'} updated the job`,
      body: `${service?.name ?? request.serviceType} for ${request.vehicle.registration || 'your vehicle'} is now: ${next}.`,
      href: `/request/${requestId}`,
    })
  }

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
              : 'Pick a roster identity below to take jobs'}
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
                        onClick={() => handleAccept(request.id)}
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

          <div className="mt-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                My jobs · {myJobs.length}
              </p>
              <span className="text-muted-foreground text-xs">
                Advance a job and the customer sees it update live
              </span>
            </div>
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
                  const next = nextStatus(request.status, request.serviceType)
                  const blocked =
                    request.status === 'DIAGNOSING' && !request.quoteApprovedAt
                  const sequence = statusSequence(request.serviceType)
                  const currentIndex = sequence.indexOf(request.status)
                  const progress =
                    currentIndex >= 0
                      ? Math.round(
                          (currentIndex / Math.max(1, sequence.length - 1)) *
                            100,
                        )
                      : 0
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
                          <div className="bg-muted mt-1 h-1 w-full max-w-40 overflow-hidden rounded-full">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(progress, 4)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <StatusBadge>{request.status}</StatusBadge>
                        <Button
                          size="sm"
                          variant="outline"
                          render={<Link href={`/request/${request.id}`} />}
                        >
                          Track
                        </Button>
                        {blocked ? (
                          <span className="text-muted-foreground text-xs">
                            Awaiting quote approval
                          </span>
                        ) : next ? (
                          <Button
                            size="sm"
                            onClick={() => handleAdvance(request.id)}
                            className="gap-1"
                          >
                            <ArrowRight className="size-4" aria-hidden="true" />
                            {next.startsWith('COMPLETED')
                              ? 'Complete'
                              : `Mark ${next.replaceAll('_', ' ').toLowerCase()}`}
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5">
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
            <p className="text-muted-foreground mt-1 text-xs">
              Pick who you&apos;re acting as in this demo — your identity is
              saved to your session.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {demoTechnicians.map((technician) => {
                const active = technician.id === technicianId
                return (
                  <button
                    key={technician.id}
                    type="button"
                    onClick={() => switchTechnician(technician.id)}
                    aria-pressed={active}
                    className={cn(
                      'border-border bg-subtle flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                      active && 'ring-primary ring-2 ring-inset',
                    )}
                  >
                    <span
                      className={cn(
                        'text-foreground bg-card flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset',
                        active ? 'ring-primary text-primary' : 'ring-border',
                      )}
                    >
                      <UserRound className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-foreground text-sm font-semibold">
                        {technician.name}
                        {active ? (
                          <span className="text-primary ml-1.5 text-xs font-semibold">
                            · you
                          </span>
                        ) : null}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {technician.specialty}
                      </span>
                    </span>
                    <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                      <Star
                        className="text-warning size-3.5 fill-current"
                        aria-hidden="true"
                      />
                      {technician.rating.toFixed(1)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-border bg-card flex items-start gap-2 rounded-xl border p-4 text-xs shadow-sm">
            <CheckCircle2
              className="text-success mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <p className="text-muted-foreground">
              Jobs flow here exactly as they do for the customer — accept an
              open rescue, then advance it and watch the customer&apos;s
              tracking page and notifications update.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}