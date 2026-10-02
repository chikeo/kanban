"use client";

import { useState } from "react";
import { initialBoard } from "@/lib/dummyData";
import type { Board, Card, Column } from "@/lib/types";

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function findContainer(columns: Column[], id: string) {
  const asColumn = columns.find((column) => column.id === id);
  if (asColumn) return asColumn.id;
  return columns.find((column) => column.cards.some((card) => card.id === id))
    ?.id;
}

export function useBoardState(seed: Board = initialBoard) {
  const [board, setBoard] = useState<Board>(seed);

  function renameColumn(columnId: string, title: string) {
    setBoard((current) => ({
      columns: current.columns.map((column) =>
        column.id === columnId ? { ...column, title } : column,
      ),
    }));
  }

  function addCard(columnId: string, title: string, details: string) {
    const nextTitle = title.trim();
    if (!nextTitle) return;

    const card: Card = {
      id: createId("card"),
      title: nextTitle,
      details: details.trim(),
    };

    setBoard((current) => ({
      columns: current.columns.map((column) =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, card] }
          : column,
      ),
    }));
  }

  function deleteCard(cardId: string) {
    setBoard((current) => ({
      columns: current.columns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.id !== cardId),
      })),
    }));
  }

  function moveCard(activeId: string, overId: string) {
    setBoard((current) => {
      const activeContainerId = findContainer(current.columns, activeId);
      const overContainerId = findContainer(current.columns, overId);
      if (!activeContainerId || !overContainerId) return current;

      const activeColumn = current.columns.find(
        (column) => column.id === activeContainerId,
      );
      const overColumn = current.columns.find(
        (column) => column.id === overContainerId,
      );
      if (!activeColumn || !overColumn) return current;

      const activeIndex = activeColumn.cards.findIndex(
        (card) => card.id === activeId,
      );
      if (activeIndex < 0) return current;

      const moving = activeColumn.cards[activeIndex];

      if (activeContainerId === overContainerId) {
        const overIndex =
          overId === overContainerId
            ? activeColumn.cards.length - 1
            : overColumn.cards.findIndex((card) => card.id === overId);

        if (overIndex < 0 || activeIndex === overIndex) return current;

        const cards = [...activeColumn.cards];
        cards.splice(activeIndex, 1);
        cards.splice(overIndex, 0, moving);

        return {
          columns: current.columns.map((column) =>
            column.id === activeContainerId ? { ...column, cards } : column,
          ),
        };
      }

      const overIndex =
        overId === overContainerId
          ? overColumn.cards.length
          : overColumn.cards.findIndex((card) => card.id === overId);

      const nextActiveCards = activeColumn.cards.filter(
        (card) => card.id !== activeId,
      );
      const nextOverCards = [...overColumn.cards];
      const insertAt = overIndex < 0 ? nextOverCards.length : overIndex;
      nextOverCards.splice(insertAt, 0, moving);

      return {
        columns: current.columns.map((column) => {
          if (column.id === activeContainerId) {
            return { ...column, cards: nextActiveCards };
          }
          if (column.id === overContainerId) {
            return { ...column, cards: nextOverCards };
          }
          return column;
        }),
      };
    });
  }

  return {
    board,
    renameColumn,
    addCard,
    deleteCard,
    moveCard,
  };
}
