import type { DispatchOffer } from "@/types/dispatch"
import type { GeoPoint } from "@/types/location"
import type { ServiceRequestId } from "@/types/service-request"
import type { UserId } from "@/types/user"
import type { VehicleId, VehicleType } from "@/types/vehicle"

export type TechnicianId = UserId

export const TECHNICIAN_SPECIALTIES = [
  "ROADSIDE",
  "MECHANICAL",
  "ELECTRICAL",
  "DIAGNOSTICS",
  "TOWING",
  "TYRES",
  "BATTERIES",
  "FUEL",
] as const
export type TechnicianSpecialty = (typeof TECHNICIAN_SPECIALTIES)[number]

export const TECHNICIAN_STATUSES = ["AVAILABLE", "BUSY", "OFFLINE"] as const
export type TechnicianStatus = (typeof TECHNICIAN_STATUSES)[number]

export interface Technician {
  id: TechnicianId
  userId: UserId
  status: TechnicianStatus
  specialties: TechnicianSpecialty[]
  currentLocation: GeoPoint | null
  rating: number
  completedJobs: number
  verifiedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface TechnicianOffer extends DispatchOffer {
  /** Vehicles this technician's rig can serve directly. */
  serviceableVehicles: VehicleType[]
}