import Link from 'next/link'
import Image from 'next/image'
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

          <div className="relative overflow-hidden rounded-2xl bg-slate-950 lg:col-span-7">
            <Image
              src="/media/nairobi-traffic.jpg"
              alt="Nairobi road network"
              width={1920}
              height={1280}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-[360px] w-full object-cover opacity-75 sm:h-[420px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="mb-3 text-xs font-medium tracking-[0.18em] text-orange-200 uppercase">
                Live coverage network
              </p>
              <ul className="flex flex-wrap gap-2">
                {towns.map((town) => (
                  <li
                    key={town}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition-colors hover:border-orange-300/70 hover:bg-white/20"
                  >
                    <MapPin
                      className="size-3.5 text-orange-300"
                      aria-hidden="true"
                    />
                    {town}
                  </li>
                ))}
                <li className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-white/65">
                  + more rolling out…
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
