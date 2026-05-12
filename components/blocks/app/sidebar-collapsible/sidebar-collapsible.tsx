"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PanelLeftClose, PanelLeft } from "lucide-react"
import { motion } from "motion/react"

export interface SidebarCollapsibleNavItem {
  label: string
  href: string
  icon: ReactNode
  active?: boolean
  badge?: string
}

export interface SidebarCollapsibleNavGroup {
  label?: string
  items: SidebarCollapsibleNavItem[]
}

export interface SidebarCollapsibleContent {
  logo: { text: string; icon: ReactNode; href: string }
  nav: SidebarCollapsibleNavGroup[]
  user: {
    name: string
    email: string
    initials: string
  }
  children?: ReactNode
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function SidebarCollapsible({
  content,
}: {
  content: SidebarCollapsibleContent
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: easeOutExpo }}
        className="flex shrink-0 flex-col border-r border-border"
      >
        <div className="flex h-14 items-center border-b border-border px-3">
          <Link
            href={content.logo.href}
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {content.logo.icon}
            </div>
            {!collapsed && (
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                {content.logo.text}
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4">
          {content.nav.map((group, gi) => (
            <div key={group.label ?? gi} className={cn(gi > 0 && "mt-6")}>
              {group.label && !collapsed && (
                <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {group.label}
                </p>
              )}
              {group.label && collapsed && (
                <div className="mx-auto mb-2 h-px w-6 bg-border" />
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-150",
                        collapsed && "justify-center",
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span className="size-5 shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-2">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg px-2 py-2",
              collapsed && "justify-center",
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {content.user.initials}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {content.user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {content.user.email}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground",
              collapsed && "justify-center",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="size-5 shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="size-5 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 overflow-y-auto p-6">
        {content.children ?? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">Main content area</p>
          </div>
        )}
      </main>
    </div>
  )
}
