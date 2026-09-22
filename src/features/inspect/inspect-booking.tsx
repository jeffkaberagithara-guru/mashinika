'use client'

import * as React from 'react'
import {
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  INSPECTION_PACKAGES,
  useInspectionsStore,
  type InspectionPackage,
} from '@/features/inspect/store'
import { cn } from 'cn'

const packageOrder: InspectionPackage[] = ['basic', 'standard', 'premium']

function formatKsh(value: number): string {
  return `KSh ${new Intl.NumberFormat('en-KE').format(value)}`
}

export function InspectBooking() {
  const reports = useInspectionsStore((state) => state.reports)
  const bookInspection = useInspectionsStore((state) => state.bookInspection)
  const removeReport = useInspectionsStore((state) => state.removeReport)

  const [pkg, setPkg] = React.useState<InspectionPackage>('standard')
  const [registration, setRegistration] = React.useState('')
  const [vehicleLabel, setVehicleLabel] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [armedDelete, setArmedDelete] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const label = vehicleLabel.trim()
    if (!label && !registration.trim()) {
      toast.error('Tell us the make and model, or the registration.')
      return
    }
    if (!location.trim()) {
      toast.error('Pick a location for the inspector to meet you.')
      return
    }
    setSubmitting(true)
    window.setTimeout(() => {
      bookInspection({
        package: pkg,
        vehicleLabel: label,
        registration: registration.trim(),
        location: location.trim(),
        notes: notes.trim(),
      })
      setSubmitting(false)
      toast.success('Inspection booked — report generated below.')
    }, 900)
  }

  function handleDelete(id: string) {
    if (armedDelete !== id) {
      setArmedDelete(id)
      window.setTimeout(() => {
        setArmedDelete((current) => (current === id ? null : current))
      }, 2600)
      return
    }
    setArmedDelete(null)
    removeReport(id)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
            <ShieldCheck className="text-primary size-5" aria-hidden="true" />
            Book an inspection
          </h3>
          <p className="text-muted-foreground text-sm">
            A Mashinika-trained inspector checks the car, then emails you the
            report the same day.
          </p>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Package
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {packageOrder.map((key) => {
              const pack = INSPECTION_PACKAGES[key]
              const selected = pkg === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPkg(key)}
                  aria-pressed={selected}
                  className={cn(
                    'border-border bg-subtle flex flex-col gap-1 rounded-lg border px-3.5 py-3 text-left transition-colors',
                    selected && 'border-primary bg-primary/5',
                  )}
                >
                  <span
                    className={cn(
                      'text-foreground text-sm font-semibold',
                      selected && 'text-primary',
                    )}
                  >
                    {pack.label}
                  </span>
                  <span className="text-primary text-sm font-semibold">
                    {formatKsh(pack.price)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {pack.blurb}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inspect-registration">
              Registration (optional)
            </Label>
            <Input
              id="inspect-registration"
              value={registration}
              onChange={(event) => setRegistration(event.target.value)}
              placeholder="e.g. KDE 493M"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inspect-vehicle">Make &amp; model</Label>
            <Input
              id="inspect-vehicle"
              value={vehicleLabel}
              onChange={(event) => setVehicleLabel(event.target.value)}
              placeholder="e.g. Toyota Axio"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inspect-location">Nearest town or estate</Label>
          <Input
            id="inspect-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Westlands, Nairobi"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inspect-notes">
            Anything the inspector should focus on?
          </Label>
          <Textarea
            id="inspect-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="e.g. Clunk from front left over bumps"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ClipboardCheck className="size-4" aria-hidden="true" />
          )}
          {submitting ? 'Booking…' : 'Book inspection'}
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Your reports · {reports.length}
        </p>
        {reports.length === 0 ? (
          <div className="border-border bg-card flex flex-col items-center gap-2 rounded-xl border p-8 text-center shadow-sm">
            <span className="bg-subtle text-foreground ring-border flex size-11 items-center justify-center rounded-full ring-1 ring-inset">
              <CarFront className="size-5" aria-hidden="true" />
            </span>
            <p className="text-foreground text-sm font-semibold">
              No inspection reports yet
            </p>
            <p className="text-muted-foreground text-sm">
              Book a package on the left and the completed report lands here.
            </p>
          </div>
        ) : (
          reports.map((report) => (
            <article
              key={report.id}
              className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="bg-success/10 text-success flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <p className="text-foreground truncate text-sm font-semibold">
                      {report.vehicleLabel || report.registration || 'Vehicle'}
                    </p>
                    <p className="text-muted-foreground inline-flex items-center gap-1 truncate text-xs">
                      <MapPin className="size-3" aria-hidden="true" />
                      {report.location} ·{' '}
                      {INSPECTION_PACKAGES[report.package].label} package
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge tone="success">Roadworthy</StatusBadge>
                  <Button
                    size="sm"
                    variant={
                      armedDelete === report.id ? 'destructive' : 'ghost'
                    }
                    onClick={() => handleDelete(report.id)}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    {armedDelete === report.id ? 'Confirm?' : null}
                  </Button>
                </div>
              </div>

              <div className="border-border bg-subtle flex items-center justify-between gap-3 rounded-lg border px-4 py-3">
                <span className="text-foreground text-sm font-semibold">
                  Overall condition
                </span>
                <span className="text-warning inline-flex items-center gap-1 text-sm font-semibold">
                  <Star className="size-4 fill-current" aria-hidden="true" />
                  {report.overall}.0 / 5.0
                </span>
              </div>

              <p className="text-foreground text-sm font-medium">
                {report.verdict}
              </p>

              <ul className="flex flex-col gap-2">
                {report.checklist.map((item) => (
                  <li key={item.label} className="flex flex-col gap-0.5">
                    <span className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2
                          className="text-success size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {item.label}
                      </span>
                      <span className="text-foreground text-sm font-semibold">
                        {item.score}/5
                      </span>
                    </span>
                    <span className="text-muted-foreground pl-6 text-xs">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
