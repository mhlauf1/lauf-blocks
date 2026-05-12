"use client"

import { motion } from "motion/react"

export interface ContactFormContent {
  eyebrow?: string
  headline: string
  description: string
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    message: { label: string; placeholder: string }
  }
  submitLabel: string
  disclaimer?: string
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

const formStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export function ContactForm({ content }: { content: ContactFormContent }) {
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

        <motion.form
          variants={formStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-12 max-w-lg space-y-6"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.name.label}
            </label>
            <input
              id="contact-name"
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
              htmlFor="contact-email"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.email.label}
            </label>
            <input
              id="contact-email"
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
              htmlFor="contact-message"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.message.label}
            </label>
            <textarea
              id="contact-message"
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

          {content.disclaimer && (
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="text-center text-xs text-muted-foreground"
            >
              {content.disclaimer}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
