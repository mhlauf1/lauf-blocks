"use client"

import type { AboutPageContent } from "./about-page"
import { navbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns.content"
import { statsRowContent } from "@/components/blocks/marketing/stats-row/stats-row.content"
import { teamGridContent } from "@/components/blocks/marketing/team-grid/team-grid.content"
import { testimonialsFeaturedContent } from "@/components/blocks/marketing/testimonials-featured/testimonials-featured.content"
import { ctaBannerContent } from "@/components/blocks/marketing/cta-banner/cta-banner.content"
import { footerColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns.content"
import type { HeroCenteredContent } from "@/components/blocks/marketing/hero-centered/hero-centered"

const aboutHeroContent: HeroCenteredContent = {
  eyebrow: "About Helix",
  headline: "We're building the future of workflow automation",
  description:
    "Helix was founded in 2022 with a simple belief: teams shouldn't spend their time on repetitive work. We're a small, focused team on a mission to make automation accessible to everyone.",
  primaryCta: { label: "Join the team", href: "#" },
  secondaryCta: { label: "Read our story", href: "#" },
}

export const aboutPageContent: AboutPageContent = {
  navbar: navbarDropdownsContent,
  hero: aboutHeroContent,
  stats: statsRowContent,
  team: teamGridContent,
  testimonial: testimonialsFeaturedContent,
  cta: ctaBannerContent,
  footer: footerColumnsContent,
}
