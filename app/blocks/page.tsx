import Link from "next/link"

type Block = {
  name: string
  slug: string
  category: string
  description: string
  built: boolean
}

const blocks: Block[] = [
  // ── Heroes ──
  {
    name: "Hero — Centered",
    slug: "hero-centered",
    category: "Marketing",
    description: "Type-led hero with eyebrow, headline, CTAs, and optional trusted-by row.",
    built: true,
  },
  {
    name: "Hero — Split",
    slug: "hero-split",
    category: "Marketing",
    description: "Asymmetric split with text left and visual right.",
    built: true,
  },
  {
    name: "Hero — With Video",
    slug: "hero-video",
    category: "Marketing",
    description: "Centered hero with an embedded or background video.",
    built: false,
  },
  {
    name: "Hero — With Dashboard",
    slug: "hero-dashboard",
    category: "Marketing",
    description: "Hero with a product screenshot or dashboard mockup below the fold.",
    built: false,
  },

  // ── Navbars ──
  {
    name: "Navbar — Simple",
    slug: "navbar-simple",
    category: "Marketing",
    description: "Horizontal nav with logo, links, and CTA. Mobile hamburger menu.",
    built: false,
  },
  {
    name: "Navbar — With Dropdowns",
    slug: "navbar-dropdowns",
    category: "Marketing",
    description: "Nav with mega-menu or dropdown sections for product/features.",
    built: false,
  },

  // ── Features ──
  {
    name: "Features — Grid",
    slug: "features-grid",
    category: "Marketing",
    description: "3- or 4-column icon grid. Each card has icon, title, and description.",
    built: false,
  },
  {
    name: "Features — Alternating Rows",
    slug: "features-alternating",
    category: "Marketing",
    description: "Text + visual rows that alternate left/right down the page.",
    built: false,
  },
  {
    name: "Features — Bento Grid",
    slug: "features-bento",
    category: "Marketing",
    description: "Asymmetric bento-style grid with mixed card sizes.",
    built: false,
  },
  {
    name: "Features — With Large Visual",
    slug: "features-visual",
    category: "Marketing",
    description: "Feature list on one side, large product screenshot on the other.",
    built: false,
  },

  // ── Pricing ──
  {
    name: "Pricing — Three Tier",
    slug: "pricing-three-tier",
    category: "Marketing",
    description: "Classic 3-column pricing cards with highlighted recommended plan.",
    built: false,
  },
  {
    name: "Pricing — Comparison Table",
    slug: "pricing-comparison",
    category: "Marketing",
    description: "Full feature comparison table across plans.",
    built: false,
  },
  {
    name: "Pricing — Simple Toggle",
    slug: "pricing-toggle",
    category: "Marketing",
    description: "Two-tier pricing with monthly/annual toggle.",
    built: false,
  },

  // ── Testimonials ──
  {
    name: "Testimonials — Carousel",
    slug: "testimonials-carousel",
    category: "Marketing",
    description: "Horizontal carousel of quote cards with avatar, name, and role.",
    built: false,
  },
  {
    name: "Testimonials — Grid",
    slug: "testimonials-grid",
    category: "Marketing",
    description: "Masonry or uniform grid of testimonial cards.",
    built: false,
  },
  {
    name: "Testimonials — Featured Quote",
    slug: "testimonials-featured",
    category: "Marketing",
    description: "Single large pull-quote with photo and attribution.",
    built: false,
  },

  // ── CTAs ──
  {
    name: "CTA — Banner",
    slug: "cta-banner",
    category: "Marketing",
    description: "Full-width banner with headline, body, and action button.",
    built: false,
  },
  {
    name: "CTA — Split",
    slug: "cta-split",
    category: "Marketing",
    description: "Text on one side, email input or CTA on the other.",
    built: false,
  },
  {
    name: "CTA — Newsletter",
    slug: "cta-newsletter",
    category: "Marketing",
    description: "Centered email capture with headline and privacy note.",
    built: false,
  },

  // ── FAQ ──
  {
    name: "FAQ — Accordion",
    slug: "faq-accordion",
    category: "Marketing",
    description: "Expandable question/answer list with smooth open/close.",
    built: false,
  },
  {
    name: "FAQ — Two Column",
    slug: "faq-two-column",
    category: "Marketing",
    description: "Questions and answers laid out in a two-column grid.",
    built: false,
  },

  // ── Stats / Metrics ──
  {
    name: "Stats — Row",
    slug: "stats-row",
    category: "Marketing",
    description: "Horizontal row of big numbers with labels (e.g., 99.9% uptime).",
    built: false,
  },
  {
    name: "Stats — With Context",
    slug: "stats-context",
    category: "Marketing",
    description: "Stats with supporting copy or icons for each metric.",
    built: false,
  },

  // ── Logo Cloud ──
  {
    name: "Logo Cloud — Simple",
    slug: "logo-cloud-simple",
    category: "Marketing",
    description: "Row of partner/client logos with optional heading.",
    built: false,
  },
  {
    name: "Logo Cloud — Marquee",
    slug: "logo-cloud-marquee",
    category: "Marketing",
    description: "Infinitely scrolling horizontal logo ticker.",
    built: false,
  },

  // ── Team ──
  {
    name: "Team — Grid",
    slug: "team-grid",
    category: "Marketing",
    description: "Photo + name + role cards in a responsive grid.",
    built: false,
  },

  // ── Contact ──
  {
    name: "Contact — Form",
    slug: "contact-form",
    category: "Marketing",
    description: "Contact form with name, email, message fields and submit.",
    built: false,
  },
  {
    name: "Contact — Split",
    slug: "contact-split",
    category: "Marketing",
    description: "Contact info on one side, form on the other.",
    built: false,
  },

  // ── Footer ──
  {
    name: "Footer — Columns",
    slug: "footer-columns",
    category: "Marketing",
    description: "Multi-column footer with link groups, logo, and legal line.",
    built: false,
  },
  {
    name: "Footer — Simple",
    slug: "footer-simple",
    category: "Marketing",
    description: "Minimal single-row footer with links and copyright.",
    built: false,
  },

  // ── App: Auth ──
  {
    name: "Auth — Sign In",
    slug: "auth-sign-in",
    category: "App",
    description: "Sign-in form with email/password, social login options, and forgot password link.",
    built: false,
  },
  {
    name: "Auth — Sign Up",
    slug: "auth-sign-up",
    category: "App",
    description: "Registration form with name, email, password, and terms checkbox.",
    built: false,
  },
  {
    name: "Auth — Split",
    slug: "auth-split",
    category: "App",
    description: "Auth form on one side, branded visual or testimonial on the other.",
    built: false,
  },

  // ── App: Dashboard ──
  {
    name: "Dashboard — Shell",
    slug: "dashboard-shell",
    category: "App",
    description: "App shell with sidebar nav, top bar, and main content area.",
    built: false,
  },
  {
    name: "Dashboard — Overview",
    slug: "dashboard-overview",
    category: "App",
    description: "Metric cards, charts, and recent activity in a dashboard layout.",
    built: false,
  },

  // ── App: Sidebar ──
  {
    name: "Sidebar — Collapsible",
    slug: "sidebar-collapsible",
    category: "App",
    description: "Vertical sidebar that collapses to icons. Groups, active states, badge counts.",
    built: false,
  },

  // ── App: Settings ──
  {
    name: "Settings — Form",
    slug: "settings-form",
    category: "App",
    description: "Settings page with grouped form sections and save/cancel.",
    built: false,
  },
  {
    name: "Settings — Tabbed",
    slug: "settings-tabbed",
    category: "App",
    description: "Settings with tab navigation (Profile, Billing, Notifications, etc.).",
    built: false,
  },

  // ── App: Data Table ──
  {
    name: "Data Table — Full",
    slug: "data-table-full",
    category: "App",
    description: "Sortable, filterable table with pagination, row selection, and bulk actions.",
    built: false,
  },

  // ── App: Empty States ──
  {
    name: "Empty State — Simple",
    slug: "empty-state-simple",
    category: "App",
    description: "Illustration or icon, headline, body, and primary action for empty views.",
    built: false,
  },

  // ── App: Notification / Banners ──
  {
    name: "Banner — Top",
    slug: "banner-top",
    category: "App",
    description: "Dismissible announcement banner pinned to top of page.",
    built: false,
  },

  // ── Templates ──
  {
    name: "Template — Landing Page",
    slug: "template-landing",
    category: "Template",
    description: "Full landing page: navbar, hero, features, testimonials, CTA, footer.",
    built: false,
  },
  {
    name: "Template — Pricing Page",
    slug: "template-pricing",
    category: "Template",
    description: "Full pricing page: navbar, pricing section, FAQ, CTA, footer.",
    built: false,
  },
  {
    name: "Template — About Page",
    slug: "template-about",
    category: "Template",
    description: "About page: hero, team, stats, mission statement, footer.",
    built: false,
  },
  {
    name: "Template — Dashboard",
    slug: "template-dashboard",
    category: "Template",
    description: "Full app layout: sidebar, top bar, overview content area.",
    built: false,
  },
]

const categories = ["Marketing", "App", "Template"] as const

export default function BlocksIndex() {
  const builtCount = blocks.filter((b) => b.built).length

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Blocks</h1>
      <p className="mt-2 text-muted-foreground">
        {builtCount} of {blocks.length} blocks built.
      </p>

      {categories.map((category) => {
        const categoryBlocks = blocks.filter((b) => b.category === category)
        if (categoryBlocks.length === 0) return null

        return (
          <section key={category} className="mt-12">
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              {category}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {categoryBlocks.map((block) =>
                block.built ? (
                  <Link
                    key={block.slug}
                    href={`/blocks/${block.slug}`}
                    className="group rounded-lg border border-border p-5 transition-colors duration-150 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary">
                        {block.name}
                      </h3>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        Built
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {block.description}
                    </p>
                  </Link>
                ) : (
                  <div
                    key={block.slug}
                    className="rounded-lg border border-dashed border-border p-5 opacity-60"
                  >
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {block.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {block.description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>
        )
      })}
    </main>
  )
}
