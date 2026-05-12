import { getAllBlocks, getCategoryFromSlug, filterBlocks, getFreeBlocks, getProBlocks } from "@/lib/blocks/helpers"
import { BlockGrid } from "@/components/storefront/block-grid"

export default async function BlocksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categorySlug } = await searchParams
  const category = categorySlug ? getCategoryFromSlug(categorySlug) : undefined

  const blocks = category ? filterBlocks({ category }) : getAllBlocks()
  const freeCount = getFreeBlocks().length
  const proCount = getProBlocks().length

  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          {category ?? "All Blocks"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {category
            ? `${blocks.length} block${blocks.length === 1 ? "" : "s"}`
            : `${freeCount} free · ${proCount} pro · ${freeCount + proCount} total`}
        </p>
      </div>
      <BlockGrid blocks={blocks} />
    </div>
  )
}
