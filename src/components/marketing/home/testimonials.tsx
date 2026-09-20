import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Battery died at the mall at 9pm. A technician had me rolling again in under 20 minutes. Genuinely shocking.',
    name: 'Amani Wanjiru',
    town: 'Nairobi',
    rating: 5,
  },
  {
    quote:
      'The live tracking is the difference. I knew exactly who was coming and when — no guessing, no waiting in the dark.',
    name: 'Brian Kiprotich',
    town: 'Nakuru',
    rating: 5,
  },
  {
    quote:
      'Fixed my car at my office while I kept working. Upfront price approved before anything was touched. Proper.',
    name: 'Grace Muthoni',
    town: 'Mombasa',
    rating: 5,
  },
]

export function HomeTestimonials() {
  return (
    <section className="border-border bg-subtle/60 border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-primary text-sm font-medium">
            Trusted on Kenyan roads
          </p>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Drivers who press once, stay calm
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="border-border bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm"
            >
              <Quote className="text-primary/30 size-6" aria-hidden="true" />
              <blockquote className="text-foreground text-sm leading-relaxed">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-sm font-semibold">
                    {testimonial.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {testimonial.town}
                  </span>
                </div>
                <span
                  className="flex shrink-0 items-center gap-0.5"
                  aria-label={`Rated ${testimonial.rating} out of 5`}
                >
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        className="text-warning size-3.5 fill-current"
                        aria-hidden="true"
                      />
                    ),
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
