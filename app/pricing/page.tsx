import Link from "next/link"
import { Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { getFreeBlocks, getProBlocks } from "@/lib/blocks/helpers"
import { cn } from "@/lib/utils"
import { CheckoutButton } from "./checkout-button"

export default function PricingPage() {
  const freeCount = getFreeBlocks().length
  const totalCount = freeCount + getProBlocks().length

  interface Tier {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    cta: { label: string; href?: string; interval?: "monthly" | "annual" }
    highlighted: boolean
  }

  const tiers: Tier[] = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with essential blocks across every category.",
      features: [
        `${freeCount} free blocks`,
        "Full source code access",
        "Copy & paste into your project",
        "Preview all blocks",
        "Dark mode included",
      ],
      cta: { label: "Browse free blocks", href: "/blocks" },
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: `Unlock all ${totalCount} blocks, templates, and every new block added.`,
      features: [
        `All ${totalCount} blocks & templates`,
        "Full source code access",
        "New blocks as they ship",
        "Priority support",
        "Cancel anytime",
      ],
      cta: { label: "Upgrade to Pro", interval: "monthly" },
      highlighted: true,
    },
  ]

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
            Lauf Blocks
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/blocks"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Browse
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple pricing
          </h1>
          <p className="mt-3 text-muted-foreground">
            Start free. Upgrade when you need the full library.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-xl border p-8",
                tier.highlighted
                  ? "border-primary bg-primary/[0.02]"
                  : "border-border",
              )}
            >
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>

              <div className="mt-6">
                <span className="font-heading text-4xl font-bold tracking-tight text-foreground">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {tier.cta.href ? (
                  <Link
                    href={tier.cta.href}
                    className={cn(
                      buttonVariants({
                        variant: tier.highlighted ? "default" : "outline",
                      }),
                      "w-full",
                    )}
                  >
                    {tier.cta.label}
                  </Link>
                ) : tier.cta.interval ? (
                  <CheckoutButton
                    interval={tier.cta.interval}
                    label={tier.cta.label}
                    highlighted={tier.highlighted}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
