"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type CardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function Card({ card, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: "card", card },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border border-white/80 bg-white p-3 shadow-[0_8px_24px_rgba(3,33,71,0.08)] transition ${
        isDragging
          ? "z-20 scale-[1.02] opacity-90 shadow-[0_16px_40px_rgba(3,33,71,0.18)]"
          : "hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(3,33,71,0.12)]"
      }`}
      data-testid={`card-${card.id}`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 cursor-grab touch-none rounded px-1.5 py-0.5 text-xs tracking-tighter text-[var(--color-gray)] transition hover:bg-slate-100 hover:text-[var(--color-navy)] active:cursor-grabbing"
          aria-label={`Drag ${card.title}`}
          data-testid={`drag-card-${card.id}`}
          {...attributes}
          {...listeners}
        >
          Drag
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-[var(--color-navy)]">
              {card.title}
            </h3>
            <button
              type="button"
              aria-label={`Delete ${card.title}`}
              onClick={() => onDelete(card.id)}
              className="shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium text-[var(--color-gray)] transition hover:bg-red-50 hover:text-red-600"
              data-testid={`delete-card-${card.id}`}
            >
              Delete
            </button>
          </div>
          {card.details ? (
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-gray)]">
              {card.details}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
