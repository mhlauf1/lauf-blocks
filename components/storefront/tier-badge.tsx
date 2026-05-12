import type { BlockTier } from "@/lib/blocks/registry"
import { cn } from "@/lib/utils"

export function TierBadge({ tier, className }: { tier: BlockTier; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
        tier === "free"
          ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
          : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        className,
      )}
    >
      {tier === "free" ? "Free" : "Pro"}
    </span>
  )
}
