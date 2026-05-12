"use client"

import { NavbarDropdowns } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns"
import { navbarDropdownsContent } from "@/components/blocks/marketing/navbar-dropdowns/navbar-dropdowns.content"

export default function NavbarDropdownsPage() {
  return (
    <div className="-mt-12">
      <NavbarDropdowns content={navbarDropdownsContent} />
      <div className="flex h-[80dvh] items-center justify-center text-muted-foreground">
        Page content goes here
      </div>
    </div>
  )
}
