"use client"

import type { SettingsTabbedContent } from "./settings-tabbed"
import { User, CreditCard, Bell, Shield } from "lucide-react"

function ProfilePanel() {
  const inputClasses =
    "block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-lg space-y-6">
      <div>
        <label htmlFor="tab-name" className="block text-sm font-medium text-foreground">
          Full name
        </label>
        <input
          id="tab-name"
          type="text"
          defaultValue="Elena Ruiz"
          className={`mt-2 ${inputClasses}`}
        />
      </div>
      <div>
        <label htmlFor="tab-email" className="block text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="tab-email"
          type="email"
          defaultValue="elena@helix.dev"
          className={`mt-2 ${inputClasses}`}
        />
      </div>
      <div>
        <label htmlFor="tab-bio" className="block text-sm font-medium text-foreground">
          Bio
        </label>
        <textarea
          id="tab-bio"
          rows={3}
          placeholder="Tell your team about yourself..."
          className={`mt-2 resize-none ${inputClasses}`}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Save changes
        </button>
      </div>
    </form>
  )
}

function BillingPanel() {
  return (
    <div className="max-w-lg space-y-6">
      <div className="rounded-xl border border-border p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Pro plan</p>
            <p className="mt-0.5 text-xs text-muted-foreground">$29/month, billed monthly</p>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Active
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-foreground">Payment method</p>
        <p className="mt-1 text-sm text-muted-foreground">Visa ending in 4242</p>
        <button
          type="button"
          className="mt-3 text-sm font-medium text-primary hover:text-primary/80"
        >
          Update payment method
        </button>
      </div>
    </div>
  )
}

function NotificationsPanel() {
  const toggles = [
    { id: "tab-notify-email", label: "Email notifications", description: "Workflow failures and weekly reports.", checked: true },
    { id: "tab-notify-slack", label: "Slack alerts", description: "Real-time alerts in your Slack workspace.", checked: false },
    { id: "tab-notify-product", label: "Product updates", description: "New features and improvements.", checked: true },
  ]

  return (
    <div className="max-w-lg space-y-6">
      {toggles.map((toggle) => (
        <div key={toggle.id} className="flex items-center justify-between gap-4">
          <div>
            <label htmlFor={toggle.id} className="block text-sm font-medium text-foreground">
              {toggle.label}
            </label>
            <p className="mt-0.5 text-xs text-muted-foreground">{toggle.description}</p>
          </div>
          <label htmlFor={toggle.id} className="relative inline-flex cursor-pointer items-center">
            <input
              id={toggle.id}
              type="checkbox"
              defaultChecked={toggle.checked}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full border border-border bg-muted transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background">
              <div className="size-5 translate-x-0 rounded-full bg-background shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      ))}
    </div>
  )
}

function SecurityPanel() {
  const inputClasses =
    "block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-lg space-y-6">
      <div>
        <label htmlFor="tab-current-pw" className="block text-sm font-medium text-foreground">
          Current password
        </label>
        <input
          id="tab-current-pw"
          type="password"
          placeholder="••••••••"
          className={`mt-2 ${inputClasses}`}
        />
      </div>
      <div>
        <label htmlFor="tab-new-pw" className="block text-sm font-medium text-foreground">
          New password
        </label>
        <input
          id="tab-new-pw"
          type="password"
          placeholder="At least 8 characters"
          className={`mt-2 ${inputClasses}`}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Update password
        </button>
      </div>
    </form>
  )
}

export const settingsTabbedContent: SettingsTabbedContent = {
  headline: "Settings",
  description: "Manage your account, billing, and preferences.",
  tabs: [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="size-4" />,
      content: <ProfilePanel />,
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard className="size-4" />,
      content: <BillingPanel />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="size-4" />,
      content: <NotificationsPanel />,
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield className="size-4" />,
      content: <SecurityPanel />,
    },
  ],
}
