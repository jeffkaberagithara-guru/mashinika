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
  url: "https://mashinika.co.ke",
  brandLines: [
    {
      slug: "rescue",
      name: "Mashinika Rescue",
      shortBlurb: "Emergency roadside assistance - battery, tyre, fuel, towing and breakdown.",
      href: "/services/rescue",
    },
    {
      slug: "care",
      name: "Mashinika Care",
      shortBlurb: "Servicing, repairs and maintenance on a schedule that matches you.",
      href: "/services/care",
    },
    {
      slug: "inspect",
      name: "Mashinika Inspect",
      shortBlurb: "Vehicle inspections and pre-purchase checks with reports you trust.",
      href: "/services/inspect",
    },
    {
      slug: "buy",
      name: "Mashinika Buy",
      shortBlurb: "Buying advisory, valuation and guidance so you buy right, right price.",
      href: "/services/buy",
    },
    {
      slug: "trade",
      name: "Mashinika Trade",
      shortBlurb: "Valuation, trade-in and vehicle swapping for when it's time to move on.",
      href: "/services/trade",
    },
    {
      slug: "fleet",
      name: "Mashinika Fleet",
      shortBlurb: "Fleet management, maintenance schedules and driver records for operators.",
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
  cta: {
    getHelpLabel: "GET HELP NOW",
    getHelpHref: "/customer/emergency",
  },
}

export type SiteConfig = typeof siteConfig