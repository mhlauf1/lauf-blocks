import type { DashboardShellContent } from "./dashboard-shell"
import {
  LayoutDashboard,
  Workflow,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Inbox,
} from "lucide-react"

export const dashboardShellContent: DashboardShellContent = {
  logo: { text: "Helix", href: "#" },
  nav: [
    {
      items: [
        {
          label: "Dashboard",
          href: "#",
          icon: <LayoutDashboard className="size-5" />,
          active: true,
        },
        {
          label: "Workflows",
          href: "#",
          icon: <Workflow className="size-5" />,
          badge: "12",
        },
        {
          label: "Analytics",
          href: "#",
          icon: <BarChart3 className="size-5" />,
        },
        {
          label: "Inbox",
          href: "#",
          icon: <Inbox className="size-5" />,
          badge: "3",
        },
        {
          label: "Team",
          href: "#",
          icon: <Users className="size-5" />,
        },
      ],
    },
    {
      label: "Support",
      items: [
        {
          label: "Settings",
          href: "#",
          icon: <Settings className="size-5" />,
        },
        {
          label: "Help & Docs",
          href: "#",
          icon: <HelpCircle className="size-5" />,
        },
      ],
    },
  ],
  user: {
    name: "Elena Ruiz",
    email: "elena@helix.dev",
    initials: "ER",
  },
  searchPlaceholder: "Search workflows...",
}
