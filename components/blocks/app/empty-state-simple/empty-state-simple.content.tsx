import type { EmptyStateSimpleContent } from "./empty-state-simple"
import { Workflow } from "lucide-react"

export const emptyStateSimpleContent: EmptyStateSimpleContent = {
  icon: <Workflow className="size-6" />,
  headline: "No workflows yet",
  description:
    "Get started by creating your first workflow. Connect your tools and automate repetitive tasks in minutes.",
  primaryAction: { label: "Create workflow", href: "#" },
  secondaryAction: { label: "Browse templates", href: "#" },
}
