import type { HeroCenteredContent } from "./hero-centered"

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <svg
      width="120"
      height="28"
      viewBox="0 0 120 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={name}
    >
      <rect width="28" height="28" rx="6" fill="currentColor" opacity="0.3" />
      <text x="38" y="19" fill="currentColor" fontSize="14" fontWeight="500" fontFamily="inherit">
        {name}
      </text>
    </svg>
  )
}

export const heroCenteredContent: HeroCenteredContent = {
  eyebrow: "Now in public beta",
  headline: "Build workflows that actually work",
  description:
    "Helix gives your team one place to automate, orchestrate, and optimize every workflow — so you ship faster and break less.",
  primaryCta: { label: "Start for free", href: "#" },
  secondaryCta: { label: "See how it works", href: "#" },
  trustedBy: [
    { name: "Vertico", logo: <LogoPlaceholder name="Vertico" /> },
    { name: "Stackwise", logo: <LogoPlaceholder name="Stackwise" /> },
    { name: "Meridian", logo: <LogoPlaceholder name="Meridian" /> },
    { name: "Cosmo", logo: <LogoPlaceholder name="Cosmo" /> },
    { name: "Arcline", logo: <LogoPlaceholder name="Arcline" /> },
  ],
}
