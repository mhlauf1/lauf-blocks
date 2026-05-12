"use client"

import { motion } from "motion/react"

export interface SettingsFormField {
  id: string
  label: string
  description?: string
  type: "text" | "email" | "textarea" | "toggle"
  placeholder?: string
  defaultValue?: string
  defaultChecked?: boolean
}

export interface SettingsFormSection {
  title: string
  description?: string
  fields: SettingsFormField[]
}

export interface SettingsFormContent {
  headline: string
  description?: string
  sections: SettingsFormSection[]
  submitLabel: string
  cancelLabel: string
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

function ToggleSwitch({
  id,
  defaultChecked,
}: {
  id: string
  defaultChecked?: boolean
}) {
  return (
    <label htmlFor={id} className="relative inline-flex cursor-pointer items-center">
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <div className="h-6 w-11 rounded-full border border-border bg-muted transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background">
        <div className="size-5 translate-x-0 rounded-full bg-background shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
      </div>
    </label>
  )
}

function renderField(field: SettingsFormField) {
  const inputClasses =
    "block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={field.id}
          name={field.id}
          rows={4}
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
          className={`${inputClasses} resize-none`}
        />
      )
    case "toggle":
      return (
        <ToggleSwitch id={field.id} defaultChecked={field.defaultChecked} />
      )
    default:
      return (
        <input
          id={field.id}
          name={field.id}
          type={field.type}
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
          className={inputClasses}
        />
      )
  }
}

export function SettingsForm({ content }: { content: SettingsFormContent }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {content.headline}
          </h1>
          {content.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {content.description}
            </p>
          )}
        </motion.div>

        <motion.form
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 space-y-10"
        >
          {content.sections.map((section) => (
            <fieldset key={section.title} className="space-y-6">
              <div className="border-b border-border pb-4">
                <legend className="font-heading text-base font-semibold text-foreground">
                  {section.title}
                </legend>
                {section.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                )}
              </div>

              {section.fields.map((field) => (
                <div
                  key={field.id}
                  className={
                    field.type === "toggle"
                      ? "flex items-center justify-between gap-4"
                      : undefined
                  }
                >
                  <div className={field.type === "toggle" ? "flex-1" : undefined}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-foreground"
                    >
                      {field.label}
                    </label>
                    {field.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    )}
                  </div>
                  {field.type !== "toggle" && <div className="mt-2">{renderField(field)}</div>}
                  {field.type === "toggle" && renderField(field)}
                </div>
              ))}
            </fieldset>
          ))}

          <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
            <button
              type="button"
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {content.cancelLabel}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {content.submitLabel}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}
