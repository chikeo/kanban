"use client";

import { FormEvent, useState } from "react";

type AddCardFormProps = {
  columnId: string;
  onAdd: (columnId: string, title: string, details: string) => void;
};

export function AddCardForm({ columnId, onAdd }: AddCardFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function reset() {
    setTitle("");
    setDetails("");
    setOpen(false);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(columnId, title, details);
    reset();
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-lg border border-dashed border-[var(--color-blue)]/40 px-3 py-2 text-sm font-medium text-[var(--color-blue)] transition hover:border-[var(--color-blue)] hover:bg-white/60"
        data-testid={`add-card-toggle-${columnId}`}
      >
        Add card
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-2 rounded-lg border border-white/70 bg-white/90 p-3 shadow-sm"
      data-testid={`add-card-form-${columnId}`}
    >
      <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-gray)]">
        Title
        <input
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
          placeholder="Card title"
          data-testid={`add-card-title-${columnId}`}
        />
      </label>
      <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-gray)]">
        Details
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={2}
          className="mt-1 w-full resize-none rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
          placeholder="Optional details"
          data-testid={`add-card-details-${columnId}`}
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-[var(--color-purple)] px-3 py-1.5 text-sm font-medium text-white transition hover:brightness-110"
          data-testid={`add-card-submit-${columnId}`}
        >
          Add
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-[var(--color-gray)] transition hover:text-[var(--color-navy)]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
