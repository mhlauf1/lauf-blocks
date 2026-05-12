"use client"

import { useState, useMemo, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import { motion } from "motion/react"

export interface DataTableColumn<T> {
  key: keyof T & string
  label: string
  sortable?: boolean
  render?: (row: T) => ReactNode
}

export interface DataTableFullContent<T> {
  headline: string
  description?: string
  columns: DataTableColumn<T>[]
  data: T[]
  searchPlaceholder?: string
  pageSize?: number
  bulkActions?: { label: string; onClick: (ids: Set<string>) => void }[]
  idKey: keyof T & string
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

type SortDir = "asc" | "desc"

export function DataTableFull<T extends Record<string, unknown>>({
  content,
}: {
  content: DataTableFullContent<T>
}) {
  const pageSize = content.pageSize ?? 10
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!search) return content.data
    const q = search.toLowerCase()
    return content.data.filter((row) =>
      content.columns.some((col) =>
        String(row[col.key]).toLowerCase().includes(q),
      ),
    )
  }, [content.data, content.columns, search])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey as keyof T])
      const bv = String(b[sortKey as keyof T])
      const cmp = av.localeCompare(bv, undefined, { numeric: true })
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(0)
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selected.size === paged.length) {
      setSelected(new Set())
    } else {
      setSelected(
        new Set(paged.map((r) => String(r[content.idKey]))),
      )
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {content.headline}
          </h1>
          {content.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {content.description}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(0)
              }}
              placeholder={content.searchPlaceholder ?? "Search..."}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:w-64"
            />
          </div>

          {content.bulkActions && selected.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {selected.size} selected
              </span>
              {content.bulkActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => action.onClick(selected)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-4 overflow-x-auto rounded-xl border border-border"
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={paged.length > 0 && selected.size === paged.length}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                    className="size-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                  />
                </th>
                {content.columns.map((col) => (
                  <th key={col.key} className="px-4 py-3">
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className="flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {col.label}
                        <span className="flex flex-col">
                          <ChevronUp
                            className={cn(
                              "size-3 -mb-0.5",
                              sortKey === col.key && sortDir === "asc"
                                ? "text-foreground"
                                : "text-muted-foreground/40",
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "size-3 -mt-0.5",
                              sortKey === col.key && sortDir === "desc"
                                ? "text-foreground"
                                : "text-muted-foreground/40",
                            )}
                          />
                        </span>
                      </button>
                    ) : (
                      <span className="font-medium text-muted-foreground">
                        {col.label}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={content.columns.length + 1}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                paged.map((row) => {
                  const id = String(row[content.idKey])
                  return (
                    <tr
                      key={id}
                      className={cn(
                        "border-b border-border transition-colors last:border-0",
                        selected.has(id) ? "bg-primary/[0.03]" : "hover:bg-muted/30",
                      )}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(id)}
                          onChange={() => toggleRow(id)}
                          aria-label={`Select row ${id}`}
                          className="size-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </td>
                      {content.columns.map((col) => (
                        <td
                          key={col.key}
                          className="whitespace-nowrap px-4 py-3 text-foreground"
                        >
                          {col.render
                            ? col.render(row)
                            : String(row[col.key])}
                        </td>
                      ))}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-4 flex items-center justify-between"
        >
          <p className="text-xs text-muted-foreground">
            {sorted.length === 0
              ? "No results"
              : `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, sorted.length)} of ${sorted.length}`}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous page"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-2 text-xs text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Next page"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
