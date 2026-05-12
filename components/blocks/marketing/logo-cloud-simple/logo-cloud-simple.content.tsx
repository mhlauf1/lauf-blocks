import type { LogoCloudSimpleContent } from "./logo-cloud-simple"

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-8 items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-md border border-current/20 text-xs font-bold uppercase">
        {name.slice(0, 2)}
      </div>
      <span className="text-sm font-semibold tracking-tight">{name}</span>
    </div>
  )
}

export const logoCloudSimpleContent: LogoCloudSimpleContent = {
  headline: "Trusted by teams at leading companies",
  logos: [
    { name: "Stripe", logo: <LogoPlaceholder name="Stripe" /> },
    { name: "Vercel", logo: <LogoPlaceholder name="Vercel" /> },
    { name: "Linear", logo: <LogoPlaceholder name="Linear" /> },
    { name: "Notion", logo: <LogoPlaceholder name="Notion" /> },
    { name: "Figma", logo: <LogoPlaceholder name="Figma" /> },
    { name: "Loom", logo: <LogoPlaceholder name="Loom" /> },
  ],
}
