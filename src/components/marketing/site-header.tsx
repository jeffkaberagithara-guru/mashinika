import Link from "next/link"
import { Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Academy", href: "/academy" },
  { label: "Fleet", href: "/services/fleet" },
  { label: "Technicians", href: "/technician" },
]

export function SiteHeader() {
  return (
    <header className="border-border bg-background/80 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
            <Car className="size-4.5" aria-hidden="true" />
          </span>
          <span className="text-foreground text-[15px] font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            render={<Link href="/customer" />}
          >
            My rescues
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            render={<Link href="/customer/emergency" />}
          >
            Emergency
          </Button>
          <Button size="sm" render={<Link href="/request" />}>
            Get help now
          </Button>
        </div>
      </div>
    </header>
  )
}