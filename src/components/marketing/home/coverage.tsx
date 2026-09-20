import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const towns = [
  'Nairobi',
  'Thika',
  'Kiambu',
  'Machakos',
  'Nakuru',
  'Naivasha',
  'Eldoret',
  'Kisumu',
  'Mombasa',
  'Webuye',
  'Nanyuki',
  'Nyeri',
  'Embu',
  'Meru',
  'Kakamega',
]

export function HomeCoverage() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex max-w-xl flex-col gap-3 lg:col-span-5">
            <p className="text-primary text-sm font-medium">Coverage</p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Wherever the road takes you
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The nearest vetted technician is dispatched to your exact location
              — across 45+ towns and every major highway in Kenya. New towns are
              added every month.
            </p>
            <div className="mt-2">
              <Button variant="outline" render={<Link href="/request" />}>
                <MapPin className="size-4" aria-hidden="true" />
                Check availability
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2.5">
              {towns.map((town) => (
                <li
                  key={town}
                  className="border-border bg-card text-foreground hover:border-primary/40 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  <MapPin
                    className="text-primary size-3.5"
                    aria-hidden="true"
                  />
                  {town}
                </li>
              ))}
              <li className="text-muted-foreground inline-flex items-center rounded-full px-4 py-2 text-sm">
                + more rolling out…
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
