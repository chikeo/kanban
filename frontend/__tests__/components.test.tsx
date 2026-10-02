import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AddCardForm } from "@/components/AddCardForm";
import { Board } from "@/components/Board";

afterEach(() => {
  cleanup();
});

describe("Board", () => {
  it("renders five columns with dummy cards", () => {
    render(<Board />);

    expect(screen.getByTestId("board")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Backlog")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ready")).toBeInTheDocument();
    expect(screen.getByDisplayValue("In Progress")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Review")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Done")).toBeInTheDocument();
    expect(screen.getByText("Define MVP scope")).toBeInTheDocument();
  });
});

describe("AddCardForm", () => {
  it("submits a new card", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddCardForm columnId="col-test" onAdd={onAdd} />);

    await user.click(screen.getByTestId("add-card-toggle-col-test"));
    await user.type(screen.getByTestId("add-card-title-col-test"), "Ship UI");
    await user.type(
      screen.getByTestId("add-card-details-col-test"),
      "Finish polish",
    );
    await user.click(screen.getByTestId("add-card-submit-col-test"));

    expect(onAdd).toHaveBeenCalledWith("col-test", "Ship UI", "Finish polish");
  });
});
