import { expect, test } from "@playwright/test";

test.describe("Kanban board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("board")).toBeVisible();
  });

  test("loads dummy board with five columns", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Kanban" })).toBeVisible();
    await expect(page.getByTestId("rename-column-col-backlog")).toHaveValue(
      "Backlog",
    );
    await expect(page.getByText("Define MVP scope")).toBeVisible();
    await expect(page.getByTestId("column-col-backlog")).toBeVisible();
    await expect(page.getByTestId("column-col-done")).toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    const input = page.getByTestId("rename-column-col-backlog");
    await input.fill("Ideas");
    await expect(input).toHaveValue("Ideas");
  });

  test("adds a card to a column", async ({ page }) => {
    const column = page.getByTestId("column-col-review");
    await column.scrollIntoViewIfNeeded();
    await page.getByTestId("add-card-toggle-col-review").click();
    await expect(page.getByTestId("add-card-form-col-review")).toBeVisible();
    await page.getByTestId("add-card-title-col-review").fill("Write release notes");
    await page
      .getByTestId("add-card-details-col-review")
      .fill("Summarize shipped work");
    await page.getByTestId("add-card-submit-col-review").click();

    await expect(page.getByText("Write release notes")).toBeVisible();
    await expect(page.getByText("Summarize shipped work")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    const card = page.getByTestId("card-card-1");
    await expect(card).toBeVisible();
    await page.getByTestId("delete-card-card-1").click();

    await expect(page.getByTestId("card-card-1")).toHaveCount(0);
  });

  test("drags a card to another column", async ({ page }) => {
    const handle = page.getByTestId("drag-card-card-1");
    const targetCard = page.getByTestId("card-card-8");
    await expect(handle).toBeVisible();
    await expect(targetCard).toBeVisible();

    const start = await handle.boundingBox();
    const end = await targetCard.boundingBox();
    if (!start || !end) {
      throw new Error("Missing bounding boxes for drag test");
    }

    await page.mouse.move(start.x + start.width / 2, start.y + start.height / 2);
    await page.mouse.down();
    await page.mouse.move(end.x + end.width / 2, end.y + end.height / 2, {
      steps: 40,
    });
    await page.mouse.up();

    await expect(
      page.getByTestId("column-col-done").getByTestId("card-card-1"),
    ).toBeVisible({ timeout: 10000 });
  });
});
