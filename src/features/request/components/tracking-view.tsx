'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CircleX,
  Clock,
  HandCoins,
  Loader2,
  MapPin,
  Radio,
  ShieldCheck,
  Smartphone,
  Star,
  UserRound,
} from 'lucide-react'
import { toast } from 'sonner'
import { useRequestsStore } from '@/features/requests/store'
import { useNotificationsStore } from '@/features/notifications/store'
import {
  SIMULATION_STEP_MS,
  etaMinutesFor,
  formatKsh,
  nextStatus,
  quoteFor,
  statusSequence,
} from '@/features/request/simulation'
import {
  SERVICE_REQUEST_STATUS_CONFIG,
  SERVICE_REQUEST_STATUS_ICONS,
} from '@/features/roadside/status'
import { StatusBadge } from '@/components/ui/status-badge'
import { Timeline, type TimelineItem } from '@/components/ui/timeline'
import { Button } from '@/components/ui/button'
import { getServiceBySlug } from '@/config/services'
import { getTechnician } from '@/features/technicians/data'

function formatElapsed(startIso: string): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(startIso).getTime()) / 1000),
  )
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function QuoteApproval({
  serviceType,
  paying,
  onApprove,
}: {
  serviceType: string
  paying: boolean
  onApprove: (method: 'M-Pesa') => void
}) {
  const quote = quoteFor(serviceType)
  return (
    <div className="border-border bg-card mt-3 rounded-lg border p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <span className="bg-warning/10 text-warning flex size-10 shrink-0 items-center justify-center rounded-full">
          <HandCoins className="size-5" aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-foreground text-sm font-semibold">
            Job diagnosed — here&apos;s your quote
          </p>
          <p className="text-muted-foreground text-xs">
            Nothing is charged until you approve.
          </p>
        </div>
      </div>

      <dl className="text-muted-foreground mt-4 space-y-2 text-sm">
        {quote.lines.map((line) => (
          <div
            key={line.label}
            className="flex items-baseline justify-between gap-4"
          >
            <dt>{line.label}</dt>
            <dd className="text-foreground font-medium whitespace-nowrap">
              {formatKsh(line.amount)}
            </dd>
          </div>
        ))}
        <div className="border-border mt-3 flex items-baseline justify-between gap-4 border-t pt-3">
          <dt className="text-foreground font-semibold">Total estimate</dt>
          <dd className="text-foreground font-semibold">
            {formatKsh(quote.amount)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          onClick={() => onApprove('M-Pesa')}
          disabled={paying}
          className="flex-1"
        >
          {paying ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Smartphone className="size-4" aria-hidden="true" />
          )}
          {paying ? 'Sending STK push…' : 'Approve & pay with M-Pesa'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onApprove('M-Pesa')}
          disabled={paying}
          className="flex-1"
        >
          Approve — pay on arrival
        </Button>
      </div>
      <p className="text-muted-foreground mt-3 text-xs">
        <ShieldCheck
          className="text-success -mt-0.5 mr-1 inline size-3.5"
          aria-hidden="true"
        />
        This is a demo quote for illustration — no real payment is collected.
      </p>
    </div>
  )
}

