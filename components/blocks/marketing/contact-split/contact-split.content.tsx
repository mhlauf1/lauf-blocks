import type { ContactSplitContent } from "./contact-split"
import { Mail, MapPin, Phone } from "lucide-react"

export const contactSplitContent: ContactSplitContent = {
  headline: "Let's talk about your project",
  description:
    "Whether you're exploring Helix for the first time or need help with an existing setup, our team is here to help.",
  details: [
    {
      icon: <Mail className="size-5" />,
      label: "Email",
      value: "hello@helix.dev",
    },
    {
      icon: <Phone className="size-5" />,
      label: "Phone",
      value: "+1 (555) 000-1234",
    },
    {
      icon: <MapPin className="size-5" />,
      label: "Office",
      value: "San Francisco, CA",
    },
  ],
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: {
      label: "Message",
      placeholder: "How can we help?",
    },
  },
  submitLabel: "Send message",
}
