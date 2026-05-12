"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CheckoutButtonProps {
  interval: "monthly" | "annual"
  label: string
  highlighted?: boolean
}

export function CheckoutButton({ interval, label, highlighted }: CheckoutButtonProps) {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/sign-up")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        buttonVariants({ variant: highlighted ? "default" : "outline" }),
        "w-full",
      )}
    >
      {loading ? "Loading..." : label}
    </button>
  )
}
