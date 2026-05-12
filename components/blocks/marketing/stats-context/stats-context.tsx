"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"

export interface StatsContextContent {
  eyebrow?: string
  headline: string
  description: string
  stats: {
    icon?: ReactNode
    value: string
    label: string
    description: string
  }[]
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const headerStagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const gridStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export function StatsContext({ content }: { content: StatsContextContent }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          {content.eyebrow && (
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mb-4 text-sm font-medium tracking-wide text-primary uppercase"
            >
              {content.eyebrow}
            </motion.p>
          )}
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {content.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {content.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="rounded-xl border border-border p-6 sm:p-8"
            >
              {stat.icon && (
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {stat.icon}
                </div>
              )}
              <p className="font-heading text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
