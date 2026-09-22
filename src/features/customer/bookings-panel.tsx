'use client'

import * as React from 'react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import {
  CalendarDays,
  CalendarX2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  CARE_SERVICE_KINDS,
  useCareStore,
  type CareBooking,
} from '@/features/care/store'
import {
  INSPECTION_PACKAGES,
  useInspectionsStore,
  type InspectionReport,
} from '@/features/inspect/store'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from 'cn'

function formatDay(iso: string): string {
  if (!iso) return 'Date unknown'
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('en-KE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(year, month - 1, day))
}

function careSort(a: CareBooking, b: CareBooking): number {
  const statusOrder: Record<CareBooking['status'], number> = {
    UPCOMING: 0,
    COMPLETED: 1,
    CANCELLED: 2,
  }
  const byStatus =
    (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3)
  if (byStatus !== 0) return byStatus
  return b.createdAt.localeCompare(a.createdAt)
}

function reportSort(a: InspectionReport, b: InspectionReport): number {
  return b.inspectedAt.localeCompare(a.inspectedAt)
}

function vehicleName(label: string, registration: string): string {
  return label.trim() || registration.trim() || 'Vehicle'
}

export function BookingsPanel() {
  const careBookings = useCareStore(
    useShallow((state) =>
      [...state.bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    ),
  )
  const reports = useInspectionsStore(
    useShallow((state) => [...state.reports].sort(reportSort)),
  )
  const setBookingStatus = useCareStore((state) => state.setBookingStatus)

  const [armedCancel, setArmedCancel] = React.useState<string | null>(null)

  function handleCancel(booking: CareBooking) {
    if (armedCancel !== booking.id) {
      setArmedCancel(booking.id)
      window.setTimeout(() => {
        setArmedCancel((current) => (current === booking.id ? null : current))
      }, 2600)
      return
    }
    setArmedCancel(null)
    setBookingStatus(booking.id, 'CANCELLED')
    toast.success('Care appointment cancelled.')
  }

  if (careBookings.length === 0 && reports.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No bookings or inspections yet"
        description="Book a care service or an inspection and it shows up here with its status and report."
        action={
          <Button
            size="sm"
            variant="outline"
            render={<Link href="/care" />}
          >
            Book a service
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Bookings · {careBookings.length}
          </p>
          <Link
            href="/care"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-0.5 text-xs font-medium"
          >
            Manage in Care
            <ChevronRight className="size-3" aria-hidden="true" />
          </Link>
        </div>

        {careBookings.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed px-4 py-5 text-center text-sm">
            No care appointments yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {[...careBookings].sort(careSort).map((booking) => {
              const option = CARE_SERVICE_KINDS[booking.kind]
              const done = booking.status === 'COMPLETED'
              const cancelled = booking.status === 'CANCELLED'
              const upcoming = booking.status === 'UPCOMING'
              return (
                <div
                  key={booking.id}
                  className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-lg',
                        done && 'bg-success/10 text-success',
                        cancelled && 'bg-muted text-muted-foreground',
                        upcoming && 'bg-primary/10 text-primary',
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="size-5" aria-hidden="true" />
                      ) : cancelled ? (
                        <CalendarX2 className="size-5" aria-hidden="true" />
                      ) : (
                        <Wrench className="size-5" aria-hidden="true" />
                      )}
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="text-foreground truncate text-sm font-semibold">
                        {option.label}
                      </p>
                      <p className="text-muted-foreground truncate text-sm">
                        {vehicleName(
                          booking.vehicleLabel,
                          booking.registration,
                        )}{' '}
                        · {booking.locationLabel}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {upcoming
                          ? `${formatDay(booking.date)} · ${booking.timeSlot}`
                          : `${formatDay(booking.date)} · ${booking.timeSlot} · ${
                              booking.phone
                            }`}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge
                      tone={
                        cancelled
                          ? 'neutral'
                          : done
                            ? 'success'
                            : 'primary'
                      }
                    >
                      {booking.status}
                    </StatusBadge>
                    {upcoming ? (
                      <Button
                        size="sm"
                        variant={
                          armedCancel === booking.id ? 'destructive' : 'ghost'
                        }
                        onClick={() => handleCancel(booking)}
                      >
                        {armedCancel === booking.id ? 'Confirm?' : 'Cancel'}
                      </Button>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Inspections · {reports.length}
          </p>
          <Link
            href="/inspect"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-0.5 text-xs font-medium"
          >
            Book more
            <ChevronRight className="size-3" aria-hidden="true" />
          </Link>
        </div>

        {reports.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed px-4 py-5 text-center text-sm">
            No inspection reports yet — book one before you buy.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="bg-success/10 text-success flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="text-foreground truncate text-sm font-semibold">
                      {vehicleName(report.vehicleLabel, report.registration)}
                    </p>
                    <p className="text-muted-foreground truncate text-sm">
                      {INSPECTION_PACKAGES[report.package].label} inspection ·{' '}
                      {report.location}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {report.overall}.0 / 5.0 ·{' '}
                      {new Intl.DateTimeFormat('en-KE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(report.inspectedAt))}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge tone="success">Roadworthy</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}