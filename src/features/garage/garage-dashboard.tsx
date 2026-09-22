'use client'

import * as React from 'react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CarFront,
  FileCheck2,
  History,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  useGarageStore,
  type GarageVehicle,
  type GarageVehicleInput,
} from '@/features/garage/store'
import { useRequestsStore } from '@/features/requests/store'
import type { RescueRequest } from '@/features/requests/store'
import { useMounted } from '@/hooks/use-mounted'
import { SERVICE_REQUEST_STATUS_CONFIG } from '@/features/roadside/status'
import { getServiceBySlug } from '@/config/services'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from 'cn'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function matchesVehicle(
  request: RescueRequest,
  vehicle: GarageVehicle,
): boolean {
  const requestReg = normalize(request.vehicle.registration)
  const vehicleReg = normalize(vehicle.registration)
  if (requestReg && vehicleReg) return requestReg === vehicleReg
  const requestName = normalize(
    [request.vehicle.make, request.vehicle.model].filter(Boolean).join(' '),
  )
  const vehicleName = normalize([vehicle.make, vehicle.model].join(' '))
  return Boolean(requestName && requestName === vehicleName)
}

export function GarageDashboard() {
  const mounted = useMounted()
  const storeVehicles = useGarageStore(
    useShallow((state) =>
      Object.values(state.vehicles).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
      ),
    ),
  )
  const addVehicle = useGarageStore((state) => state.addVehicle)
  const updateVehicle = useGarageStore((state) => state.updateVehicle)
  const removeVehicle = useGarageStore((state) => state.removeVehicle)

  const storeRequests = useRequestsStore(
    useShallow((state) =>
      Object.values(state.requests).sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    ),
  )

  const vehicles = mounted ? storeVehicles : []
  const requests = mounted ? storeRequests : []

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [adding, setAdding] = React.useState(false)
  const [armedDelete, setArmedDelete] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<GarageVehicleInput>({
    registration: '',
    make: '',
    model: '',
    year: '',
    color: '',
    notes: '',
  })

  const effectiveId =
    selectedId && vehicles.some((vehicle) => vehicle.id === selectedId)
      ? selectedId
      : (vehicles[0]?.id ?? null)

  const selected =
    vehicles.find((vehicle) => vehicle.id === effectiveId) ?? null
  const selectedHistory = selected
    ? requests.filter((request) => matchesVehicle(request, selected))
    : []
  const completedCount = selectedHistory.filter(
    (request) => request.status === 'COMPLETED',
  ).length
  const passportValid = selected ? selectedHistory.length > 0 : false

  function resetForm() {
    setForm({
      registration: '',
      make: '',
      model: '',
      year: '',
      color: '',
      notes: '',
    })
    setEditingId(null)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.registration.trim() && !(form.make.trim() && form.model.trim())) {
      toast.error('Add a registration, or the make and model')
      return
    }
    if (editingId) {
      updateVehicle(editingId, { ...form })
      toast.success('Vehicle updated.')
      setAdding(false)
      resetForm()
      return
    }
    const vehicle = addVehicle({ ...form })
    setSelectedId(vehicle.id)
    toast.success('Vehicle saved to your garage.')
    setAdding(false)
    resetForm()
  }

  function handleDelete(vehicleId: string) {
    if (armedDelete !== vehicleId) {
      setArmedDelete(vehicleId)
      window.setTimeout(() => {
        setArmedDelete((current) => (current === vehicleId ? null : current))
      }, 2600)
      return
    }
    setArmedDelete(null)
    removeVehicle(vehicleId)
    if (selectedId === vehicleId) setSelectedId(null)
    toast.success('Vehicle removed from your garage.')
  }

  function handleEdit(vehicle: GarageVehicle) {
    setEditingId(vehicle.id)
    setForm({
      registration: vehicle.registration,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year ?? '',
      color: vehicle.color ?? '',
      notes: vehicle.notes ?? '',
    })
    setAdding(true)
  }

  return (
    <div className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-12">
        <Link
          href="/customer"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          My dashboard
        </Link>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              My garage
            </h1>
            <p className="text-muted-foreground text-sm">
              Save your vehicles and open each one&apos;s service passport.
            </p>
          </div>
          <Button size="sm" onClick={() => setAdding((value) => !value)}>
            <Plus className="size-4" aria-hidden="true" />
            {adding ? 'Close form' : 'Add a vehicle'}
          </Button>
        </div>

        {adding ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="border-border bg-card mt-6 rounded-xl border p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-foreground text-base font-semibold">
                {editingId ? 'Edit vehicle' : 'Add a vehicle'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setAdding(false)
                  resetForm()
                }}
                aria-label="Close form"
                className="text-muted-foreground hover:text-foreground grid size-8 place-items-center rounded-lg"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="garage-registration">Registration</Label>
                <Input
                  id="garage-registration"
                  value={form.registration}
                  onChange={(event) =>
                    setForm({ ...form, registration: event.target.value })
                  }
                  placeholder="e.g. KDE 493M"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="garage-make">Make</Label>
                <Input
                  id="garage-make"
                  value={form.make}
                  onChange={(event) =>
                    setForm({ ...form, make: event.target.value })
                  }
                  placeholder="e.g. Toyota"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="garage-model">Model</Label>
                <Input
                  id="garage-model"
                  value={form.model}
                  onChange={(event) =>
                    setForm({ ...form, model: event.target.value })
                  }
                  placeholder="e.g. Axio"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="garage-year">Year (optional)</Label>
                <Input
                  id="garage-year"
                  value={form.year}
                  onChange={(event) =>
                    setForm({ ...form, year: event.target.value })
                  }
                  placeholder="e.g. 2018"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="garage-color">Colour (optional)</Label>
                <Input
                  id="garage-color"
                  value={form.color}
                  onChange={(event) =>
                    setForm({ ...form, color: event.target.value })
                  }
                  placeholder="e.g. Silver"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
                <Label htmlFor="garage-notes">Notes (optional)</Label>
                <Input
                  id="garage-notes"
                  value={form.notes}
                  onChange={(event) =>
                    setForm({ ...form, notes: event.target.value })
                  }
                  placeholder="e.g. Mileage 82,000 km"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setAdding(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="size-4" aria-hidden="true" />
                {editingId ? 'Save changes' : 'Save vehicle'}
              </Button>
            </div>
          </form>
        ) : null}

        {vehicles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={CarFront}
              title="No vehicles yet"
              description="Add your vehicle to build its service passport — every rescue is attached automatically."
              action={
                <Button size="sm" onClick={() => setAdding(true)}>
                  <Plus className="size-4" aria-hidden="true" />
                  Add a vehicle
                </Button>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-5">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Vehicles · {vehicles.length}
              </p>
              {vehicles.map((vehicle) => {
                const history = requests.filter((request) =>
                  matchesVehicle(request, vehicle),
                )
                const active = vehicle.id === effectiveId
                const selected = active ? 'border-primary ring-primary/25' : ''
                return (
                  <div
                    key={vehicle.id}
                    className={cn(
                      'border-border bg-card rounded-xl border p-5 shadow-sm ring-1 ring-inset',
                      selected,
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(vehicle.id)}
                      className="flex w-full items-start gap-3 text-left"
                    >
                      <span
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-lg',
                          active
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-subtle text-foreground ring-border ring-1 ring-inset',
                        )}
                      >
                        <CarFront className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-foreground truncate text-sm font-semibold">
                          {[vehicle.make, vehicle.model]
                            .filter(Boolean)
                            .join(' ') ||
                            vehicle.registration ||
                            'Unnamed vehicle'}
                        </span>
                        <span className="text-muted-foreground truncate text-sm">
                          {vehicle.registration || 'No registration yet'}
                        </span>
                        <span className="text-muted-foreground inline-flex items-center gap-3 text-xs">
                          {vehicle.year ? (
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays
                                className="size-3"
                                aria-hidden="true"
                              />
                              {vehicle.year}
                            </span>
                          ) : null}
                          {history.length ? (
                            <span className="text-foreground inline-flex items-center gap-1 font-medium">
                              <History className="size-3" aria-hidden="true" />
                              {history.length} service
                              {history.length === 1 ? '' : 's'}
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </button>
                    <div className="mt-3 flex items-center justify-end gap-2 border-t pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(vehicle)}
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                        Edit
                      </Button>
                      <Button
                        variant={
                          armedDelete === vehicle.id ? 'destructive' : 'ghost'
                        }
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        {armedDelete === vehicle.id ? 'Confirm?' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="lg:col-span-7">
              {selected ? (
                <Passport
                  vehicle={selected}
                  history={selectedHistory}
                  completedCount={completedCount}
                  passportValid={passportValid}
                />
              ) : (
                <div className="border-border bg-card rounded-xl border p-10 text-center shadow-sm">
                  <p className="text-muted-foreground text-sm">
                    Select a vehicle to open its service passport.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function Passport({
  vehicle,
  history,
  completedCount,
  passportValid,
}: {
  vehicle: GarageVehicle
  history: RescueRequest[]
  completedCount: number
  passportValid: boolean
}) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
      <div className="from-success/10 relative px-6 pt-6 pb-5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="bg-success/15 text-success flex size-12 shrink-0 items-center justify-center rounded-xl">
            <FileCheck2 className="size-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
              <BadgeCheck
                className="text-success size-3.5"
                aria-hidden="true"
              />
              Service passport
            </p>
            <h2 className="text-foreground truncate text-xl font-semibold tracking-tight">
              {[vehicle.make, vehicle.model].filter(Boolean).join(' ') ||
                'Your vehicle'}
            </h2>
            <p className="text-muted-foreground truncate text-sm">
              {vehicle.registration || 'No registration'} ·{' '}
              {vehicle.year || 'Year unknown'}{' '}
              {vehicle.color ? `· ${vehicle.color}` : ''}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <div className="bg-card border-border flex flex-col items-center rounded-lg border px-4 py-2">
              <span className="text-foreground text-xl font-semibold">
                {history.length}
              </span>
              <span className="text-muted-foreground text-[11px]">
                Services
              </span>
            </div>
            <div className="bg-card border-border flex flex-col items-center rounded-lg border px-4 py-2">
              <span className="text-success text-xl font-semibold">
                {completedCount}
              </span>
              <span className="text-muted-foreground text-[11px]">
                Completed
              </span>
            </div>
          </div>
        </div>
        {vehicle.notes ? (
          <p className="text-muted-foreground mt-3 text-xs">{vehicle.notes}</p>
        ) : null}
      </div>

      <div className="border-t px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-foreground text-sm font-semibold">
            Service history
          </p>
          {passportValid ? (
            <span className="text-success text-xs font-medium">
              Passport verified from {history.length} record
              {history.length === 1 ? '' : 's'}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">
              No records yet
            </span>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-muted-foreground mt-3 rounded-lg border border-dashed px-4 py-6 text-center text-sm">
            No rescue history found for this vehicle yet. Request help and it
            will appear here automatically.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-2.5">
            {history.map((request) => {
              const config =
                SERVICE_REQUEST_STATUS_CONFIG[request.status] ??
                SERVICE_REQUEST_STATUS_CONFIG.CREATED
              const service = getServiceBySlug(request.serviceType)
              return (
                <div
                  key={request.id}
                  className="border-border bg-subtle flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="text-foreground text-sm font-semibold">
                      {service?.name ?? request.serviceType}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {formatDate(request.createdAt)} · {request.locationLabel}
                    </p>
                    {request.issue ? (
                      <p className="text-muted-foreground truncate text-xs">
                        {request.issue}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge tone={config.tone}>
                      {config.shortLabel}
                    </StatusBadge>
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/request/${request.id}`} />}
                    >
                      View
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
