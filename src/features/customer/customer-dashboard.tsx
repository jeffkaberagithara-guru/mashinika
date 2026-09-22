'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronRight,
  History,
  LifeBuoy,
  PhoneCall,
  Plus,
  Radar,
  Star,
  Trash2,
  Truck,
  UserRound,
} from 'lucide-react'
import { toast } from 'sonner'
import { useRequestsStore } from '@/features/requests/store'
import { useNotificationsStore } from '@/features/notifications/store'
import { useGarageStore } from '@/features/garage/store'
import { useFleetStore } from '@/features/fleet/store'
import { useCareStore } from '@/features/care/store'
import { useInspectionsStore } from '@/features/inspect/store'
import { SERVICE_REQUEST_STATUS_CONFIG } from '@/features/roadside/status'
import { terminalStatuses, statusSequence } from '@/features/request/simulation'
import { getServiceBySlug } from '@/config/services'
import { PaymentsLedger } from '@/features/customer/payments-ledger'
import { BookingsPanel } from '@/features/customer/bookings-panel'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { getTechnician } from '@/features/technicians/data'
import { cn } from 'cn'

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

export function CustomerDashboard() {
  const router = useRouter()
  const requests = useRequestsStore(
    useShallow((state) =>
      Object.values(state.requests).sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    ),
  )
  const createRequest = useRequestsStore((state) => state.createRequest)
  const removeRequest = useRequestsStore((state) => state.removeRequest)
  const updateStatus = useRequestsStore((state) => state.updateStatus)

  const garageCount = useGarageStore(
    useShallow((state) => Object.keys(state.vehicles).length),
  )
  const fleetCount = useFleetStore(
    useShallow((state) => Object.keys(state.records).length),
  )
  const careBookings = useCareStore(
    useShallow((state) => state.bookings.length),
  )
  const inspectionReports = useInspectionsStore(
    useShallow((state) => state.reports.length),
  )

  const [armedDelete, setArmedDelete] = React.useState<string | null>(null)
  const [armedCancel, setArmedCancel] = React.useState<string | null>(null)

  const active = requests.filter(
    (request) => !terminalStatuses.includes(request.status),
  )
  const completed = requests.filter((request) => request.status === 'COMPLETED')
  const spotlight = active[0]

  function handleDemo() {
    const request = createRequest({
      serviceType: 'roadside',
      name: 'Demo Driver',
      phone: '0712 345 678',
      vehicle: { make: 'Toyota', model: 'Axio', registration: 'KDE 493M' },
      locationLabel: 'Thika Road Mall, ground floor parking',
      issue: 'Battery dead after parking for an hour.',
    })
    toast.success('Demo rescue created — tracking live.')
    useNotificationsStore.getState().notify({
      kind: 'rescue',
      title: 'Demo rescue created',
      body: 'A roadside rescue has been started for the Toyota Axio — tracking is live.',
      href: `/request/${request.id}`,
    })
    router.push(`/request/${request.id}`)
  }

  function handleDelete(requestId: string) {
    if (armedDelete !== requestId) {
      setArmedDelete(requestId)
      window.setTimeout(() => {
        setArmedDelete((current) => (current === requestId ? null : current))
      }, 2600)
      return
    }
    setArmedDelete(null)
    removeRequest(requestId)
    toast.success('Request removed from your history.')
  }

  function handleCancel(requestId: string) {
    if (armedCancel !== requestId) {
      setArmedCancel(requestId)
      window.setTimeout(() => {
        setArmedCancel((current) => (current === requestId ? null : current))
      }, 2600)
      return
    }
    setArmedCancel(null)
    updateStatus(requestId, 'CANCELLED')
    toast.success('Request cancelled.')
  }

  return (
    <div className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              My dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Track every rescue request, active and past.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              render={<a href="tel:+254700000000" />}
            >
              <PhoneCall className="size-4" aria-hidden="true" />
              Emergency line
            </Button>
            <Button size="sm" render={<Link href="/request" />}>
              <Plus className="size-4" aria-hidden="true" />
              Request help
            </Button>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
              <Radar className="size-5 animate-pulse" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">
                Active rescue{active.length === 1 ? '' : 's'}
              </dt>
              <dd className="text-foreground text-2xl font-semibold tracking-tight">
                {active.length}
              </dd>
            </div>
          </div>
          <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
            <span className="bg-success/10 text-success flex size-11 shrink-0 items-center justify-center rounded-lg">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Completed</dt>
              <dd className="text-foreground text-2xl font-semibold tracking-tight">
                {completed.length}
              </dd>
            </div>
          </div>
          <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
              <CalendarDays className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">
                Care booking{careBookings === 1 ? '' : 's'}
              </dt>
              <dd className="text-foreground text-2xl font-semibold tracking-tight">
                {careBookings}
              </dd>
            </div>
          </div>
          <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
            <span className="bg-success/10 text-success flex size-11 shrink-0 items-center justify-center rounded-lg">
              <Truck className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">
                Fleet &amp; inspections
              </dt>
              <dd className="text-foreground text-2xl font-semibold tracking-tight">
                {fleetCount + inspectionReports}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/customer/garage"
            className="border-border bg-card hover:bg-muted/50 flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm transition-colors"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                <CarFront className="size-5" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-foreground truncate text-sm font-semibold">
                  My garage
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {garageCount > 0
                    ? `${garageCount} saved vehicle${garageCount === 1 ? '' : 's'} — open their service passports`
                    : 'Save vehicles and their service passports'}
                </span>
              </span>
            </span>
            <ChevronRight
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/fleet"
            className="border-border bg-card hover:bg-muted/50 flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm transition-colors"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                <Truck className="size-5" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-foreground truncate text-sm font-semibold">
                  My fleet
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {fleetCount > 0
                    ? `${fleetCount} vehicle${fleetCount === 1 ? '' : 's'} under management`
                    : 'Manage your business vehicles'}
                </span>
              </span>
            </span>
            <ChevronRight
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
          </Link>
        </div>

        {spotlight ? (
          <DashSpotlight
            requestId={spotlight.id}
            armedCancel={armedCancel}
            onCancel={handleCancel}
          />
        ) : null}

        <div className="mt-10 flex flex-col gap-4">
          {requests.length === 0 ? (
            <EmptyState
              icon={History}
              title="No rescue requests yet"
              description="When you request help, your rescue shows up here with live status tracking — or try a demo request below."
              action={
                <Button size="sm" render={<Link href="/request" />}>
                  <Plus className="size-4" aria-hidden="true" />
                  Request help
                </Button>
              }
            />
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Rescue history
              </p>
              {requests.map((request) => {
                const config =
                  SERVICE_REQUEST_STATUS_CONFIG[request.status] ??
                  SERVICE_REQUEST_STATUS_CONFIG.CREATED
                const service = getServiceBySlug(request.serviceType)
                const done = request.status === 'COMPLETED'
                const cancelled = request.status === 'CANCELLED'
                return (
                  <div
                    key={request.id}
                    className="border-border bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-lg',
                          done && 'bg-success/10 text-success',
                          cancelled && 'bg-muted text-muted-foreground',
                          !done &&
                            !cancelled &&
                            'bg-subtle text-foreground ring-border ring-1 ring-inset',
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="size-5" aria-hidden="true" />
                        ) : cancelled ? (
                          <History className="size-5" aria-hidden="true" />
                        ) : (
                          <Radar
                            className="size-5 animate-pulse"
                            aria-hidden="true"
                          />
                        )}
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
                        <p className="text-muted-foreground text-xs">
                          {timeAgo(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        tone={config.tone}
                        pulse={!done && !cancelled}
                      >
                        {config.shortLabel}
                      </StatusBadge>
                      <Button
                        variant="outline"
                        size="sm"
                        render={<Link href={`/request/${request.id}`} />}
                      >
                        {done || cancelled ? 'View' : 'Track'}
                      </Button>
                      <Button
                        variant={
                          armedDelete === request.id ? 'destructive' : 'ghost'
                        }
                        size="sm"
                        aria-label={`Delete request ${request.id.slice(0, 8)}`}
                        onClick={() => handleDelete(request.id)}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        {armedDelete === request.id ? 'Confirm?' : null}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {requests.length === 0 ? (
          <div className="mt-6">
            <Button variant="outline" size="sm" onClick={handleDemo}>
              <Radar className="size-4" aria-hidden="true" />
              Simulate a demo rescue
            </Button>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-4">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Bookings &amp; inspections
          </p>
          <BookingsPanel />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Payments
          </p>
          <PaymentsLedger />
        </div>
      </section>
    </div>
  )
}

function DashSpotlight({
  requestId,
  armedCancel,
  onCancel,
}: {
  requestId: string
  armedCancel: string | null
  onCancel: (requestId: string) => void
}) {
  const request = useRequestsStore((state) => state.requests[requestId])
  if (!request) return null

  const config =
    SERVICE_REQUEST_STATUS_CONFIG[request.status] ??
    SERVICE_REQUEST_STATUS_CONFIG.CREATED
  const service = getServiceBySlug(request.serviceType)
  const technician = getTechnician(request.technicianId)
  const sequence = statusSequence(request.serviceType)
  const currentIndex = sequence.indexOf(request.status)
  const progress =
    currentIndex >= 0
      ? Math.round((currentIndex / Math.max(1, sequence.length - 1)) * 100)
      : 0

  return (
    <div className="border-border bg-card relative mt-6 overflow-hidden rounded-xl border shadow-sm">
      <div
        aria-hidden="true"
        className="from-primary/15 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent"
      />
      <div className="relative flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
              <LifeBuoy className="size-5 animate-pulse" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="text-foreground truncate text-base font-semibold">
                {service?.name ?? request.serviceType}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {request.vehicle.registration ||
                  [request.vehicle.make, request.vehicle.model]
                    .filter(Boolean)
                    .join(' ') ||
                  'Vehicle not specified'}{' '}
                · {timeAgo(request.createdAt)}
              </p>
            </div>
            <StatusBadge tone={config.tone} pulse>
              {config.shortLabel}
            </StatusBadge>
          </div>

          <div className="flex max-w-2xl flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground text-xs">
                {config.description}
              </span>
              <span className="text-foreground text-xs font-semibold">
                {progress}%
              </span>
            </div>
            <div
              className="bg-muted h-2 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
          </div>

          {technician ? (
            <div className="flex items-center gap-2.5">
              <span className="bg-subtle text-foreground ring-border flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset">
                <UserRound className="size-4" aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground truncate text-sm font-medium">
                  {technician.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {technician.specialty}
                </span>
              </div>
              <span className="text-foreground ml-1 inline-flex shrink-0 items-center gap-1 text-xs font-medium">
                <Star
                  className="text-warning size-3.5 fill-current"
                  aria-hidden="true"
                />
                {technician.rating.toFixed(1)}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
          <Button render={<Link href={`/request/${request.id}`} />}>
            Track live
          </Button>
          <Button
            variant={armedCancel === request.id ? 'destructive' : 'outline'}
            onClick={() => onCancel(request.id)}
          >
            {armedCancel === request.id
              ? 'Tap again to confirm'
              : 'Cancel request'}
          </Button>
        </div>
      </div>
    </div>
  )
}
