import type { Metadata } from 'next'
import { TechnicianConsole } from '@/features/technicians/components/technician-console'
import { RequireRole } from '@/features/authentication/require-role'

export const metadata: Metadata = {
  title: 'Dispatch console',
  description:
    'Preview the open rescue queue and accept jobs as a demo Mashinika technician.',
}

type TechnicianConsolePageProps = {
  searchParams: Promise<{ tech?: string }>
}

export default async function TechnicianConsolePage({
  searchParams,
}: TechnicianConsolePageProps) {
  const { tech } = await searchParams
  return (
    <RequireRole allowed={['technician', 'dispatcher']}>
      <TechnicianConsole techParam={tech} />
    </RequireRole>
  )
}
