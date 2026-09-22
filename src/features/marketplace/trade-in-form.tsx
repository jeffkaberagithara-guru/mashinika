'use client'

import * as React from 'react'
import { Banknote, CarFront, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function formatKsh(value: number): string {
  return `KSh ${new Intl.NumberFormat('en-KE').format(value)}`
}

function estimateValue(year: string, mileage: string): number | null {
  const parsedYear = Number(year)
  if (!parsedYear || parsedYear < 1990 || parsedYear > 2100) return null
  const age = Math.min(Math.max(2026 - parsedYear, 0), 30)
  const odometer = Number(mileage) || 0
  const value = 1200000 - age * 60000 - Math.min(odometer, 250000) * 0.8
  return Math.max(Math.round(value / 50000) * 50000, 120000)
}

export function TradeInForm() {
  const [registration, setRegistration] = React.useState('')
  const [make, setMake] = React.useState('')
  const [model, setModel] = React.useState('')
  const [year, setYear] = React.useState('')
  const [mileage, setMileage] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'submitting'>('idle')
  const [estimate, setEstimate] = React.useState<number | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!registration.trim() && !(make.trim() && model.trim())) {
      toast.error('Add a registration, or the make and model')
      return
    }
    const value = estimateValue(year, mileage)
    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('idle')
      setEstimate(value)
      toast.success(
        value
          ? `Estimated trade-in generated for ${registration.trim() || make.trim()}.`
          : 'Request received — our buyers will quote within 1 business day.',
      )
    }, 700)
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="border-border bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-foreground text-lg font-semibold">
            Get a trade-in estimate
          </h2>
          <p className="text-muted-foreground text-sm">
            Tell us about your vehicle and get an instant guide price — no
            obligation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="trade-registration">Registration</Label>
            <Input
              id="trade-registration"
              value={registration}
              onChange={(event) => setRegistration(event.target.value)}
              placeholder="e.g. KCM 104F"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="trade-make">Make</Label>
              <Input
                id="trade-make"
                value={make}
                onChange={(event) => setMake(event.target.value)}
                placeholder="e.g. Toyota"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="trade-model">Model</Label>
              <Input
                id="trade-model"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                placeholder="e.g. Harrier"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="trade-year">Year</Label>
            <Input
              id="trade-year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              placeholder="e.g. 2017"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="trade-mileage">Mileage (km)</Label>
            <Input
              id="trade-mileage"
              value={mileage}
              onChange={(event) => setMileage(event.target.value)}
              placeholder="e.g. 110000"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="trade-notes">Condition notes (optional)</Label>
          <Textarea
            id="trade-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="e.g. Freshly serviced, new tyres, no accidents."
          />
        </div>

        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Estimating…
            </>
          ) : (
            <>Get my estimate</>
          )}
        </Button>

        <p className="text-muted-foreground text-xs">
          Estimates are guides only. The final offer is set after a certified
          {''} inspection of the car.
        </p>
      </form>

      {estimate !== null ? (
        <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
          <span className="bg-success/15 text-success flex size-11 shrink-0 items-center justify-center rounded-lg">
            <Banknote className="size-5" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-muted-foreground text-xs">
              Estimated guide value
            </span>
            <span className="text-foreground text-xl font-semibold tracking-tight">
              {estimate > 0 ? formatKsh(estimate) : 'On request'}
            </span>
            <span className="text-muted-foreground text-xs">
              {registration.trim() || make.trim()
                ? `${registration.trim().toUpperCase() || `${make.trim()} ${model.trim()}`} · based on year and mileage`
                : 'Contact our buyers for a manual quote.'}
            </span>
          </div>
        </div>
      ) : null}

      <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <CarFront className="size-3.5" aria-hidden="true" />
        Trade-in is applied as credit against any car you buy on {''}
        Mashinika.
      </p>
    </div>
  )
}
