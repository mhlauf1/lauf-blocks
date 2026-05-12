import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
          <Link href="/blocks" className="font-heading text-sm font-semibold tracking-tight">
            Lauf Blocks
          </Link>
          <ThemeToggle />
        </div>
      </header>
      {children}
    </>
  )
}
