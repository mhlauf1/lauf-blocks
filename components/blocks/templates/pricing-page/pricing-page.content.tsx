"use client"

import type { PricingPageContent } from "./pricing-page"
import { navbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns.content"
import { pricingThreeTierContent } from "@/components/blocks/marketing/pricing-three-tier/pricing-three-tier.content"
import { faqAccordionContent } from "@/components/blocks/marketing/faq-accordion/faq-accordion.content"
import { ctaBannerContent } from "@/components/blocks/marketing/cta-banner/cta-banner.content"
import { footerColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns.content"

export const pricingPageContent: PricingPageContent = {
  navbar: navbarDropdownsContent,
  pricing: pricingThreeTierContent,
  faq: faqAccordionContent,
  cta: ctaBannerContent,
  footer: footerColumnsContent,
}
