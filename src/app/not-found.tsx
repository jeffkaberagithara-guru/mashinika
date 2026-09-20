import Link from 'next/link'
import { Car, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl">
        <Car className="size-6" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          404 · Page not found
        </p>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          This road doesn&apos;t lead anywhere
        </h1>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist — but{' '}
          {siteConfig.name} help is only a tap away.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/" />}>
          <Home className="size-4" aria-hidden="true" />
          Back home
        </Button>
        <Button variant="outline" render={<Link href="/request" />}>
          Get help now
        </Button>
      </div>
    </div>
  )
}
