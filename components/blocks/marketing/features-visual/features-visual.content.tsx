import { Workflow, Zap, BarChart3, Shield } from "lucide-react"
import type { FeaturesVisualContent } from "./features-visual"

function VisualPlaceholder() {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-border bg-muted/30">
      <span className="text-sm text-muted-foreground">
        Product screenshot
      </span>
    </div>
  )
}

export const featuresVisualContent: FeaturesVisualContent = {
  eyebrow: "Platform",
  headline: "See everything in one place",
  description:
    "Helix brings your workflows, analytics, and infrastructure into a single view — so you spend less time context-switching and more time shipping.",
  features: [
    {
      icon: <Workflow className="size-5" />,
      title: "Unified dashboard",
      description:
        "All your pipelines, deployments, and metrics in one real-time view.",
    },
    {
      icon: <Zap className="size-5" />,
      title: "One-click actions",
      description:
        "Trigger deploys, rollbacks, and reruns directly from the dashboard.",
    },
    {
      icon: <BarChart3 className="size-5" />,
      title: "Custom widgets",
      description:
        "Drag and arrange the metrics that matter most to your team.",
    },
    {
      icon: <Shield className="size-5" />,
      title: "Audit everything",
      description:
        "Full activity history with filtering by user, action, and timestamp.",
    },
  ],
  visual: <VisualPlaceholder />,
}
