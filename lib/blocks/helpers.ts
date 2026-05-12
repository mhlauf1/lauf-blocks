import {
  blocks,
  type BlockCategory,
  type BlockMeta,
  type BlockSection,
  type BlockTier,
} from "./registry"

export function getAllBlocks(): BlockMeta[] {
  return blocks
}

export function getBlockBySlug(slug: string): BlockMeta | undefined {
  return blocks.find((b) => b.slug === slug)
}

export function getBlocksByCategory(category: BlockCategory): BlockMeta[] {
  return blocks.filter((b) => b.category === category)
}

export function getBlocksBySection(section: BlockSection): BlockMeta[] {
  return blocks.filter((b) => b.section === section)
}

export function getBlocksByTier(tier: BlockTier): BlockMeta[] {
  return blocks.filter((b) => b.tier === tier)
}

export function getFreeBlocks(): BlockMeta[] {
  return getBlocksByTier("free")
}

export function getProBlocks(): BlockMeta[] {
  return getBlocksByTier("pro")
}

export function getCategoriesWithCounts(): {
  category: BlockCategory
  section: BlockSection
  count: number
}[] {
  const seen = new Map<BlockCategory, { section: BlockSection; count: number }>()

  for (const block of blocks) {
    const existing = seen.get(block.category)
    if (existing) {
      existing.count++
    } else {
      seen.set(block.category, { section: block.section, count: 1 })
    }
  }

  return Array.from(seen.entries()).map(([category, { section, count }]) => ({
    category,
    section,
    count,
  }))
}

export function getSectionsWithCategories(): {
  section: BlockSection
  label: string
  categories: { category: BlockCategory; count: number }[]
}[] {
  const sectionOrder: { section: BlockSection; label: string }[] = [
    { section: "marketing", label: "Marketing" },
    { section: "app", label: "App" },
    { section: "templates", label: "Templates" },
  ]

  const categoriesWithCounts = getCategoriesWithCounts()

  return sectionOrder.map(({ section, label }) => ({
    section,
    label,
    categories: categoriesWithCounts.filter((c) => c.section === section),
  }))
}

export function getCategorySlug(category: BlockCategory): string {
  return category.toLowerCase().replace(/\s+/g, "-")
}

export function getCategoryFromSlug(slug: string): BlockCategory | undefined {
  const categories = getCategoriesWithCounts()
  return categories.find((c) => getCategorySlug(c.category) === slug)?.category
}

export function filterBlocks(options: {
  category?: BlockCategory
  section?: BlockSection
  tier?: BlockTier
}): BlockMeta[] {
  return blocks.filter((b) => {
    if (options.category && b.category !== options.category) return false
    if (options.section && b.section !== options.section) return false
    if (options.tier && b.tier !== options.tier) return false
    return true
  })
}
