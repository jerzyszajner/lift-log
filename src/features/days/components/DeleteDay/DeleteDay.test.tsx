import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { DeleteDay } from "./DeleteDay";

describe("DeleteDay", () => {
  test("deletes only after the confirmation", async () => {
    const onDelete = vi.fn().mockResolvedValue(undefined);
    render(<DeleteDay onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete day" }));

    expect(onDelete).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("goes back to the button without deleting when cancelled", async () => {
    const onDelete = vi.fn();
    render(<DeleteDay onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete day" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Delete day" })).toBeTruthy();
  });
});
