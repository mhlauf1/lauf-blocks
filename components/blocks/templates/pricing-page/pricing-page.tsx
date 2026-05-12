"use client"

import { NavbarDropdowns, type NavbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns"
import { PricingThreeTier, type PricingThreeTierContent } from "@/components/blocks/marketing/pricing-three-tier/pricing-three-tier"
import { FaqAccordion, type FaqAccordionContent } from "@/components/blocks/marketing/faq-accordion/faq-accordion"
import { CtaBanner, type CtaBannerContent } from "@/components/blocks/marketing/cta-banner/cta-banner"
import { FooterColumns, type FooterColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns"

export interface PricingPageContent {
  navbar: NavbarDropdownsContent
  pricing: PricingThreeTierContent
  faq: FaqAccordionContent
  cta: CtaBannerContent
  footer: FooterColumnsContent
}

export function PricingPage({ content }: { content: PricingPageContent }) {
  return (
    <>
      <NavbarDropdowns content={content.navbar} />
      <main>
        <PricingThreeTier content={content.pricing} />
        <FaqAccordion content={content.faq} />
        <CtaBanner content={content.cta} />
      </main>
      <FooterColumns content={content.footer} />
    </>
  )
}
