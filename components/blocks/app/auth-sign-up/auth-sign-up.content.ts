import type { AuthSignUpContent } from "./auth-sign-up"

export const authSignUpContent: AuthSignUpContent = {
  logo: { text: "Helix", href: "#" },
  headline: "Create your account",
  description: "Start automating in minutes. No credit card required.",
  fields: {
    name: { label: "Full name", placeholder: "Jane Smith" },
    email: { label: "Email", placeholder: "you@company.com" },
    password: { label: "Password", placeholder: "At least 8 characters" },
  },
  termsLabel: "I agree to the",
  termsLinks: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  submitLabel: "Create account",
  signInPrompt: {
    text: "Already have an account?",
    linkLabel: "Sign in",
    href: "#",
  },
}
