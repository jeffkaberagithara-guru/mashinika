'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type InspectionPackage = 'basic' | 'standard' | 'premium'

export type InspectionReport = {
  id: string
  package: InspectionPackage
  vehicleLabel: string
  registration: string
  location: string
  inspectedAt: string
  overall: number
  verdict: string
  checklist: {
    label: string
    score: number
    note: string
  }[]
}

export type InspectionBookingInput = {
  package: InspectionPackage
  vehicleLabel: string
  registration: string
  location: string
  notes: string
}

type InspectionsStore = {
  reports: InspectionReport[]
  bookInspection: (input: InspectionBookingInput) => InspectionReport
  removeReport: (id: string) => void
}

export const INSPECTION_PACKAGES: Record<
  InspectionPackage,
  { label: string; price: number; blurb: string }
> = {
  basic: {
    label: 'Basic',
    price: 4500,
    blurb: 'Visual check, OBD fault scan and test drive notes.',
  },
  standard: {
    label: 'Standard',
    price: 7500,
    blurb: 'Everything in Basic plus a foot-by-foot paint check.',
  },
  premium: {
    label: 'Premium',
    price: 12000,
    blurb: 'Standard plus compression test and scan-tool deep read.',
  },
}

function makeChecklist(pkg: InspectionPackage): InspectionReport['checklist'] {
  const items: InspectionReport['checklist'] = [
    {
      label: 'Exterior & body panels',
      score: 4,
      note: 'Even panel gaps, no accident repair detected on scanned areas.',
    },
    {
      label: 'Interior & electronics',
      score: 4,
      note: 'All switchgear, AC and central locking work as expected.',
    },
    {
      label: 'Engine bay & fluids',
      score: 4,
      note: 'Clean bay, no fluid leaks, timing service up to date.',
    },
    {
      label: 'Drivetrain & suspension',
      score: 3,
      note: 'Front bushes showing light wear — budget replacement later.',
    },
    {
      label: 'Tyres & brakes',
      score: 4,
      note: 'Tread above 4 mm on all corners, pads at 60%.',
    },
    {
      label: 'Undercarriage & corrosion',
      score: 4,
      note: 'Surface rust only on exhaust shielding.',
    },
  ]
  if (pkg !== 'basic') {
    items.push({
      label: 'Paint gauge readings',
      score: 4,
      note: 'No resprayed panels beyond a rear bumper touch-up.',
    })
  }
  if (pkg === 'premium') {
    items.push({
      label: 'Compression & cylinder balance',
      score: 5,
      note: 'Within 4% across cylinders, cold start is instant.',
    })
  }
  return items
}

export const useInspectionsStore = create<InspectionsStore>()(
  persist(
    (set) => ({
      reports: [],
      bookInspection: (input: InspectionBookingInput) => {
        const report: InspectionReport = {
          id: `inspect-${crypto.randomUUID()}`,
          package: input.package,
          vehicleLabel: input.vehicleLabel,
          registration: input.registration,
          location: input.location,
          inspectedAt: new Date().toISOString(),
          overall: 4,
          verdict:
            'Roadworthy with minor advisories — no structural or safety-critical findings.',
          checklist: makeChecklist(input.package),
        }
        set((state) => ({ reports: [report, ...state.reports] }))
        return report
      },
      removeReport: (id) =>
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== id),
        })),
    }),
    { name: 'mashinika:inspections' },
  ),
)

export function getReport(reports: InspectionReport[], id: string | undefined) {
  if (!id) return undefined
  return reports.find((report) => report.id === id)
}
