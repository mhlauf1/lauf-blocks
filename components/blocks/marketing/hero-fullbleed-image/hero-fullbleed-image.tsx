"use client"

import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface HeroFullbleedImageContent {
  headline: string
  description: string
  cta?: { label: string; href: string }
  image: { src: string; alt: string }
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

export function HeroFullbleedImage({ content }: { content: HeroFullbleedImageContent }) {
  const hasImage = content.image.src !== ""

  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden">
      {hasImage ? (
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.33 0.07 175), oklch(0.22 0.04 175), oklch(0.15 0.02 175))",
          }}
          role="img"
          aria-label={content.image.alt}
        />
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
