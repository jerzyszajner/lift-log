import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { DayForm } from "./DayForm";

describe("DayForm", () => {
  test("reports changes", async () => {
    const onDirtyChange = vi.fn();
    render(<DayForm onSubmit={vi.fn()} onDirtyChange={onDirtyChange} />);

    await userEvent.type(screen.getByLabelText("Day name"), "Legs");

    expect(onDirtyChange).toHaveBeenLastCalledWith(true);
  });
});
