import { DashboardShell } from "@/components/blocks/app/dashboard-shell/dashboard-shell"
import { dashboardShellContent } from "@/components/blocks/app/dashboard-shell/dashboard-shell.content"
import { DashboardOverview } from "@/components/blocks/app/dashboard-overview/dashboard-overview"
import { dashboardOverviewContent } from "@/components/blocks/app/dashboard-overview/dashboard-overview.content"

export default function DashboardOverviewPage() {
  return (
    <DashboardShell
      content={{
        ...dashboardShellContent,
        children: <DashboardOverview content={dashboardOverviewContent} />,
      }}
    />
  )
}
