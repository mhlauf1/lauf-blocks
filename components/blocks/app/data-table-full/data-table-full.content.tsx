"use client"

import type { DataTableFullContent, DataTableColumn } from "./data-table-full"
import { cn } from "@/lib/utils"

export type Workflow = {
  id: string
  name: string
  status: string
  trigger: string
  lastRun: string
  runs: string
} & Record<string, string>

const statusColor: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Paused: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Failed: "bg-red-500/10 text-red-700 dark:text-red-400",
  Draft: "bg-muted text-muted-foreground",
}

const columns: DataTableColumn<Workflow>[] = [
  { key: "name", label: "Name", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (row) => (
      <span
        className={cn(
          "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
          statusColor[row.status] ?? statusColor.Draft,
        )}
      >
        {row.status}
      </span>
    ),
  },
  { key: "trigger", label: "Trigger", sortable: true },
  { key: "lastRun", label: "Last run", sortable: true },
  { key: "runs", label: "Total runs", sortable: true },
]

const data: Workflow[] = [
  { id: "1", name: "Deploy Pipeline", status: "Active", trigger: "Git push", lastRun: "2 min ago", runs: "1,284" },
  { id: "2", name: "Nightly Backups", status: "Active", trigger: "Cron", lastRun: "6 hours ago", runs: "892" },
  { id: "3", name: "Slack Digest", status: "Paused", trigger: "Schedule", lastRun: "2 days ago", runs: "451" },
  { id: "4", name: "Webhook Relay", status: "Active", trigger: "Webhook", lastRun: "12 min ago", runs: "3,102" },
  { id: "5", name: "User Onboarding", status: "Active", trigger: "API", lastRun: "1 hour ago", runs: "728" },
  { id: "6", name: "Invoice Generator", status: "Failed", trigger: "Schedule", lastRun: "4 hours ago", runs: "156" },
  { id: "7", name: "Data Sync", status: "Active", trigger: "Cron", lastRun: "30 min ago", runs: "2,340" },
  { id: "8", name: "Alert Monitor", status: "Active", trigger: "Webhook", lastRun: "5 min ago", runs: "4,891" },
  { id: "9", name: "Report Builder", status: "Draft", trigger: "Manual", lastRun: "Never", runs: "0" },
  { id: "10", name: "Email Campaigns", status: "Paused", trigger: "Schedule", lastRun: "1 week ago", runs: "89" },
  { id: "11", name: "Log Aggregator", status: "Active", trigger: "Cron", lastRun: "15 min ago", runs: "6,412" },
  { id: "12", name: "CI/CD Notifier", status: "Active", trigger: "Git push", lastRun: "8 min ago", runs: "1,923" },
]

export const dataTableFullContent: DataTableFullContent<Workflow> = {
  headline: "Workflows",
  description: "Manage and monitor all automation workflows.",
  columns,
  data,
  searchPlaceholder: "Search workflows...",
  pageSize: 8,
  idKey: "id",
  bulkActions: [
    { label: "Pause", onClick: () => {} },
    { label: "Delete", onClick: () => {} },
  ],
}
