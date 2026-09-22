import Link from 'next/link'
import { Car, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { serviceConfig } from '@/config/marketing'

const footerColumns = [
  {
    heading: 'Services',
    links: [
      { label: 'Rescue', href: '/rescue' },
      { label: 'Care', href: '/care' },
      { label: 'Inspect', href: '/inspect' },
      { label: 'Buy', href: '/buy' },
      { label: 'Trade', href: '/trade' },
      { label: 'Fleet', href: '/fleet' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Academy', href: '/academy' },
      { label: 'Become a technician', href: '/technician' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'All services', href: '/services' },
      { label: 'My rescues', href: '/customer' },
      { label: 'Login', href: '/login' },
      { label: 'Emergency request', href: '/customer/emergency' },
    ],
  },
]

const socials = [
  {
    label: 'X',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Facebook',
    href: '#',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.77.07-.94.04-1.45.2-1.79.33-.45.18-.77.39-1.1.72-.33.33-.54.65-.72 1.1-.13.34-.29.85-.33 1.79-.06 1.25-.07 1.62-.07 4.77s.01 3.52.07 4.77c.04.94.2 1.45.33 1.79.18.45.39.77.72 1.1.33.33.65.54 1.1.72.34.13.85.29 1.79.33 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c.94-.04 1.45-.2 1.79-.33.45-.18.77-.39 1.1-.72.33-.33.54-.65.72-1.1.13-.34.29-.85.33-1.79.04-1.25.07-1.62.07-4.77s-.03-3.52-.07-4.77c-.04-.94-.2-1.45-.33-1.79a2.97 2.97 0 0 0-.72-1.1 2.97 2.97 0 0 0-1.1-.72c-.34-.13-.85-.29-1.79-.33-1.25-.06-1.62-.07-4.77-.07zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96zm0 8.16a3.18 3.18 0 1 0 0-6.36 3.18 3.18 0 0 0 0 6.36zm6.38-8.36a1.16 1.16 0 1 1-2.33 0 1.16 1.16 0 0 1 2.33 0z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
              <Car className="size-4.5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            {serviceConfig.tagline}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            {serviceConfig.description}
          </p>
          <div className="flex items-center gap-2 pt-1">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={`${siteConfig.name} on ${social.label}`}
                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div
            key={column.heading}
            className="flex flex-col gap-3 lg:col-span-2"
          >
            <p className="text-sm font-semibold text-white">{column.heading}</p>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={`${column.heading}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3 lg:col-span-4">
          <p className="text-sm font-semibold text-white">Emergencies</p>
          <p className="text-sm leading-relaxed text-slate-400">
            Breakdown, battery, tyre, fuel or keys? Help is minutes away, day or
            night.
          </p>
          <Link
            href={serviceConfig.emergencyPhoneHref}
            className="border-primary bg-primary/15 text-primary-foreground hover:bg-primary flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors hover:text-white"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            {serviceConfig.emergencyPhone}
          </Link>
          <Link
            href="/customer/emergency"
            className="text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Request emergency help →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>{siteConfig.name} · Built for Kenyan roads</span>
        </div>
      </div>
    </footer>
  )
}
