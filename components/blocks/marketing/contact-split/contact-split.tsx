"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"

export interface ContactSplitContent {
  headline: string
  description: string
  details: {
    icon: ReactNode
    label: string
    value: string
  }[]
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    message: { label: string; placeholder: string }
  }
  submitLabel: string
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const leftStagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const rightStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export function ContactSplit({ content }: { content: ContactSplitContent }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            variants={leftStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {content.description}
            </motion.p>

            <motion.dl
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mt-10 space-y-6"
            >
              {content.details.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {detail.icon}
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-foreground">
                      {detail.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-muted-foreground">
                      {detail.value}
                    </dd>
                  </div>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.form
            variants={rightStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6 rounded-xl border border-border p-6 sm:p-8"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <label
                htmlFor="split-name"
                className="block text-sm font-medium text-foreground"
              >
                {content.fields.name.label}
              </label>
              <input
                id="split-name"
                name="name"
                type="text"
                required
                placeholder={content.fields.name.placeholder}
                className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <label
                htmlFor="split-email"
                className="block text-sm font-medium text-foreground"
              >
                {content.fields.email.label}
              </label>
              <input
                id="split-email"
                name="email"
                type="email"
                required
                placeholder={content.fields.email.placeholder}
                className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <label
                htmlFor="split-message"
                className="block text-sm font-medium text-foreground"
              >
                {content.fields.message.label}
              </label>
              <textarea
                id="split-message"
                name="message"
                required
                rows={5}
                placeholder={content.fields.message.placeholder}
                className="mt-2 block w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {content.submitLabel}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
