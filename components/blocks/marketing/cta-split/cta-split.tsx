"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface CtaSplitContent {
  headline: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
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

export function CtaSplit({ content }: { content: CtaSplitContent }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-border bg-muted/30 px-8 py-12 sm:px-12 lg:flex-row lg:items-center"
        >
          <div className="max-w-xl">
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {content.headline}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mt-3 text-base leading-relaxed text-muted-foreground"
            >
              {content.description}
            </motion.p>
          </div>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex shrink-0 flex-col gap-3 sm:flex-row"
          >
            <Link
              href={content.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {content.primaryCta.label}
            </Link>
            {content.secondaryCta && (
              <Link
                href={content.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                )}
              >
                {content.secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
