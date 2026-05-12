"use client"

import { useState } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export interface PricingToggleTier {
  name: string
  description: string
  monthlyPrice: string
  annualPrice: string
  features: string[]
  cta: { label: string; href: string }
  highlighted?: boolean
}

export interface PricingToggleContent {
  eyebrow?: string
  headline: string
  description: string
  annualDiscount?: string
  tiers: [PricingToggleTier, PricingToggleTier]
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const headerStagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const gridStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export function PricingToggle({
  content,
}: {
  content: PricingToggleContent
}) {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          {content.eyebrow && (
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mb-4 text-sm font-medium tracking-wide text-primary uppercase"
            >
              {content.eyebrow}
            </motion.p>
          )}
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
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mt-8 inline-flex items-center gap-3"
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !annual ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-border transition-colors",
                annual ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none block size-5 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200",
                  annual ? "translate-x-5" : "translate-x-0",
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                annual ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Annual
            </span>
            {content.annualDiscount && annual && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {content.annualDiscount}
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2"
        >
          {content.tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className={cn(
                "relative flex flex-col rounded-xl border p-8",
                tier.highlighted
                  ? "border-primary bg-primary/[0.03] ring-1 ring-primary/20"
                  : "border-border",
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Recommended
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.2, ease: easeOutExpo },
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      transition: { duration: 0.15, ease: easeOutExpo },
                    }}
                    className="font-heading text-4xl font-bold tracking-tight text-foreground"
                  >
                    {annual ? tier.annualPrice : tier.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={tier.cta.href}
                  className={cn(
                    buttonVariants({
                      variant: tier.highlighted ? "default" : "outline",
                    }),
                    "w-full",
                  )}
                >
                  {tier.cta.label}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
