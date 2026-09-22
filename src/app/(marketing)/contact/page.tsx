import type { Metadata } from 'next'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import { ContactForm } from '@/components/marketing/contact-form'
import { serviceConfig } from '@/config/marketing'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Mashinika support: rescue line, email, HQ and office hours. We answer fast.',
}

const faqs = [
  {
    question: 'How do I request roadside help?',
    answer:
      'Open the app, press GET HELP NOW, pick the problem and confirm your location. The nearest vetted technician is dispatched immediately and you can track them live.',
  },
  {
    question: 'How do I know a technician is trusted?',
    answer:
      'Every technician is vetted, GPS-tracked while on a job, and rated by other customers. You see their name, rating and verified status before they arrive.',
  },
  {
    question: 'When will I be charged?',
    answer:
      'No payment is taken when you request help. You approve the price before any work begins, and pay on completion.',
  },
  {
    question: 'Do you cover my town?',
    answer:
      'We cover 45+ towns and every major highway in Kenya, and we add new towns monthly. Use the request flow to check availability at your exact location.',
  },
]

export default function ContactPage() {
  return (
    <div className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-2">
          <p className="text-primary text-sm font-medium">We answer, fast</p>
          <h1 className="text-foreground max-w-md text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Talk to a human
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
            Support, partnerships, fleet enquiries or press — reach the right
            team in one message.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={serviceConfig.emergencyPhoneHref}
              className="border-border bg-card hover:border-primary/40 flex items-center gap-3 rounded-xl border p-4 transition-colors"
            >
              <span className="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-full">
                <PhoneCall className="size-5" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-foreground text-sm font-semibold">
                  Rescue line — 24/7
                </span>
                <span className="text-muted-foreground text-sm">
                  {serviceConfig.emergencyPhone}
                </span>
              </span>
            </a>
            <a
              href="mailto:help@mashinika.co.ke"
              className="border-border bg-card hover:border-primary/40 flex items-center gap-3 rounded-xl border p-4 transition-colors"
            >
              <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-foreground text-sm font-semibold">
                  Email support
                </span>
                <span className="text-muted-foreground text-sm">
                  help@mashinika.co.ke
                </span>
              </span>
            </a>
            <div className="border-border bg-card flex items-center gap-3 rounded-xl border p-4">
              <span className="bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-full ring-1 ring-inset">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-foreground text-sm font-semibold">
                  Head office
                </span>
                <span className="text-muted-foreground text-sm">
                  Westlands, Nairobi. Weekdays 8:00–18:00 EAT.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </section>

      <section className="border-border bg-subtle/60 border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="text-primary text-sm font-medium">FAQ</p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Common questions
            </h2>
          </div>
          <div className="mt-8 flex max-w-3xl flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="border-border bg-card group rounded-xl border p-5"
              >
                <summary className="text-foreground cursor-pointer list-none text-sm font-semibold">
                  <span className="flex items-center justify-between gap-3">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="text-muted-foreground text-lg transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
