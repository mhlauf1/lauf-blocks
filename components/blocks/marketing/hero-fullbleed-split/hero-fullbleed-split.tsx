"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface HeroFullbleedSplitContent {
  headline: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  media:
    | { type: "video"; src: string; poster?: string; alt: string }
    | { type: "image"; src: string; alt: string }
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

export function HeroFullbleedSplit({ content }: { content: HeroFullbleedSplitContent }) {
  const hasMedia = content.media.src !== ""

  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden">
      {hasMedia ? (
        content.media.type === "video" ? (
          <video
            src={content.media.src}
            poster={content.media.poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover"
            aria-label={content.media.alt}
          />
        ) : (
          <img
            src={content.media.src}
            alt={content.media.alt}
            className="absolute inset-0 size-full object-cover"
          />
        )
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.33 0.07 175), oklch(0.22 0.04 175), oklch(0.15 0.02 175))",
          }}
          role="img"
          aria-label={content.media.alt}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-2xl lg:flex-1"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {content.headline}
            </motion.h1>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-sm lg:flex-shrink-0"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {content.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link
                href={content.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/30 bg-white text-black hover:bg-white/90 hover:text-black"
                )}
              >
                {content.primaryCta.label}
              </Link>
              {content.secondaryCta && (
                <Link
                  href={content.secondaryCta.href}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  {content.secondaryCta.label}
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
