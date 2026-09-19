"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Car,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  Loader2,
  MapPin,
  PhoneCall,
  Truck,
  UserRound,
  Wrench,
} from "lucide-react"
import { cn } from "cn"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRequestsStore } from "@/features/requests/store"
import { getServiceBySlug } from "@/config/services"

const problemOptions = [
  {
    slug: "roadside",
    icon: LifeBuoy,
    title: "Breakdown / emergency",
    detail: "Battery, tyre, fuel, keys or a breakdown right now.",
  },
  {
    slug: "diagnostics",
    icon: Activity,
    title: "Diagnose a fault",
    detail: "Warning light, strange noise, or a pre-service check.",
  },
  {
    slug: "towing",
    icon: Truck,
    title: "Towing & recovery",
    detail: "The car can't be driven and needs a flatbed.",
  },
  {
    slug: "care",
    icon: Wrench,
    title: "Servicing & repairs",
    detail: "Routine maintenance or a repair you can schedule.",
  },
]

const stepLabels = ["Problem", "Vehicle & location", "Confirm"]

export function RescueWizard() {
  const router = useRouter()
  const createRequest = useRequestsStore(
    (state) => state.createRequest,
  )

  const [step, setStep] = React.useState(0)
  const [serviceType, setServiceType] = React.useState<string>("roadside")
  const [registration, setRegistration] = React.useState("")
  const [make, setMake] = React.useState("")
  const [model, setModel] = React.useState("")
  const [locationLabel, setLocationLabel] = React.useState("")
  const [issue, setIssue] = React.useState("")
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [urgent, setUrgent] = React.useState(false)
  const [tried, setTried] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  const stepValid = [
    serviceType.trim() !== "",
    locationLabel.trim() !== "",
    name.trim() !== "" && phone.trim() !== "",
  ]

  function handleNext() {
    setTried(true)
    if (!stepValid[step]) {
      toast.error(
        step === 0
          ? "Pick the type of help you need"
          : step === 1
            ? "Tell us where the vehicle is"
            : "Add your name and phone number",
      )
      return
    }
    if (step < 2) {
      setStep(step + 1)
      setTried(false)
      return
    }
    void handleSubmit()
  }

  function handleBack() {
    setTried(false)
    setStep((current) => Math.max(0, current - 1))
  }

  function handleSubmit() {
    setSubmitting(true)
    window.setTimeout(() => {
      const request = createRequest({
        serviceType,
        name: name.trim(),
        phone: phone.trim(),
        vehicle: {
          make: make.trim(),
          model: model.trim(),
          registration: registration.trim(),
        },
        locationLabel: locationLabel.trim(),
        issue: issue.trim(),
        priority: urgent ? "URGENT" : "NORMAL",
      })
      toast.success("Request created — tracking your rescue.")
      router.push(`/request/${request.id}`)
    }, 700)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                index === step
                  ? "bg-primary text-primary-foreground"
                  : index < step
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                "hidden text-xs font-medium sm:inline",
                index === step
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {index < stepLabels.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-1 h-px flex-1",
                  index < step ? "bg-success/40" : "bg-border",
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="border-border bg-card rounded-xl border p-5 shadow-sm sm:p-6">
        {step === 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-lg font-semibold">
                What&apos;s happening?
              </h2>
              <p className="text-muted-foreground text-sm">
                Pick the one that fits best — you can add details next.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {problemOptions.map((option) => {
                const selected = serviceType === option.slug
                return (
                  <button
                    key={option.slug}
                    type="button"
                    onClick={() => setServiceType(option.slug)}
                    aria-pressed={selected}
                    className={cn(
                      "ring-border flex items-start gap-3 rounded-xl border p-4 text-left transition-all ring-1 ring-inset",
                      selected
                        ? "border-primary bg-primary/5 ring-primary/30"
                        : "bg-card hover:bg-muted/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-subtle text-foreground ring-border ring-1 ring-inset",
                      )}
                    >
                      <option.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-foreground text-sm font-semibold">
                        {option.title}
                      </span>
                      <span className="text-muted-foreground text-sm leading-snug">
                        {option.detail}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-lg font-semibold">
                Which vehicle, and where?
              </h2>
              <p className="text-muted-foreground text-sm">
                The vehicle details help us dispatch the right technician.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="wizard-registration">Registration</Label>
                <Input
                  id="wizard-registration"
                  value={registration}
                  onChange={(event) => setRegistration(event.target.value)}
                  placeholder="e.g. KDE 493M"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="wizard-make">Make</Label>
                  <Input
                    id="wizard-make"
                    value={make}
                    onChange={(event) => setMake(event.target.value)}
                    placeholder="e.g. Toyota"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="wizard-model">Model</Label>
                  <Input
                    id="wizard-model"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    placeholder="e.g. Axio"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="wizard-location">Where is the vehicle now?</Label>
              <div className="relative">
                <MapPin
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
                  aria-hidden="true"
                />
                <Input
                  id="wizard-location"
                  className="pl-8"
                  value={locationLabel}
                  onChange={(event) => setLocationLabel(event.target.value)}
                  placeholder="e.g. Thika Road Mall parking, ground floor"
                  aria-invalid={tried && !locationLabel.trim()}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="wizard-issue">What&apos;s wrong? (optional)</Label>
              <Textarea
                id="wizard-issue"
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
                placeholder="e.g. Engine cut out at the roundabout, won't start."
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-lg font-semibold">
                Confirm your request
              </h2>
              <p className="text-muted-foreground text-sm">
                Review the summary below — dispatch works fastest when this is
                accurate.
              </p>
            </div>

            <div className="border-border bg-subtle flex flex-col gap-3 rounded-lg border px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Service</span>
                <span className="text-foreground font-medium">
                  {getServiceBySlug(serviceType)?.name ?? serviceType}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="text-foreground font-medium">
                  {registration ||
                    [make, model].filter(Boolean).join(" ") ||
                    "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground max-w-[60%] text-right font-medium">
                  {locationLabel}
                </span>
              </div>
              {issue ? (
                <div className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">Details</span>
                  <span className="text-foreground max-w-[60%] text-right font-medium">
                    {issue}
                  </span>
                </div>
              ) : null}
              {urgent ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="text-destructive font-semibold">Urgent</span>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="wizard-name">Your name</Label>
                <div className="relative">
                  <UserRound
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <Input
                    id="wizard-name"
                    className="pl-8"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Amani Wanjiru"
                    autoComplete="name"
                    aria-invalid={tried && !name.trim()}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="wizard-phone">Phone number</Label>
                <div className="relative">
                  <PhoneCall
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <Input
                    id="wizard-phone"
                    className="pl-8"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="e.g. 0712 345 678"
                    autoComplete="tel"
                    aria-invalid={tried && !phone.trim()}
                  />
                </div>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(event) => setUrgent(event.target.checked)}
                className="border-border text-primary focus:ring-ring/50 size-4 rounded border accent-inherit"
              />
              <span className="text-foreground text-sm font-medium">
                This is urgent
              </span>
              <span className="text-muted-foreground text-xs">
                (higher dispatch priority)
              </span>
            </label>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0 || submitting}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="min-w-36"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : step === 2 ? (
              <>
                Send request
                <ChevronRight className="size-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="size-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-xs">
        <Car className="size-3.5" aria-hidden="true" />
        You&apos;ll approve the price before any work starts — no payment now.
      </p>
    </div>
  )
}