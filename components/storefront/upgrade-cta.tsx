"use client"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Lock } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function UpgradeCta() {
  const { isSignedIn } = useUser()

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border px-6 py-16 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Lock className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="font-heading text-sm font-semibold text-foreground">
          Pro block
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Upgrade to Pro to copy this block&apos;s source code.
        </p>
      </div>
      <Link
        href={isSignedIn ? "/pricing" : "/sign-up"}
        className={buttonVariants({ size: "sm" })}
      >
        {isSignedIn ? "Upgrade to Pro" : "Sign up to get started"}
      </Link>
    </div>
  )
}
