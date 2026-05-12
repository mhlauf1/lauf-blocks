"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface FeaturesAlternatingContent {
  eyebrow?: string
  headline: string
  description: string
  rows: {
    icon: ReactNode
    title: string
    description: string
    bullets?: string[]
    visual: ReactNode
  }[]
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

export function FeaturesAlternating({
  content,
}: {
  content: FeaturesAlternatingContent
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={stagger}
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

        <div className="mt-20 space-y-24 lg:space-y-32">
          {content.rows.map((row, i) => (
            <div
              key={row.title}
              className={cn(
                "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
                i % 2 === 1 && "lg:[&>:first-child]:order-2",
              )}
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                >
                  {row.icon}
                </motion.div>
                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {row.title}
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="mt-4 text-base leading-relaxed text-muted-foreground"
                >
                  {row.description}
                </motion.p>
                {row.bullets && row.bullets.length > 0 && (
                  <motion.ul
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    className="mt-6 space-y-3"
                  >
                    {row.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
              >
                {row.visual}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
