import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { DeleteDay } from "./DeleteDay";

describe("DeleteDay", () => {
  test("deletes when confirmed", async () => {
    const onDelete = vi.fn().mockResolvedValue(undefined);
    render(<DeleteDay onCancel={vi.fn()} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("cancels without deleting", async () => {
    const onCancel = vi.fn();
    const onDelete = vi.fn();
    render(<DeleteDay onCancel={onCancel} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });
});
