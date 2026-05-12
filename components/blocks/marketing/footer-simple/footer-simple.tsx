import Link from "next/link"

export interface FooterSimpleContent {
  logo: { text: string; href: string }
  links: { label: string; href: string }[]
  copyright: string
}

export function FooterSimple({ content }: { content: FooterSimpleContent }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <Link
          href={content.logo.href}
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          {content.logo.text}
        </Link>

        {content.links.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {content.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <p className="text-xs text-muted-foreground">{content.copyright}</p>
      </div>
    </footer>
  )
}
