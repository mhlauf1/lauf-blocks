"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion } from "motion/react"

export interface Testimonial {
  quote: string
  name: string
  role: string
  company?: string
  avatar?: { src: string; alt: string }
}

export interface TestimonialsCarouselContent {
  eyebrow?: string
  headline: string
  description?: string
  testimonials: Testimonial[]
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

export function TestimonialsCarousel({
  content,
}: {
  content: TestimonialsCarouselContent
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 360
    el.scrollBy({
      left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl"
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
            {content.description && (
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {content.description}
              </motion.p>
            )}
          </motion.div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous testimonial"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next testimonial"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
        >
          <div
            ref={scrollRef}
            className="-mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 scrollbar-none"
          >
            {content.testimonials.map((t) => (
              <div
                key={t.name}
                className="w-[340px] shrink-0 snap-start rounded-xl border border-border p-6 sm:w-[400px]"
              >
                <Quote className="size-5 text-primary/40" />
                <p className="mt-4 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {t.avatar ? (
                    <Image
                      src={t.avatar.src}
                      alt={t.avatar.alt}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}
                      {t.company && `, ${t.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
