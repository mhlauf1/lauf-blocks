import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"
import { stripe } from "@/lib/stripe/client"
import type Stripe from "stripe"

async function findClerkUserByCustomerId(customerId: string): Promise<string | null> {
  const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
  return (customer.metadata?.clerkUserId as string) ?? null
}

async function updateUserPlan(clerkUserId: string, plan: "free" | "pro") {
  const client = await clerkClient()
  await client.users.updateUserMetadata(clerkUserId, {
    publicMetadata: { plan },
  })
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const customerId = session.customer as string
      const clerkUserId = await findClerkUserByCustomerId(customerId)
      if (clerkUserId) {
        await updateUserPlan(clerkUserId, "pro")
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const clerkUserId = await findClerkUserByCustomerId(customerId)
      if (clerkUserId) {
        const isActive = subscription.status === "active" || subscription.status === "trialing"
        await updateUserPlan(clerkUserId, isActive ? "pro" : "free")
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const clerkUserId = await findClerkUserByCustomerId(customerId)
      if (clerkUserId) {
        await updateUserPlan(clerkUserId, "free")
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
