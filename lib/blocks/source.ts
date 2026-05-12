import sourcesJson from "./.generated/sources.json"
import type { BlockMeta } from "./registry"

const sources = sourcesJson as Record<string, { component: string; content: string }>

export function getBlockComponentSource(block: BlockMeta): string | null {
  return sources[block.slug]?.component ?? null
}

export function getBlockContentSource(block: BlockMeta): string | null {
  return sources[block.slug]?.content ?? null
}

export function getBlockSources(block: BlockMeta): {
  component: string | null
  content: string | null
} {
  return {
    component: getBlockComponentSource(block),
    content: getBlockContentSource(block),
  }
}
