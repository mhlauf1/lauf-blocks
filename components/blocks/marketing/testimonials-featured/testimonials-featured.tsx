"use client"

import Image from "next/image"
import { Quote } from "lucide-react"
import { motion } from "motion/react"

export interface TestimonialsFeaturedContent {
  quote: string
  name: string
  role: string
  company?: string
  avatar?: { src: string; alt: string }
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

export function TestimonialsFeatured({
  content,
}: {
  content: TestimonialsFeaturedContent
}) {
  return (
    <section className="py-24 sm:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="flex justify-center"
        >
          <Quote className="size-10 text-primary/30" />
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-8"
        >
          <p className="font-heading text-2xl font-semibold leading-relaxed tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            &ldquo;{content.quote}&rdquo;
          </p>
        </motion.blockquote>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          {content.avatar ? (
            <Image
              src={content.avatar.src}
              alt={content.avatar.alt}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
              {content.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
          <div>
            <p className="font-heading text-base font-semibold text-foreground">
              {content.name}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {content.role}
              {content.company && `, ${content.company}`}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
