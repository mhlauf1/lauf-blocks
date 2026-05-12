"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"

export interface LogoCloudSimpleContent {
  headline?: string
  logos: {
    name: string
    logo: ReactNode
  }[]
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

export function LogoCloudSimple({
  content,
}: {
  content: LogoCloudSimpleContent
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center"
        >
          {content.headline && (
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mb-10 text-center text-sm font-medium text-muted-foreground"
            >
              {content.headline}
            </motion.p>
          )}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {content.logos.map((item) => (
              <div
                key={item.name}
                className="text-muted-foreground/60 transition-colors duration-150 hover:text-muted-foreground"
                aria-label={item.name}
              >
                {item.logo}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
