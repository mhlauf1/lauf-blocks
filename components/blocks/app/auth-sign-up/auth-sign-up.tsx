"use client"

import Link from "next/link"
import { motion } from "motion/react"

export interface AuthSignUpContent {
  logo: { text: string; href: string }
  headline: string
  description?: string
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    password: { label: string; placeholder: string }
  }
  termsLabel: string
  termsLinks: { label: string; href: string }[]
  submitLabel: string
  signInPrompt: { text: string; linkLabel: string; href: string }
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export function AuthSignUp({ content }: { content: AuthSignUpContent }) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-center"
        >
          <Link
            href={content.logo.href}
            className="font-heading text-xl font-bold tracking-tight text-foreground"
          >
            {content.logo.text}
          </Link>
          <h1 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground">
            {content.headline}
          </h1>
          {content.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {content.description}
            </p>
          )}
        </motion.div>

        <motion.form
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 space-y-4"
        >
          <div>
            <label
              htmlFor="signup-name"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.name.label}
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              placeholder={content.fields.name.placeholder}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.email.label}
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              placeholder={content.fields.email.placeholder}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.password.label}
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              required
              placeholder={content.fields.password.placeholder}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="signup-terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 size-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
            />
            <label
              htmlFor="signup-terms"
              className="text-sm text-muted-foreground"
            >
              {content.termsLabel}{" "}
              {content.termsLinks.map((link, i) => (
                <span key={link.label}>
                  {i > 0 && " and "}
                  <Link
                    href={link.href}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {content.submitLabel}
          </button>
        </motion.form>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          {content.signInPrompt.text}{" "}
          <Link
            href={content.signInPrompt.href}
            className="font-medium text-primary hover:text-primary/80"
          >
            {content.signInPrompt.linkLabel}
          </Link>
        </motion.p>
      </motion.div>
    </section>
  )
}
