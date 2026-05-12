"use client"

import { BannerTop, type BannerTopContent } from "@/components/blocks/app/banner-top/banner-top"
import { DashboardShell, type DashboardShellContent } from "@/components/blocks/app/dashboard-shell/dashboard-shell"
import { DashboardOverview, type DashboardOverviewContent } from "@/components/blocks/app/dashboard-overview/dashboard-overview"

export interface DashboardPageContent {
  banner: BannerTopContent
  shell: Omit<DashboardShellContent, "children">
  overview: DashboardOverviewContent
}

export function DashboardPage({ content }: { content: DashboardPageContent }) {
  return (
    <>
      <BannerTop content={content.banner} />
      <DashboardShell
        content={{
          ...content.shell,
          children: <DashboardOverview content={content.overview} />,
        }}
      />
    </>
  )
}
