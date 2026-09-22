'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CarFront,
  GraduationCap,
  LifeBuoy,
  Loader2,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { siteConfig } from '@/config/site'

type Role = {
  id: string
  label: string
  detail: string
  icon: LucideIcon
  destination: string
}

const roles: Role[] = [
  {
    id: 'customer',
    label: 'Customer',
    detail: 'My rescues, vehicles and service history',
    icon: CarFront,
    destination: '/customer',
  },
  {
    id: 'technician',
    label: 'Technician',
    detail: 'Jobs, diagnosis and earnings',
    icon: Wrench,
    destination: '/technician',
  },
  {
    id: 'dispatcher',
    label: 'Dispatcher',
    detail: 'Live rescue operations centre',
    icon: LifeBuoy,
    destination: '/admin',
  },
  {
    id: 'fleet',
    label: 'Fleet manager',
    detail: 'Vehicles, maintenance and drivers',
    icon: Users,
    destination: '/fleet',
  },
  {
    id: 'academy',
    label: 'Student',
    detail: 'Courses, progress and certificates',
    icon: GraduationCap,
    destination: '/academy',
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<Role | null>(null)
  const [phone, setPhone] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'submitting'>('idle')

  function handleContinue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!role) {
      toast.error('Pick the account type you want to use')
      return
    }
    if (!phone.trim()) {
      toast.error('Enter your phone number')
      return
    }
    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('idle')
      toast.success(`Welcome back — signed in as ${role.label}.`)
      router.push(role.destination)
    }, 700)
  }

  return (
    <div className="flex-1">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-14 sm:px-6 lg:py-20">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Sign in to {siteConfig.name}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Choose how you use {siteConfig.name}, then sign in with your phone
            number.
          </p>
        </div>

        <form
          onSubmit={handleContinue}
          noValidate
          className="border-border bg-card flex flex-col gap-5 rounded-xl border p-5 shadow-sm sm:p-6"
        >
          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-foreground text-sm font-medium">
              I am signing in as
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {roles.map((candidate) => {
                const selected = role?.id === candidate.id
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => setRole(candidate)}
                    aria-pressed={selected}
                    className={cn(
                      'ring-border flex items-start gap-3 rounded-xl border px-4 py-3 text-left ring-1 transition-all ring-inset',
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
                      <candidate.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-foreground text-sm font-semibold">
                        {candidate.label}
                      </span>
                      <span className="text-muted-foreground text-xs leading-snug">
                        {candidate.detail}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-phone">Phone number</Label>
            <Input
              id="login-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="e.g. 0712 345 678"
              autoComplete="tel"
              autoFocus
            />
          </div>

          <Button type="submit" size="lg" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              'Continue'
            )}
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            Demo build — authentication is being wired to the production
            backend. New to {siteConfig.name}?{' '}
            <Link href="/request" className="text-primary font-medium">
              Request a service
            </Link>{' '}
            without an account.
          </p>
        </form>
      </div>
    </div>
  )
}
