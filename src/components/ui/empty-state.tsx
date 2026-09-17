"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Loader2 } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

export type EmptyStateVariant = "empty" | "error" | "loading"

export type EmptyStateProps = {
  variant?: EmptyStateVariant
  icon?: LucideIcon | null
  title: string
  description?: string
  /** Shown for loading states; defaults to "Loading...". */
  loadingLabel?: string
  /** Callback rendered as a retry action in the `error` variant. */
  onRetry?: () => void
  /** Optional extra action slot (e.g. a "Create" button). */
  action?: ReactNode
  className?: string
}

const variantIconBg: Record<EmptyStateVariant, string> = {
  empty: "bg-subtle text-muted-foreground ring-border",
  error: "bg-red-50 text-red-600 ring-red-200",
  loading: "bg-subtle text-muted-foreground ring-border",
}

export function EmptyState({
  variant = "empty",
  icon,
  title,
  description,
  loadingLabel = "Loading",
  onRetry,
  action,
  className,
}: EmptyStateProps) {
  const Icon = icon
  const iconBg = variantIconBg[variant]

  return (
    <div
      role={variant === "loading" ? "status" : undefined}
      aria-live={variant === "loading" ? "polite" : undefined}
      className={cn(
        "border-border bg-card flex flex-col items-center justify-center gap-3 rounded-xl border px-6 py-14 text-center",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full ring-1 ring-inset",
          iconBg,
        )}
      >
        {variant === "loading" ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : Icon ? (
          <Icon className="size-5" aria-hidden="true" />
        ) : null}
      </span>

      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="text-foreground text-base font-semibold">
          {variant === "loading" ? loadingLabel : title}
        </h3>
        {description ? (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>

      {(onRetry || action) && variant !== "loading" ? (
        <div className="flex items-center gap-2">
          {onRetry ? (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  )
}
