# Block Registry

How blocks are registered, categorized, and served.

---

## Registry File

`lib/blocks/registry.ts` is the single source of truth for all block metadata. Every block in the library has an entry here.

### Types

```ts
type BlockTier = "free" | "pro"

type BlockCategory =
  | "Heroes" | "Navbars" | "Features" | "Pricing"
  | "Testimonials" | "CTAs" | "FAQ" | "Stats"
  | "Logo Cloud" | "Team" | "Contact" | "Footer"
  | "Auth" | "Dashboard" | "Sidebar" | "Settings"
  | "Data Table" | "Empty States" | "Banners"
  | "Templates"

type BlockSection = "marketing" | "app" | "templates"

interface BlockMeta {
  slug: string            // URL slug, e.g. "hero-centered"
  name: string            // Display name, e.g. "Hero — Centered"
  description: string     // One-line description
  category: BlockCategory // Fine-grained category for sidebar nav
  section: BlockSection   // Top-level grouping
  tier: BlockTier         // "free" or "pro"
  componentPath: string   // Relative path to .tsx component
  contentPath: string     // Relative path to .content.ts/.content.tsx
}
```

### Example Entry

```ts
{
  slug: "hero-centered",
  name: "Hero — Centered",
  description: "Type-led hero with eyebrow, headline, CTAs, and optional trusted-by row.",
  category: "Heroes",
  section: "marketing",
  tier: "free",
  componentPath: "components/blocks/marketing/hero-centered/hero-centered.tsx",
  contentPath: "components/blocks/marketing/hero-centered/hero-centered.content.tsx",
}
```

---

## Helper Functions

`lib/blocks/helpers.ts` provides pure query functions over the registry:

| Function | Returns |
|---|---|
| `getBlockBySlug(slug)` | Single `BlockMeta` or `undefined` |
| `getBlocksByCategory(category)` | Array of blocks in that category |
| `getBlocksBySection(section)` | Array of blocks in that section |
| `getCategoriesWithCounts()` | `{ category, count }[]` for sidebar |
| `getFreeBlocks()` | All free-tier blocks |
| `getProBlocks()` | All pro-tier blocks |
| `getAllBlocks()` | Every block |

These are synchronous, pure functions — no database, no async.

---

## Adding a New Block

1. **Build the block** in `components/blocks/{section}/{block-name}/`:
   - `{block-name}.tsx` — component with exported content interface
   - `{block-name}.content.ts` (or `.content.tsx`) — demo data

2. **Add a registry entry** in `lib/blocks/registry.ts`:
   - Choose the appropriate `category`, `section`, and `tier`
   - Set `componentPath` and `contentPath` to the correct relative paths

3. **Run codegen** to update the component and content maps:
   ```bash
   pnpm run generate
   ```
   This runs `scripts/generate-block-maps.ts` and `scripts/prebuild-sources.ts`.

4. **Verify** by visiting `/blocks/{slug}` — the block should appear in the grid and render in the detail page.

No need to create a dedicated route file — the dynamic `[slug]` route handles all blocks automatically.

---

## Tier Assignment

### Free Tier (~12 blocks)

One or two blocks per major category. Enough to demonstrate value:

- hero-centered, hero-split
- navbar-simple
- features-grid
- pricing-three-tier
- testimonials-featured
- cta-banner
- faq-accordion
- footer-simple
- auth-sign-in
- empty-state-simple
- template-landing

### Pro Tier (everything else)

All remaining blocks and all new blocks added going forward (unless specifically designated free).

### Changing a Block's Tier

Edit the `tier` field in its registry entry. No other changes needed — the storefront reads tier from the registry at render time.

---

## Codegen Scripts

### `scripts/prebuild-sources.ts`

Reads every block's `.tsx` and `.content.ts/.content.tsx` files, writes their raw source code to `lib/blocks/.generated/sources.json`. This JSON file is read at runtime instead of using `fs.readFileSync`.

Run: `pnpm run prebuild`

### `scripts/generate-block-maps.ts`

Reads the registry and generates:
- `lib/blocks/component-map.ts` — dynamic imports for rendering previews
- `lib/blocks/content-map.ts` — dynamic imports for demo content

Run: `pnpm run generate`

### Combined

Add to `package.json`:

```json
{
  "scripts": {
    "prebuild": "tsx scripts/prebuild-sources.ts",
    "generate": "tsx scripts/generate-block-maps.ts",
    "predev": "pnpm run prebuild && pnpm run generate",
    "prebuild:all": "pnpm run prebuild && pnpm run generate"
  }
}
```

---

## Source Code Serving

### How It Works

1. At build time, `prebuild-sources.ts` reads all block files and caches them as JSON
2. The block detail page reads from this JSON cache
3. `lib/blocks/highlight.ts` uses shiki for server-side syntax highlighting
4. Free blocks: source shown inline, highlighted
5. Pro blocks (subscribed): same as free
6. Pro blocks (not subscribed): first ~15 lines shown with gradient fade + upgrade CTA

### API Route

`/api/blocks/[slug]/source` — returns raw source for pro blocks after auth check. Used by the copy button when the full source isn't rendered inline.

### Multiple Files Per Block

Each block has at least two files users need:
- The component (`.tsx`)
- The content file (`.content.ts` or `.content.tsx`)

The source panel shows these as separate tabs or a file tree so users can copy both.
