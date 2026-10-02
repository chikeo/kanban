import type { Board } from "./types";

export const initialBoard: Board = {
  columns: [
    {
      id: "col-backlog",
      title: "Backlog",
      cards: [
        {
          id: "card-1",
          title: "Define MVP scope",
          details: "List must-have features for the first release.",
        },
        {
          id: "card-2",
          title: "Gather stakeholder feedback",
          details: "Schedule a short review with product and design.",
        },
      ],
    },
    {
      id: "col-ready",
      title: "Ready",
      cards: [
        {
          id: "card-3",
          title: "Design board layout",
          details: "Five columns with clear hierarchy and spacing.",
        },
        {
          id: "card-4",
          title: "Choose drag library",
          details: "Evaluate @dnd-kit for sortable columns.",
        },
      ],
    },
    {
      id: "col-in-progress",
      title: "In Progress",
      cards: [
        {
          id: "card-5",
          title: "Build column component",
          details: "Rename titles and render cards with actions.",
        },
        {
          id: "card-6",
          title: "Wire board state",
          details: "Add, delete, and move cards in memory.",
        },
      ],
    },
    {
      id: "col-review",
      title: "Review",
      cards: [
        {
          id: "card-7",
          title: "Polish visual details",
          details: "Accent lines, hover states, and focus rings.",
        },
      ],
    },
    {
      id: "col-done",
      title: "Done",
      cards: [
        {
          id: "card-8",
          title: "Project scaffolding",
          details: "Next.js app with Tailwind and TypeScript.",
        },
        {
          id: "card-9",
          title: "Dummy data seed",
          details: "Populate the board on first load.",
        },
      ],
    },
  ],
};
