"use client"

import { useState } from "react"
import { CopyButton } from "./copy-button"
import { cn } from "@/lib/utils"

interface SourcePanelProps {
  files: { name: string; code: string; highlightedHtml: string }[]
}

export function SourcePanel({ files }: SourcePanelProps) {
  const [activeFile, setActiveFile] = useState(0)
  const current = files[activeFile]

  if (!current) return null

  return (
    <div className="rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex gap-1">
          {files.map((file, i) => (
            <button
              key={file.name}
              type="button"
              onClick={() => setActiveFile(i)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                i === activeFile
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {file.name}
            </button>
          ))}
        </div>
        <CopyButton text={current.code} />
      </div>
      <div
        className="max-h-[600px] overflow-auto p-4 text-sm [&_pre]:!bg-transparent [&_code]:text-[13px] [&_code]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: current.highlightedHtml }}
      />
    </div>
  )
}
