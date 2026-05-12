"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface CtaNewsletterContent {
  headline: string
  description: string
  inputPlaceholder: string
  buttonLabel: string
  disclaimer?: string
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

export function CtaNewsletter({
  content,
}: {
  content: CtaNewsletterContent
}) {
  return (
    <section className="py-24 sm:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-xl px-6 text-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {content.headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-4 text-base leading-relaxed text-muted-foreground"
        >
          {content.description}
        </motion.p>
        <motion.form
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder={content.inputPlaceholder}
            className="h-10 flex-1 rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className={cn(buttonVariants(), "shrink-0")}
          >
            {content.buttonLabel}
          </button>
        </motion.form>
        {content.disclaimer && (
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mt-4 text-xs text-muted-foreground"
          >
            {content.disclaimer}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
