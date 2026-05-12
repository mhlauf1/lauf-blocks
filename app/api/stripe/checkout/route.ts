import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/client"
import { stripeConfig } from "@/lib/stripe/config"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const interval = body.interval as "monthly" | "annual"
  const priceId = stripeConfig.prices[interval]

  if (!priceId) {
    return NextResponse.json({ error: "Invalid interval" }, { status: 400 })
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  let customerId = user.privateMetadata.stripeCustomerId as string | undefined
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.emailAddresses[0]?.emailAddress,
      metadata: { clerkUserId: userId },
    })
    customerId = customer.id
    await client.users.updateUserMetadata(userId, {
      privateMetadata: { stripeCustomerId: customerId },
    })
  }

  const origin = new URL(req.url).origin
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/blocks?upgraded=true`,
    cancel_url: `${origin}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
