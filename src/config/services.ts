export type ServiceStep = {
  title: string
  detail: string
}

export type ServiceDefinition = {
  slug: string
  brand: string
  name: string
  title: string
  blurb: string
  description: string
  /** Sets tone + CTA: true for breakdown-style, "get help now" services. */
  emergency: boolean
  features: string[]
  steps: ServiceStep[]
  ctaLabel: string
  ctaHref: string
}

const standardSteps = (detail: string): ServiceStep[] => [
  { title: 'Request in seconds', detail },
  {
    title: 'We confirm the right fix',
    detail: 'An expert confirms scope and price before any work begins.',
  },
  {
    title: 'Done, with a record',
    detail:
      "Work is completed safely and added to your vehicle's service history.",
  },
]

const emergencySteps: ServiceStep[] = [
  {
    title: 'Press for help',
    detail:
      'Select the problem and confirm your location — no typing required.',
  },
  {
    title: 'Nearest tech dispatched',
    detail: 'A vetted technician accepts and heads to you with live tracking.',
  },
  {
    title: 'Back on the road',
    detail: 'Pay safely on completion. Every job lands on your service record.',
  },
]

export const services: ServiceDefinition[] = [
  {
    slug: 'rescue',
    brand: 'Mashinika Rescue',
    name: 'Roadside rescue',
    title: 'Emergency help, minutes away.',
    blurb:
      'Battery, tyre, fuel, keys and breakdown help — dispatched from the nearest available technician.',
    description:
      "Press once and the nearest vetted technician is dispatched to your location. Whether it's a dead battery, a flat tyre, an empty tank or a full breakdown, we get you moving again — safely, quickly and with live tracking.",
    emergency: true,
    features: [
      '24/7 emergency dispatch',
      'Nearest vetted technician',
      'Live GPS tracking and ETA',
      'Battery boost, tyre change, fuel delivery and key help',
      'Transparent, pay-on-completion pricing',
    ],
    steps: emergencySteps,
    ctaLabel: 'Request emergency help',
    ctaHref: '/customer/emergency',
  },
  {
    slug: 'roadside',
    brand: 'Mashinika Rescue',
    name: 'Roadside assistance',
    title: 'Stranded? Help is minutes away.',
    blurb:
      'Breakdown, battery, tyre, fuel and keys — sorted by a technician who is already near you.',
    description:
      'One tap and the nearest available technician is on their way. We handle the everyday emergencies — dead batteries, punctures, empty fuel tanks, lost keys and breakdowns — wherever you are in Kenya.',
    emergency: true,
    features: [
      'Battery jump-start and replacement',
      'Tyre change and puncture repair',
      'Fuel delivery to your location',
      'Lockout and key assistance',
      'On-site mechanical fixes for minor breakdowns',
    ],
    steps: emergencySteps,
    ctaLabel: 'Get help now',
    ctaHref: '/customer/emergency',
  },
  {
    slug: 'diagnostics',
    brand: 'Mashinika Rescue',
    name: 'Mobile diagnostics',
    title: 'Find the fault before you spend.',
    blurb:
      'Professional fault diagnosis at your doorstep, with a clear written report before any work is done.',
    description:
      'A diagnostic technician brings a full scan kit to your car, wherever it is. We read engine, transmission and body-control faults, inspect the affected systems, and hand you a plain-language report with a fair repair quote — so you never pay to guess.',
    emergency: false,
    features: [
      'OBD-II engine and system fault codes',
      'On-site mechanical and electrical inspection',
      'Plain-language written diagnostic report',
      'Fair, itemised repair quotes before work starts',
      'Battery, alternator, starter and charging checks',
    ],
    steps: standardSteps(
      'Tell us the symptoms and pick a slot — a diagnostic tech comes to your vehicle.',
    ),
    ctaLabel: 'Book a diagnosis',
    ctaHref: '/request',
  },
  {
    slug: 'towing',
    brand: 'Mashinika Rescue',
    name: 'Towing & recovery',
    title: "We'll take it where you trust.",
    blurb:
      'Flatbed recovery from anywhere, tracked live, straight to the workshop you choose.',
    description:
      "When a vehicle can't be driven, a flatbed comes to you — from a parking lot, estate, highway or farm road. Track the truck live, choose your destination workshop, and pay one fair price.",
    emergency: true,
    features: [
      'Flatbed towing countrywide',
      'Live truck tracking while en route',
      'Choose your destination workshop',
      'Safe loading in estates and hard-to-reach spots',
      '24/7 recovery from breakdowns and accidents',
    ],
    steps: [
      {
        title: 'Confirm where you are',
        detail: 'Share your location and where the vehicle needs to go.',
      },
      {
        title: 'Flatbed dispatched',
        detail: 'A nearby truck heads to you with live tracking.',
      },
      {
        title: 'Delivered, safely',
        detail:
          'Your vehicle is loaded with care and dropped at your chosen workshop.',
      },
    ],
    ctaLabel: 'Request a tow',
    ctaHref: '/customer/emergency',
  },
  {
    slug: 'inspections',
    brand: 'Mashinika Inspect',
    name: 'Vehicle inspections',
    title: 'Buy with confidence, sell with proof.',
    blurb:
      'Pre-purchase and condition inspections with a detailed report you can trust.',
    description:
      'Before you hand over money — or hand over your car — get an independent inspection. A certified inspector goes through the body, engine, suspension, electrics and history, and delivers a detailed report with photos and a fair market valuation.',
    emergency: false,
    features: [
      'Pre-purchase independent inspection',
      'Structural, mechanical and electrical checks',
      'Photo evidence for every finding',
      'Fair market valuation in the report',
      'Same-day digital report you can share',
    ],
    steps: standardSteps(
      "Pick the car, and an inspector meets you at the seller's location.",
    ),
    ctaLabel: 'Book an inspection',
    ctaHref: '/request',
  },
  {
    slug: 'inspect',
    brand: 'Mashinika Inspect',
    name: 'Inspect & verify',
    title: 'Inspection reports you can trust.',
    blurb:
      "Know exactly what you're buying, selling or driving — from certified inspectors.",
    description:
      'Mashinika Inspect connects you with certified vehicle inspectors across Kenya. Get a full condition report, verified mileage and history checks, and an honest valuation — delivered the same day.',
    emergency: false,
    features: [
      'Certified independent inspectors',
      'Full condition report with photos',
      'Mileage and history verification',
      'Valuation included in every report',
      'Instant digital delivery',
    ],
    steps: standardSteps(
      'Book a slot and an inspector attends the vehicle wherever it is.',
    ),
    ctaLabel: 'Book an inspection',
    ctaHref: '/request',
  },
  {
    slug: 'advisory',
    brand: 'Mashinika Buy',
    name: 'Purchase advisory',
    title: 'Buy the right car, at the right price.',
    blurb:
      'Valuation and negotiation support so you buy the right car at the right price.',
    description:
      'Buying a car is easy to get wrong. Our advisors value the vehicle, review its history and inspection, and sit with you on the negotiation — so you close with confidence and without overpaying.',
    emergency: false,
    features: [
      'Independent market valuation',
      'History and inspection review',
      'Negotiation support end-to-end',
      'Financing and paperwork guidance',
      'Post-purchase advice and setup',
    ],
    steps: standardSteps(
      "Tell us the car you're considering and we start the due-diligence pack.",
    ),
    ctaLabel: 'Get buying advice',
    ctaHref: '/request',
  },
  {
    slug: 'buy',
    brand: 'Mashinika Buy',
    name: 'Buy smart',
    title: 'Buy right, right price.',
    blurb:
      'Valuation, due diligence and guidance for your biggest vehicle decision.',
    description:
      "Mashinika Buy is your buying partner. We verify the vehicle, value it fairly, flag the risks, and guide you through negotiation and paperwork — whether it's your first car or your fleet.",
    emergency: false,
    features: [
      'Vehicle verification and history checks',
      'Fair market pricing and negotiation support',
      'Risk flagging across the whole car',
      'Guided paperwork and transfer',
      'Ongoing after-purchase support',
    ],
    steps: standardSteps(
      'Share the listing and our advisors prepare your buying pack.',
    ),
    ctaLabel: 'Buy with backup',
    ctaHref: '/request',
  },
  {
    slug: 'care',
    brand: 'Mashinika Care',
    name: 'Servicing & repairs',
    title: 'Maintenance that matches your life.',
    blurb: 'Servicing, repairs and maintenance on a schedule that matches you.',
    description:
      'Mashinika Care keeps your car running to schedule — at home, at work or at a partner workshop. Get reminders, mobile servicing, certified repairs and a full service history your car carries forward.',
    emergency: false,
    features: [
      'Scheduled servicing and maintenance',
      'Mobile service at home or office',
      'Certified mechanics and genuine parts',
      'Automatic maintenance reminders',
      'Lifetime service history per vehicle',
    ],
    steps: standardSteps(
      'Tell us what your car needs and we build a schedule around you.',
    ),
    ctaLabel: 'Book a service',
    ctaHref: '/request',
  },
  {
    slug: 'trade',
    brand: 'Mashinika Trade',
    name: 'Trade-in & swap',
    title: 'Move on, on your terms.',
    blurb:
      "Valuation, trade-in and vehicle swapping for when it's time to move on.",
    description:
      'Ready for the next car? Get a true valuation for yours, trade it in, or swap it for the vehicle you actually want. We handle the paperwork and make sure the deal is fair on both sides.',
    emergency: false,
    features: [
      'Honest, independent valuation',
      'Trade-in against an inspection',
      'Vehicle swaps handled end-to-end',
      'Paperwork and transfer support',
      'Fair offers, no haggling games',
    ],
    steps: standardSteps(
      'Get your vehicle valued, then choose trade-in, swap or sale.',
    ),
    ctaLabel: 'Value my car',
    ctaHref: '/request',
  },
  {
    slug: 'fleet',
    brand: 'Mashinika Fleet',
    name: 'Fleet management',
    title: 'Every driver, every vehicle, one dashboard.',
    blurb:
      'Maintenance schedules, service history and supervision for business fleets.',
    description:
      'Mashinika Fleet keeps your vehicles roadworthy and your costs predictable. We schedule maintenance, track service history per vehicle, manage roadside incidents and give your ops team a single source of truth.',
    emergency: false,
    features: [
      'Per-vehicle maintenance schedules',
      'Complete service and repair history',
      'Roadside response for the whole fleet',
      'Driver and vehicle records in one place',
      'Reports your finance team will love',
    ],
    steps: standardSteps(
      'Register your fleet and we onboard your vehicles and drivers.',
    ),
    ctaLabel: 'Talk to fleet',
    ctaHref: '/request',
  },
  {
    slug: 'assist',
    brand: 'Mashinika Assist',
    name: 'On-demand vehicle care',
    title: 'Mobile mechanics, wherever you are.',
    blurb: 'Mobile mechanics and on-demand vehicle care wherever you are.',
    description:
      "From a full service to a stubborn electrical fault, Mashinika Assist brings a qualified mechanic to your vehicle. Book by the job, see the price up front, and keep the record on your car's service history.",
    emergency: false,
    features: [
      'Mechanics come to you',
      'Up-front, per-job pricing',
      'Servicing, repairs and electrical work',
      'Parts sourced and fitted on site',
      'Recorded on your service history',
    ],
    steps: standardSteps(
      'Describe the job and a qualified mechanic comes to your vehicle.',
    ),
    ctaLabel: 'Book a mechanic',
    ctaHref: '/request',
  },
]

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((service) => service.slug === slug)
}
