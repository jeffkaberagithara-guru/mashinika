import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowLeftRight,
  Car,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  LifeBuoy,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'

export const serviceConfig = {
  tagline: 'YOUR CAR. OUR EXPERTISE.',
  description:
    'Mobile automotive assistance, diagnostics, inspections, repairs and vehicle services — built for Kenya.',
  systemLabel: 'One platform, every vehicle need',
  emergencyPhone: '+254 700 000 000',
  emergencyPhoneHref: 'tel:+254700000000',
  trust: [
    {
      label: '24/7 assistance',
      detail: 'Day or night, help is a tap away.',
    },
    {
      label: 'Verified technicians',
      detail: 'Vetted, GPS-tracked and rated.',
    },
    {
      label: 'Nationwide coverage',
      detail: '45+ towns and every major highway.',
    },
    {
      label: 'Transparent process',
      detail: 'Approve the price before work starts.',
    },
  ],
}

export const serviceIcons: Record<string, LucideIcon> = {
  rescue: LifeBuoy,
  roadside: LifeBuoy,
  diagnostics: Activity,
  towing: Truck,
  inspections: ClipboardCheck,
  inspect: ClipboardCheck,
  advisory: ShieldCheck,
  buy: CircleDollarSign,
  care: Wrench,
  trade: ArrowLeftRight,
  fleet: Users,
  assist: Car,
  academy: GraduationCap,
}
