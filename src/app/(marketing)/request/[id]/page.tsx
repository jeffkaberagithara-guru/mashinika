import type { Metadata } from 'next'
import { TrackingView } from '@/features/request/components/tracking-view'

type RequestTrackingPageProps = {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Track your rescue',
  description: 'Live status of your Mashinika rescue request.',
}

export default async function RequestTrackingPage({
  params,
}: RequestTrackingPageProps) {
  const { id } = await params
  return <TrackingView requestId={id} />
}
