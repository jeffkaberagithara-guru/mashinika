import { HomeHero } from '@/components/marketing/home/hero'
import { HomeStats } from '@/components/marketing/home/stats'
import { HomeServices } from '@/components/marketing/home/services'
import { HomeHowItWorks } from '@/components/marketing/home/how-it-works'
import { HomeFeatures } from '@/components/marketing/home/features'
import { HomeCoverage } from '@/components/marketing/home/coverage'
import { HomeTestimonials } from '@/components/marketing/home/testimonials'
import { HomeCta } from '@/components/marketing/home/cta'
import { Reveal } from '@/components/marketing/reveal'

export default function Home() {
  return (
    <div className="flex-1">
      <main>
        <HomeHero />

        <Reveal>
          <HomeStats />
        </Reveal>

        <Reveal>
          <HomeServices />
        </Reveal>

        <Reveal>
          <HomeHowItWorks />
        </Reveal>

        <Reveal>
          <HomeFeatures />
        </Reveal>

        <Reveal>
          <HomeCoverage />
        </Reveal>

        <Reveal>
          <HomeTestimonials />
        </Reveal>

        <Reveal>
          <HomeCta />
        </Reveal>
      </main>
    </div>
  )
}
