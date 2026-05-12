"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"

export interface FeaturesVisualContent {
  eyebrow?: string
  headline: string
  description: string
  features: {
    icon: ReactNode
    title: string
    description: string
  }[]
  visual: ReactNode
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export function FeaturesVisual({
  content,
}: {
  content: FeaturesVisualContent
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
              className="mt-4 text-base leading-relaxed text-muted-foreground"
            >
              {content.description}
            </motion.p>

            <motion.div
              variants={stagger}
              className="mt-10 space-y-6"
            >
              {content.features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="flex gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
          >
            {content.visual}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
