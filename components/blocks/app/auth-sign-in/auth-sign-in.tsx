"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { type ReactNode } from "react"

export interface AuthSignInContent {
  logo: { text: string; href: string }
  headline: string
  description?: string
  fields: {
    email: { label: string; placeholder: string }
    password: { label: string; placeholder: string }
  }
  submitLabel: string
  forgotPasswordLabel: string
  forgotPasswordHref: string
  socialProviders?: {
    label: string
    icon: ReactNode
    href: string
  }[]
  signUpPrompt: { text: string; linkLabel: string; href: string }
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

export function AuthSignIn({ content }: { content: AuthSignInContent }) {
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

        {content.socialProviders && content.socialProviders.length > 0 && (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mt-8 space-y-3"
          >
            {content.socialProviders.map((provider) => (
              <Link
                key={provider.label}
                href={provider.href}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {provider.icon}
                {provider.label}
              </Link>
            ))}
          </motion.div>
        )}

        {content.socialProviders && content.socialProviders.length > 0 && (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                or
              </span>
            </div>
          </motion.div>
        )}

        <motion.form
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          onSubmit={(e) => e.preventDefault()}
          className={content.socialProviders ? "space-y-4" : "mt-8 space-y-4"}
        >
          <div>
            <label
              htmlFor="signin-email"
              className="block text-sm font-medium text-foreground"
            >
              {content.fields.email.label}
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              required
              placeholder={content.fields.email.placeholder}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="signin-password"
                className="block text-sm font-medium text-foreground"
              >
                {content.fields.password.label}
              </label>
              <Link
                href={content.forgotPasswordHref}
                className="text-xs font-medium text-primary hover:text-primary/80"
              >
                {content.forgotPasswordLabel}
              </Link>
            </div>
            <input
              id="signin-password"
              name="password"
              type="password"
              required
              placeholder={content.fields.password.placeholder}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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
          {content.signUpPrompt.text}{" "}
          <Link
            href={content.signUpPrompt.href}
            className="font-medium text-primary hover:text-primary/80"
          >
            {content.signUpPrompt.linkLabel}
          </Link>
        </motion.p>
      </motion.div>
    </section>
  )
}
