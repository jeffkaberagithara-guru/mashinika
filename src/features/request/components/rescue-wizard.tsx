'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  BatteryCharging,
  Car,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Fuel,
  ImagePlus,
  KeyRound,
  Loader2,
  MapPin,
  Navigation,
  PhoneCall,
  PlugZap,
  Thermometer,
  Truck,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from 'cn'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRequestsStore } from '@/features/requests/store'
import { useNotificationsStore } from '@/features/notifications/store'
import { useSessionStore } from '@/features/authentication/store'
import { getServiceBySlug } from '@/config/services'

type ProblemOption = {
  slug: string
  icon: LucideIcon
  title: string
  detail: string
}

const problemOptions: ProblemOption[] = [
  {
    slug: 'towing',
    icon: Truck,
    title: 'Accident / needs towing',
    detail: "Damaged or can't be driven — a flatbed is on its way.",
  },
  {
    slug: 'roadside',
    icon: BatteryCharging,
    title: 'Dead battery',
    detail: "Clicking sound or won't crank — may need a jump.",
  },
  {
    slug: 'roadside',
    icon: Disc3,
    title: 'Flat tyre',
    detail: 'Puncture, blowout or a wheel that needs changing.',
  },
  {
    slug: 'roadside',
    icon: Fuel,
    title: 'Out of fuel',
    detail: 'Ran dry — we can bring fuel to you.',
  },
  {
    slug: 'roadside',
    icon: KeyRound,
    title: 'Locked out / keys',
    detail: 'Keys lost, broken or stuck inside the car.',
  },
  {
    slug: 'roadside',
    icon: PlugZap,
    title: "Won't start",
    detail: 'Nothing happens when you turn the key or press start.',
  },
  {
    slug: 'roadside',
    icon: Thermometer,
    title: 'Overheating',
    detail: 'Temperature rising, steam or a hot smell from the engine.',
  },
  {
    slug: 'roadside',
    icon: Wrench,
    title: 'Something else',
    detail: 'Another breakdown — describe it in the next step.',
  },
]

const stepLabels = ['Help', 'Location', 'Vehicle', 'Details', 'Review']

const maxPhotos = 4

