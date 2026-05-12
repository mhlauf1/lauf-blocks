"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export interface FaqAccordionContent {
  eyebrow?: string
  headline: string
  description: string
  items: {
    question: string
    answer: string
  }[]
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

const listStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

function AccordionItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="font-heading text-base font-semibold text-foreground sm:text-lg">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { height: { duration: 0.25, ease: easeOutExpo }, opacity: { duration: 0.2, delay: 0.05, ease: easeOutExpo } },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { height: { duration: 0.2, ease: easeOutExpo }, opacity: { duration: 0.15, ease: easeOutExpo } },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqAccordion({ content }: { content: FaqAccordionContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
        </motion.div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-12 max-w-2xl"
        >
          {content.items.map((item, index) => (
            <motion.div
              key={item.question}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <AccordionItem
                question={item.question}
                answer={item.answer}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
