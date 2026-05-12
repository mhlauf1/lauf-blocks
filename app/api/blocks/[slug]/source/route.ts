import { NextResponse } from "next/server"
import { getBlockBySlug } from "@/lib/blocks/helpers"
import { getBlockSources } from "@/lib/blocks/source"
import { getUserPlan } from "@/lib/auth/subscription"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const block = getBlockBySlug(slug)

  if (!block) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 })
  }

  if (block.tier === "pro") {
    const plan = await getUserPlan()
    if (plan !== "pro") {
      return NextResponse.json({ error: "Pro subscription required" }, { status: 403 })
    }
  }

  const sources = getBlockSources(block)
  return NextResponse.json(sources)
}