export function RescueWizard() {
  const router = useRouter()
  const createRequest = useRequestsStore((state) => state.createRequest)
  const user = useSessionStore((state) => state.user)
  const photoInputRef = React.useRef<HTMLInputElement>(null)

  const [step, setStep] = React.useState(0)
  const [serviceType, setServiceType] = React.useState<string>('')
  const [registration, setRegistration] = React.useState('')
  const [make, setMake] = React.useState('')
  const [model, setModel] = React.useState('')
  const [locationLabel, setLocationLabel] = React.useState('')
  const [coordinates, setCoordinates] = React.useState<{
    lat: number
    lng: number
  } | null>(null)
  const [locating, setLocating] = React.useState(false)
  const [issue, setIssue] = React.useState('')
  const [photos, setPhotos] = React.useState<string[]>([])
  const [name, setName] = React.useState(() => user?.name ?? '')
  const [phone, setPhone] = React.useState(() => user?.phone ?? '')
  const [urgent, setUrgent] = React.useState(false)
  const [tried, setTried] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  const stepValid = [
    serviceType !== '',
    locationLabel.trim() !== '',
    registration.trim() !== '' || (make.trim() !== '' && model.trim() !== ''),
    true,
    name.trim() !== '' && phone.trim() !== '',
  ]

  const stepError = [
    'Pick the problem you need help with',
    'Tell us where the vehicle is — or use your location',
    'Add the registration, or the make and model',
    null,
    'Add a name and phone number so we can reach you',
  ]

  function handleLocate() {
    if (!('geolocation' in navigator)) {
      toast.error('Location is not available on this device — type it instead')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setCoordinates({ lat, lng })
        setLocationLabel(
          `My current location — ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        )
        setLocating(false)
        toast.success('Location captured — you can still edit it')
      },
      () => {
        setLocating(false)
        toast.error('Could not get your location — type it instead')
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    const room = maxPhotos - photos.length
    const next = [
      ...photos,
      ...files.slice(0, room).map((file) => URL.createObjectURL(file)),
    ]
    setPhotos(next.slice(0, maxPhotos))
    event.target.value = ''
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index))
  }

  function handleNext() {
    setTried(true)
    if (!stepValid[step]) {
      const message = stepError[step]
      if (message) toast.error(message)
      return
    }
    if (step < stepLabels.length - 1) {
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
        priority: urgent ? 'URGENT' : 'NORMAL',
        photos: photos.length ? photos : undefined,
        coordinates,
      })
      toast.success('Request sent — tracking your rescue.')
      useNotificationsStore.getState().notify({
        kind: 'rescue',
        title: 'Rescue request sent',
        body: urgent
          ? 'Marked urgent — we are prioritising the nearest technician.'
          : 'We are finding the nearest technician now.',
        href: `/request/${request.id}`,
      })
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
                'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                index === step
                  ? 'bg-primary text-primary-foreground'
                  : index < step
                    ? 'bg-success/15 text-success'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                'hidden text-xs font-medium sm:inline',
                index === step ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {label}
            </span>
            {index < stepLabels.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'mx-1 h-px flex-1',
                  index < step ? 'bg-success/40' : 'bg-border',
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
                Tap the closest match — you can add details in a moment.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {problemOptions.map((option) => {
                const selected = serviceType === option.slug
                return (
                  <button
                    key={option.title}
                    type="button"
                    onClick={() => setServiceType(option.slug)}
                    aria-pressed={selected}
                    className={cn(
                      'ring-border flex items-start gap-3 rounded-xl border p-4 text-left ring-1 transition-all ring-inset',
                      selected
                        ? 'border-primary bg-primary/5 ring-primary/30'
                        : 'bg-card hover:bg-muted/50',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg',
                        selected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-subtle text-foreground ring-border ring-1 ring-inset',
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
                Where are you?
              </h2>
              <p className="text-muted-foreground text-sm">
                The more precise you are, the faster we reach you.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleLocate}
              disabled={locating}
              className="justify-start"
            >
              {locating ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Navigation className="size-4" aria-hidden="true" />
              )}
              {locating ? 'Detecting…' : 'Use my location'}
            </Button>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="wizard-location">Location details</Label>
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
              {coordinates ? (
                <p className="text-success flex items-center gap-1.5 text-xs font-medium">
                  <Navigation className="size-3.5" aria-hidden="true" />
                  Precise coordinates attached — the technician will see them.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-lg font-semibold">
                Which vehicle?
              </h2>
              <p className="text-muted-foreground text-sm">
                This helps us send the right technician and the right tools.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="wizard-registration">Registration</Label>
              <Input
                id="wizard-registration"
                value={registration}
                onChange={(event) => setRegistration(event.target.value)}
                placeholder="e.g. KDE 493M"
                aria-invalid={
                  tried &&
                  !registration.trim() &&
                  !(make.trim() && model.trim())
                }
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

            <p className="text-muted-foreground text-xs">
              You&apos;ll be able to save this vehicle to a garage list after
              the request.
            </p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-lg font-semibold">
                Any more details?
              </h2>
              <p className="text-muted-foreground text-sm">
                Optional — describe the symptoms and add photos if you can.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="wizard-issue">
                What&apos;s wrong? (optional)
              </Label>
              <Textarea
                id="wizard-issue"
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
                placeholder="e.g. Engine cut out at the roundabout, won't start."
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-foreground text-sm font-medium">
                Photos ({photos.length}/{maxPhotos}) {''}
                <span className="text-muted-foreground font-normal">
                  — helpful for the technician
                </span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {photos.map((src, index) => (
                  <div
                    key={src}
                    className="border-border group relative size-20 overflow-hidden rounded-lg border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Attachment ${index + 1}`}
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      aria-label={`Remove photo ${index + 1}`}
                      className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-slate-950/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="size-3" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {photos.length < maxPhotos ? (
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    aria-label="Add photos"
                    className="border-border bg-subtle hover:bg-muted/50 text-muted-foreground flex size-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed transition-colors"
                  >
                    <ImagePlus className="size-5" aria-hidden="true" />
                    <span className="text-[11px] font-medium">Add</span>
                  </button>
                ) : null}
              </div>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="sr-only"
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-lg font-semibold">
                Review & request help
              </h2>
              <p className="text-muted-foreground text-sm">
                Dispatch works fastest when this is accurate.
              </p>
            </div>

            <div className="border-border bg-subtle flex flex-col gap-3 rounded-lg border px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Service</span>
                <span className="text-foreground font-medium">
                  {getServiceBySlug(serviceType)?.name ?? 'Emergency help'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="text-foreground font-medium">
                  {registration ||
                    [make, model].filter(Boolean).join(' ') ||
                    '—'}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
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
              {photos.length ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Photos</span>
                  <span className="text-foreground font-medium">
                    {photos.length} attached
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
            ) : step === stepLabels.length - 1 ? (
              <>
                REQUEST HELP
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
