import { Workflow, BarChart3, Shield } from "lucide-react"
import type { FeaturesAlternatingContent } from "./features-alternating"

function VisualPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-border bg-muted/30">
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export const featuresAlternatingContent: FeaturesAlternatingContent = {
  eyebrow: "How it works",
  headline: "A better way to build workflows",
  description:
    "From drag-and-drop pipelines to real-time monitoring, Helix gives your team the tools to move faster without breaking things.",
  rows: [
    {
      icon: <Workflow className="size-5" />,
      title: "Visual pipeline builder",
      description:
        "Design complex workflows with a drag-and-drop canvas. Connect triggers, conditions, and actions without writing a line of code.",
      bullets: [
        "100+ pre-built connectors for popular tools",
        "Branching logic with conditional paths",
        "Version history with instant rollback",
      ],
      visual: <VisualPlaceholder label="Pipeline builder screenshot" />,
    },
    {
      icon: <BarChart3 className="size-5" />,
      title: "Real-time observability",
      description:
        "See exactly what's happening across every workflow. Custom dashboards surface the metrics that matter to your team.",
      bullets: [
        "Live execution traces for every run",
        "Customizable alerting thresholds",
        "Export data to your existing BI tools",
      ],
      visual: <VisualPlaceholder label="Analytics dashboard screenshot" />,
    },
    {
      icon: <Shield className="size-5" />,
      title: "Enterprise-grade security",
      description:
        "Built for teams that take security seriously. SOC 2 Type II certified with end-to-end encryption and granular access controls.",
      bullets: [
        "Role-based access with SSO and SCIM",
        "Encrypted secrets management",
        "Complete audit trail for compliance",
      ],
      visual: <VisualPlaceholder label="Security settings screenshot" />,
    },
  ],
}
