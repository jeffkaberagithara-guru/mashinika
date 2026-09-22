import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/features/marketplace/listing-detail'
import { getListing, demoListings } from '@/features/marketplace/listings'
import { siteConfig } from '@/config/site'

type PageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return demoListings.map((listing) => ({ id: listing.id }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const listing = getListing(id)
  if (!listing) return { title: 'Listing not found' }
  return {
    title: `${listing.make} ${listing.model} · ${listing.year}`,
    description: `${listing.description} ${listing.price.toLocaleString('en-KE')} KSh · ${listing.location}.`,
    alternates: {
      canonical: `/buy/${listing.id}`,
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params
  const listing = getListing(id)
  if (!listing) notFound()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Vehicle',
            brand: listing.make,
            model: listing.model,
            vehicleModelDate: listing.year,
            mileageFromOdometer: {
              '@type': 'QuantitativeValue',
              value: listing.mileage,
              unitCode: 'KMT',
            },
            name: `${listing.make} ${listing.model}`,
            vehicleConfiguration: `${listing.fuel}, ${listing.transmission}`,
            url: `${siteConfig.url}/buy/${listing.id}`,
          }),
        }}
      />
      <ListingDetail listing={listing} />
    </div>
  )
}
