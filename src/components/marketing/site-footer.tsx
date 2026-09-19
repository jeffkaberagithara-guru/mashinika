import Link from "next/link"
import { Car } from "lucide-react"
import { siteConfig } from "@/config/site"

const footerLinks = [
  {
    heading: "Services",
    links: [
      { label: "Roadside rescue", href: "/services/rescue" },
      { label: "Diagnostics", href: "/services/diagnostics" },
      { label: "Towing", href: "/services/towing" },
      { label: "Inspections", href: "/services/inspections" },
      { label: "Fleet", href: "/services/fleet" },
    ],
  },
  {
    heading: "Mashinika",
    links: [
      { label: "All services", href: "/services" },
      { label: "Academy", href: "/academy" },
      { label: "Become a technician", href: "/technician" },
      { label: "Get help now", href: "/request" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-subtle text-foreground ring-border flex size-7 items-center justify-center rounded-lg ring-1 ring-inset">
              <Car className="size-4" aria-hidden="true" />
            </span>
            <span className="text-foreground font-medium">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {footerLinks.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3">
            <p className="text-foreground text-sm font-medium">
              {column.heading}
            </p>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={`${column.heading}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <p className="text-foreground text-sm font-medium">Emergencies</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Breakdown, battery, tyre, fuel or keys? Help is minutes away.
          </p>
          <Link
            href="/customer/emergency"
            className="text-primary text-sm font-medium hover:underline"
          >
            Request emergency help →
          </Link>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>
            {siteConfig.name} · {siteConfig.tagline}
          </span>
        </div>
      </div>
    </footer>
  )
}