"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface HeroFullbleedVideoContent {
  headline: string
  description: string
  cta?: { label: string; href: string }
  video: { src: string; poster?: string; alt: string }
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

export function HeroFullbleedVideo({ content }: { content: HeroFullbleedVideoContent }) {
  const hasVideo = content.video.src !== ""

  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden">
      {hasVideo ? (
        <video
          src={content.video.src}
          poster={content.video.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
          aria-label={content.video.alt}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.33 0.07 175), oklch(0.22 0.04 175), oklch(0.15 0.02 175))",
          }}
          role="img"
          aria-label={content.video.alt}
        >
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: `${120 + i * 60}px`,
                  height: `${120 + i * 60}px`,
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20"
      >
        <div className="max-w-3xl">
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {content.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {content.description}
          </motion.p>

          {content.cta && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <Link
                href={content.cta.href}
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                {content.cta.label}
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
