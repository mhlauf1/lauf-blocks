export type BlockTier = "free" | "pro"

export type BlockCategory =
  | "Heroes"
  | "Navbars"
  | "Features"
  | "Pricing"
  | "Testimonials"
  | "CTAs"
  | "FAQ"
  | "Stats"
  | "Logo Cloud"
  | "Team"
  | "Contact"
  | "Footer"
  | "Auth"
  | "Dashboard"
  | "Sidebar"
  | "Settings"
  | "Data Table"
  | "Empty States"
  | "Banners"
  | "Templates"

export type BlockSection = "marketing" | "app" | "templates"

export interface BlockMeta {
  slug: string
  name: string
  description: string
  category: BlockCategory
  section: BlockSection
  tier: BlockTier
  componentPath: string
  contentPath: string
}

export const blocks: BlockMeta[] = [
  // ── Heroes ──
  {
    slug: "hero-centered",
    name: "Hero — Centered",
    description: "Type-led hero with eyebrow, headline, CTAs, and optional trusted-by row.",
    category: "Heroes",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/hero-centered/hero-centered.tsx",
    contentPath: "components/blocks/marketing/hero-centered/hero-centered.content.tsx",
  },
  {
    slug: "hero-split",
    name: "Hero — Split",
    description: "Asymmetric split with text left and visual right.",
    category: "Heroes",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/hero-split/hero-split.tsx",
    contentPath: "components/blocks/marketing/hero-split/hero-split.content.ts",
  },
  {
    slug: "hero-video",
    name: "Hero — With Video",
    description: "Centered hero with an embedded or background video.",
    category: "Heroes",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/hero-video/hero-video.tsx",
    contentPath: "components/blocks/marketing/hero-video/hero-video.content.ts",
  },
  {
    slug: "hero-dashboard",
    name: "Hero — With Dashboard",
    description: "Hero with a product screenshot or dashboard mockup below the fold.",
    category: "Heroes",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/hero-dashboard/hero-dashboard.tsx",
    contentPath: "components/blocks/marketing/hero-dashboard/hero-dashboard.content.ts",
  },
  {
    slug: "hero-fullbleed-image",
    name: "Hero — Fullbleed Image",
    description: "Full-viewport background image with text pinned bottom-left over gradient scrim.",
    category: "Heroes",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/hero-fullbleed-image/hero-fullbleed-image.tsx",
    contentPath: "components/blocks/marketing/hero-fullbleed-image/hero-fullbleed-image.content.ts",
  },
  {
    slug: "hero-fullbleed-video",
    name: "Hero — Fullbleed Video",
    description: "Full-viewport background video (autoplay, muted, looped) with text bottom-left.",
    category: "Heroes",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/hero-fullbleed-video/hero-fullbleed-video.tsx",
    contentPath: "components/blocks/marketing/hero-fullbleed-video/hero-fullbleed-video.content.ts",
  },
  {
    slug: "hero-fullbleed-split",
    name: "Hero — Fullbleed Split",
    description: "Full-viewport media background with headline left, description + CTAs bottom-right.",
    category: "Heroes",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/hero-fullbleed-split/hero-fullbleed-split.tsx",
    contentPath: "components/blocks/marketing/hero-fullbleed-split/hero-fullbleed-split.content.ts",
  },

  // ── Navbars ──
  {
    slug: "navbar-simple",
    name: "Navbar — Simple",
    description: "Horizontal nav with logo, links, and CTA. Mobile hamburger menu.",
    category: "Navbars",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/navbar-simple/navbar-simple.tsx",
    contentPath: "components/blocks/marketing/navbar-simple/navbar-simple.content.ts",
  },
  {
    slug: "navbar-dropdowns",
    name: "Navbar — With Dropdowns",
    description: "Nav with mega-menu or dropdown sections for product/features.",
    category: "Navbars",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/navbar-dropdowns/navbar-dropdowns.tsx",
    contentPath: "components/blocks/marketing/navbar-dropdowns/navbar-dropdowns.content.ts",
  },

  // ── Features ──
  {
    slug: "features-grid",
    name: "Features — Grid",
    description: "3- or 4-column icon grid. Each card has icon, title, and description.",
    category: "Features",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/features-grid/features-grid.tsx",
    contentPath: "components/blocks/marketing/features-grid/features-grid.content.tsx",
  },
  {
    slug: "features-alternating",
    name: "Features — Alternating Rows",
    description: "Text + visual rows that alternate left/right down the page.",
    category: "Features",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/features-alternating/features-alternating.tsx",
    contentPath: "components/blocks/marketing/features-alternating/features-alternating.content.tsx",
  },
  {
    slug: "features-bento",
    name: "Features — Bento Grid",
    description: "Asymmetric bento-style grid with mixed card sizes.",
    category: "Features",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/features-bento/features-bento.tsx",
    contentPath: "components/blocks/marketing/features-bento/features-bento.content.tsx",
  },
  {
    slug: "features-visual",
    name: "Features — With Large Visual",
    description: "Feature list on one side, large product screenshot on the other.",
    category: "Features",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/features-visual/features-visual.tsx",
    contentPath: "components/blocks/marketing/features-visual/features-visual.content.tsx",
  },

  // ── Pricing ──
  {
    slug: "pricing-three-tier",
    name: "Pricing — Three Tier",
    description: "Classic 3-column pricing cards with highlighted recommended plan.",
    category: "Pricing",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/pricing-three-tier/pricing-three-tier.tsx",
    contentPath: "components/blocks/marketing/pricing-three-tier/pricing-three-tier.content.ts",
  },
  {
    slug: "pricing-comparison",
    name: "Pricing — Comparison Table",
    description: "Full feature comparison table across plans.",
    category: "Pricing",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/pricing-comparison/pricing-comparison.tsx",
    contentPath: "components/blocks/marketing/pricing-comparison/pricing-comparison.content.ts",
  },
  {
    slug: "pricing-toggle",
    name: "Pricing — Simple Toggle",
    description: "Two-tier pricing with monthly/annual toggle.",
    category: "Pricing",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/pricing-toggle/pricing-toggle.tsx",
    contentPath: "components/blocks/marketing/pricing-toggle/pricing-toggle.content.ts",
  },

  // ── Testimonials ──
  {
    slug: "testimonials-carousel",
    name: "Testimonials — Carousel",
    description: "Horizontal carousel of quote cards with avatar, name, and role.",
    category: "Testimonials",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/testimonials-carousel/testimonials-carousel.tsx",
    contentPath: "components/blocks/marketing/testimonials-carousel/testimonials-carousel.content.ts",
  },
  {
    slug: "testimonials-grid",
    name: "Testimonials — Grid",
    description: "Masonry or uniform grid of testimonial cards.",
    category: "Testimonials",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/testimonials-grid/testimonials-grid.tsx",
    contentPath: "components/blocks/marketing/testimonials-grid/testimonials-grid.content.ts",
  },
  {
    slug: "testimonials-featured",
    name: "Testimonials — Featured Quote",
    description: "Single large pull-quote with photo and attribution.",
    category: "Testimonials",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/testimonials-featured/testimonials-featured.tsx",
    contentPath: "components/blocks/marketing/testimonials-featured/testimonials-featured.content.ts",
  },

  // ── CTAs ──
  {
    slug: "cta-banner",
    name: "CTA — Banner",
    description: "Full-width banner with headline, body, and action button.",
    category: "CTAs",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/cta-banner/cta-banner.tsx",
    contentPath: "components/blocks/marketing/cta-banner/cta-banner.content.ts",
  },
  {
    slug: "cta-split",
    name: "CTA — Split",
    description: "Text on one side, email input or CTA on the other.",
    category: "CTAs",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/cta-split/cta-split.tsx",
    contentPath: "components/blocks/marketing/cta-split/cta-split.content.ts",
  },
  {
    slug: "cta-newsletter",
    name: "CTA — Newsletter",
    description: "Centered email capture with headline and privacy note.",
    category: "CTAs",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/cta-newsletter/cta-newsletter.tsx",
    contentPath: "components/blocks/marketing/cta-newsletter/cta-newsletter.content.ts",
  },

  // ── FAQ ──
  {
    slug: "faq-accordion",
    name: "FAQ — Accordion",
    description: "Expandable question/answer list with smooth open/close.",
    category: "FAQ",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/faq-accordion/faq-accordion.tsx",
    contentPath: "components/blocks/marketing/faq-accordion/faq-accordion.content.ts",
  },
  {
    slug: "faq-two-column",
    name: "FAQ — Two Column",
    description: "Questions and answers laid out in a two-column grid.",
    category: "FAQ",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/faq-two-column/faq-two-column.tsx",
    contentPath: "components/blocks/marketing/faq-two-column/faq-two-column.content.ts",
  },

  // ── Stats ──
  {
    slug: "stats-row",
    name: "Stats — Row",
    description: "Horizontal row of big numbers with labels (e.g., 99.9% uptime).",
    category: "Stats",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/stats-row/stats-row.tsx",
    contentPath: "components/blocks/marketing/stats-row/stats-row.content.ts",
  },
  {
    slug: "stats-context",
    name: "Stats — With Context",
    description: "Stats with supporting copy or icons for each metric.",
    category: "Stats",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/stats-context/stats-context.tsx",
    contentPath: "components/blocks/marketing/stats-context/stats-context.content.tsx",
  },

  // ── Logo Cloud ──
  {
    slug: "logo-cloud-simple",
    name: "Logo Cloud — Simple",
    description: "Row of partner/client logos with optional heading.",
    category: "Logo Cloud",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/logo-cloud-simple/logo-cloud-simple.tsx",
    contentPath: "components/blocks/marketing/logo-cloud-simple/logo-cloud-simple.content.tsx",
  },
  {
    slug: "logo-cloud-marquee",
    name: "Logo Cloud — Marquee",
    description: "Infinitely scrolling horizontal logo ticker.",
    category: "Logo Cloud",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/logo-cloud-marquee/logo-cloud-marquee.tsx",
    contentPath: "components/blocks/marketing/logo-cloud-marquee/logo-cloud-marquee.content.tsx",
  },

  // ── Team ──
  {
    slug: "team-grid",
    name: "Team — Grid",
    description: "Photo + name + role cards in a responsive grid.",
    category: "Team",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/team-grid/team-grid.tsx",
    contentPath: "components/blocks/marketing/team-grid/team-grid.content.ts",
  },

  // ── Contact ──
  {
    slug: "contact-form",
    name: "Contact — Form",
    description: "Contact form with name, email, message fields and submit.",
    category: "Contact",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/contact-form/contact-form.tsx",
    contentPath: "components/blocks/marketing/contact-form/contact-form.content.ts",
  },
  {
    slug: "contact-split",
    name: "Contact — Split",
    description: "Contact info on one side, form on the other.",
    category: "Contact",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/contact-split/contact-split.tsx",
    contentPath: "components/blocks/marketing/contact-split/contact-split.content.tsx",
  },

  // ── Footer ──
  {
    slug: "footer-columns",
    name: "Footer — Columns",
    description: "Multi-column footer with link groups, logo, and legal line.",
    category: "Footer",
    section: "marketing",
    tier: "pro",
    componentPath: "components/blocks/marketing/footer-columns/footer-columns.tsx",
    contentPath: "components/blocks/marketing/footer-columns/footer-columns.content.ts",
  },
  {
    slug: "footer-simple",
    name: "Footer — Simple",
    description: "Minimal single-row footer with links and copyright.",
    category: "Footer",
    section: "marketing",
    tier: "free",
    componentPath: "components/blocks/marketing/footer-simple/footer-simple.tsx",
    contentPath: "components/blocks/marketing/footer-simple/footer-simple.content.ts",
  },

  // ── App: Auth ──
  {
    slug: "auth-sign-in",
    name: "Auth — Sign In",
    description: "Sign-in form with email/password, social login options, and forgot password link.",
    category: "Auth",
    section: "app",
    tier: "free",
    componentPath: "components/blocks/app/auth-sign-in/auth-sign-in.tsx",
    contentPath: "components/blocks/app/auth-sign-in/auth-sign-in.content.tsx",
  },
  {
    slug: "auth-sign-up",
    name: "Auth — Sign Up",
    description: "Registration form with name, email, password, and terms checkbox.",
    category: "Auth",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/auth-sign-up/auth-sign-up.tsx",
    contentPath: "components/blocks/app/auth-sign-up/auth-sign-up.content.ts",
  },
  {
    slug: "auth-split",
    name: "Auth — Split",
    description: "Auth form on one side, branded visual or testimonial on the other.",
    category: "Auth",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/auth-split/auth-split.tsx",
    contentPath: "components/blocks/app/auth-split/auth-split.content.tsx",
  },

  // ── App: Dashboard ──
  {
    slug: "dashboard-shell",
    name: "Dashboard — Shell",
    description: "App shell with sidebar nav, top bar, and main content area.",
    category: "Dashboard",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/dashboard-shell/dashboard-shell.tsx",
    contentPath: "components/blocks/app/dashboard-shell/dashboard-shell.content.tsx",
  },
  {
    slug: "dashboard-overview",
    name: "Dashboard — Overview",
    description: "Metric cards, charts, and recent activity in a dashboard layout.",
    category: "Dashboard",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/dashboard-overview/dashboard-overview.tsx",
    contentPath: "components/blocks/app/dashboard-overview/dashboard-overview.content.tsx",
  },

  // ── App: Sidebar ──
  {
    slug: "sidebar-collapsible",
    name: "Sidebar — Collapsible",
    description: "Vertical sidebar that collapses to icons. Groups, active states, badge counts.",
    category: "Sidebar",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/sidebar-collapsible/sidebar-collapsible.tsx",
    contentPath: "components/blocks/app/sidebar-collapsible/sidebar-collapsible.content.tsx",
  },

  // ── App: Settings ──
  {
    slug: "settings-form",
    name: "Settings — Form",
    description: "Settings page with grouped form sections and save/cancel.",
    category: "Settings",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/settings-form/settings-form.tsx",
    contentPath: "components/blocks/app/settings-form/settings-form.content.ts",
  },
  {
    slug: "settings-tabbed",
    name: "Settings — Tabbed",
    description: "Settings with tab navigation (Profile, Billing, Notifications, etc.).",
    category: "Settings",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/settings-tabbed/settings-tabbed.tsx",
    contentPath: "components/blocks/app/settings-tabbed/settings-tabbed.content.tsx",
  },

  // ── App: Data Table ──
  {
    slug: "data-table-full",
    name: "Data Table — Full",
    description: "Sortable, filterable table with pagination, row selection, and bulk actions.",
    category: "Data Table",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/data-table-full/data-table-full.tsx",
    contentPath: "components/blocks/app/data-table-full/data-table-full.content.tsx",
  },

  // ── App: Empty States ──
  {
    slug: "empty-state-simple",
    name: "Empty State — Simple",
    description: "Illustration or icon, headline, body, and primary action for empty views.",
    category: "Empty States",
    section: "app",
    tier: "free",
    componentPath: "components/blocks/app/empty-state-simple/empty-state-simple.tsx",
    contentPath: "components/blocks/app/empty-state-simple/empty-state-simple.content.tsx",
  },

  // ── App: Banners ──
  {
    slug: "banner-top",
    name: "Banner — Top",
    description: "Dismissible announcement banner pinned to top of page.",
    category: "Banners",
    section: "app",
    tier: "pro",
    componentPath: "components/blocks/app/banner-top/banner-top.tsx",
    contentPath: "components/blocks/app/banner-top/banner-top.content.ts",
  },

  // ── Templates ──
  {
    slug: "template-landing",
    name: "Template — Landing Page",
    description: "Full landing page: navbar, hero, features, testimonials, CTA, footer.",
    category: "Templates",
    section: "templates",
    tier: "free",
    componentPath: "components/blocks/templates/landing-page/landing-page.tsx",
    contentPath: "components/blocks/templates/landing-page/landing-page.content.tsx",
  },
  {
    slug: "template-pricing",
    name: "Template — Pricing Page",
    description: "Full pricing page: navbar, pricing section, FAQ, CTA, footer.",
    category: "Templates",
    section: "templates",
    tier: "pro",
    componentPath: "components/blocks/templates/pricing-page/pricing-page.tsx",
    contentPath: "components/blocks/templates/pricing-page/pricing-page.content.tsx",
  },
  {
    slug: "template-about",
    name: "Template — About Page",
    description: "About page: hero, team, stats, mission statement, footer.",
    category: "Templates",
    section: "templates",
    tier: "pro",
    componentPath: "components/blocks/templates/about-page/about-page.tsx",
    contentPath: "components/blocks/templates/about-page/about-page.content.tsx",
  },
  {
    slug: "template-dashboard",
    name: "Template — Dashboard",
    description: "Full app layout: sidebar, top bar, overview content area.",
    category: "Templates",
    section: "templates",
    tier: "pro",
    componentPath: "components/blocks/templates/dashboard-page/dashboard-page.tsx",
    contentPath: "components/blocks/templates/dashboard-page/dashboard-page.content.tsx",
  },
]
