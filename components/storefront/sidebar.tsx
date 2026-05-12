"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getSectionsWithCategories, getCategorySlug } from "@/lib/blocks/helpers"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")
  const sections = getSectionsWithCategories()

  return (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
      <Link
        href="/blocks"
        className={cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          !activeCategory
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        All Blocks
      </Link>

      {sections.map(({ section, label, categories }) => (
        <div key={section}>
          <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            {label}
          </h3>
          <ul className="mt-2 space-y-0.5">
            {categories.map(({ category, count }) => {
              const slug = getCategorySlug(category)
              const isActive = activeCategory === slug
              return (
                <li key={category}>
                  <Link
                    href={`/blocks?category=${slug}`}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {category}
                    <span className="text-[11px] tabular-nums text-muted-foreground/60">
                      {count}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
