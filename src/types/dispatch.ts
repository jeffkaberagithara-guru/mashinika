import type { GeoPoint } from "@/types/location"
import type { TechnicianId, TechnicianSpecialty } from "@/types/technician"
import type { ServiceRequestId } from "@/types/service-request"

export type DispatchOfferId = string

export const DISPATCH_OFFER_STATUSES = [
  "PENDING",
  "SENT",
  "ACCEPTED",
  "DECLINED",
  "EXPIRED",
  "REVOKED",
] as const
export type DispatchOfferStatus = (typeof DISPATCH_OFFER_STATUSES)[number]

export interface DispatchOffer {
  id: DispatchOfferId
  serviceRequestId: ServiceRequestId
  technicianId: TechnicianId
  status: DispatchOfferStatus
  /** Where the technician is when the offer is generated. */
  origin: GeoPoint
  /** Drive distance from origin to the customer's location (km). */
  etaMinutes: number
  price: number
  /** True when the customer accepted an out-of-pocket quote. */
  customerApproved: boolean
  expiresAt: string
  createdAt: string
}

/** Build a printable name for a specialty, e.g. "Roadside assistance". */
export function specialtyLabel(specialty: TechnicianSpecialty): string {
  const labels: Record<TechnicianSpecialty, string> = {
    ROADSIDE: "Roadside assistance",
    MECHANICAL: "Mechanical repair",
    ELECTRICAL: "Electrical",
    DIAGNOSTICS: "Vehicle diagnostics",
    TOWING: "Towing",
    TYRES: "Tyres & wheels",
    BATTERIES: "Batteries",
    FUEL: "Fuel delivery",
  }
  return labels[specialty]
}