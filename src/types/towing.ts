import type { GeoPoint } from '@/types/location'
import type { ServiceRequestId } from '@/types/service-request'
import type { TechnicianId } from '@/types/technician'
import type { UserId } from '@/types/user'

export type TowingRequestId = string

export const TOWING_REQUEST_STATUSES = [
  'CREATED',
  'TECHNICIAN_ASSIGNED',
  'EN_ROUTE',
  'ARRIVED',
  'LOADING',
  'TOWING',
  'DELIVERED',
  'CANCELLED',
] as const
export type TowingRequestStatus = (typeof TOWING_REQUEST_STATUSES)[number]

export const TOWING_VEHICLE_TYPES = [
  'FLATBED',
  'WHEEL_LIFT',
  'HOOK_CHAIN',
  'HEAVY_DUTY',
] as const
export type TowingVehicleType = (typeof TOWING_VEHICLE_TYPES)[number]

export interface TowingRequest {
  id: TowingRequestId
  customerId: UserId
  serviceRequestId: ServiceRequestId
  technicianId: TechnicianId | null
  pickup: GeoPoint
  dropoff: GeoPoint
  distanceKm: number
  /** The class of rig best suited to the stranded vehicle. */
  requiredVehicleType: TowingVehicleType
  serviceableVehicles: TowingVehicleType[]
  estimatedPrice: number
  status: TowingRequestStatus
  createdAt: string
  updatedAt: string
}

export interface TowingEstimate {
  base: number
  perKm: number
  distanceKm: number
  total: number
}
