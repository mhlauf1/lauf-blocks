"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export interface EmptyStateSimpleContent {
  icon: ReactNode
  headline: string
  description: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
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

export function EmptyStateSimple({
  content,
}: {
  content: EmptyStateSimpleContent
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center px-6 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-sm text-center"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground"
        >
          {content.icon}
        </motion.div>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-4 font-heading text-lg font-semibold text-foreground"
        >
          {content.headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
        >
          {content.description}
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={content.primaryAction.href}
            className={cn(buttonVariants({ size: "default" }))}
          >
            {content.primaryAction.label}
          </Link>
          {content.secondaryAction && (
            <Link
              href={content.secondaryAction.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
              )}
            >
              {content.secondaryAction.label}
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
