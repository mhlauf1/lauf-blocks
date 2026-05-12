"use client"

import { NavbarDropdowns, type NavbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns"
import { HeroCentered, type HeroCenteredContent } from "@/components/blocks/marketing/hero-centered/hero-centered"
import { StatsRow, type StatsRowContent } from "@/components/blocks/marketing/stats-row/stats-row"
import { TeamGrid, type TeamGridContent } from "@/components/blocks/marketing/team-grid/team-grid"
import { TestimonialsFeatured, type TestimonialsFeaturedContent } from "@/components/blocks/marketing/testimonials-featured/testimonials-featured"
import { CtaBanner, type CtaBannerContent } from "@/components/blocks/marketing/cta-banner/cta-banner"
import { FooterColumns, type FooterColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns"

export interface AboutPageContent {
  navbar: NavbarDropdownsContent
  hero: HeroCenteredContent
  stats: StatsRowContent
  team: TeamGridContent
  testimonial: TestimonialsFeaturedContent
  cta: CtaBannerContent
  footer: FooterColumnsContent
}

export function AboutPage({ content }: { content: AboutPageContent }) {
  return (
    <>
      <NavbarDropdowns content={content.navbar} />
      <main>
        <HeroCentered content={content.hero} />
        <StatsRow content={content.stats} />
        <TeamGrid content={content.team} />
        <TestimonialsFeatured content={content.testimonial} />
        <CtaBanner content={content.cta} />
      </main>
      <FooterColumns content={content.footer} />
    </>
  )
}
