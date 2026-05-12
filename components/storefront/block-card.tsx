import Link from "next/link"
import type { BlockMeta } from "@/lib/blocks/registry"
import { TierBadge } from "./tier-badge"

export function BlockCard({ block }: { block: BlockMeta }) {
  return (
    <Link
      href={`/blocks/${block.slug}`}
      className="group rounded-lg border border-border p-5 transition-colors duration-150 hover:bg-muted/50"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary">
          {block.name}
        </h3>
        <TierBadge tier={block.tier} />
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {block.description}
      </p>
    </Link>
  )
}
