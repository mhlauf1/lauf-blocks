import type { DashboardOverviewContent } from "./dashboard-overview"
import {
  Workflow,
  CheckCircle2,
  Clock,
  AlertTriangle,
  GitBranch,
  Zap,
  Users,
  BarChart3,
} from "lucide-react"

export const dashboardOverviewContent: DashboardOverviewContent = {
  greeting: "Good morning, Elena",
  subtitle: "Here's what's happening with your workflows today.",
  metrics: [
    {
      label: "Total workflows",
      value: "1,284",
      change: { value: "+12% from last month", positive: true },
      icon: <Workflow className="size-4" />,
    },
    {
      label: "Success rate",
      value: "99.2%",
      change: { value: "+0.4% from last week", positive: true },
      icon: <CheckCircle2 className="size-4" />,
    },
    {
      label: "Avg. run time",
      value: "2.4s",
      change: { value: "-18% from last month", positive: true },
      icon: <Clock className="size-4" />,
    },
    {
      label: "Failed runs",
      value: "3",
      change: { value: "+2 from yesterday", positive: false },
      icon: <AlertTriangle className="size-4" />,
    },
  ],
  chart: {
    title: "Workflow runs",
    subtitle: "Daily runs over the last 12 days",
  },
  activity: {
    title: "Recent activity",
    items: [
      {
        title: "Deploy pipeline completed",
        description: "Production deploy finished in 2m 14s",
        time: "2m ago",
        icon: <Zap className="size-4" />,
      },
      {
        title: "New team member added",
        description: "Marcus Hall joined the Engineering team",
        time: "1h ago",
        icon: <Users className="size-4" />,
      },
      {
        title: "Weekly report generated",
        description: "Analytics report for May 5–11 is ready",
        time: "3h ago",
        icon: <BarChart3 className="size-4" />,
      },
      {
        title: "Branch merged",
        description: "feat/webhook-retries merged into main",
        time: "5h ago",
        icon: <GitBranch className="size-4" />,
      },
    ],
  },
}
