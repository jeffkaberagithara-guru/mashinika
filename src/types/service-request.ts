import type { GeoPoint } from '@/types/location'
import type { UserId } from '@/types/user'
import type { VehicleId } from '@/types/vehicle'

export type ServiceRequestId = string

export const SERVICE_REQUEST_STATUSES = [
  'CREATED',
  'LOCATION_CONFIRMED',
  'SEARCHING_FOR_TECHNICIAN',
  'TECHNICIAN_ASSIGNED',
  'TECHNICIAN_EN_ROUTE',
  'TECHNICIAN_ARRIVED',
  'DIAGNOSING',
  'REPAIRING',
  'TOW_REQUIRED',
  'TOWING',
  'COMPLETED',
  'CANCELLED',
] as const
export type ServiceRequestStatus = (typeof SERVICE_REQUEST_STATUSES)[number]

export const SERVICE_TYPES = [
  'ROADSIDE',
  'DIAGNOSTICS',
  'TOWING',
  'INSPECTION',
] as const
export type ServiceType = (typeof SERVICE_TYPES)[number]

export interface ServiceRequest {
  id: ServiceRequestId
  customerId: UserId
  type: ServiceType
  status: ServiceRequestStatus
  vehicleId: VehicleId | null
  technicianId: UserId | null
  location: GeoPoint
  issue: string | null
  priority: 'NORMAL' | 'URGENT'
  createdAt: string
  updatedAt: string
}

export interface ServiceRequestEvent {
  id: string
  serviceRequestId: ServiceRequestId
  status: ServiceRequestStatus
  note: string | null
  createdAt: string
}
