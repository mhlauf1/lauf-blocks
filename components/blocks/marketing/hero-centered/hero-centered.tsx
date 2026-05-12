"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface HeroCenteredContent {
  eyebrow: string
  headline: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  trustedBy?: { name: string; logo: ReactNode }[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export function HeroCentered({ content }: { content: HeroCenteredContent }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center sm:pt-40 lg:pt-48">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-block rounded-full border border-border bg-muted/60 px-4 py-1.5 font-heading text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            {content.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {content.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href={content.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {content.primaryCta.label}
            </Link>
            {content.secondaryCta && (
              <Link
                href={content.secondaryCta.href}
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full sm:w-auto")}
              >
                {content.secondaryCta.label}
              </Link>
            )}
          </motion.div>

          {content.trustedBy && content.trustedBy.length > 0 && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 border-t border-border pt-10"
            >
              <p className="mb-6 text-xs font-medium tracking-wide text-muted-foreground/60 uppercase">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                {content.trustedBy.map((company) => (
                  <div
                    key={company.name}
                    className="text-muted-foreground/40 transition-colors duration-200 hover:text-muted-foreground/70"
                    aria-label={company.name}
                  >
                    {company.logo}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
