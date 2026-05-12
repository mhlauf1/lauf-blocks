"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Play } from "lucide-react"

export interface HeroVideoContent {
  eyebrow: string
  headline: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  video: {
    src: string
    poster?: string
    alt: string
  }
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

export function HeroVideo({ content }: { content: HeroVideoContent }) {
  const hasVideo = content.video.src !== ""

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40 lg:pt-48">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          {hasVideo ? (
            <video
              src={content.video.src}
              poster={content.video.poster}
              controls
              playsInline
              className="w-full rounded-xl border border-border"
              aria-label={content.video.alt}
            />
          ) : (
            <div
              className="relative aspect-video w-full rounded-xl border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.13 175 / 0.12), oklch(0.68 0.13 175 / 0.06), oklch(0.97 0 0))",
              }}
              role="img"
              aria-label={content.video.alt}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground">
                  <Play className="size-6 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="h-2.5 w-3/4 rounded bg-foreground/[0.06]" />
                <div className="h-2 w-1/2 rounded bg-foreground/[0.04]" />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
