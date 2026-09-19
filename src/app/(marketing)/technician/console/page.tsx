import type { Metadata } from "next"
import { TechnicianConsole } from "@/features/technicians/components/technician-console"
import { demoTechnicians } from "@/features/technicians/data"

export const metadata: Metadata = {
  title: "Dispatch console",
  description:
    "Preview the open rescue queue and accept jobs as a demo Mashinika technician.",
}

type TechnicianConsolePageProps = {
  searchParams: Promise<{ tech?: string }>
}

export default async function TechnicianConsolePage({
  searchParams,
}: TechnicianConsolePageProps) {
  const { tech } = await searchParams
  const technicianId = tech ?? demoTechnicians[0]?.id ?? null
  return <TechnicianConsole technicianId={technicianId} />
}
