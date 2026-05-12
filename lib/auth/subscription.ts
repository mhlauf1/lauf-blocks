import { auth, clerkClient } from "@clerk/nextjs/server"

export type Plan = "free" | "pro"

export async function getUserPlan(): Promise<Plan> {
  const { userId } = await auth()
  if (!userId) return "free"

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return (user.publicMetadata.plan as string) === "pro" ? "pro" : "free"
}

export async function isProUser(): Promise<boolean> {
  return (await getUserPlan()) === "pro"
}
