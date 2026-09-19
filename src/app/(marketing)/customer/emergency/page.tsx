import type { Metadata } from "next"
import { PhoneCall, Siren } from "lucide-react"
import { RequestForm } from "@/components/request/request-form"
import { StatusBadge } from "@/components/ui/status-badge"

export const metadata: Metadata = {
  title: "Emergency",
  description:
    "Emergency roadside help: breakdown, dead battery, flat tyre, fuel or lost keys. Help is minutes away.",
}

export default function EmergencyPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-2">
          <StatusBadge tone="danger" pulse>
            Emergency · average response 17 minutes
          </StatusBadge>
          <h1 className="text-foreground max-w-md text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Stay calm. Help is coming.
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
            Share your location and what happened. The nearest available
            technician is dispatched immediately — with live tracking so you
            know exactly when they&apos;ll arrive.
          </p>

          <div className="border-border bg-card flex items-center gap-3 rounded-xl border p-4">
            <span className="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-full">
              <PhoneCall className="size-5" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="text-foreground text-sm font-semibold">
                Prefer to call?
              </span>
              <span className="text-muted-foreground text-sm">
                Call the rescue line:{" "}
                <a href="tel:+254700000000" className="text-primary font-medium">
                  +254 700 000 000
                </a>
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Siren className="text-destructive mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              If you or anyone is injured, or there&apos;s a fire or a serious
              accident, call 112 / 999 first — emergency services outrank any
              roadside helper.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <RequestForm mode="emergency" defaultServiceType="rescue" />
        </div>
      </section>
    </div>
  )
}