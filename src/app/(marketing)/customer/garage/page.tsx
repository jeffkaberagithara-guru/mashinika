import type { Metadata } from 'next'
import { GarageDashboard } from '@/features/garage/garage-dashboard'

export const metadata: Metadata = {
  title: 'My garage',
  description:
    'Save your vehicles and open each one’s service passport — every rescue attaches to the vehicle automatically.',
}

export default function GaragePage() {
  return <GarageDashboard />
}
