'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FleetVehicleRecord = {
  id: string
  registration: string
  make: string
  model: string
  driver?: string
  nextMaintenance?: string
  createdAt: string
}

export type FleetVehicleInput = {
  registration: string
  make: string
  model: string
  driver?: string
  nextMaintenance?: string
}

type FleetStore = {
  records: Record<string, FleetVehicleRecord>
  addRecord: (input: FleetVehicleInput) => FleetVehicleRecord
  removeRecord: (id: string) => void
}

export const useFleetStore = create<FleetStore>()(
  persist(
    (set) => ({
      records: {},
      addRecord: (input) => {
        const id = crypto.randomUUID()
        const record: FleetVehicleRecord = {
          id,
          ...input,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ records: { ...state.records, [id]: record } }))
        return record
      },
      removeRecord: (id) =>
        set((state) => {
          const rest: Record<string, FleetVehicleRecord> = {}
          for (const key of Object.keys(state.records)) {
            if (key !== id) rest[key] = state.records[key]
          }
          return { records: rest }
        }),
    }),
    { name: 'mashinika:fleet' },
  ),
)

export function listFleetRecords(): FleetVehicleRecord[] {
  return Object.values(useFleetStore.getState().records).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  )
}
