import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { WeekdayPicker } from "./WeekdayPicker";

describe("WeekdayPicker", () => {
  test("shows seven days and checks the one that matches the value", () => {
    render(<WeekdayPicker value={3} onChange={vi.fn()} />);

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];

    expect(screen.getByRole("group", { name: "Day of the week" })).toBeTruthy();
    expect(radios.map((radio) => radio.checked)).toEqual([
      false,
      false,
      true,
      false,
      false,
      false,
      false,
    ]);
    expect(screen.getByRole("radio", { name: "Wed" })).toBe(radios[2]);
  });

  test("returns the number of the clicked day", async () => {
    const onChange = vi.fn();
    render(<WeekdayPicker value={1} onChange={onChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "Sun" }));

    expect(onChange).toHaveBeenCalledWith(7);
  });
});
