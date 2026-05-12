# Auth & Payments

Clerk handles authentication. Stripe handles payments. They sync via webhooks and Clerk metadata.

---

## Clerk Setup

### Package

```bash
pnpm add @clerk/nextjs
```

### Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Root Layout

`ClerkProvider` wraps the entire app in `app/layout.tsx`, outside `ThemeProvider`:

```tsx
import { ClerkProvider } from "@clerk/nextjs"

<ClerkProvider>
  <html>
    <body>
      <ThemeProvider>{children}</ThemeProvider>
    </body>
  </html>
</ClerkProvider>
```

### Middleware

`middleware.ts` at project root uses `clerkMiddleware()`. Most routes are public. Only API routes for source code and Stripe are protected.

**Critical:** Exclude `/api/webhooks/*` from Clerk middleware — these are called by Stripe, not authenticated users.

### Auth Pages

- `app/(auth)/sign-in/[[...sign-in]]/page.tsx` — renders `<SignIn />`
- `app/(auth)/sign-up/[[...sign-up]]/page.tsx` — renders `<SignUp />`

Style with Clerk's `appearance` prop to match the teal design system.

### User Metadata

Clerk stores subscription state in user metadata:

| Field | Location | Purpose |
|---|---|---|
| `plan` | `publicMetadata` | `"free"` or `"pro"` — readable client-side |
| `stripeCustomerId` | `privateMetadata` | Links Clerk user to Stripe customer |

### Subscription Helper

`lib/auth/subscription.ts` provides:

```ts
getUserPlan(): Promise<"free" | "pro">
isProUser(): Promise<boolean>
```

These read from `auth()` + Clerk user metadata. Used in server components and API routes to gate pro content.

---

## Stripe Setup

### Packages

```bash
pnpm add stripe @stripe/stripe-js
```

### Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...
```

### Stripe Dashboard Setup (Manual)

1. Create a product: **"Lauf Blocks Pro"**
2. Create two prices:
   - Monthly: `$X/month` (recurring)
   - Annual: `$X/year` (recurring)
3. Copy the price IDs to env vars
4. Set up the webhook endpoint (see below)

### Server-Side Stripe Client

`lib/stripe/client.ts`:

```ts
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})
```

### Stripe Config

`lib/stripe/config.ts`:

```ts
export const stripeConfig = {
  prices: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
  },
}
```

---

## Payment Flow

### 1. Checkout

`POST /api/stripe/checkout`

```
Client sends: { priceId: "monthly" | "annual" }
Server:
  1. Gets Clerk userId via auth()
  2. Gets Clerk user to check for existing stripeCustomerId in privateMetadata
  3. If no customer: creates one in Stripe, stores ID in Clerk privateMetadata
  4. Creates Stripe checkout session (mode: "subscription")
  5. Returns { url: session.url }
Client redirects to Stripe checkout
```

### 2. Webhook

`POST /api/webhooks/stripe`

Stripe sends events here after payment actions. The route:
1. Reads raw request body (`req.text()`)
2. Verifies signature with `stripe.webhooks.constructEvent(body, sig, secret)`
3. Handles events:

| Event | Action |
|---|---|
| `checkout.session.completed` | Set `publicMetadata.plan = "pro"` |
| `customer.subscription.updated` | Check status, update if needed |
| `customer.subscription.deleted` | Set `publicMetadata.plan = "free"` |

**Finding the Clerk user from a webhook:** The Clerk `userId` is stored in Stripe customer metadata during checkout creation. The webhook handler reads `customer.metadata.clerkUserId` to find the right user.

### 3. Customer Portal

`POST /api/stripe/portal`

Creates a Stripe Customer Portal session. Users can:
- View their subscription
- Change plan (monthly ↔ annual)
- Update payment method
- Cancel subscription

Returns `{ url: portalSession.url }` for client redirect.

---

## Clerk ↔ Stripe Sync

```
             Clerk                          Stripe
          ┌─────────┐                   ┌─────────┐
          │  User    │                   │Customer │
          │          │  stripeCustomerId │         │
          │ private  │◄────────────────►│ metadata│
          │ Metadata │  clerkUserId     │         │
          │          │                   │         │
          │ public   │  ◄── webhook ──  │ sub     │
          │ Metadata │  plan: "pro"     │ status  │
          │ .plan    │                   │         │
          └─────────┘                   └─────────┘
```

The Stripe webhook is the only writer of `publicMetadata.plan`. The checkout route is the only writer of `privateMetadata.stripeCustomerId`. This keeps the sync unidirectional and predictable.

---

## Gotchas

### Webhook Must Skip Clerk Middleware

The Stripe webhook endpoint is called by Stripe servers, not authenticated users. It must be excluded from `clerkMiddleware()` in `middleware.ts`.

### Race Condition on Signup + Subscribe

If a user signs up and immediately subscribes, the Clerk user might not be fully synced before the Stripe webhook fires. Mitigation: store `clerkUserId` in Stripe customer metadata during checkout, and look up by that ID in the webhook (not by email).

### Raw Body for Webhook Verification

Stripe requires the raw request body for signature verification. In Next.js App Router, use `req.text()` — do not parse as JSON first.

### Test Mode

Use Stripe test mode for development. Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

Set up a local webhook listener during development:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This prints a temporary webhook secret to use as `STRIPE_WEBHOOK_SECRET`.
