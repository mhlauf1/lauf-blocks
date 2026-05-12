import { writeFileSync } from "node:fs"
import { join, resolve, basename } from "node:path"
import { fileURLToPath } from "node:url"
import { blocks } from "../lib/blocks/registry"

const root = resolve(join(fileURLToPath(import.meta.url), "../.."))
const outDir = join(root, "lib/blocks")

function toPascalCase(kebab: string): string {
  return kebab
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function toCamelCase(kebab: string): string {
  const pascal = toPascalCase(kebab)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

function getComponentBaseName(componentPath: string): string {
  return basename(componentPath, ".tsx")
}

function getContentBaseName(contentPath: string): string {
  return basename(contentPath).replace(/\.content\.(tsx?|ts)$/, "")
}

// ── Component Map ──

const componentMapLines = blocks.map((block) => {
  const importPath = `@/${block.componentPath.replace(/\.tsx$/, "")}`
  const exportName = toPascalCase(getComponentBaseName(block.componentPath))
  return `  "${block.slug}": dynamic(() => import("${importPath}").then((m) => ({ default: m.${exportName} }))),`
})

const componentMapContent = `import dynamic from "next/dynamic"
import type { ComponentType } from "react"

export const blockComponents: Record<string, ComponentType<{ content: never }>> = {
${componentMapLines.join("\n")}
}
`

writeFileSync(join(outDir, "component-map.ts"), componentMapContent)
console.log(`Generated component-map.ts (${blocks.length} entries)`)

// ── Content Map ──

const contentMapLines = blocks.map((block) => {
  const importPath = `@/${block.contentPath.replace(/\.(tsx?|ts)$/, "")}`
  const contentBaseName = getContentBaseName(block.contentPath)
  const contentVarName = `${toCamelCase(contentBaseName)}Content`
  return `    "${block.slug}": () => import("${importPath}").then((m) => m.${contentVarName}),`
})

const contentMapContent = `export async function getBlockContent(slug: string): Promise<unknown> {
  const contentModules: Record<string, () => Promise<unknown>> = {
${contentMapLines.join("\n")}
  }

  const loader = contentModules[slug]
  if (!loader) return null
  return loader()
}
`

writeFileSync(join(outDir, "content-map.ts"), contentMapContent)
console.log(`Generated content-map.ts (${blocks.length} entries)`)
