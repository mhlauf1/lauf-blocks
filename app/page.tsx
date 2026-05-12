import Link from "next/link"
import { ArrowRight, Blocks, Copy, Layers } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { getFreeBlocks, getProBlocks } from "@/lib/blocks/helpers"

export default function LandingPage() {
  const freeCount = getFreeBlocks().length
  const totalCount = freeCount + getProBlocks().length

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
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Pricing
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Production-grade UI blocks.
            <br />
            <span className="text-primary">Copy, paste, ship.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {totalCount} beautifully crafted sections and templates built with Next.js,
            Tailwind CSS, and shadcn/ui. Browse, preview, and copy the source code
            directly into your project.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/blocks"
              className={buttonVariants({ size: "lg" })}
            >
              Browse blocks
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View pricing
            </Link>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-24 sm:grid-cols-3 sm:py-32">
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Blocks className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {totalCount} blocks & growing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Heroes, features, pricing, testimonials, dashboards, auth forms,
                and full page templates. New blocks added regularly.
              </p>
            </div>
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Copy className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                Copy & paste
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No npm install, no CLI, no lock-in. Browse the source code,
                copy it into your project, and make it yours.
              </p>
            </div>
            <div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                Built on shadcn/ui
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every block uses shadcn/ui primitives, Tailwind CSS v4, and
                TypeScript. Data-driven props make customization instant.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {freeCount} blocks free. Unlock everything with Pro.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Start with free blocks across every category. Upgrade to Pro for
              the full library, including templates and premium variants.
            </p>
            <div className="mt-8">
              <Link
                href="/blocks"
                className={buttonVariants({ size: "lg" })}
              >
                Start browsing
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <p className="text-xs text-muted-foreground">Lauf Blocks</p>
          <div className="flex gap-4">
            <Link href="/blocks" className="text-xs text-muted-foreground hover:text-foreground">
              Blocks
            </Link>
            <Link href="/pricing" className="text-xs text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
