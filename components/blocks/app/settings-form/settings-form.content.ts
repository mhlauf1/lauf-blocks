import type { SettingsFormContent } from "./settings-form"

export const settingsFormContent: SettingsFormContent = {
  headline: "Settings",
  description: "Manage your account settings and preferences.",
  sections: [
    {
      title: "Profile",
      description: "Your public profile information.",
      fields: [
        {
          id: "name",
          label: "Full name",
          type: "text",
          placeholder: "Jane Smith",
          defaultValue: "Elena Ruiz",
        },
        {
          id: "email",
          label: "Email address",
          type: "email",
          placeholder: "you@company.com",
          defaultValue: "elena@helix.dev",
        },
        {
          id: "bio",
          label: "Bio",
          description: "A short description visible to your team.",
          type: "textarea",
          placeholder: "Tell your team a bit about yourself...",
        },
      ],
    },
    {
      title: "Notifications",
      description: "Choose what you want to be notified about.",
      fields: [
        {
          id: "notify-email",
          label: "Email notifications",
          description: "Receive email updates for workflow failures and weekly reports.",
          type: "toggle",
          defaultChecked: true,
        },
        {
          id: "notify-slack",
          label: "Slack notifications",
          description: "Get real-time alerts in your connected Slack workspace.",
          type: "toggle",
          defaultChecked: false,
        },
        {
          id: "notify-marketing",
          label: "Product updates",
          description: "Occasional emails about new features and improvements.",
          type: "toggle",
          defaultChecked: true,
        },
      ],
    },
  ],
  submitLabel: "Save changes",
  cancelLabel: "Cancel",
}
