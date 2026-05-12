import type { ContactFormContent } from "./contact-form"

export const contactFormContent: ContactFormContent = {
  eyebrow: "Contact",
  headline: "Get in touch",
  description:
    "Have a question or want to learn more about Helix? Send us a message and we'll get back to you within one business day.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: {
      label: "Message",
      placeholder: "Tell us what you're looking for...",
    },
  },
  submitLabel: "Send message",
  disclaimer:
    "By submitting this form, you agree to our privacy policy. We'll never share your information.",
}
