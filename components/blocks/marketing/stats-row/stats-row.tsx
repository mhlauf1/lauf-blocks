"use client"

import { motion } from "motion/react"

export interface StatsRowContent {
  eyebrow?: string
  headline?: string
  stats: {
    value: string
    label: string
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

export function StatsRow({ content }: { content: StatsRowContent }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {(content.eyebrow || content.headline) && (
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
            {content.headline && (
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {content.headline}
              </motion.h2>
            )}
          </motion.div>
        )}

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="text-center"
            >
              <p className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
