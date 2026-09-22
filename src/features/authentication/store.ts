'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const SESSION_ROLE_LABELS = {
  customer: 'Customer',
  technician: 'Technician',
  dispatcher: 'Dispatcher',
  fleet: 'Fleet manager',
  student: 'Student',
} as const

export type SessionRole = keyof typeof SESSION_ROLE_LABELS

export const SESSION_HOMES: Record<SessionRole, string> = {
  customer: '/customer',
  technician: '/technician/console',
  dispatcher: '/admin',
  fleet: '/fleet',
  student: '/academy',
}

export type SessionUser = {
  id: string
  role: SessionRole
  name: string
  phone: string
  technicianId: string | null
  signedInAt: string
}

export type SessionStore = {
  user: SessionUser | null
  signIn: (input: {
    role: SessionRole
    name: string
    phone: string
    technicianId?: string | null
  }) => void
  setTechnician: (technicianId: string) => void
  signOut: () => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      signIn: ({ role, name, phone, technicianId }) =>
        set({
          user: {
            id: `user-${crypto.randomUUID()}`,
            role,
            name: name.trim() || SESSION_ROLE_LABELS[role],
            phone: phone.trim(),
            technicianId: technicianId ?? null,
            signedInAt: new Date().toISOString(),
          },
        }),
      setTechnician: (technicianId) =>
        set((state) =>
          state.user
            ? { user: { ...state.user, technicianId } }
            : state,
        ),
      signOut: () => set({ user: null }),
    }),
    { name: 'mashinika:session' },
  ),
)

export function sessionHome(role: SessionRole): string {
  return SESSION_HOMES[role]
}