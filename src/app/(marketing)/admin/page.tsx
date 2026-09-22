import type { Metadata } from 'next'
import { AdminConsole } from '@/features/admin/admin-console'
import { RequireRole } from '@/features/authentication/require-role'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Admin console',
  description:
    'Platform overview — dispatch, revenue and live requests for Mashinika.',
  alternates: {
    canonical: '/admin',
  },
}

export default function AdminPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Mashinika Admin console',
            description:
              'Internal operations console for the Mashinika rescue and roadside platform.',
            url: `${siteConfig.url}/admin`,
          }),
        }}
      />
      <RequireRole allowed={['dispatcher']}>
        <AdminConsole />
      </RequireRole>
    </>
  )
}
