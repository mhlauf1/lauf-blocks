import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { blocks } from "../lib/blocks/registry"

const root = resolve(join(fileURLToPath(import.meta.url), "../.."))

interface SourceEntry {
  component: string
  content: string
}

const sources: Record<string, SourceEntry> = {}

for (const block of blocks) {
  const componentPath = join(root, block.componentPath)
  const contentPath = join(root, block.contentPath)

  try {
    sources[block.slug] = {
      component: readFileSync(componentPath, "utf-8"),
      content: readFileSync(contentPath, "utf-8"),
    }
  } catch (err) {
    console.error(`Failed to read sources for ${block.slug}:`, err)
    process.exit(1)
  }
}

const outDir = join(root, "lib/blocks/.generated")
mkdirSync(outDir, { recursive: true })

writeFileSync(join(outDir, "sources.json"), JSON.stringify(sources, null, 2))

console.log(`Prebuild complete: ${Object.keys(sources).length} blocks cached.`)
