"use client"

import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface HeroSplitContent {
  eyebrow: string
  headline: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image: { src: string; alt: string; width: number; height: number }
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export function HeroSplit({ content }: { content: HeroSplitContent }) {
  const hasRealImage = content.image.src !== ""

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-32 sm:pt-40 lg:grid-cols-2 lg:gap-16 lg:pt-48">
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
            className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {content.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
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
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          {hasRealImage ? (
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              className="rounded-xl border border-border"
              priority
            />
          ) : (
            <div
              className="aspect-[4/3] w-full rounded-xl border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.13 175 / 0.15), oklch(0.68 0.13 175 / 0.08), oklch(0.97 0 0))",
              }}
              role="img"
              aria-label={content.image.alt}
            >
              <div className="flex h-full items-center justify-center">
                <div className="space-y-3 px-8">
                  <div className="mx-auto h-3 w-48 rounded bg-foreground/[0.06]" />
                  <div className="mx-auto h-3 w-36 rounded bg-foreground/[0.04]" />
                  <div className="mx-auto mt-6 h-24 w-64 rounded-lg bg-foreground/[0.04]" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
