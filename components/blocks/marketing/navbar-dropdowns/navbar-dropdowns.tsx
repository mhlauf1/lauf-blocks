"use client"

import { useState, useRef, useEffect, type ElementType } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export interface NavDropdownLink {
  icon: ElementType
  label: string
  description: string
  href: string
}

export interface NavDropdownSection {
  title?: string
  links: NavDropdownLink[]
}

export interface NavItem {
  label: string
  href?: string
  sections?: NavDropdownSection[]
}

export interface NavbarDropdownsContent {
  logo: { text: string; href: string }
  items: NavItem[]
  cta: { label: string; href: string }
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const panelVariants = {
  hidden: { opacity: 0, y: 4, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.95,
    transition: { duration: 0.15, ease: easeOutExpo },
  },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.03 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: easeOutExpo },
  },
}

export function NavbarDropdowns({
  content,
}: {
  content: NavbarDropdownsContent
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  function handleEnter(index: number) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpenIndex(index)
  }

  function handleLeave() {
    closeTimeout.current = setTimeout(() => setOpenIndex(null), 150)
  }

  function handleTriggerClick(index: number, hasDropdown: boolean) {
    if (!hasDropdown) return
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href={content.logo.href}
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          {content.logo.text}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {content.items.map((item, i) => {
            const hasDropdown = !!item.sections
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && handleEnter(i)}
                onMouseLeave={() => hasDropdown && handleLeave()}
              >
                {hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => handleTriggerClick(i, true)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                      openIndex === i && "text-foreground",
                    )}
                    aria-expanded={openIndex === i}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        openIndex === i && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {hasDropdown && openIndex === i && (
                    <DesktopPanel sections={item.sections!} />
                  )}
                </AnimatePresence>
              </div>
            )
          })}
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
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
            }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-1 px-6 pb-6 pt-4">
              {content.items.map((item, i) =>
                item.sections ? (
                  <MobileAccordion
                    key={item.label}
                    item={item}
                    isOpen={mobileAccordion === i}
                    onToggle={() =>
                      setMobileAccordion(mobileAccordion === i ? null : i)
                    }
                    onNavigate={() => setMobileOpen(false)}
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ),
              )}
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

function DesktopPanel({ sections }: { sections: NavDropdownSection[] }) {
  const totalLinks = sections.reduce((sum, s) => sum + s.links.length, 0)
  const isWide = totalLinks > 4 || sections.length > 1

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "absolute left-0 top-full pt-2",
        isWide ? "w-[540px]" : "w-[280px]",
      )}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className={cn(
          "rounded-xl border border-border bg-popover p-3 shadow-sm",
          isWide && sections.length > 1
            ? "grid gap-4"
            : "",
        )}
        style={
          isWide && sections.length > 1
            ? { gridTemplateColumns: `repeat(${sections.length}, 1fr)` }
            : undefined
        }
      >
        {sections.map((section) => (
          <div key={section.title ?? "default"}>
            {section.title && (
              <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.links.map((link) => (
                <motion.div key={link.label} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-primary">
                      <link.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {link.label}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function MobileAccordion({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
            }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-2 pl-3">
              {item.sections?.map((section) =>
                section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <link.icon className="size-4 shrink-0" />
                    {link.label}
                  </Link>
                )),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
