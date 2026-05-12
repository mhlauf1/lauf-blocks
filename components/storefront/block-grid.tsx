import type { BlockMeta } from "@/lib/blocks/registry"
import { BlockCard } from "./block-card"

export function BlockGrid({ blocks }: { blocks: BlockMeta[] }) {
  if (blocks.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No blocks found.
      </p>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {blocks.map((block) => (
        <BlockCard key={block.slug} block={block} />
      ))}
    </div>
  )
}
