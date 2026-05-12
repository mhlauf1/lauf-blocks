"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BlockDetailTabsProps {
  slug: string
  previewUrl: string
  sourcePanel: ReactNode
}

export function BlockDetailTabs({ slug, previewUrl, sourcePanel }: BlockDetailTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview")

  return (
    <div>
      <div className="mb-4 flex gap-1 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={cn(
            "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
            tab === "preview"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setTab("code")}
          className={cn(
            "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
            tab === "code"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          Code
        </button>
      </div>

      {tab === "preview" ? (
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            key={slug}
            src={previewUrl}
            title={`Preview of ${slug}`}
            className="h-[700px] w-full"
          />
        </div>
      ) : (
        sourcePanel
      )}
    </div>
  )
}
