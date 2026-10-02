"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import { Column } from "@/components/Column";
import { useBoardState } from "@/hooks/useBoardState";
import type { Board, Card as CardType } from "@/lib/types";

function findContainer(board: Board, id: string) {
  if (board.columns.some((column) => column.id === id)) return id;
  return board.columns.find((column) =>
    column.cards.some((card) => card.id === id),
  )?.id;
}

export function Board() {
  const { board, renameColumn, addCard, deleteCard, moveCard } = useBoardState();
  const boardRef = useRef(board);
  boardRef.current = board;
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const card = boardRef.current.columns
      .flatMap((column) => column.cards)
      .find((item) => item.id === event.active.id);
    setActiveCard(card ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const current = boardRef.current;
    const activeContainer = findContainer(current, String(active.id));
    const overContainer = findContainer(current, String(over.id));
    if (!activeContainer || !overContainer) return;
    if (activeContainer === overContainer) return;

    moveCard(String(active.id), String(over.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);
    if (!over || active.id === over.id) return;
    moveCard(String(active.id), String(over.id));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4" data-testid="board">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onRename={renameColumn}
            onAddCard={addCard}
            onDeleteCard={deleteCard}
          />
        ))}
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="w-72 rounded-xl border border-white bg-white p-3 shadow-[0_20px_40px_rgba(3,33,71,0.2)]">
            <h3 className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-[var(--color-navy)]">
              {activeCard.title}
            </h3>
            {activeCard.details ? (
              <p className="mt-1.5 text-sm text-[var(--color-gray)]">
                {activeCard.details}
              </p>
            ) : null}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
