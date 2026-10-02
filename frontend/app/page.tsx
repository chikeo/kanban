"use client";

import dynamic from "next/dynamic";

const Board = dynamic(
  () => import("@/components/Board").then((mod) => mod.Board),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-dashed border-[var(--color-blue)]/30 bg-white/40 text-sm text-[var(--color-gray)]"
        data-testid="board-loading"
      >
        Loading board...
      </div>
    ),
  },
);

export default function Home() {
  return (
    <div className="flex flex-1 flex-col px-6 py-8 sm:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
          Project board
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          Kanban
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-gray)]">
          Move work across five columns. Rename columns, add cards, and keep
          the board focused on what matters now.
        </p>
      </header>
      <Board />
    </div>
  );
}
