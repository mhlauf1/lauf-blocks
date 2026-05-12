"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X, Bell, Search } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export interface DashboardShellNavItem {
  label: string
  href: string
  icon: ReactNode
  active?: boolean
  badge?: string
}

export interface DashboardShellNavGroup {
  label?: string
  items: DashboardShellNavItem[]
}

export interface DashboardShellContent {
  logo: { text: string; href: string }
  nav: DashboardShellNavGroup[]
  user: {
    name: string
    email: string
    initials: string
  }
  searchPlaceholder?: string
  children?: ReactNode
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

function SidebarContent({
  content,
  onNavigate,
}: {
  content: DashboardShellContent
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link
          href={content.logo.href}
          className="font-heading text-lg font-bold tracking-tight text-foreground"
          onClick={onNavigate}
        >
          {content.logo.text}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {content.nav.map((group, gi) => (
          <div key={group.label ?? gi} className={cn(gi > 0 && "mt-6")}>
            {group.label && (
              <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-150",
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <span className="size-5 shrink-0">{item.icon}</span>
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {content.user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {content.user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {content.user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardShell({
  content,
}: {
  content: DashboardShellContent
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden w-60 shrink-0 border-r border-border lg:block">
        <SidebarContent content={content} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="fixed inset-y-0 left-0 z-50 w-60 border-r border-border bg-background lg:hidden"
            >
              <SidebarContent
                content={content}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex flex-1 items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={content.searchPlaceholder ?? "Search..."}
              className="w-full max-w-sm bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>

          <button
            type="button"
            className="relative text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>

          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {content.user.initials}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {content.children ?? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Main content area
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
