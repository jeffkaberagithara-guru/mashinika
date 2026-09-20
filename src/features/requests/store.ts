'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ServiceRequestStatus } from '@/types/service-request'

/** Kept loose: maps onto the `service_type` enum values in the DB. */
export type RescueVehicle = {
  make: string
  model: string
  registration: string
}

export type RescueRequest = {
  id: string
  serviceType: string
  status: ServiceRequestStatus
  priority: 'NORMAL' | 'URGENT'
  name: string
  phone: string
  vehicle: RescueVehicle
  locationLabel: string
  issue: string
  technicianId: string | null
  createdAt: string
  updatedAt: string
}

export type RescueRequestInput = {
  serviceType: string
  name: string
  phone: string
  vehicle: RescueVehicle
  locationLabel: string
  issue: string
  priority?: 'NORMAL' | 'URGENT'
}

type RequestsStore = {
  requests: Record<string, RescueRequest>
  createRequest: (input: RescueRequestInput) => RescueRequest
  acceptRequest: (id: string, technicianId: string) => void
  updateStatus: (id: string, status: ServiceRequestStatus) => void
  removeRequest: (id: string) => void
}

export const useRequestsStore = create<RequestsStore>()(
  persist(
    (set) => ({
      requests: {},
      createRequest: (input) => {
        const id = crypto.randomUUID()
        const now = new Date().toISOString()
        const request: RescueRequest = {
          id,
          ...input,
          serviceType: input.serviceType,
          priority: input.priority ?? 'NORMAL',
          status: 'CREATED',
          technicianId: null,
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ requests: { ...state.requests, [id]: request } }))
        return request
      },
      acceptRequest: (id, technicianId) =>
        set((state) => {
          const request = state.requests[id]
          if (!request) return state
          if (request.status !== 'SEARCHING_FOR_TECHNICIAN') return state
          return {
            requests: {
              ...state.requests,
              [id]: {
                ...request,
                status: 'TECHNICIAN_ASSIGNED',
                technicianId,
                updatedAt: new Date().toISOString(),
              },
            },
          }
        }),
      updateStatus: (id, status) =>
        set((state) => {
          const request = state.requests[id]
          if (!request) return state
          return {
            requests: {
              ...state.requests,
              [id]: { ...request, status, updatedAt: new Date().toISOString() },
            },
          }
        }),
      removeRequest: (id) =>
        set((state) => {
          const rest: Record<string, RescueRequest> = {}
          for (const key of Object.keys(state.requests)) {
            if (key !== id) rest[key] = state.requests[key]
          }
          return { requests: rest }
        }),
    }),
    { name: 'mashinika:requests' },
  ),
)

export function listRequests(): RescueRequest[] {
  return Object.values(useRequestsStore.getState().requests).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
}

export function getRequest(id: string): RescueRequest | undefined {
  return useRequestsStore.getState().requests[id]
}
