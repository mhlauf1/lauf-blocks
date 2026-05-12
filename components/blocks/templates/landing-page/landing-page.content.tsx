"use client"

import type { LandingPageContent } from "./landing-page"
import { navbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns.content"
import { heroCenteredContent } from "@/components/blocks/marketing/hero-centered/hero-centered.content"
import { logoCloudSimpleContent } from "@/components/blocks/marketing/logo-cloud-simple/logo-cloud-simple.content"
import { featuresGridContent } from "@/components/blocks/marketing/features-grid/features-grid.content"
import { testimonialsGridContent } from "@/components/blocks/marketing/testimonials-grid/testimonials-grid.content"
import { ctaBannerContent } from "@/components/blocks/marketing/cta-banner/cta-banner.content"
import { footerColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns.content"

export const landingPageContent: LandingPageContent = {
  navbar: navbarDropdownsContent,
  hero: heroCenteredContent,
  logoCloud: logoCloudSimpleContent,
  features: featuresGridContent,
  testimonials: testimonialsGridContent,
  cta: ctaBannerContent,
  footer: footerColumnsContent,
}
