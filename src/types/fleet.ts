import type { UserId } from '@/types/user'
import type { VehicleId } from '@/types/vehicle'

export type FleetId = string
export type FleetVehicleId = string
export type FleetMemberId = string
export type MaintenanceScheduleId = string

export const FLEET_SERVICE_CATEGORIES = [
  'OWNED',
  'LEASED',
  'CONTRACTED',
] as const
export type FleetServiceCategory = (typeof FLEET_SERVICE_CATEGORIES)[number]

export const MAINTENANCE_SCHEDULE_INTERVALS = [
  'WEEKLY',
  'EVERY_5000_KM',
  'EVERY_10000_KM',
  'MONTHLY',
  'QUARTERLY',
  'YEARLY',
] as const
export type MaintenanceScheduleInterval =
  (typeof MAINTENANCE_SCHEDULE_INTERVALS)[number]

export interface Fleet {
  id: FleetId
  name: string
  ownerId: UserId
  createdAt: string
}

export interface FleetVehicle {
  id: FleetVehicleId
  fleetId: FleetId
  vehicleId: VehicleId
  category: FleetServiceCategory
  assignedDriverId: UserId | null
  createdAt: string
}

export interface FleetMember {
  id: FleetMemberId
  fleetId: FleetId
  userId: UserId
  role: 'ADMIN' | 'DRIVER' | 'MAINTENANCE'
  createdAt: string
}

export interface MaintenanceSchedule {
  id: MaintenanceScheduleId
  vehicleId: VehicleId
  interval: MaintenanceScheduleInterval
  lastMaintenanceAt: string | null
  nextDueAt: string | null
  notes: string | null
  createdAt: string
}
