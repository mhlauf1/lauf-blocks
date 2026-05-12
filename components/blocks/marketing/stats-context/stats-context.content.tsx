import type { StatsContextContent } from "./stats-context"
import { Zap, Shield, Clock, Users, TrendingUp, Globe } from "lucide-react"

export const statsContextContent: StatsContextContent = {
  eyebrow: "Impact",
  headline: "Results that speak for themselves",
  description:
    "Helix helps teams eliminate manual work and ship faster. Here's what our customers are seeing.",
  stats: [
    {
      icon: <Zap className="size-5" />,
      value: "50M+",
      label: "Workflows executed",
      description:
        "Automations running every month across all Helix customers, from startups to enterprises.",
    },
    {
      icon: <Shield className="size-5" />,
      value: "99.99%",
      label: "Uptime guarantee",
      description:
        "Enterprise-grade reliability backed by an SLA. Your workflows run when they need to.",
    },
    {
      icon: <Clock className="size-5" />,
      value: "12hrs",
      label: "Saved per week",
      description:
        "Average time saved per team after automating their top five manual processes with Helix.",
    },
    {
      icon: <Users className="size-5" />,
      value: "10K+",
      label: "Teams onboarded",
      description:
        "Growing teams across 40+ countries trust Helix to power their critical workflows.",
    },
    {
      icon: <TrendingUp className="size-5" />,
      value: "3.2x",
      label: "Faster deployments",
      description:
        "Teams using Helix CI/CD automations ship code more than three times faster on average.",
    },
    {
      icon: <Globe className="size-5" />,
      value: "200+",
      label: "Integrations",
      description:
        "Connect the tools you already use — from Slack and GitHub to Salesforce and custom APIs.",
    },
  ],
}
