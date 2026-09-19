export type DemoTechnician = {
  id: string
  name: string
  specialty: string
  rating: number
  jobs: number
}

/** Placeholder roster until real technician profiles exist in the DB. */
export const demoTechnicians: DemoTechnician[] = [
  {
    id: "tech-brian",
    name: "Brian Otieno",
    specialty: "Roadside & diagnostics",
    rating: 4.9,
    jobs: 1324,
  },
  {
    id: "tech-faith",
    name: "Faith Njeri",
    specialty: "Mechanical repairs",
    rating: 4.8,
    jobs: 987,
  },
  {
    id: "tech-kevin",
    name: "Kevin Mwangi",
    specialty: "Towing & recovery",
    rating: 4.7,
    jobs: 741,
  },
]

export function getTechnician(id: string | null | undefined) {
  if (!id) return undefined
  return demoTechnicians.find((technician) => technician.id === id)
}