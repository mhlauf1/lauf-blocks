# Deployment

Environment setup, build process, and hosting configuration.

---

## Environment Variables

### Required — Auth (Clerk)

| Variable | Where to Get |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Set to `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Set to `/sign-up` |

### Required — Payments (Stripe)

| Variable | Where to Get |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks → Signing Secret |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Stripe Dashboard → Products → Price ID |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Stripe Dashboard → Products → Price ID |

### `.env.local` Template

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...
```

---

## Build Process

### Scripts

```bash
pnpm run prebuild    # Cache block source files as JSON
pnpm run generate    # Generate component + content maps from registry
pnpm run build       # Next.js production build
```

The `predev` and `prebuild` npm scripts run the codegen automatically before `dev` and `build`.

### Build Order

1. `prebuild-sources.ts` reads all block `.tsx` files → writes `lib/blocks/.generated/sources.json`
2. `generate-block-maps.ts` reads registry → writes `component-map.ts` + `content-map.ts`
3. Next.js build runs with generated files in place

---

## Stripe Webhook Setup

### Production

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret → set as `STRIPE_WEBHOOK_SECRET`

### Local Development

Use the Stripe CLI to forward webhooks locally:

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI prints a temporary webhook secret — use it as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## Vercel Deployment

### Environment Variables

Add all env vars in Vercel Dashboard → Project Settings → Environment Variables. Use different values for Production vs Preview vs Development.

### Important Notes

- Block source files are cached at build time (via `prebuild-sources.ts`), so `fs.readFileSync` is not used at runtime. This is compatible with serverless.
- The `scripts/` directory and raw block `.tsx` files do not need to be available at runtime.
- Middleware runs on the Edge Runtime. Ensure `@clerk/nextjs` middleware is compatible.

### Build Command

```bash
pnpm run prebuild:all && pnpm run build
```

Or add to `package.json`:

```json
{
  "scripts": {
    "vercel-build": "pnpm run prebuild && pnpm run generate && next build"
  }
}
```

---

## Clerk Production Setup

1. Create a production instance in Clerk Dashboard
2. Set the production API keys in Vercel env vars
3. Configure allowed origins for your domain
4. Set up custom domain for Clerk (optional, for branded auth pages)

---

## Checklist

- [ ] Clerk project created, API keys set
- [ ] Stripe product + prices created
- [ ] Stripe webhook endpoint configured
- [ ] All env vars set in hosting platform
- [ ] `prebuild-sources.ts` runs successfully in CI
- [ ] `generate-block-maps.ts` runs successfully in CI
- [ ] Build completes without errors
- [ ] Webhook signature verification works
- [ ] Test checkout flow end-to-end (test mode)
- [ ] Verify pro blocks lock/unlock correctly
