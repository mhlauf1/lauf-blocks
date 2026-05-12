"use client"

import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface HeroDashboardContent {
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

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

function DashboardMockup({ alt }: { alt: string }) {
  return (
    <div
      className="w-full rounded-xl border border-border bg-card"
      role="img"
      aria-label={alt}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-foreground/10" />
          <div className="size-2.5 rounded-full bg-foreground/10" />
          <div className="size-2.5 rounded-full bg-foreground/10" />
        </div>
        <div className="mx-auto h-2.5 w-48 rounded bg-foreground/[0.06]" />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Active workflows", value: "1,284" },
            { label: "Success rate", value: "99.7%" },
            { label: "Avg. run time", value: "1.2s" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border p-4">
              <div className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase sm:text-xs">
                {stat.label}
              </div>
              <div className="mt-1 font-heading text-lg font-bold text-foreground sm:text-2xl">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-32 rounded-lg border border-border p-4 sm:h-40">
            <div className="flex h-full items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="rounded-sm bg-primary/20"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-8 rounded-md bg-foreground/[0.04]" />
            <div className="h-8 rounded-md bg-foreground/[0.04]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroDashboard({ content }: { content: HeroDashboardContent }) {
  const hasRealImage = content.image.src !== ""

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
            <DashboardMockup alt={content.image.alt} />
          )}
        </motion.div>
      </div>
    </section>
  )
}
