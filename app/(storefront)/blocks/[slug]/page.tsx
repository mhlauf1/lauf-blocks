import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlockBySlug, getCategorySlug } from "@/lib/blocks/helpers"
import { getBlockSources } from "@/lib/blocks/source"
import { highlightCode } from "@/lib/blocks/highlight"
import { getUserPlan } from "@/lib/auth/subscription"
import { TierBadge } from "@/components/storefront/tier-badge"
import { SourcePanel } from "@/components/storefront/source-panel"
import { UpgradeCta } from "@/components/storefront/upgrade-cta"
import { BlockDetailTabs } from "./tabs"

export default async function BlockDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const block = getBlockBySlug(slug)

  if (!block) notFound()

  const plan = await getUserPlan()
  const hasAccess = block.tier === "free" || plan === "pro"

  const sources = getBlockSources(block)
  const componentFileName = block.componentPath.split("/").pop() ?? "component.tsx"
  const contentFileName = block.contentPath.split("/").pop() ?? "content.ts"

  let files: { name: string; code: string; highlightedHtml: string }[] = []

  if (hasAccess && sources.component) {
    const componentHtml = await highlightCode(sources.component)
    files.push({ name: componentFileName, code: sources.component, highlightedHtml: componentHtml })

    if (sources.content) {
      const contentHtml = await highlightCode(sources.content)
      files.push({ name: contentFileName, code: sources.content, highlightedHtml: contentHtml })
    }
  }

  return (
    <div className="px-6 py-10 lg:px-10">
      <Link
        href={`/blocks?category=${getCategorySlug(block.category)}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {block.category}
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.name}
            </h1>
            <TierBadge tier={block.tier} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{block.description}</p>
        </div>
      </div>

      <BlockDetailTabs
        slug={slug}
        previewUrl={`/preview/${slug}`}
        sourcePanel={
          hasAccess ? (
            files.length > 0 ? <SourcePanel files={files} /> : null
          ) : (
            <UpgradeCta />
          )
        }
      />
    </div>
  )
}
