'use client'

import * as React from 'react'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const required = (value: string) =>
  value.trim() ? '' : 'This field is required'

export function ContactForm() {
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent'>(
    'idle',
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {
      name: required(name),
      phone: required(phone),
      subject: required(subject),
      message: required(message),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      toast.error('Please complete the required fields')
      return
    }
    setStatus('sending')
    window.setTimeout(() => {
      setStatus('sent')
      toast.success("Message received — we'll reply within a few hours.")
    }, 700)
  }

  if (status === 'sent') {
    return (
      <div className="border-border bg-card flex flex-col items-center gap-3 rounded-xl border p-8 text-center">
        <span className="bg-success/10 text-success flex size-12 items-center justify-center rounded-full">
          <Send className="size-5" aria-hidden="true" />
        </span>
        <h2 className="text-foreground text-lg font-semibold">Message sent</h2>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          Thanks, {name}. We&apos;ve logged your message and the team will get
          back to you on {phone} shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setStatus('idle')
            setMessage('')
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-border bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Amani Wanjiru"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-destructive text-xs">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-phone">Phone number</Label>
          <Input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="e.g. 0712 345 678"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          />
          {errors.phone ? (
            <p id="contact-phone-error" className="text-destructive text-xs">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="e.g. I have a question about an inspection report"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={
            errors.subject ? 'contact-subject-error' : undefined
          }
        />
        {errors.subject ? (
          <p id="contact-subject-error" className="text-destructive text-xs">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us how we can help."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-destructive text-xs">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        For an emergency, don&apos;t wait for a reply — call the rescue line.
      </p>
    </form>
  )
}
