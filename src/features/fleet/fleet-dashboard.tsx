'use client'

import * as React from 'react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { CalendarClock, CarFront, Plus, Radar, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  useFleetStore,
  type FleetVehicleInput,
  type FleetVehicleRecord,
} from '@/features/fleet/store'
import { useRequestsStore } from '@/features/requests/store'
import type { RescueRequest } from '@/features/requests/store'
import { SERVICE_REQUEST_STATUS_CONFIG } from '@/features/roadside/status'
import { terminalStatuses } from '@/features/request/simulation'
import { getServiceBySlug } from '@/config/services'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function matchesFleet(
  request: RescueRequest,
  record: FleetVehicleRecord,
): boolean {
  const requestReg = normalize(request.vehicle.registration)
  return Boolean(requestReg && requestReg === normalize(record.registration))
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  })
}

function daysUntil(iso: string): number {
  return Math.round(
    (new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )
}

export function FleetDashboard() {
  const records = useFleetStore(
    useShallow((state) =>
      Object.values(state.records).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
      ),
    ),
  )
  const addRecord = useFleetStore((state) => state.addRecord)
  const removeRecord = useFleetStore((state) => state.removeRecord)

  const requests = useRequestsStore(
    useShallow((state) =>
      Object.values(state.requests).sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    ),
  )

  const [adding, setAdding] = React.useState(false)
  const [armedDelete, setArmedDelete] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FleetVehicleInput>({
    registration: '',
    make: '',
    model: '',
    driver: '',
    nextMaintenance: '',
  })

  const activity = requests.filter((request) =>
    records.some((record) => matchesFleet(request, record)),
  )
  const activeActivity = activity.filter(
    (request) => !terminalStatuses.includes(request.status),
  )
  const dueSoon = records.filter((record) => {
    if (!record.nextMaintenance) return false
    const days = daysUntil(record.nextMaintenance)
    return days >= 0 && days <= 14
  })

  function resetForm() {
    setForm({
      registration: '',
      make: '',
      model: '',
      driver: '',
      nextMaintenance: '',
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.registration.trim()) {
      toast.error('Registration is required for fleet tracking')
      return
    }
    addRecord({ ...form })
    toast.success(`${form.registration.toUpperCase()} added to the fleet.`)
    setAdding(false)
    resetForm()
  }

  function handleDelete(recordId: string) {
    if (armedDelete !== recordId) {
      setArmedDelete(recordId)
      window.setTimeout(() => {
        setArmedDelete((current) => (current === recordId ? null : current))
      }, 2600)
      return
    }
    setArmedDelete(null)
    removeRecord(recordId)
    toast.success('Vehicle removed from the fleet.')
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Fleet manager
          </h1>
          <p className="text-muted-foreground text-sm">
            Vehicles, maintenance and roadside response in one place.
          </p>
        </div>
        <Button size="sm" onClick={() => setAdding((value) => !value)}>
          <Plus className="size-4" aria-hidden="true" />
          {adding ? 'Close form' : 'Add a vehicle'}
        </Button>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
          <span className="bg-subtle text-foreground ring-border flex size-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
            <CarFront className="size-5" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <dd className="text-foreground text-2xl font-semibold tracking-tight">
              {records.length}
            </dd>
            <dt className="text-muted-foreground text-sm">Fleet vehicles</dt>
          </div>
        </div>
        <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
          <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
            <CalendarClock className="size-5" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <dd className="text-foreground text-2xl font-semibold tracking-tight">
              {dueSoon.length}
            </dd>
            <dt className="text-muted-foreground text-sm">
              Maintenance due in 14 days
            </dt>
          </div>
        </div>
        <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-5 shadow-sm">
          <span className="bg-danger/10 text-danger flex size-11 shrink-0 items-center justify-center rounded-lg">
            <Radar className="size-5 animate-pulse" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <dd className="text-foreground text-2xl font-semibold tracking-tight">
              {activeActivity.length}
            </dd>
            <dt className="text-muted-foreground text-sm">
              Active roadside incidents
            </dt>
          </div>
        </div>
      </dl>

      {adding ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="border-border bg-card mt-8 rounded-xl border p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-foreground text-base font-semibold">
              Add a fleet vehicle
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

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fleet-registration">Registration *</Label>
              <Input
                id="fleet-registration"
                value={form.registration}
                onChange={(event) =>
                  setForm({ ...form, registration: event.target.value })
                }
                placeholder="e.g. KBX 201T"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fleet-make">Make</Label>
              <Input
                id="fleet-make"
                value={form.make}
                onChange={(event) =>
                  setForm({ ...form, make: event.target.value })
                }
                placeholder="e.g. Toyota"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fleet-model">Model</Label>
              <Input
                id="fleet-model"
                value={form.model}
                onChange={(event) =>
                  setForm({ ...form, model: event.target.value })
                }
                placeholder="e.g. Hiace"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fleet-driver">Driver (optional)</Label>
              <Input
                id="fleet-driver"
                value={form.driver}
                onChange={(event) =>
                  setForm({ ...form, driver: event.target.value })
                }
                placeholder="e.g. Brian Otieno"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fleet-maintenance">
                Next maintenance (optional)
              </Label>
              <Input
                id="fleet-maintenance"
                type="date"
                value={form.nextMaintenance}
                onChange={(event) =>
                  setForm({ ...form, nextMaintenance: event.target.value })
                }
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
              <Plus className="size-4" aria-hidden="true" />
              Add to fleet
            </Button>
          </div>
        </form>
      ) : null}

      {records.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={CarFront}
            title="No fleet vehicles yet"
            description="Add your vehicles to track maintenance schedules and see their roadside incidents here."
            action={
              <Button size="sm" onClick={() => setAdding(true)}>
                <Plus className="size-4" aria-hidden="true" />
                Add a vehicle
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-7">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Fleet vehicles · {records.length}
            </p>
            <div className="flex flex-col gap-3">
              {records.map((record) => {
                const maintenanceDays = record.nextMaintenance
                  ? daysUntil(record.nextMaintenance)
                  : null
                const imminent =
                  maintenanceDays !== null &&
                  maintenanceDays >= 0 &&
                  maintenanceDays <= 14
                const overdue = maintenanceDays !== null && maintenanceDays < 0
                return (
                  <div
                    key={record.id}
                    className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                        <CarFront className="size-5" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-foreground truncate text-sm font-semibold">
                          {[record.make, record.model]
                            .filter(Boolean)
                            .join(' ') || 'Vehicle'}{' '}
                          · {record.registration.toUpperCase()}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {record.driver
                            ? `Assigned: ${record.driver}`
                            : 'No driver assigned'}
                        </p>
                        <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                          <CalendarClock
                            className="size-3"
                            aria-hidden="true"
                          />
                          {record.nextMaintenance ? (
                            overdue ? (
                              <span className="text-danger font-medium">
                                Maintenance overdue
                              </span>
                            ) : (
                              <>
                                Next maintenance{' '}
                                {formatDate(record.nextMaintenance)}
                                {imminent ? (
                                  <span className="text-destructive font-medium">
                                    · due in {maintenanceDays}d
                                  </span>
                                ) : null}
                              </>
                            )
                          ) : (
                            'No maintenance schedule set'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        variant={
                          armedDelete === record.id ? 'destructive' : 'ghost'
                        }
                        size="sm"
                        onClick={() => handleDelete(record.id)}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        {armedDelete === record.id ? 'Confirm?' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Roadside activity · {activeActivity.length} active
            </p>
            {activity.length === 0 ? (
              <div className="border-border bg-card rounded-xl border p-6 text-center shadow-sm">
                <p className="text-muted-foreground text-sm">
                  Rescues on fleet vehicles appear here in real time.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {activity.map((request) => {
                  const config =
                    SERVICE_REQUEST_STATUS_CONFIG[request.status] ??
                    SERVICE_REQUEST_STATUS_CONFIG.CREATED
                  const service = getServiceBySlug(request.serviceType)
                  return (
                    <div
                      key={request.id}
                      className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-foreground truncate text-sm font-semibold">
                          {service?.name ?? request.serviceType}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {request.vehicle.registration || 'Vehicle'} ·{' '}
                          {request.locationLabel}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge tone={config.tone} pulse>
                          {config.shortLabel}
                        </StatusBadge>
                        <Button
                          variant="outline"
                          size="sm"
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
        </div>
      )}
    </div>
  )
}
