'use client'

import * as React from 'react'
import { CheckCircle2, Wallet } from 'lucide-react'
import { useRequestsStore } from '@/features/requests/store'
import { getServiceBySlug } from '@/config/services'
import { formatKsh } from '@/features/request/simulation'
import { EmptyState } from '@/components/ui/empty-state'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function PaymentsLedger() {
  const requests = useRequestsStore((state) => state.requests)

  const payments = React.useMemo(
    () =>
      Object.values(requests)
        .filter((request) =>
          Boolean(request.quoteAmount && request.quoteApprovedAt),
        )
        .sort((a, b) =>
          (b.quoteApprovedAt ?? '').localeCompare(a.quoteApprovedAt ?? ''),
        ),
    [requests],
  )

  const total = payments.reduce(
    (sum, request) => sum + (request.quoteAmount ?? 0),
    0,
  )

  if (payments.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No payments yet"
        description="Approved quotes appear here. Start a rescue and approve the diagnosed quote to see your payment history."
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Payments · {payments.length}
        </p>
        <p className="text-foreground text-xl font-semibold tracking-tight">
          {formatKsh(total)} paid across your rescues
        </p>
      </div>
      {payments.map((request) => {
        const service = getServiceBySlug(request.serviceType)
        return (
          <div
            key={request.id}
            className="border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="bg-success/10 text-success flex size-10 shrink-0 items-center justify-center rounded-lg">
                <CheckCircle2 className="size-5" aria-hidden="true" />
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
                  · {formatDate(request.quoteApprovedAt ?? request.createdAt)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {request.quotePaymentMethod ?? 'M-Pesa'} · quote approved
                  before work started
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="bg-success/10 text-success rounded-full px-2.5 py-0.5 text-xs font-medium">
                PAID
              </span>
              <span className="text-foreground text-base font-semibold">
                {formatKsh(request.quoteAmount ?? 0)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
