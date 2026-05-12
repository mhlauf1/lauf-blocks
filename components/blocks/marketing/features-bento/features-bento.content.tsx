import { Zap, Workflow, BarChart3, Shield, Globe, Code2 } from "lucide-react"
import type { FeaturesBentoContent, BentoSpan } from "./features-bento"

function VisualPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground ${className ?? "h-24"}`}
    >
      {label}
    </div>
  )
}

function card(
  icon: React.ReactNode,
  title: string,
  description: string,
  span: BentoSpan,
  visual?: React.ReactNode,
) {
  return { icon, title, description, span, visual }
}

export const featuresBentoContent: FeaturesBentoContent = {
  eyebrow: "Platform",
  headline: "Built for modern teams",
  description:
    "Everything you need to automate, monitor, and scale — in one platform that feels like it was designed for your workflow.",
  cards: [
    card(
      <Workflow className="size-4" />,
      "Visual pipelines",
      "Drag-and-drop automation builder with branching logic and 100+ connectors.",
      "2x1",
      <VisualPlaceholder label="Pipeline canvas" className="h-28" />,
    ),
    card(
      <Zap className="size-4" />,
      "Instant deploys",
      "Push to main and go live in seconds with zero-downtime rollouts.",
      "1x1",
    ),
    card(
      <Shield className="size-4" />,
      "Enterprise security",
      "SOC 2 Type II, SSO, SCIM, and encrypted secrets baked in from day one.",
      "1x1",
    ),
    card(
      <BarChart3 className="size-4" />,
      "Real-time analytics",
      "Custom dashboards and alerting so you catch issues before your users do.",
      "1x2",
      <VisualPlaceholder label="Dashboard chart" className="h-full min-h-[100px]" />,
    ),
    card(
      <Globe className="size-4" />,
      "Edge-first",
      "Run workflows at the edge for sub-50ms latency worldwide. Automatic region routing.",
      "1x1",
    ),
    card(
      <Code2 className="size-4" />,
      "Developer SDK",
      "TypeScript-first client libraries with full type safety and autocomplete.",
      "1x1",
    ),
  ],
}
