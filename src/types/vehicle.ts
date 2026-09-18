import type { UserId } from "@/types/user"

export type VehicleId = string

export const VEHICLE_TYPES = [
  "MOTORCYCLE",
  "CAR",
  "SUV",
  "VAN",
  "PICKUP",
  "TRUCK",
  "MINI_TRUCK",
  "COMMUTER_MATATU",
] as const
export type VehicleType = (typeof VEHICLE_TYPES)[number]

export const FUEL_TYPES = [
  "PETROL",
  "DIESEL",
  "ELECTRIC",
  "HYBRID",
  "LPG",
] as const
export type FuelType = (typeof FUEL_TYPES)[number]

export interface Vehicle {
  id: VehicleId
  registration: string
  make: string
  model: string
  year: number
  type: VehicleType
  fuelType: FuelType
  isDefault: boolean
  userId: UserId
  createdAt: string
  updatedAt: string
}

export interface VehicleMilestone {
  id: string
  vehicleId: VehicleId
  serviceRequestId: string
  mileageKm: number
  recordedAt: string
}