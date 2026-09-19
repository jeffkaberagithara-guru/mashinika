import type { ServiceRequestStatus } from "@/types/service-request"

/**
 * A demo dispatch timeline. Without a live backend this walks a request
 * through the service-request lifecycle so the tracking UI can be exercised.
 * Replace with real dispatch (technician acceptance + status events) when the
 * Supabase backend is wired up.
 */
const standardSequence: ServiceRequestStatus[] = [
  "CREATED",
  "LOCATION_CONFIRMED",
  "SEARCHING_FOR_TECHNICIAN",
  "TECHNICIAN_ASSIGNED",
  "TECHNICIAN_EN_ROUTE",
  "TECHNICIAN_ARRIVED",
  "DIAGNOSING",
  "REPAIRING",
  "COMPLETED",
]

const towingSequence: ServiceRequestStatus[] = [
  "CREATED",
  "LOCATION_CONFIRMED",
  "SEARCHING_FOR_TECHNICIAN",
  "TECHNICIAN_ASSIGNED",
  "TECHNICIAN_EN_ROUTE",
  "TECHNICIAN_ARRIVED",
  "DIAGNOSING",
  "TOW_REQUIRED",
  "TOWING",
  "COMPLETED",
]

export const terminalStatuses: ServiceRequestStatus[] = ["COMPLETED", "CANCELLED"]

export function statusSequence(serviceType: string): ServiceRequestStatus[] {
  return serviceType === "towing" ? towingSequence : standardSequence
}

export function nextStatus(
  current: ServiceRequestStatus,
  serviceType: string,
): ServiceRequestStatus | null {
  // Dispatch pauses here: the request stays open for a technician to accept
  // from the console. `acceptRequest` moves it on to TECHNICIAN_ASSIGNED.
  if (current === "SEARCHING_FOR_TECHNICIAN") return null
  const sequence = statusSequence(serviceType)
  const index = sequence.indexOf(current)
  if (index === -1) return null
  return sequence[index + 1] ?? null
}

/** Rough ETA used by the demo dispatch. */
export function etaMinutesFor(serviceType: string): number {
  switch (serviceType) {
    case "towing":
      return 25
    case "diagnostics":
      return 35
    case "care":
      return 45
    default:
      return 12
  }
}

/** How long the demo spends on each non-terminal status, in milliseconds. */
export const SIMULATION_STEP_MS = 5000