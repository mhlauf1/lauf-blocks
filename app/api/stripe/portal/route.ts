import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/client"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const customerId = user.privateMetadata.stripeCustomerId as string | undefined

  if (!customerId) {
    return NextResponse.json({ error: "No subscription found" }, { status: 400 })
  }

  const origin = new URL(req.url).origin
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/blocks`,
  })

  return NextResponse.json({ url: session.url })
}
