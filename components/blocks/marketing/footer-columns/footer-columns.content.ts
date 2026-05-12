import type { FooterColumnsContent } from "./footer-columns"

export const footerColumnsContent: FooterColumnsContent = {
  logo: { text: "Helix", href: "#" },
  tagline:
    "The modern platform for building better workflows. Automate, orchestrate, and optimize with clarity.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Workflows", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "API", href: "#" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
  ],
  legal: {
    copyright: "© 2025 Helix, Inc. All rights reserved.",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
}