export function TrackingView({ requestId }: { requestId: string }) {
  const request = useRequestsStore((state) => state.requests[requestId])
  const updateStatus = useRequestsStore((state) => state.updateStatus)
  const approveQuote = useRequestsStore((state) => state.approveQuote)
  const lastStatusRef = React.useRef<string | null>(null)
  const [, setTick] = React.useState(0)
  const [cancelArmed, setCancelArmed] = React.useState(false)
  const [paying, setPaying] = React.useState(false)

  React.useEffect(() => {
    if (!request) return
    if (lastStatusRef.current !== request.status) {
      lastStatusRef.current = request.status
      const config = SERVICE_REQUEST_STATUS_CONFIG[request.status]
      const service = getServiceBySlug(request.serviceType)
      if (config) {
        useNotificationsStore.getState().notify({
          kind: 'rescue',
          title: 'Rescue update',
          body: `Your ${service?.name ?? 'request'} is now "${config.shortLabel}".`,
          href: `/request/${request.id}`,
        })
      }
    }
  }, [request])

  React.useEffect(() => {
    const clock = window.setInterval(() => setTick((value) => value + 1), 1000)
    return () => window.clearInterval(clock)
  }, [])

  React.useEffect(() => {
    if (!request) return
    // Dispatch pauses here for the customer to approve the diagnosed quote.
    if (request.status === 'DIAGNOSING' && !request.quoteApprovedAt) return
    const next = nextStatus(request.status, request.serviceType)
    if (!next) return

    const timer = window.setTimeout(() => {
      updateStatus(request.id, next)
    }, SIMULATION_STEP_MS)
    return () => window.clearTimeout(timer)
  }, [request, updateStatus])

  if (!request) {
    return (
      <div className="border-border bg-card mx-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-xl border px-6 py-14 text-center shadow-sm">
        <span className="bg-subtle text-muted-foreground flex size-10 items-center justify-center rounded-full">
          <AlertTriangle className="size-5" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-lg font-semibold">
            Request not found
          </h1>
          <p className="text-muted-foreground text-sm">
            We couldn&apos;t find that rescue request — it may have been
            removed.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" render={<Link href="/customer" />}>
            My rescues
          </Button>
          <Button render={<Link href="/request" />}>New request</Button>
        </div>
      </div>
    )
  }

  const service = getServiceBySlug(request.serviceType)
  const sequence = statusSequence(request.serviceType)
  const currentIndex = sequence.indexOf(request.status)
  const config =
    SERVICE_REQUEST_STATUS_CONFIG[request.status] ??
    SERVICE_REQUEST_STATUS_CONFIG.CREATED
  const eta = etaMinutesFor(request.serviceType)
  const isUrgent = request.priority === 'URGENT'
  const isTerminal = ['COMPLETED', 'CANCELLED'].includes(request.status)
  const assignedTechnician = getTechnician(request.technicianId)

  function handleCancel() {
    if (!cancelArmed) {
      setCancelArmed(true)
      window.setTimeout(() => setCancelArmed(false), 2600)
      return
    }
    updateStatus(request.id, 'CANCELLED')
    toast.success('Request cancelled.')
  }

  function handleApprove(method: 'M-Pesa') {
    if (!request) return
    const quote = quoteFor(request.serviceType)
    setPaying(true)
    window.setTimeout(() => {
      approveQuote(request.id, quote.amount, method)
      setPaying(false)
      useNotificationsStore.getState().notify({
        kind: 'quote',
        title: 'Quote approved',
        body: `Quote of ${formatKsh(quote.amount)} approved via M-Pesa (demo) — work is starting.`,
        href: `/request/${request.id}`,
      })
      toast.success(
        method === 'M-Pesa'
          ? 'M-Pesa STK push sent (demo) — quote approved. Work starting.'
          : 'Quote approved — work starting.',
      )
    }, 1400)
  }

  const timelineItems: TimelineItem[] = sequence.map((status, index) => {
    const statusConfig = SERVICE_REQUEST_STATUS_CONFIG[status]
    const state =
      index < currentIndex
        ? ('completed' as const)
        : index === currentIndex
          ? ('active' as const)
          : ('pending' as const)
    return {
      id: status,
      title: statusConfig.label,
      description: statusConfig.description,
      tone: statusConfig.tone,
      state,
      icon:
        index === currentIndex ? SERVICE_REQUEST_STATUS_ICONS[status] : null,
    }
  })

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pt-10 pb-16 sm:px-6 lg:px-8">
      <Link
        href="/customer"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        My rescues
      </Link>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Rescue request · {request.id.slice(0, 8)}
            </p>
            <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight">
              {service?.title ?? 'Vehicle help'}
            </h1>
          </div>
          <StatusBadge
            tone={config.tone}
            pulse={!['COMPLETED', 'CANCELLED'].includes(request.status)}
          >
            {config.shortLabel}
          </StatusBadge>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="border-border bg-subtle rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">Service</p>
            <p className="text-foreground mt-0.5 text-sm font-medium">
              {service?.name ?? request.serviceType}
              {isUrgent ? (
                <span className="text-destructive ml-2 text-xs font-semibold">
                  · Urgent
                </span>
              ) : null}
            </p>
          </div>
          <div className="border-border bg-subtle rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">Vehicle</p>
            <p className="text-foreground mt-0.5 text-sm font-medium">
              {request.vehicle.registration ||
                [request.vehicle.make, request.vehicle.model]
                  .filter(Boolean)
                  .join(' ') ||
                'Not specified'}
            </p>
          </div>
          <div className="border-border bg-subtle rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">Location</p>
            <p className="text-foreground mt-0.5 text-sm font-medium">
              {request.locationLabel}
            </p>
            {request.coordinates ? (
              <a
                href={`https://www.google.com/maps?q=${request.coordinates.lat},${request.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary mt-1 inline-flex items-center gap-1 text-xs font-medium"
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                Open in maps
              </a>
            ) : null}
          </div>
          <div className="border-border bg-subtle rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">
              {['TECHNICIAN_EN_ROUTE', 'TECHNICIAN_ARRIVED'].includes(
                request.status,
              )
                ? 'Status'
                : 'Elapsed'}
            </p>
            <p className="text-foreground mt-0.5 flex items-center gap-1.5 text-sm font-medium">
              {['TECHNICIAN_EN_ROUTE', 'TECHNICIAN_ARRIVED'].includes(
                request.status,
              ) ? (
                <>
                  <Clock className="size-3.5" aria-hidden="true" />
                  ETA ~{eta} min
                </>
              ) : (
                formatElapsed(request.createdAt)
              )}
            </p>
          </div>
        </div>

        {request.issue ? (
          <div className="border-border bg-subtle mt-3 rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">Details</p>
            <p className="text-foreground mt-0.5 text-sm">{request.issue}</p>
          </div>
        ) : null}

        {request.photos?.length ? (
          <div className="border-border bg-subtle mt-3 rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">
              Photos ({request.photos.length})
            </p>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {request.photos.map((src, index) => (
                <span
                  key={src}
                  className="border-border relative size-20 overflow-hidden rounded-lg border shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Vehicle photo ${index + 1} for the technician`}
                    className="size-full object-cover"
                  />
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {assignedTechnician ? (
          <div className="border-border bg-subtle mt-3 rounded-lg border px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                <UserRound className="size-5" aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-muted-foreground text-xs">
                  {request.status === 'TECHNICIAN_ASSIGNED'
                    ? 'Your technician'
                    : 'On the way'}
                </p>
                <p className="text-foreground truncate text-sm font-semibold">
                  {assignedTechnician.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {assignedTechnician.specialty}
                </p>
              </div>
              <span className="text-foreground inline-flex items-center gap-1 text-xs font-medium">
                <Star
                  className="text-warning size-3.5 fill-current"
                  aria-hidden="true"
                />
                {assignedTechnician.rating.toFixed(1)}
              </span>
            </div>
          </div>
        ) : null}

        {request.status === 'DIAGNOSING' && !request.quoteApprovedAt ? (
          <QuoteApproval
            serviceType={request.serviceType}
            paying={paying}
            onApprove={handleApprove}
          />
        ) : null}

        {request.quoteApprovedAt && request.quoteAmount ? (
          <div className="border-success/30 bg-success/5 mt-3 flex items-center gap-3 rounded-lg border px-4 py-3">
            <span className="bg-success/15 text-success flex size-10 shrink-0 items-center justify-center rounded-full">
              <HandCoins className="size-5" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-foreground text-sm font-semibold">
                Quote approved — {formatKsh(request.quoteAmount)}
              </p>
              <p className="text-muted-foreground text-xs">
                {request.quotePaymentMethod === 'M-Pesa'
                  ? 'Charged via M-Pesa STK push (demo).'
                  : 'Payment agreed — no charge has been taken.'}
              </p>
            </div>
            <CheckCircle2
              className="text-success size-5 shrink-0"
              aria-hidden="true"
            />
          </div>
        ) : null}

        {!isTerminal ? (
          <div className="mt-4 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-xs">
              Changed your mind? You can cancel while the request is active.
            </p>
            <Button
              variant={cancelArmed ? 'destructive' : 'outline'}
              size="sm"
              onClick={handleCancel}
            >
              <CircleX className="size-4" aria-hidden="true" />
              {cancelArmed ? 'Tap again to confirm' : 'Cancel request'}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-foreground text-base font-semibold">
            Live status
          </h2>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <Radio
              className="text-primary size-3.5 animate-pulse"
              aria-hidden="true"
            />
            {config.description}
          </span>
        </div>
        <Timeline mutedBehindActive className="pt-5" items={timelineItems} />

        {request.status === 'COMPLETED' ? (
          <div className="bg-success/10 text-success flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Job complete — added to your service history.
          </div>
        ) : null}
        {request.status === 'CANCELLED' ? (
          <div className="bg-danger/10 text-danger flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold">
            <CircleX className="size-4" aria-hidden="true" />
            Request cancelled — no charges applied.
          </div>
        ) : null}
      </div>
    </div>
  )
}
