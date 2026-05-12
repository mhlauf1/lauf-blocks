"use client"

import Image from "next/image"
import { motion } from "motion/react"

export interface TeamGridMember {
  name: string
  role: string
  image: { src: string; alt: string }
}

export interface TeamGridContent {
  eyebrow?: string
  headline: string
  description: string
  members: TeamGridMember[]
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

const gridStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export function TeamGrid({ content }: { content: TeamGridContent }) {
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
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.members.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="text-center"
            >
              <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
