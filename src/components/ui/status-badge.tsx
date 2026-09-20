import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import type { StatusTone } from '@/features/roadside/status'

export type { StatusTone }

const statusBadgeTones: Record<StatusTone, string> = {
  neutral: 'bg-muted text-muted-foreground ring-border',
  info: 'bg-blue-50 text-blue-700 ring-blue-200',
  success: 'bg-green-50 text-green-700 ring-green-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-red-50 text-red-700 ring-red-200',
  primary: 'bg-orange-50 text-orange-700 ring-orange-200',
}

const statusBadgeDots: Record<StatusTone, string> = {
  neutral: 'bg-muted-foreground',
  info: 'bg-blue-500',
  success: 'bg-green-600',
  warning: 'bg-amber-500',
  danger: 'bg-red-600',
  primary: 'bg-orange-600',
}

const statusBadgeVariants = cva(
  'inline-flex w-fit max-w-full items-center justify-center gap-1.5 truncate rounded-full border border-transparent px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      tone: statusBadgeTones,
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
)

export type StatusBadgeProps = ComponentProps<'span'> &
  VariantProps<typeof statusBadgeVariants> & {
    /** Pulsing dot for live-ish states (e.g. "searching for technician"). */
    pulse?: boolean
    /** Overrides the default dot; pass `null` to hide the dot. */
    dot?: boolean
    /** Optional leading icon. */
    icon?: LucideIcon | null
  }

export function StatusBadge({
  className,
  tone = 'neutral',
  pulse = false,
  dot = true,
  icon,
  children,
  ...props
}: StatusBadgeProps) {
  const Icon = icon ?? null

  return (
    <span className={cn(statusBadgeVariants({ tone }), className)} {...props}>
      {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
      {dot && !Icon ? (
        <span className="inline-flex size-1.5 shrink-0 items-center justify-center">
          <span
            aria-hidden="true"
            className={cn(
              'inline-block size-1.5 rounded-full',
              statusBadgeDots[tone ?? 'neutral'],
              pulse && 'animate-pulse',
            )}
          />
        </span>
      ) : null}
      <span className="truncate">{children}</span>
    </span>
  )
}

export { statusBadgeTones, statusBadgeDots }
