import { Zap, Shield, BarChart3, Workflow } from "lucide-react"
import type { FeaturesGridContent } from "./features-grid"

export const featuresGridContent: FeaturesGridContent = {
  eyebrow: "Why Helix",
  headline: "Everything you need to ship faster",
  description:
    "Helix replaces your patchwork of tools with one platform that handles automation, monitoring, and deployment — so your team can focus on building.",
  features: [
    {
      icon: <Zap className="size-5" />,
      title: "Instant deployments",
      description:
        "Push to main and watch your changes go live in seconds. Zero-downtime deploys with automatic rollbacks if anything breaks.",
    },
    {
      icon: <Workflow className="size-5" />,
      title: "Visual workflows",
      description:
        "Build complex automation pipelines with a drag-and-drop editor. No code required for 90% of workflows.",
    },
    {
      icon: <Shield className="size-5" />,
      title: "Built-in security",
      description:
        "SOC 2 compliant out of the box. Role-based access, audit logs, and encrypted secrets at every layer.",
    },
    {
      icon: <BarChart3 className="size-5" />,
      title: "Real-time analytics",
      description:
        "Track every metric that matters with customizable dashboards. Set alerts before your users notice something's off.",
    },
  ],
}
