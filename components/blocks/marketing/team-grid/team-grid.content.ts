import type { TeamGridContent } from "./team-grid"

export const teamGridContent: TeamGridContent = {
  eyebrow: "Our team",
  headline: "The people behind Helix",
  description:
    "A small, focused team building the automation platform we always wanted to use ourselves.",
  members: [
    {
      name: "Elena Ruiz",
      role: "CEO & Co-founder",
      image: { src: "/demo/team-1.svg", alt: "Elena Ruiz" },
    },
    {
      name: "James Chen",
      role: "CTO & Co-founder",
      image: { src: "/demo/team-2.svg", alt: "James Chen" },
    },
    {
      name: "Priya Sharma",
      role: "Head of Design",
      image: { src: "/demo/team-3.svg", alt: "Priya Sharma" },
    },
    {
      name: "Marcus Hall",
      role: "Head of Engineering",
      image: { src: "/demo/team-4.svg", alt: "Marcus Hall" },
    },
  ],
}
