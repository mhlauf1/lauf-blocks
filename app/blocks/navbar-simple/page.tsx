import { NavbarSimple } from "@/components/blocks/marketing/navbar-simple/navbar-simple"
import { navbarSimpleContent } from "@/components/blocks/marketing/navbar-simple/navbar-simple.content"

export default function NavbarSimplePage() {
  return (
    <div className="-mt-12">
      <NavbarSimple content={navbarSimpleContent} />
      <div className="flex h-[80dvh] items-center justify-center text-muted-foreground">
        Page content goes here
      </div>
    </div>
  )
}
