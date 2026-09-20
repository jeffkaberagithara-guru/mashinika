'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Car, History, Plus, Radar, Trash2 } from 'lucide-react'
import { useRequestsStore, listRequests } from '@/features/requests/store'
import { SERVICE_REQUEST_STATUS_CONFIG } from '@/features/roadside/status'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { getServiceBySlug } from '@/config/services'

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
  const requests = useRequestsStore(listRequests)
  const createRequest = useRequestsStore((state) => state.createRequest)
  const removeRequest = useRequestsStore((state) => state.removeRequest)

  function handleDemo() {
    const request = createRequest({
      serviceType: 'roadside',
      name: 'Demo Driver',
      phone: '0712 345 678',
      vehicle: { make: 'Toyota', model: 'Axio', registration: 'KDE 493M' },
      locationLabel: 'Thika Road Mall, ground floor parking',
      issue: 'Battery dead after parking for an hour.',
    })
    router.push(`/request/${request.id}`)
  }

  return (
    <div className="flex-1">
      <section className="mx-auto w-full max-w-5xl px-4 pt-14 pb-20 sm:px-6 lg:px-8 lg:pt-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            My rescues
          </h1>
          <p className="text-muted-foreground text-sm">
            Track every rescue request, past and present.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {requests.length === 0 ? (
            <EmptyState
              icon={History}
              title="No rescue requests yet"
              description="When you request help, your rescue shows up here with live status tracking."
              action={
                <Button size="sm" render={<Link href="/request" />}>
                  <Plus className="size-4" aria-hidden="true" />
                  Request help
                </Button>
              }
            />
          ) : (
            requests.map((request) => {
              const config =
                SERVICE_REQUEST_STATUS_CONFIG[request.status] ??
                SERVICE_REQUEST_STATUS_CONFIG.CREATED
              const service = getServiceBySlug(request.serviceType)
              const done = request.status === 'COMPLETED'
              return (
                <div
                  key={request.id}
                  className="border-border bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={
                        done
                          ? 'bg-success/10 text-success flex size-10 shrink-0 items-center justify-center rounded-lg'
                          : 'bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset'
                      }
                    >
                      {done ? (
                        <Car className="size-5" aria-hidden="true" />
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

                  <div className="flex items-center gap-2">
                    <StatusBadge tone={config.tone} pulse={!done}>
                      {config.shortLabel}
                    </StatusBadge>
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/request/${request.id}`} />}
                    >
                      {done ? 'View' : 'Track'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete request ${request.id.slice(0, 8)}`}
                      onClick={() => removeRequest(request.id)}
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              )
            })
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
      </section>
    </div>
  )
}
