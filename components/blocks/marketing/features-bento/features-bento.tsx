"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export type BentoSpan = "1x1" | "2x1" | "1x2" | "2x2"

export interface BentoCard {
  icon: ReactNode
  title: string
  description: string
  span: BentoSpan
  visual?: ReactNode
}

export interface FeaturesBentoContent {
  eyebrow?: string
  headline: string
  description: string
  cards: BentoCard[]
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

const spanClasses: Record<BentoSpan, string> = {
  "1x1": "",
  "2x1": "sm:col-span-2",
  "1x2": "sm:row-span-2",
  "2x2": "sm:col-span-2 sm:row-span-2",
}

export function FeaturesBento({
  content,
}: {
  content: FeaturesBentoContent
}) {
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
          className="mt-16 grid auto-rows-[minmax(180px,1fr)] gap-4 sm:grid-cols-3"
        >
          {content.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl border border-border p-6",
                spanClasses[card.span],
              )}
            >
              <div className="relative z-10">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {card.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
              {card.visual && (
                <div className="relative mt-auto pt-4">
                  {card.visual}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
