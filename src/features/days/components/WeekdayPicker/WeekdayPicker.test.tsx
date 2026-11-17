import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { WeekdayPicker } from "./WeekdayPicker";

describe("WeekdayPicker", () => {
  test("shows seven days from Monday to Sunday", () => {
    render(<WeekdayPicker value={1} onChange={vi.fn()} />);

    const names = screen.getAllByRole("button").map((b) => b.textContent);

    expect(names).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  });

  test("returns the number of the clicked day", async () => {
    const onChange = vi.fn();
    render(<WeekdayPicker value={1} onChange={onChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Wed" }));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  test("returns 7 for Sunday", async () => {
    const onChange = vi.fn();
    render(<WeekdayPicker value={1} onChange={onChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Sun" }));

    expect(onChange).toHaveBeenCalledWith(7);
  });
});
