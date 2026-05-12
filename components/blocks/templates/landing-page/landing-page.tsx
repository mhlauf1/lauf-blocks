"use client"

import { NavbarDropdowns, type NavbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns"
import { HeroCentered, type HeroCenteredContent } from "@/components/blocks/marketing/hero-centered/hero-centered"
import { LogoCloudSimple, type LogoCloudSimpleContent } from "@/components/blocks/marketing/logo-cloud-simple/logo-cloud-simple"
import { FeaturesGrid, type FeaturesGridContent } from "@/components/blocks/marketing/features-grid/features-grid"
import { TestimonialsGrid, type TestimonialsGridContent } from "@/components/blocks/marketing/testimonials-grid/testimonials-grid"
import { CtaBanner, type CtaBannerContent } from "@/components/blocks/marketing/cta-banner/cta-banner"
import { FooterColumns, type FooterColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns"

export interface LandingPageContent {
  navbar: NavbarDropdownsContent
  hero: HeroCenteredContent
  logoCloud: LogoCloudSimpleContent
  features: FeaturesGridContent
  testimonials: TestimonialsGridContent
  cta: CtaBannerContent
  footer: FooterColumnsContent
}

export function LandingPage({ content }: { content: LandingPageContent }) {
  return (
    <>
      <NavbarDropdowns content={content.navbar} />
      <main>
        <HeroCentered content={content.hero} />
        <LogoCloudSimple content={content.logoCloud} />
        <FeaturesGrid content={content.features} />
        <TestimonialsGrid content={content.testimonials} />
        <CtaBanner content={content.cta} />
      </main>
      <FooterColumns content={content.footer} />
    </>
  )
}
