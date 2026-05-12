import Link from "next/link"
import { Show, UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"

export function StorefrontHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between px-6">
        <Link href="/blocks" className="font-heading text-sm font-semibold tracking-tight">
          Lauf Blocks
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sign in
            </Link>
          </Show>
        </div>
      </div>
    </header>
  )
}
