"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export interface BannerTopContent {
  message: string
  link?: { label: string; href: string }
  dismissible?: boolean
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function BannerTop({ content }: { content: BannerTopContent }) {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: { duration: 0.25, ease: easeOutExpo },
              opacity: { duration: 0.2, delay: 0.05, ease: easeOutExpo },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              opacity: { duration: 0.15, ease: easeOutExpo },
              height: { duration: 0.2, delay: 0.05, ease: easeOutExpo },
            },
          }}
          className="overflow-hidden border-b border-border bg-primary"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-4 px-6 py-2.5">
            <p className="text-center text-sm font-medium text-primary-foreground">
              {content.message}
              {content.link && (
                <>
                  {" "}
                  <Link
                    href={content.link.href}
                    className="inline-flex items-center gap-1 underline underline-offset-4 hover:no-underline"
                  >
                    {content.link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </>
              )}
            </p>

            {content.dismissible !== false && (
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="-mr-1 shrink-0 rounded-md p-1 text-primary-foreground/80 transition-colors duration-150 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
                aria-label="Dismiss banner"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
