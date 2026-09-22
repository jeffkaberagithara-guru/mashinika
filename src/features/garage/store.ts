'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type GarageVehicle = {
  id: string
  registration: string
  make: string
  model: string
  year?: string
  color?: string
  notes?: string
  createdAt: string
}

export type GarageVehicleInput = {
  registration: string
  make: string
  model: string
  year?: string
  color?: string
  notes?: string
}

type GarageStore = {
  vehicles: Record<string, GarageVehicle>
  addVehicle: (input: GarageVehicleInput) => GarageVehicle
  updateVehicle: (id: string, input: GarageVehicleInput) => void
  removeVehicle: (id: string) => void
}

export const useGarageStore = create<GarageStore>()(
  persist(
    (set) => ({
      vehicles: {},
      addVehicle: (input) => {
        const id = crypto.randomUUID()
        const vehicle: GarageVehicle = {
          id,
          ...input,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ vehicles: { ...state.vehicles, [id]: vehicle } }))
        return vehicle
      },
      updateVehicle: (id, input) =>
        set((state) => {
          const vehicle = state.vehicles[id]
          if (!vehicle) return state
          return {
            vehicles: { ...state.vehicles, [id]: { ...vehicle, ...input } },
          }
        }),
      removeVehicle: (id) =>
        set((state) => {
          const rest: Record<string, GarageVehicle> = {}
          for (const key of Object.keys(state.vehicles)) {
            if (key !== id) rest[key] = state.vehicles[key]
          }
          return { vehicles: rest }
        }),
    }),
    { name: 'mashinika:garage' },
  ),
)

export function listGarageVehicles(): GarageVehicle[] {
  return Object.values(useGarageStore.getState().vehicles).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  )
}

export function getGarageVehicle(id: string): GarageVehicle | undefined {
  return useGarageStore.getState().vehicles[id]
}
