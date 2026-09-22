'use client'

import * as React from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  Wrench,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  CARE_SERVICE_KINDS,
  CARE_TIME_SLOTS,
  useCareStore,
  type CareServiceKind,
} from '@/features/care/store'
import { useNotificationsStore } from '@/features/notifications/store'
import { cn } from 'cn'

const kindOrder: CareServiceKind[] = ['maintenance', 'repair', 'detailing']

function formatDate(iso: string): string {
  if (!iso) return 'Not scheduled'
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    hour: undefined,
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export function CareBooking() {
  const bookings = useCareStore((state) => state.bookings)
  const bookCare = useCareStore((state) => state.bookCare)
  const setBookingStatus = useCareStore((state) => state.setBookingStatus)

  const [kind, setKind] = React.useState<CareServiceKind>('maintenance')
  const [registration, setRegistration] = React.useState('')
  const [vehicleLabel, setVehicleLabel] = React.useState('')
  const [locationLabel, setLocationLabel] = React.useState('')
  const [date, setDate] = React.useState('')
  const [timeSlot, setTimeSlot] = React.useState(CARE_TIME_SLOTS[0])
  const [phone, setPhone] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [armedCancel, setArmedCancel] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!vehicleLabel.trim() && !registration.trim()) {
      toast.error('Tell us the make and model, or the registration.')
      return
    }
    if (!locationLabel.trim()) {
      toast.error('Where should the technician meet you?')
      return
    }
    if (!date) {
      toast.error('Pick a day for the booking.')
      return
    }
    if (!phone.trim()) {
      toast.error('Add a phone number for the confirmation.')
      return
    }
    setSubmitting(true)
    window.setTimeout(() => {
      bookCare({
        kind,
        vehicleLabel: vehicleLabel.trim(),
        registration: registration.trim(),
        locationLabel: locationLabel.trim(),
        date,
        timeSlot,
        phone: phone.trim(),
        notes: notes.trim(),
      })
      setSubmitting(false)
      useNotificationsStore.getState().notify({
        kind: 'system',
        title: 'Care booking confirmed',
        body: `${CARE_SERVICE_KINDS[kind].label} scheduled for ${formatDate(date)} at ${timeSlot}.`,
        href: '/customer',
      })
      toast.success('Booking confirmed — we will confirm via SMS.')
    }, 900)
  }

  function handleCancel(id: string) {
    if (armedCancel !== id) {
      setArmedCancel(id)
      window.setTimeout(() => {
        setArmedCancel((current) => (current === id ? null : current))
      }, 2600)
      return
    }
    setArmedCancel(null)
    setBookingStatus(id, 'CANCELLED')
    toast.success('Booking cancelled.')
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Wrench className="text-primary size-5" aria-hidden="true" />
            Schedule care
          </h3>
          <p className="text-muted-foreground text-sm">
            Pick a service and a slot — a technician carries it out at your
            home, office or a hub.
          </p>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            What do you need?
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {kindOrder.map((key) => {
              const option = CARE_SERVICE_KINDS[key]
              const selected = kind === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setKind(key)}
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
                    {option.label}
                  </span>
                  <span className="text-primary text-xs font-medium">
                    {option.price}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {option.blurb}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="care-registration">Registration (optional)</Label>
            <Input
              id="care-registration"
              value={registration}
              onChange={(event) => setRegistration(event.target.value)}
              placeholder="e.g. KDE 493M"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="care-vehicle">Make &amp; model</Label>
            <Input
              id="care-vehicle"
              value={vehicleLabel}
              onChange={(event) => setVehicleLabel(event.target.value)}
              placeholder="e.g. Toyota Axio"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="care-location">Location</Label>
            <Input
              id="care-location"
              value={locationLabel}
              onChange={(event) => setLocationLabel(event.target.value)}
              placeholder="e.g. Kilimani, Nairobi"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="care-phone">Phone number</Label>
            <Input
              id="care-phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0712 345 678"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="care-date">Preferred day</Label>
            <Input
              id="care-date"
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-foreground text-sm leading-6 font-medium">
              Time slot
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {CARE_TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  aria-pressed={timeSlot === slot}
                  className={cn(
                    'border-border text-muted-foreground rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    timeSlot === slot &&
                      'border-primary bg-primary/5 text-primary',
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="care-notes">Anything else?</Label>
          <Textarea
            id="care-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="e.g. Squeaky brakes when cold"
            rows={2}
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <CalendarDays className="size-4" aria-hidden="true" />
          )}
          {submitting ? 'Booking…' : 'Confirm booking'}
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          My appointments · {bookings.length}
        </p>
        {bookings.length === 0 ? (
          <div className="border-border bg-card flex flex-col items-center gap-2 rounded-xl border p-8 text-center shadow-sm">
            <span className="bg-subtle text-foreground ring-border flex size-11 items-center justify-center rounded-full ring-1 ring-inset">
              <CalendarDays className="size-5" aria-hidden="true" />
            </span>
            <p className="text-foreground text-sm font-semibold">
              No care appointments yet
            </p>
            <p className="text-muted-foreground text-sm">
              Book your first service on the left — it shows up here.
            </p>
          </div>
        ) : (
          bookings.map((booking) => {
            const option = CARE_SERVICE_KINDS[booking.kind]
            return (
              <div
                key={booking.id}
                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Wrench className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="text-foreground truncate text-sm font-semibold">
                        {option.label}
                      </p>
                      <p className="text-muted-foreground truncate text-sm">
                        {booking.vehicleLabel ||
                          booking.registration ||
                          'Vehicle not specified'}{' '}
                        · {booking.locationLabel}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatDate(booking.date)} · {booking.timeSlot} ·{' '}
                        {booking.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge
                      tone={
                        booking.status === 'CANCELLED'
                          ? 'neutral'
                          : booking.status === 'COMPLETED'
                            ? 'success'
                            : 'primary'
                      }
                    >
                      {booking.status}
                    </StatusBadge>
                    {booking.status === 'UPCOMING' ? (
                      <Button
                        size="sm"
                        variant={
                          armedCancel === booking.id ? 'destructive' : 'ghost'
                        }
                        onClick={() => handleCancel(booking.id)}
                      >
                        {armedCancel === booking.id ? 'Confirm?' : 'Cancel'}
                      </Button>
                    ) : (
                      <CheckCircle2
                        className="text-success size-4"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
                {booking.notes ? (
                  <p className="text-muted-foreground border-border flex items-start gap-1.5 border-t pt-3 text-xs">
                    <Clock
                      className="mt-0.5 size-3 shrink-0"
                      aria-hidden="true"
                    />
                    {booking.notes}
                  </p>
                ) : null}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
