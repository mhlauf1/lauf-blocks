"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface SettingsTabbedTab {
  id: string
  label: string
  icon: ReactNode
  content: ReactNode
}

export interface SettingsTabbedContent {
  headline: string
  description?: string
  tabs: SettingsTabbedTab[]
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

export function SettingsTabbed({
  content,
}: {
  content: SettingsTabbedContent
}) {
  const [activeTab, setActiveTab] = useState(content.tabs[0].id)
  const activePanel = content.tabs.find((t) => t.id === activeTab)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
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
          className="mt-8"
        >
          <div className="flex gap-6 border-b border-border">
            <nav className="flex gap-1" role="tablist" aria-label="Settings">
              {content.tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="size-4 shrink-0">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="settings-tab-indicator"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                      transition={{ duration: 0.2, ease: easeOutExpo }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {activePanel && (
            <motion.div
              key={activePanel.id}
              id={`panel-${activePanel.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="pt-8"
            >
              {activePanel.content}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
