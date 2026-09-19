"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, Radio } from "lucide-react"
import { useRequestsStore } from "@/features/requests/store"
import {
  SIMULATION_STEP_MS,
  etaMinutesFor,
  nextStatus,
  statusSequence,
} from "@/features/request/simulation"
import {
  SERVICE_REQUEST_STATUS_CONFIG,
  SERVICE_REQUEST_STATUS_ICONS,
} from "@/features/roadside/status"
import { StatusBadge } from "@/components/ui/status-badge"
import { Timeline, type TimelineItem } from "@/components/ui/timeline"
import { Button } from "@/components/ui/button"
import { getServiceBySlug } from "@/config/services"

function formatElapsed(startIso: string): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(startIso).getTime()) / 1000),
  )
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function TrackingView({ requestId }: { requestId: string }) {
  const request = useRequestsStore((state) => state.requests[requestId])
  const updateStatus = useRequestsStore((state) => state.updateStatus)
  const [, setTick] = React.useState(0)

  React.useEffect(() => {
    const clock = window.setInterval(() => setTick((value) => value + 1), 1000)
    return () => window.clearInterval(clock)
  }, [])

  React.useEffect(() => {
    if (!request) return
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
  const isUrgent = request.priority === "URGENT"

  const timelineItems: TimelineItem[] = sequence.map((status, index) => {
    const statusConfig = SERVICE_REQUEST_STATUS_CONFIG[status]
    const state =
      index < currentIndex
        ? ("completed" as const)
        : index === currentIndex
          ? ("active" as const)
          : ("pending" as const)
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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
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
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Rescue request · {request.id.slice(0, 8)}
            </p>
            <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight">
              {service?.title ?? "Vehicle help"}
            </h1>
          </div>
          <StatusBadge tone={config.tone} pulse={!["COMPLETED", "CANCELLED"].includes(request.status)}>
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
                  .join(" ") ||
                "Not specified"}
            </p>
          </div>
          <div className="border-border bg-subtle rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">Location</p>
            <p className="text-foreground mt-0.5 text-sm font-medium">
              {request.locationLabel}
            </p>
          </div>
          <div className="border-border bg-subtle rounded-lg border px-4 py-3">
            <p className="text-muted-foreground text-xs">
              {["TECHNICIAN_EN_ROUTE", "TECHNICIAN_ARRIVED"].includes(
                request.status,
              )
                ? "Status"
                : "Elapsed"}
            </p>
            <p className="text-foreground mt-0.5 flex items-center gap-1.5 text-sm font-medium">
              {["TECHNICIAN_EN_ROUTE", "TECHNICIAN_ARRIVED"].includes(
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
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-foreground text-base font-semibold">
            Live status
          </h2>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <Radio className="text-primary size-3.5 animate-pulse" aria-hidden="true" />
            {config.description}
          </span>
        </div>
        <Timeline mutedBehindActive className="pt-5" items={timelineItems} />

        {request.status === "COMPLETED" ? (
          <div className="bg-success/10 text-success flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Job complete — added to your service history.
          </div>
        ) : null}
      </div>
    </div>
  )
}