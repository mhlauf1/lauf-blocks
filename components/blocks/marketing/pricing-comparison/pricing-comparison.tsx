"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Minus } from "lucide-react"
import { motion } from "motion/react"

export type FeatureValue = boolean | string

export interface PricingComparisonPlan {
  name: string
  price: string
  period?: string
  cta: { label: string; href: string }
  highlighted?: boolean
}

export interface PricingComparisonFeature {
  name: string
  values: FeatureValue[]
}

export interface PricingComparisonCategory {
  name: string
  features: PricingComparisonFeature[]
}

export interface PricingComparisonContent {
  eyebrow?: string
  headline: string
  description: string
  plans: PricingComparisonPlan[]
  categories: PricingComparisonCategory[]
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

function CellValue({ value }: { value: FeatureValue }) {
  if (value === true) {
    return <Check className="mx-auto size-4 text-primary" />
  }
  if (value === false) {
    return <Minus className="mx-auto size-4 text-muted-foreground/40" />
  }
  return (
    <span className="text-sm text-muted-foreground">{value}</span>
  )
}

export function PricingComparison({
  content,
}: {
  content: PricingComparisonContent
}) {
  const planCount = content.plans.length

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={stagger}
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
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
          className="mt-16 overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 pb-8 text-left" />
                {content.plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={cn(
                      "pb-8 text-center",
                      plan.highlighted && "relative",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl px-4 py-5",
                        plan.highlighted
                          ? "border border-primary bg-primary/[0.03] ring-1 ring-primary/20"
                          : "",
                      )}
                    >
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {plan.name}
                      </p>
                      <div className="mt-2 flex items-baseline justify-center gap-1">
                        <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-sm text-muted-foreground">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <Link
                          href={plan.cta.href}
                          className={cn(
                            buttonVariants({
                              variant: plan.highlighted
                                ? "default"
                                : "outline",
                              size: "sm",
                            }),
                            "w-full",
                          )}
                        >
                          {plan.cta.label}
                        </Link>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.categories.map((category) => (
                <>
                  <tr key={`cat-${category.name}`}>
                    <td
                      colSpan={planCount + 1}
                      className="pb-3 pt-8 text-sm font-semibold text-foreground"
                    >
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-t border-border"
                    >
                      <td className="py-3.5 pr-4 text-sm text-muted-foreground">
                        {feature.name}
                      </td>
                      {feature.values.map((value, vi) => (
                        <td
                          key={`${feature.name}-${content.plans[vi].name}`}
                          className="py-3.5 text-center"
                        >
                          <CellValue value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
