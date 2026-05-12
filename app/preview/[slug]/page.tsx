import { notFound } from "next/navigation"
import { getBlockBySlug } from "@/lib/blocks/helpers"
import { blockComponents } from "@/lib/blocks/component-map"
import { getBlockContent } from "@/lib/blocks/content-map"

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const block = getBlockBySlug(slug)

  if (!block) notFound()

  const Component = blockComponents[slug]
  const content = await getBlockContent(slug)

  if (!Component || !content) notFound()

  return <Component content={content as never} />
}
