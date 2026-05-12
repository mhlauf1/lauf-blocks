"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface DashboardMetricCard {
  label: string
  value: string
  change?: { value: string; positive: boolean }
  icon: ReactNode
}

export interface DashboardActivityItem {
  title: string
  description: string
  time: string
  icon: ReactNode
}

export interface DashboardOverviewContent {
  greeting: string
  subtitle?: string
  metrics: DashboardMetricCard[]
  activity: {
    title: string
    items: DashboardActivityItem[]
  }
  chart: {
    title: string
    subtitle?: string
  }
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

function ChartPlaceholder() {
  const bars = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68]
  return (
    <div className="flex h-48 items-end gap-2 pt-4">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + i * 0.04,
            ease: easeOutExpo,
          }}
          className="flex-1 origin-bottom rounded-t bg-primary/20"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

export function DashboardOverview({
  content,
}: {
  content: DashboardOverviewContent
}) {
  return (
    <div>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {content.greeting}
          </h1>
          {content.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">
              {content.subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="text-muted-foreground/60">{metric.icon}</div>
              </div>
              <p className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
                {metric.value}
              </p>
              {metric.change && (
                <p
                  className={cn(
                    "mt-1 text-xs font-medium",
                    metric.change.positive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400",
                  )}
                >
                  {metric.change.value}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="rounded-xl border border-border p-5 lg:col-span-3"
          >
            <div>
              <h2 className="font-heading text-base font-semibold text-foreground">
                {content.chart.title}
              </h2>
              {content.chart.subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {content.chart.subtitle}
                </p>
              )}
            </div>
            <ChartPlaceholder />
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="rounded-xl border border-border p-5 lg:col-span-2"
          >
            <h2 className="font-heading text-base font-semibold text-foreground">
              {content.activity.title}
            </h2>
            <ul className="mt-4 space-y-4">
              {content.activity.items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </time>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
