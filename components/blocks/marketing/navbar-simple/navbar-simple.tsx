"use client"

import { useState } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export interface NavbarSimpleContent {
  logo: { text: string; href: string }
  links: { label: string; href: string }[]
  cta: { label: string; href: string }
}

export function NavbarSimple({ content }: { content: NavbarSimpleContent }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href={content.logo.href}
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          {content.logo.text}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {content.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link
            href={content.cta.href}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            {content.cta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-1 px-6 pb-6 pt-4">
              {content.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href={content.cta.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ size: "sm" }), "w-full")}
                >
                  {content.cta.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
