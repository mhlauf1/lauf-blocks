import type { FaqAccordionContent } from "./faq-accordion"

export const faqAccordionContent: FaqAccordionContent = {
  eyebrow: "FAQ",
  headline: "Frequently asked questions",
  description:
    "Everything you need to know about Helix. Can't find what you're looking for? Reach out to our team.",
  items: [
    {
      question: "What is Helix and how does it work?",
      answer:
        "Helix is a workflow automation platform that connects your tools and automates repetitive tasks. You define triggers and actions using a visual editor — no code required. When a trigger fires, Helix runs your workflow end-to-end.",
    },
    {
      question: "How long does it take to get started?",
      answer:
        "Most teams are up and running in under 15 minutes. Sign up, connect your first integration, and build your first workflow using one of our pre-built templates. Our onboarding guide walks you through every step.",
    },
    {
      question: "What integrations do you support?",
      answer:
        "Helix integrates with over 200 tools including Slack, GitHub, Jira, Salesforce, HubSpot, Google Workspace, and more. We also offer a REST API and webhooks for custom integrations.",
    },
    {
      question: "Can I try Helix for free?",
      answer:
        "Yes — our free tier includes up to 1,000 workflow runs per month with access to all integrations. No credit card required. When you're ready, upgrade to Pro for higher limits and priority support.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Security is foundational to Helix. All data is encrypted at rest and in transit. We're SOC 2 Type II certified, GDPR compliant, and undergo regular third-party penetration testing. You can also configure SSO and role-based access controls.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "Free-tier users get access to our community forum and documentation. Pro and Enterprise plans include email support with a guaranteed 4-hour response time, plus access to a dedicated account manager on Enterprise.",
    },
  ],
}
