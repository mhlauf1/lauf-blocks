# Lauf Blocks — Project Brief & Conventions

> This document is the project's source of truth for what we're building, how we're building it, and why. Read it fully before touching code. It is a living document — we will edit it together as patterns emerge.

---

## What this is

A SaaS product built on Next.js 16 — a storefront of composed, production-grade UI blocks (marketing sections, web app sections, and full page templates) that users can browse, preview, and copy-paste into their own projects.

The product has two tiers: **Free** (12 blocks across every category) and **Pro** (all 48+ blocks, unlocked via Stripe subscription). Access model is shadcn-style copy/paste — no CLI, no npm install.

## What it grew from

This started as a personal block library and workshop. The existing 48 blocks are the foundation — the "free" tier is a curated subset, and everything else is pro. New blocks can be added to either tier.

## The goals that drive every decision

1. Ship a clean, functional SaaS storefront for UI blocks
2. Make blocks easy to browse, preview, and copy
3. Maintain production-grade code quality in every block
4. Keep adding blocks — the library compounds in value
5. Keep blocks data-driven so they're instantly customizable

When something is unclear, optimize for user experience (#2) and code quality (#3).

## The longer-term play

Eventually: a workflow where you look at a bad website, plug in client information, and use this block library to mock up something far better on the fly. **Not building that tool yet**, but blocks stay data-driven to keep that future cheap.

The single biggest implication: **blocks are data-driven.** No hardcoded copy. Each block accepts a typed `content` prop, and the demo content is just one default object. Copy-paste users get the type + demo content as separate files.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, React Server Components by default)
- **Language:** TypeScript, strict mode, no `any`
- **Styling:** Tailwind CSS v4 (oklch color system, `@theme inline` for design tokens)
- **Primitives:** shadcn/ui (base-nova style, base-ui underneath)
- **Icons:** Lucide
- **Images:** `next/image` — abstract gradient/SVG placeholders for demo content
- **Motion:** Motion (framer-motion) — blocks using motion require `"use client"`
- **Auth:** Clerk (`@clerk/nextjs` v7) — `Show` component, `auth()` from server, `useUser()` client-side
- **Payments:** Stripe — checkout sessions, webhooks, customer portal
- **Syntax highlighting:** Shiki (server-side, dual-theme)
- **Package manager:** pnpm
- **Linting/formatting:** Biome + eslint-config-next
- **Dark mode:** `next-themes` + Tailwind `dark:` variant, class strategy

---

## Aesthetic direction

Modern, clean, system-feeling, minimal color palette.

- **Typefaces:** Satoshi (400/500/700) for headlines (`font-heading`), Inter 400 for body (`font-sans`)
- Spacing on 8pt grid; body type 16–17px with generous line-height
- **Borders, no shadows.** Hairline 1px borders. Depth from spacing and bg shifts.
- **Accent color:** Teal (`#0D9488` / oklch 0.55 0.13 175). Custom scale `teal-50` through `teal-950`.
- **Custom easing curves:** `--ease-out-expo`, `--ease-in-out-expo`, `--ease-out-back`

Accessibility is non-negotiable. Focus states, keyboard nav, WCAG AA contrast, semantic HTML.

---

## Architecture

### Block registry

`lib/blocks/registry.ts` is the single source of truth for all block metadata. Every block has: slug, name, description, category, section, tier ("free"|"pro"), componentPath, contentPath.

`lib/blocks/helpers.ts` provides query functions: `getBlockBySlug()`, `getBlocksByCategory()`, `getCategoriesWithCounts()`, `getFreeBlocks()`, etc.

### Source code serving

Block `.tsx` files are cached at build time by `scripts/prebuild-sources.ts` → `lib/blocks/.generated/sources.json`. Runtime reads from this JSON (no `fs` calls). Syntax highlighted server-side with shiki.

### Component + content maps

`scripts/generate-block-maps.ts` reads the registry and generates `lib/blocks/component-map.ts` (dynamic imports for preview) and `lib/blocks/content-map.ts` (dynamic imports for demo content). Run via `pnpm run prebuild:all`.

### Auth + payments

