import Link from "next/link"

export interface FooterColumnsContent {
  logo: { text: string; href: string }
  tagline?: string
  columns: {
    title: string
    links: { label: string; href: string }[]
  }[]
  legal: {
    copyright: string
    links?: { label: string; href: string }[]
  }
}

export function FooterColumns({ content }: { content: FooterColumnsContent }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <Link
              href={content.logo.href}
              className="font-heading text-lg font-bold tracking-tight text-foreground"
            >
              {content.logo.text}
            </Link>
            {content.tagline && (
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {content.tagline}
              </p>
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2 xl:mt-0">
            {content.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {content.legal.copyright}
          </p>
          {content.legal.links && content.legal.links.length > 0 && (
            <div className="flex gap-6">
              {content.legal.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
