import { Suspense } from "react"
import Link from "next/link"
import { Show, UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/storefront/sidebar"
import { MobileSidebar } from "@/components/storefront/mobile-sidebar"
import { buttonVariants } from "@/components/ui/button"

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-12 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Suspense>
              <MobileSidebar />
            </Suspense>
            <Link href="/blocks" className="font-heading text-sm font-semibold tracking-tight">
              Lauf Blocks
            </Link>
          </div>
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

      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r border-border lg:block">
          <div className="sticky top-12 h-[calc(100dvh-3rem)] overflow-y-auto">
            <Suspense>
              <Sidebar />
            </Suspense>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
