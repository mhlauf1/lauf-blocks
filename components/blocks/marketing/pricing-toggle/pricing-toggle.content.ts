import type { PricingToggleContent } from "./pricing-toggle"

export const pricingToggleContent: PricingToggleContent = {
  eyebrow: "Pricing",
  headline: "Start free, upgrade when ready",
  description:
    "Two plans, no surprises. Pick monthly flexibility or save with annual billing.",
  annualDiscount: "Save 20%",
  tiers: [
    {
      name: "Free",
      description: "For individuals exploring what Helix can do.",
      monthlyPrice: "$0",
      annualPrice: "$0",
      features: [
        "Up to 3 workflows",
        "1,000 executions / month",
        "Basic analytics",
        "Community support",
      ],
      cta: { label: "Get started", href: "#" },
    },
    {
      name: "Pro",
      description: "For teams that need power, flexibility, and support.",
      monthlyPrice: "$49",
      annualPrice: "$39",
      features: [
        "Unlimited workflows",
        "50,000 executions / month",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "SSO authentication",
      ],
      cta: { label: "Start free trial", href: "#" },
      highlighted: true,
    },
  ],
}
