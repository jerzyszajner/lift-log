import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { SetRow } from "./SetRow";

const baseProps = {
  setNumber: 1,
  reps: 10,
  weight: 10,
  onRepsChange: vi.fn(),
  onWeightChange: vi.fn(),
};

describe("SetRow", () => {
  test("increases weight by 2.5 kg from 10 kg", async () => {
    const onWeightChange = vi.fn();
    render(<SetRow {...baseProps} onWeightChange={onWeightChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Increase weight" }),
    );

    expect(onWeightChange).toHaveBeenCalledWith(12.5);
  });

  test("shows the done checkbox only when onDoneChange is given", () => {
    const { rerender } = render(<SetRow {...baseProps} />);

    expect(screen.queryByRole("checkbox")).toBeNull();

    rerender(<SetRow {...baseProps} onDoneChange={vi.fn()} />);

    expect(screen.getByRole("checkbox", { name: "Done, set 1" })).toBeTruthy();
  });

  test("calls onRemove when the remove button is clicked", async () => {
    const onRemove = vi.fn();
    render(<SetRow {...baseProps} onRemove={onRemove} />);

    await userEvent.click(screen.getByRole("button", { name: "Remove set" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test("shows the error message only when error is given", () => {
    const { rerender } = render(<SetRow {...baseProps} reps={0} />);

    expect(screen.queryByText("Reps must be at least 1")).toBeNull();

    rerender(
      <SetRow {...baseProps} reps={0} error="Reps must be at least 1" />,
    );

    expect(screen.getByText("Reps must be at least 1")).toBeTruthy();
  });
});
