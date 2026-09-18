export const siteConfig = {
  name: "Mashinika",
  tagline: "Kenya's roadside assistance & vehicle care platform",
  description:
    "Roadside rescue, mobile mechanics, diagnostics, towing, inspections, fleet care and technician training for Kenyan motorists. Press once, help is minutes away.",
  keywords: [
    "roadside assistance Kenya",
    "mobile mechanic Nairobi",
    "car diagnostics Kenya",
    "towing Kenya",
    "vehicle inspection Kenya",
    "car valuation Kenya",
    "fleet management Kenya",
  ],

  // Marketed lines under the Mashinika brand umbrella.
  brandLines: [
    {
      slug: "roadside",
      name: "Mashinika Roadside",
      shortBlurb: "Roadside assistance - battery, tyre, fuel and breakdown help.",
      href: "/services/roadside",
    },
    {
      slug: "care",
      name: "Mashinika Care",
      shortBlurb: "Servicing & maintenance on a schedule that matches how you drive.",
      href: "/services/care",
    },
    {
      slug: "inspect",
      name: "Mashinika Inspect",
      shortBlurb: "Vehicle inspection and pre-purchase checks with reports you can trust.",
      href: "/services/inspect",
    },
    {
      slug: "buy",
      name: "Mashinika Buy",
      shortBlurb: "Valuation and buying advisory so you buy right, at the right price.",
      href: "/services/buy",
    },
    {
      slug: "fleet",
      name: "Mashinika Fleet",
      shortBlurb: "Fleet management and maintenance schedules for operators.",
      href: "/services/fleet",
    },
    {
      slug: "academy",
      name: "Mashinika Academy",
      shortBlurb: "Training that turns everyday owners into confident technicians.",
      href: "/academy",
    },
    {
      slug: "assist",
      name: "Mashinika Assist",
      shortBlurb: "Mobile mechanics and on-demand vehicle care wherever you are.",
      href: "/services/assist",
    },
  ],
} as const

export type SiteConfig = typeof siteConfig