# Architecture

System overview for Lauf Blocks SaaS.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 16 App                    │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│  Clerk   │              App Router                  │
│  Auth    │                                          │
│          │  /(auth)        sign-in, sign-up         │
│          │  /(storefront)  sidebar + block grid     │
│          │  /preview       isolated block render    │
│          │  /pricing       free vs pro comparison   │
│          │  /              marketing landing page   │
│          │                                          │
├──────────┼──────────────────────────────────────────┤
│          │              API Routes                   │
│  Stripe  │                                          │
│  Payments│  /api/blocks/[slug]/source  (pro-gated)  │
│          │  /api/stripe/checkout                     │
│          │  /api/stripe/portal                       │
│          │  /api/webhooks/stripe                     │
│          │                                          │
├──────────┴──────────────────────────────────────────┤
│                   Data Layer                         │
│                                                     │
│  Block Registry (lib/blocks/registry.ts)            │
│  Pre-built Sources (lib/blocks/.generated/)         │
│  Clerk publicMetadata (subscription tier)           │
│  Stripe (payment state of record)                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Route Structure

| Route | Purpose | Auth Required |
|---|---|---|
| `/` | Marketing landing page | No |
| `/pricing` | Free vs Pro comparison + checkout | No |
| `/sign-in` | Clerk sign-in | No |
| `/sign-up` | Clerk sign-up | No |
| `/blocks` | Block grid with sidebar categories | No |
| `/blocks/[slug]` | Block detail — preview + source tabs | No (source gated for pro) |
| `/preview/[slug]` | Isolated block preview (iframe target) | No |
| `/api/blocks/[slug]/source` | Raw source code endpoint | Yes (pro blocks) |
| `/api/stripe/checkout` | Create Stripe checkout session | Yes |
| `/api/stripe/portal` | Create Stripe portal session | Yes |
| `/api/webhooks/stripe` | Stripe webhook handler | No (signature verified) |

---

## Route Groups

- `(auth)` — Clerk sign-in/sign-up pages. No shared layout beyond root.
- `(storefront)` — Sidebar + header layout. Contains `/blocks` and `/blocks/[slug]`.
- `/preview` — No layout wrapper. Renders blocks in isolation for iframe embedding.

---

## Data Flow

### Browsing Blocks

```
User visits /blocks
  → Server reads block registry
  → Filters by ?category= search param (if present)
  → Renders sidebar (categories + counts) + block grid
  → Each card shows name, description, tier badge
```

### Viewing a Block

```
User clicks block card → /blocks/[slug]
  → Server looks up block in registry
  → Preview tab: renders <iframe src="/preview/[slug]" />
  → Code tab:
    → Free block: reads source from .generated/sources.json, highlights with shiki
    → Pro block + subscribed: same as free
    → Pro block + not subscribed: shows first ~15 lines with fade + upgrade CTA
```

### Copying Source Code

```
User clicks "Copy" on code tab
  → Free block: copies from pre-rendered source (already in page)
  → Pro block: fetches /api/blocks/[slug]/source (auth-checked), copies result
```

### Subscribing

```
User clicks upgrade CTA
  → Not signed in: redirects to /sign-in
  → Signed in: POST /api/stripe/checkout { priceId }
    → Server gets/creates Stripe customer (stores ID in Clerk privateMetadata)
    → Creates checkout session
    → Returns session URL → client redirects to Stripe
  → User completes payment on Stripe
  → Stripe fires webhook → /api/webhooks/stripe
    → checkout.session.completed → sets Clerk publicMetadata.plan = "pro"
  → User redirected back to /blocks?upgraded=true
```

---

## Key Design Decisions

### No Database for MVP

Clerk stores user data and subscription tier (`publicMetadata.plan`). Stripe is the payment state of record. The block registry is a static TypeScript file. No database needed until we add analytics, download counts, or per-block access logs.

### Block Preview Isolation

Blocks are rendered in iframes pointing to `/preview/[slug]`. This prevents CSS conflicts — navbar blocks with `sticky top-0 z-50` won't collide with the storefront header.

### Pre-built Source Code

Block `.tsx` files are read at build time by `scripts/prebuild-sources.ts` and cached as `lib/blocks/.generated/sources.json`. This avoids `fs.readFileSync` at runtime, which fails on serverless platforms where source files aren't deployed.

### Central Block Registry

A single `lib/blocks/registry.ts` maps every block's slug to its metadata (tier, category, file paths). All queries go through `lib/blocks/helpers.ts`. No per-block `meta.ts` files — one source of truth.

### Component + Content Maps via Codegen

`scripts/generate-block-maps.ts` reads the registry and generates the dynamic import maps. Run as a prebuild step to prevent drift.

---

## Folder Structure

```
/app
  /layout.tsx                          # Root: fonts, ClerkProvider, ThemeProvider
  /page.tsx                            # Marketing landing page
  /globals.css                         # Tailwind v4 theme tokens
  /pricing/page.tsx                    # Pricing comparison
  /(auth)
    /sign-in/[[...sign-in]]/page.tsx
    /sign-up/[[...sign-up]]/page.tsx
  /(storefront)
    /layout.tsx                        # Sidebar + header
    /blocks
      /page.tsx                        # Block grid + category filter
      /[slug]/page.tsx                 # Block detail (preview + code)
  /preview
    /[slug]/page.tsx                   # Isolated block preview
  /api
    /blocks/[slug]/source/route.ts
    /webhooks/stripe/route.ts
    /stripe/checkout/route.ts
    /stripe/portal/route.ts
/components
  /blocks/                             # All block components (unchanged)
    /marketing/...
    /app/...
    /templates/...
  /storefront/                         # Storefront UI components
    sidebar.tsx, block-card.tsx, block-grid.tsx,
    source-panel.tsx, copy-button.tsx, tier-badge.tsx,
    upgrade-cta.tsx, header.tsx
  /ui/                                 # shadcn primitives (unchanged)
  /theme-provider.tsx
  /theme-toggle.tsx
/lib
  /blocks/
    registry.ts, helpers.ts,
    source.ts, highlight.ts,
    component-map.ts, content-map.ts,
    .generated/sources.json
  /auth/subscription.ts
  /stripe/client.ts, config.ts
  /demo/helix.ts
  /utils.ts
/scripts/
  prebuild-sources.ts
  generate-block-maps.ts
/middleware.ts
```
