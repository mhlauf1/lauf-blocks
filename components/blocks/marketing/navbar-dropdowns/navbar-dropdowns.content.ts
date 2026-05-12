import {
  Layers,
  Zap,
  BarChart3,
  Shield,
  Workflow,
  Code2,
  BookOpen,
  MessageSquare,
  Headphones,
} from "lucide-react"
import type { NavbarDropdownsContent } from "./navbar-dropdowns"

export const navbarDropdownsContent: NavbarDropdownsContent = {
  logo: { text: "Helix", href: "#" },
  items: [
    {
      label: "Product",
      sections: [
        {
          title: "Platform",
          links: [
            {
              icon: Layers,
              label: "Workflows",
              description: "Build and automate complex pipelines visually.",
              href: "#",
            },
            {
              icon: Zap,
              label: "Integrations",
              description: "Connect 200+ tools your team already uses.",
              href: "#",
            },
            {
              icon: BarChart3,
              label: "Analytics",
              description: "Real-time dashboards and custom reports.",
              href: "#",
            },
          ],
        },
        {
          title: "Infrastructure",
          links: [
            {
              icon: Shield,
              label: "Security",
              description: "SOC 2 compliant with end-to-end encryption.",
              href: "#",
            },
            {
              icon: Workflow,
              label: "API",
              description: "RESTful and GraphQL APIs for everything.",
              href: "#",
            },
            {
              icon: Code2,
              label: "SDKs",
              description: "Client libraries for every major language.",
              href: "#",
            },
          ],
        },
      ],
    },
    {
      label: "Resources",
      sections: [
        {
          links: [
            {
              icon: BookOpen,
              label: "Documentation",
              description: "Guides, references, and tutorials.",
              href: "#",
            },
            {
              icon: MessageSquare,
              label: "Community",
              description: "Join the conversation on Discord.",
              href: "#",
            },
            {
              icon: Headphones,
              label: "Support",
              description: "Get help from our engineering team.",
              href: "#",
            },
          ],
        },
      ],
    },
    {
      label: "Pricing",
      href: "#",
    },
    {
      label: "Blog",
      href: "#",
    },
  ],
  cta: { label: "Get started", href: "#" },
}
