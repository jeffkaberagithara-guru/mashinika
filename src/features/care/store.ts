'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CareServiceKind = 'maintenance' | 'repair' | 'detailing'

export type CareBookingStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED'

export type CareBooking = {
  id: string
  kind: CareServiceKind
  vehicleLabel: string
  registration: string
  locationLabel: string
  date: string
  timeSlot: string
  phone: string
  notes: string
  status: CareBookingStatus
  createdAt: string
}

export type CareBookingInput = Omit<CareBooking, 'id' | 'status' | 'createdAt'>

type CareStore = {
  bookings: CareBooking[]
  bookCare: (input: CareBookingInput) => CareBooking
  setBookingStatus: (id: string, status: CareBookingStatus) => void
}

export const CARE_SERVICE_KINDS: Record<
  CareServiceKind,
  { label: string; blurb: string; price: string }
> = {
  maintenance: {
    label: 'Maintenance service',
    blurb: 'Oil, filters, fluids and a 41-point safety check.',
    price: 'from KSh 4,500',
  },
  repair: {
    label: 'Repair & diagnostics',
    blurb: 'A technician inspects first, then quotes before work.',
    price: 'quoted on diagnosis',
  },
  detailing: {
    label: 'Detailing & valet',
    blurb: 'Exterior polish, interior deep-clean and dressing.',
    price: 'from KSh 8,000',
  },
}

export const CARE_TIME_SLOTS = [
  '08:00–10:00',
  '10:00–12:00',
  '12:00–15:00',
  '15:00–18:00',
]

export const useCareStore = create<CareStore>()(
  persist(
    (set) => ({
      bookings: [],
      bookCare: (input: CareBookingInput) => {
        const booking: CareBooking = {
          ...input,
          id: `care-${crypto.randomUUID()}`,
          status: 'UPCOMING',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ bookings: [booking, ...state.bookings] }))
        return booking
      },
      setBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status } : booking,
          ),
        })),
    }),
    { name: 'mashinika:care' },
  ),
)
