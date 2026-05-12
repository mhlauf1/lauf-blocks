# Block Library — Project Brief & Conventions

> This document is the project's source of truth for what we're building, how we're building it, and why. Read it fully before touching code. It is a living document — we will edit it together as patterns emerge.

---

## What this is

A personal Next.js 16 library of composed, production-grade UI blocks — **marketing sections, web app sections, and full page templates** — that I own, store, browse via a local showcase site, and use to mock up client work quickly.

It is **not** a SaaS, not a public component library, not something I'm publishing or selling. It's a private workshop and reference collection that compounds in value over time.

## What it isn't

- Not a UI primitives library. shadcn/ui handles that layer underneath. I am building _on top of_ primitives, not rebuilding them.
- Not a public-facing product. The showcase site is for me, not visitors. It can be opinionated, dense, even utilitarian — it's an internal tool, not a marketing page.
- Not a published npm package. No semver, no install docs, no breaking-changes process.
- Not a finished thing. It's a long-running personal practice that grows over time.

## The five goals that drive every decision

1. Have well-built components I can drop into real client websites
2. Have a coherent personal library/playbook that represents my work
3. Use the project to develop and refine my own process
4. Practice and get better at frontend craft
5. Have substantive, shareable work I can post about

When something is unclear, optimize for these — especially #3 and #4. Doing things slightly slower and cleaner beats moving fast and accumulating debt.

## The longer-term play (informs current decisions)

Eventually I want a workflow where I can look at a bad website, plug in a client's information and assets, and use this block library to mock up something far better on the fly. **I am not building that tool yet**, but every decision should keep that future cheap.

The single biggest implication: **blocks are data-driven from day one.** No hardcoded copy. No baked-in images. Each block accepts a typed `content` prop (or destructured equivalent), and the demo content shown in the showcase is just one default object passed in. To mock up a client later, I swap the content object. If we hardcode strings into JSX now, future-me has to refactor everything.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, React Server Components by default)
- **Language:** TypeScript, strict mode, no `any`
- **Styling:** Tailwind CSS v4 (oklch color system, `@theme inline` for design tokens)
- **Primitives:** shadcn/ui (base-nova style, base-ui underneath)
- **Icons:** Lucide
- **Images:** `next/image` — abstract gradient/SVG placeholders for demo content
- **Motion:** Motion (framer-motion) — installed from day one. Blocks using motion require `"use client"`.
- **Package manager:** pnpm
- **Linting/formatting:** Biome (for formatting + linting) alongside eslint-config-next (for Next.js-specific rules)
- **Dark mode:** Built in from day one via `next-themes` + Tailwind `dark:` variant. Theme toggle uses class strategy.
- **Testing:** None for now. The Next.js showcase site is the preview tool.

---

## Aesthetic direction

Modern, clean, system-feeling, minimal color palette. The trap with "minimal" is landing as generic shadcn-default. To stay minimal _and_ distinctive, the differentiation lives in details:

- **Typefaces:** Satoshi 700 for headlines (`font-heading`), Inter 400 for body (`font-sans`). Satoshi is self-hosted via `next/font/local`; Inter via `next/font/google`.
- Real spacing discipline on an 8pt grid; body type around 16–17px with generous line-height (most "minimal" sites are too cramped)
- **Borders, no shadows.** Hairline 1px borders in `border` token. Depth comes from spacing and background color shifts, not elevation.
- **Accent color:** Teal (`#0D9488` / oklch 0.55 0.13 175). Full custom scale defined as `teal-50` through `teal-950`. Primary button/link/ring color uses this.
- **Custom easing curves:** `--ease-out-expo`, `--ease-in-out-expo`, `--ease-out-back` defined in the theme. No default ease-in-out.

These are tendencies, not rules. Break them when there's a reason and we'll talk about it.

Accessibility is non-negotiable. Real focus states. Real keyboard navigation. Color contrast that passes WCAG AA. Semantic HTML. This is craft work.

---

## Demo content

All demo content uses **"Helix"** — a fictional modern SaaS company. This keeps the showcase feeling like a cohesive real site rather than a grab bag. Shared brand data lives in `lib/demo/helix.ts`.

---

## The structure of a "block"

**Variants are the unit of value.** A "Hero" is not one component — it's a family of variants (centered/type-led, asymmetric split, with video, with dashboard mock, etc.). The library's worth comes from variant depth.

Each block (variant) consists of:

1. **The component itself** — fully data-driven, typed props, exported from its own file. Types (the content interface) are exported from the component file.
2. **A demo content file** (`.content.ts` or `.content.tsx`) — default demo data only, imports the type from the component. Lives alongside the component as a sibling file.
3. **A showcase route** — flat route at `/blocks/[block-name]` that previews the block with demo content.

No spec markdown files — the typed content interface is the contract. We'll add specs later if we find we need them.

---

## Folder structure

```
/app
  /blocks                    # Flat showcase routes
    /page.tsx                # Index — grid of all blocks
    /hero-centered/page.tsx  # Preview route for each block
    /hero-split/page.tsx
  /fonts                     # Self-hosted font files (Satoshi woff2)
  /globals.css               # Tailwind + theme tokens + base styles
  /layout.tsx                # Root layout (fonts, ThemeProvider)
  /page.tsx                  # Redirects to /blocks
/components
  /ui                        # shadcn primitives (do not edit unless necessary)
  /blocks
    /marketing
      /hero
        /hero-centered.tsx
        /hero-centered.content.tsx
        /hero-split.tsx
        /hero-split.content.ts
    /app/...
    /templates/...
  /theme-provider.tsx         # next-themes wrapper (client component)
/lib
  /demo
    /helix.ts                 # Shared Helix brand data
  /utils.ts                   # cn() and other utilities
/public
```

Note: blocks live in `/components/blocks/` and showcase routes live in `/app/blocks/`. This two-directory pattern is a known friction point but keeps component code separate from routing.

---

## Conventions

- **File naming:** kebab-case for files (`hero-centered.tsx`), PascalCase for exported components (`HeroCentered`)
- **Components:** Server Components by default; add `"use client"` only when you need interactivity, state, browser APIs, or motion — which is the common case for blocks with animations.
- **Props:** every block exports its content interface (e.g., `HeroCenteredContent`) so types can be imported without pulling demo data.
- **Content shape:** demo data imports from `./[block-name].content.ts` — never inline copy in JSX
- **Links as buttons:** use `buttonVariants()` from shadcn on `<Link>` elements directly, not `<Button asChild>` (base-nova's Button doesn't support asChild)
- **Images:** every image needs alt text and explicit dimensions
- **TypeScript:** no `any`, no `@ts-ignore` without a comment explaining why
- **No dead code, no commented-out blocks, no leftover scaffolding** — this is a craft project
- **Responsive:** mobile-first, tested at standard breakpoints, sensible behavior down to ~360px
- **Commits:** small and reviewable, not big dumps

---

## How to work with me (Claude Code, this is you)

- Show your work in small, reviewable steps rather than dumping a whole feature at once.
- If you find yourself making an unspecified decision, surface it and ask rather than assuming.
- If something in this doc starts feeling wrong as we build, say so — and propose an edit to the doc itself.
- Treat this `CLAUDE.md` as living. We will update it as patterns emerge.

---

## Open questions (remaining)

- **Showcase site evolution:** When do we add search/filter? Likely when we hit 15+ blocks.
- **Testing:** Revisit Playwright for visual regression testing when the library has 10+ blocks.
- **Storybook:** Skipped for now — the Next.js showcase site is the preview tool. Revisit if the showcase becomes insufficient.

Bring new questions to my attention as you spot them.
@AGENTS.md
