"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AddCardForm } from "@/components/AddCardForm";
import { Card } from "@/components/Card";
import type { Column as ColumnType } from "@/lib/types";

type ColumnProps = {
  column: ColumnType;
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({
  column,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", column },
  });

  return (
    <section
      className={`flex min-h-[28rem] w-72 shrink-0 flex-col rounded-2xl border border-white/50 bg-white/55 p-3 shadow-[0_10px_30px_rgba(3,33,71,0.06)] backdrop-blur-sm transition ${
        isOver ? "ring-2 ring-[var(--color-blue)]/40" : ""
      }`}
      data-testid={`column-${column.id}`}
    >
      <header className="mb-3 border-b-2 border-[var(--color-yellow)] pb-2">
        <input
          value={column.title}
          onChange={(event) => onRename(column.id, event.target.value)}
          onBlur={(event) => {
            if (!event.target.value.trim()) {
              onRename(column.id, "Untitled");
            }
          }}
          className="w-full rounded-md border border-transparent bg-transparent px-1 py-0.5 font-[family-name:var(--font-outfit)] text-base font-semibold text-[var(--color-navy)] outline-none transition hover:border-slate-200 focus:border-[var(--color-blue)] focus:bg-white focus:ring-2 focus:ring-[var(--color-blue)]/30"
          aria-label="Column title"
          data-testid={`rename-column-${column.id}`}
        />
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--color-gray)]">
          {column.cards.length} cards
        </p>
      </header>

      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-2"
        data-testid={`column-droppable-${column.id}`}
      >
        <SortableContext
          items={column.cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </SortableContext>
      </div>

      <AddCardForm columnId={column.id} onAdd={onAddCard} />
    </section>
  );
}
