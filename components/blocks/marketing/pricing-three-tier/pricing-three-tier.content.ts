import type { PricingThreeTierContent } from "./pricing-three-tier"

export const pricingThreeTierContent: PricingThreeTierContent = {
  eyebrow: "Pricing",
  headline: "Simple, transparent pricing",
  description:
    "Start free, scale as you grow. No hidden fees, no surprise invoices.",
  tiers: [
    {
      name: "Starter",
      price: "$0",
      period: "month",
      description: "For individuals and small projects getting started.",
      features: [
        "Up to 3 workflows",
        "1,000 executions / month",
        "Community support",
        "Basic analytics",
        "1 team member",
      ],
      cta: { label: "Get started free", href: "#" },
    },
    {
      name: "Pro",
      price: "$49",
      period: "month",
      description: "For growing teams that need more power and flexibility.",
      features: [
        "Unlimited workflows",
        "50,000 executions / month",
        "Priority support",
        "Advanced analytics",
        "Up to 10 team members",
        "Custom integrations",
        "SSO authentication",
      ],
      cta: { label: "Start free trial", href: "#" },
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced security and scale needs.",
      features: [
        "Everything in Pro",
        "Unlimited executions",
        "Dedicated support engineer",
        "Custom SLAs",
        "Unlimited team members",
        "SCIM provisioning",
        "Audit logs & compliance",
        "On-premise deployment",
      ],
      cta: { label: "Contact sales", href: "#" },
    },
  ],
}
