"use client"

import * as React from "react"
import { CheckCircle2, Loader2, MapPin, PhoneCall } from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { services } from "@/config/services"

export type RequestFormMode = "standard" | "emergency"

type RequestFormProps = {
  mode?: RequestFormMode
  defaultServiceType?: string
  locationLabel?: string
}

const selectableServices = [
  { slug: "rescue", name: "Roadside rescue" },
  { slug: "roadside", name: "Roadside assistance" },
  { slug: "diagnostics", name: "Mobile diagnostics" },
  { slug: "towing", name: "Towing & recovery" },
  { slug: "inspections", name: "Vehicle inspection" },
  { slug: "care", name: "Servicing & repairs" },
  { slug: "fleet", name: "Fleet management" },
  { slug: "advisory", name: "Purchase advisory" },
]

const required = (value: string) => (value.trim() ? "" : "This field is required")

export function RequestForm({
  mode = "standard",
  defaultServiceType = "rescue",
  locationLabel,
}: RequestFormProps) {
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [serviceType, setServiceType] = React.useState(defaultServiceType)
  const [registration, setRegistration] = React.useState("")
  const [makeModel, setMakeModel] = React.useState("")
  const [location, setLocation] = React.useState(locationLabel ?? "")
  const [issue, setIssue] = React.useState("")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "submitted"
  >("idle")

  const emergency = mode === "emergency"

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: Record<string, string> = {
      name: required(name),
      phone: required(phone),
      location: required(location),
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      toast.error("Please complete the required fields")
      return
    }

    setStatus("submitting")
    window.setTimeout(() => {
      setStatus("submitted")
      toast.success(
        emergency
          ? "Help is on the way — your detail was sent to dispatch."
          : "Request submitted — we'll confirm your booking shortly.",
      )
    }, 900)
  }

  if (status === "submitted") {
    const service = services.find((candidate) => candidate.slug === serviceType)
    return (
      <div className="border-border bg-card flex flex-col gap-5 rounded-xl border p-6 text-center shadow-sm">
        <span className="text-success mx-auto flex size-12 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-foreground text-lg font-semibold">
            {emergency ? "Help is on the way" : "Request received"}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
            {emergency
              ? `Dispatch is matching the nearest ${service?.name ?? "technician"} to ${location || "your location"}. A technician will call ${phone || "you"} shortly.`
              : `A ${service?.name ?? "service"} request was logged for ${location || "your location"}. You'll be contacted on ${phone || "your number"} with confirmation.`}
          </p>
        </div>
        <div className="text-muted-foreground border-border bg-subtle mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm">
          <PhoneCall className="text-primary size-4" aria-hidden="true" />
          <span>Need to speak to a human? Call +254 700 000 000</span>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setStatus("idle")
          }}
        >
          Make another request
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border-border bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm sm:p-6",
        emergency && "ring-destructive/20 focus-within:ring-2",
      )}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="request-name">
            {emergency ? "Your name" : "Full name"}
          </Label>
          <Input
            id="request-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Amani Wanjiru"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "request-name-error" : undefined}
          />
          {errors.name ? (
            <p id="request-name-error" className="text-destructive text-xs">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="request-phone">Phone number</Label>
          <Input
            id="request-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="e.g. 0712 345 678"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "request-phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="request-phone-error" className="text-destructive text-xs">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="request-service">What do you need help with?</Label>
        <Select
          value={serviceType}
          onValueChange={(value) => {
            if (value) setServiceType(value)
          }}
        >
          <SelectTrigger id="request-service" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {selectableServices.map((option) => (
              <SelectItem key={option.slug} value={option.slug}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="request-registration">Vehicle registration</Label>
          <Input
            id="request-registration"
            value={registration}
            onChange={(event) => setRegistration(event.target.value)}
            placeholder="e.g. KDE 493M"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="request-make-model">Make &amp; model</Label>
          <Input
            id="request-make-model"
            value={makeModel}
            onChange={(event) => setMakeModel(event.target.value)}
            placeholder="e.g. Toyota Axio"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="request-location">
          {emergency ? "Your current location" : "Where is the vehicle?"}
        </Label>
        <div className="relative">
          <MapPin
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            id="request-location"
            className="pl-8"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder={emergency ? "e.g. Thika Road Mall, exit gate" : "e.g. Westlands, Nairobi"}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={
              errors.location ? "request-location-error" : undefined
            }
          />
        </div>
        {errors.location ? (
          <p id="request-location-error" className="text-destructive text-xs">
            {errors.location}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="request-issue">Tell us more (optional)</Label>
        <Textarea
          id="request-issue"
          value={issue}
          onChange={(event) => setIssue(event.target.value)}
          placeholder={
            emergency
              ? "e.g. Battery dead after shopping, car won't start."
              : "e.g. Engine warning light, need a service this week."
          }
        />
      </div>

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : emergency ? (
          "Send emergency request"
        ) : (
          "Submit request"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        {emergency
          ? "In a life-threatening situation, call 112 / 999 before requesting help online."
          : "No payment required now — you'll approve price before any work starts."}
      </p>
    </form>
  )
}