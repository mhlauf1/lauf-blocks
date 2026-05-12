import type { PricingComparisonContent } from "./pricing-comparison"

export const pricingComparisonContent: PricingComparisonContent = {
  eyebrow: "Compare plans",
  headline: "Find the right plan for your team",
  description:
    "Every plan includes core platform features. Upgrade for more executions, team members, and enterprise controls.",
  plans: [
    {
      name: "Starter",
      price: "$0",
      period: "month",
      cta: { label: "Get started", href: "#" },
    },
    {
      name: "Pro",
      price: "$49",
      period: "month",
      cta: { label: "Start trial", href: "#" },
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      cta: { label: "Contact sales", href: "#" },
    },
  ],
  categories: [
    {
      name: "Usage",
      features: [
        { name: "Workflows", values: ["3", "Unlimited", "Unlimited"] },
        { name: "Executions / month", values: ["1,000", "50,000", "Unlimited"] },
        { name: "Team members", values: ["1", "10", "Unlimited"] },
        { name: "Data retention", values: ["7 days", "90 days", "Custom"] },
      ],
    },
    {
      name: "Features",
      features: [
        { name: "Visual pipeline builder", values: [true, true, true] },
        { name: "Custom integrations", values: [false, true, true] },
        { name: "Advanced analytics", values: [false, true, true] },
        { name: "API access", values: [true, true, true] },
        { name: "Webhooks", values: [false, true, true] },
        { name: "Custom branding", values: [false, false, true] },
      ],
    },
    {
      name: "Security & compliance",
      features: [
        { name: "SSO authentication", values: [false, true, true] },
        { name: "SCIM provisioning", values: [false, false, true] },
        { name: "Audit logs", values: [false, true, true] },
        { name: "SOC 2 report", values: [false, false, true] },
        { name: "Custom SLAs", values: [false, false, true] },
      ],
    },
    {
      name: "Support",
      features: [
        { name: "Community forum", values: [true, true, true] },
        { name: "Email support", values: [false, true, true] },
        { name: "Priority support", values: [false, true, true] },
        { name: "Dedicated engineer", values: [false, false, true] },
      ],
    },
  ],
}
