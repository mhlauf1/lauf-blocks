"use client"

import type { DashboardPageContent } from "./dashboard-page"
import { bannerTopContent } from "@/components/blocks/app/banner-top/banner-top.content"
import { dashboardShellContent } from "@/components/blocks/app/dashboard-shell/dashboard-shell.content"
import { dashboardOverviewContent } from "@/components/blocks/app/dashboard-overview/dashboard-overview.content"

export const dashboardPageContent: DashboardPageContent = {
  banner: bannerTopContent,
  shell: dashboardShellContent,
  overview: dashboardOverviewContent,
}
