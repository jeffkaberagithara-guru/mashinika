import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from 'cn'

export type ServiceCardProps = ComponentProps<'div'> & {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  iconClassName?: string
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  className,
  iconClassName,
  ...props
}: ServiceCardProps) {
  const inner = (
    <>
      <span
        className={cn(
          'bg-subtle text-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
          iconClassName,
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <h3 className="text-foreground text-sm font-semibold">{title}</h3>
          {href ? (
            <ArrowUpRight
              className="text-muted-foreground size-3.5 transition-transform group-hover/text:translate-x-0.5 group-hover/text:-translate-y-0.5"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </>
  )

  const classes = cn(
    'group relative flex items-start gap-3.5 overflow-hidden rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all duration-300',
    href
      ? 'cursor-pointer hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10'
      : undefined,
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    )
  }

  return (
    <div className={classes} {...props}>
      {inner}
    </div>
  )
}
