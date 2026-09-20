import Link from 'next/link'
import { ChevronRight, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HomeCta() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="from-primary to-primary-hover relative overflow-hidden rounded-2xl bg-gradient-to-br px-6 py-12 text-center shadow-lg sm:px-12 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-black/10 blur-3xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4">
            <span className="text-primary-foreground/80 text-sm font-medium tracking-wide uppercase">
              Stranded right now?
            </span>
            <h2 className="text-primary-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Help is minutes away — press once
            </h2>
            <p className="text-primary-foreground/85 max-w-xl text-base leading-relaxed">
              Skip the phone tag. Send your location and a vetted technician
              comes to you, with live tracking from the moment they accept.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                className="text-primary hover:text-primary border-transparent bg-white hover:bg-white/90"
                render={<Link href="/request" />}
              >
                Get help now
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border-primary-foreground/40 text-primary-foreground hover:text-primary-foreground hover:bg-white/10"
                render={<a href="tel:+254700000000" />}
              >
                <PhoneCall className="size-4" aria-hidden="true" />
                Call +254 700 000 000
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