- Clerk `publicMetadata.plan` stores tier ("free"|"pro")
- Clerk `privateMetadata.stripeCustomerId` links to Stripe
- Stripe webhooks update Clerk metadata on subscription changes
- `lib/auth/subscription.ts` provides `getUserPlan()` and `isProUser()`
- No database for MVP — Clerk is the user store, Stripe is the payment store

---

## Demo content

All demo content uses **"Helix"** — a fictional modern SaaS company. Shared brand data: `lib/demo/helix.ts`.

---

## The structure of a "block"

Each block (variant) consists of:

1. **The component** — data-driven, typed props, in `components/blocks/{section}/{name}/{name}.tsx`
2. **Demo content** — `{name}.content.ts` or `.content.tsx` sibling file
3. **Registry entry** — in `lib/blocks/registry.ts` (slug, metadata, tier, paths)

No separate showcase route files needed — the dynamic `[slug]` route handles all blocks.

### Adding a new block

1. Build the component + content file in `components/blocks/{section}/{name}/`
2. Add registry entry in `lib/blocks/registry.ts`
3. Run `pnpm run prebuild:all` to regenerate maps and source cache
4. Visit `/blocks/{slug}` to verify

---

## Folder structure

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
    /layout.tsx                        # Sidebar + header with auth
    /blocks
      /page.tsx                        # Block grid + category filter
      /[slug]/page.tsx                 # Block detail (preview + code)
      /[slug]/tabs.tsx                 # Client-side tab switching
  /preview
    /[slug]/page.tsx                   # Isolated block render (iframe target)
  /api
    /blocks/[slug]/source/route.ts     # Source code endpoint (pro-gated)
    /webhooks/stripe/route.ts          # Stripe webhook handler
    /stripe/checkout/route.ts          # Create checkout session
    /stripe/portal/route.ts            # Customer portal session
/components
  /blocks/                             # All block components
    /marketing/...
    /app/...
    /templates/...
  /storefront/                         # Storefront UI
    sidebar.tsx, block-card.tsx, block-grid.tsx,
    source-panel.tsx, copy-button.tsx, tier-badge.tsx,
    upgrade-cta.tsx, header.tsx, mobile-sidebar.tsx
  /ui/                                 # shadcn primitives
  /theme-provider.tsx
  /theme-toggle.tsx
/lib
  /blocks/
    registry.ts, helpers.ts,
    source.ts, highlight.ts,
    component-map.ts, content-map.ts,   # Generated — do not edit
    .generated/sources.json             # Generated — do not edit
  /auth/subscription.ts
  /stripe/client.ts, config.ts
  /demo/helix.ts
  /utils.ts
/scripts/
  prebuild-sources.ts
  generate-block-maps.ts
/middleware.ts                         # Clerk middleware
/docs/                                # Architecture + integration docs
```

---

## Conventions

- **File naming:** kebab-case files, PascalCase exports
- **Components:** Server Components by default; `"use client"` for interactivity/motion
- **Props:** every block exports its content interface
- **Content shape:** demo data in `./[name].content.ts` — never inline copy in JSX
- **Links as buttons:** use `buttonVariants()` on `<Link>`, not `<Button asChild>`
- **Images:** alt text and explicit dimensions always
- **TypeScript:** no `any`, no `@ts-ignore` without explanation
- **No dead code, no commented-out blocks**
- **Responsive:** mobile-first, tested at standard breakpoints
- **Generated files:** `component-map.ts`, `content-map.ts`, `.generated/` — never edit by hand, regenerate with `pnpm run prebuild:all`
- **Clerk v7 patterns:** Use `Show` component (not `SignedIn`/`SignedOut`), `auth()` from `@clerk/nextjs/server`, `useUser()` client-side
- **Commits:** small and reviewable

---

## How to work with me (Claude Code)

- Show work in small, reviewable steps
- Surface unspecified decisions — ask rather than assuming
- If something in this doc feels wrong, propose an edit
- Treat this as living — update as patterns emerge
- When adding blocks: update registry, run codegen, verify

---

## Open questions

- **Search:** Add search to the storefront when block count makes filtering insufficient
- **Testing:** Revisit Playwright for visual regression
- **Analytics:** Track which blocks are most viewed/copied — will need a database when we get there
- **Pricing model:** Monthly pricing set at $9.99 — revisit based on market feedback

@AGENTS.md
