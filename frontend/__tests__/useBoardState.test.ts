import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBoardState } from "@/hooks/useBoardState";
import type { Board } from "@/lib/types";

const seed: Board = {
  columns: [
    {
      id: "col-a",
      title: "Alpha",
      cards: [
        { id: "card-1", title: "One", details: "First" },
        { id: "card-2", title: "Two", details: "Second" },
      ],
    },
    {
      id: "col-b",
      title: "Beta",
      cards: [{ id: "card-3", title: "Three", details: "Third" }],
    },
    { id: "col-c", title: "Gamma", cards: [] },
    { id: "col-d", title: "Delta", cards: [] },
    { id: "col-e", title: "Epsilon", cards: [] },
  ],
};

describe("useBoardState", () => {
  it("renames a column", () => {
    const { result } = renderHook(() => useBoardState(seed));

    act(() => {
      result.current.renameColumn("col-a", "Ready");
    });

    expect(result.current.board.columns[0].title).toBe("Ready");
  });

  it("adds a card to a column", () => {
    const { result } = renderHook(() => useBoardState(seed));

    act(() => {
      result.current.addCard("col-c", "New work", "Details here");
    });

    const column = result.current.board.columns.find((item) => item.id === "col-c");
    expect(column?.cards).toHaveLength(1);
    expect(column?.cards[0]).toMatchObject({
      title: "New work",
      details: "Details here",
    });
  });

  it("deletes a card", () => {
    const { result } = renderHook(() => useBoardState(seed));

    act(() => {
      result.current.deleteCard("card-1");
    });

    const column = result.current.board.columns.find((item) => item.id === "col-a");
    expect(column?.cards.map((card) => card.id)).toEqual(["card-2"]);
  });

  it("moves a card between columns", () => {
    const { result } = renderHook(() => useBoardState(seed));

    act(() => {
      result.current.moveCard("card-1", "col-b");
    });

    const source = result.current.board.columns.find((item) => item.id === "col-a");
    const target = result.current.board.columns.find((item) => item.id === "col-b");
    expect(source?.cards.map((card) => card.id)).toEqual(["card-2"]);
    expect(target?.cards.map((card) => card.id)).toEqual(["card-3", "card-1"]);
  });

  it("reorders a card within a column", () => {
    const { result } = renderHook(() => useBoardState(seed));

    act(() => {
      result.current.moveCard("card-1", "card-2");
    });

    const column = result.current.board.columns.find((item) => item.id === "col-a");
    expect(column?.cards.map((card) => card.id)).toEqual(["card-2", "card-1"]);
  });
});
