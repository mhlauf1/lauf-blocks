import type { FaqTwoColumnContent } from "./faq-two-column"

export const faqTwoColumnContent: FaqTwoColumnContent = {
  eyebrow: "FAQ",
  headline: "Common questions",
  description:
    "Quick answers to the things teams ask most about Helix.",
  items: [
    {
      question: "What is Helix?",
      answer:
        "Helix is a workflow automation platform that connects your tools and eliminates repetitive tasks. Build workflows visually — no code required.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Free for up to 1,000 runs per month. Pro starts at $29/month for higher limits and priority support. Enterprise pricing is custom.",
    },
    {
      question: "What integrations are available?",
      answer:
        "Over 200 integrations including Slack, GitHub, Jira, Salesforce, and Google Workspace. Plus a REST API and webhooks for anything custom.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes — the free tier is permanent, not a trial. Use it as long as you need. Upgrade when you're ready for more capacity.",
    },
    {
      question: "How secure is my data?",
      answer:
        "All data is encrypted at rest and in transit. Helix is SOC 2 Type II certified and GDPR compliant with SSO and role-based access controls.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. No contracts, no cancellation fees. Downgrade to free or cancel entirely from your account settings at any time.",
    },
  ],
}
