"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"

export interface LogoCloudMarqueeContent {
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
    transition: { staggerChildren: 0.08 },
  },
}

export function LogoCloudMarquee({
  content,
}: {
  content: LogoCloudMarqueeContent
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
          >
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

              <div className="flex w-max animate-marquee gap-12">
                {[...content.logos, ...content.logos].map((item, i) => (
                  <div
                    key={`${item.name}-${i}`}
                    className="flex shrink-0 items-center text-muted-foreground/60"
                    aria-label={item.name}
                    aria-hidden={i >= content.logos.length}
                  >
                    {item.logo}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
