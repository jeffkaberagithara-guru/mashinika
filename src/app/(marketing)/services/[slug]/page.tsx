import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceLanding } from '@/components/marketing/service-landing'
import { getServiceBySlug, services } from '@/config/services'
import { siteConfig } from '@/config/site'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service not found',
      description: 'The service you are looking for does not exist.',
    }
  }

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      type: 'website',
      locale: 'en_KE',
      siteName: siteConfig.name,
      title: `${service.name} | ${siteConfig.name}`,
      description: service.description,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const related = services
    .filter((candidate) => candidate.slug !== service.slug)
    .slice(0, 3)

  return <ServiceLanding service={service} related={related} />
}
