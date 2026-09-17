import type { ComponentProps } from "react"
import type { LucideIcon } from "lucide-react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "cn"
import type { StatusTone } from "@/features/roadside/status"

export type TimelineItemState = "completed" | "active" | "pending" | "muted"

export type TimelineItem = {
  id: string
  title: string
  description?: string
  /** ISO 8601 string or a pre-formatted label such as "2 min ago". */
  time?: string
  icon?: LucideIcon | null
  state?: TimelineItemState
  tone?: StatusTone
}

export type TimelineProps = ComponentProps<"ol"> & {
  items: TimelineItem[]
  /** Marks the item(s) to follow as muted instead of pending. */
  mutedBehindActive?: boolean
}

const toneLine: Record<StatusTone, string> = {
  neutral: "bg-border",
  info: "bg-blue-200",
  success: "bg-green-200",
  warning: "bg-amber-200",
  danger: "bg-red-200",
  primary: "bg-orange-200",
}

const toneIconBg: Record<StatusTone, string> = {
  neutral: "bg-muted text-muted-foreground ring-border",
  info: "bg-blue-50 text-blue-600 ring-blue-200",
  success: "bg-green-50 text-green-600 ring-green-200",
  warning: "bg-amber-50 text-amber-600 ring-amber-200",
  danger: "bg-red-50 text-red-600 ring-red-200",
  primary: "bg-orange-50 text-orange-600 ring-orange-200",
}

function TimelineNode({
  item,
  index,
  total,
  mutedBehindActive,
}: {
  item: TimelineItem
  index: number
  total: number
  mutedBehindActive: boolean
}) {
  const state = item.state
  const muted = state === "muted" || (state === "pending" && mutedBehindActive)
  const isLast = index === total - 1
  const Icon = item.icon ?? null

  const iconAtom =
    Icon !== null ? (
      <Icon className="size-4 shrink-0" aria-hidden="true" />
    ) : state === "completed" ? (
      <Check className="size-4 shrink-0" aria-hidden="true" />
    ) : state === "active" ? (
      <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
    ) : (
      <span className="size-2 rounded-full" aria-hidden="true" />
    )

  return (
    <li className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-inset",
            muted
              ? "bg-muted text-muted-foreground ring-border"
              : toneIconBg[item.tone ?? "neutral"],
            state === "active" && !muted && "ring-2 ring-orange-300",
          )}
        >
          {iconAtom}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className={cn(
              "mt-1 w-px grow",
              muted ? "bg-border" : toneLine[item.tone ?? "neutral"],
            )}
          />
        ) : null}
      </div>

      <div
        className={cn("flex min-w-0 flex-1 flex-col pb-6", isLast && "pb-0")}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "text-sm font-medium",
              muted && "text-muted-foreground",
            )}
          >
            {item.title}
          </span>
          {item.time ? (
            <time className="text-muted-foreground text-xs">{item.time}</time>
          ) : null}
        </div>
        {item.description ? (
          <p
            className={cn(
              "text-muted-foreground mt-0.5 text-sm",
              muted && "text-muted-foreground/70",
            )}
          >
            {item.description}
          </p>
        ) : null}
      </div>
    </li>
  )
}

export function Timeline({
  items,
  mutedBehindActive = false,
  className,
  ...props
}: TimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => (
        <TimelineNode
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          mutedBehindActive={mutedBehindActive}
        />
      ))}
    </ol>
  )
}
