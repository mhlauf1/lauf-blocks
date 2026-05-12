import type { SidebarCollapsibleContent } from "./sidebar-collapsible"
import {
  Hexagon,
  LayoutDashboard,
  Workflow,
  BarChart3,
  Users,
  Inbox,
  Settings,
  HelpCircle,
} from "lucide-react"

export const sidebarCollapsibleContent: SidebarCollapsibleContent = {
  logo: {
    text: "Helix",
    icon: <Hexagon className="size-4" />,
    href: "#",
  },
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
}
