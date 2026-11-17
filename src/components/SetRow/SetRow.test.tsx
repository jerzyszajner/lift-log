import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { SetRow } from "./SetRow";

describe("SetRow", () => {
  test("increases weight by 2.5 kg from 10 kg", async () => {
    const onWeightChange = vi.fn();
    render(
      <SetRow
        setNumber={1}
        reps={10}
        weight={10}
        done={false}
        onRepsChange={vi.fn()}
        onWeightChange={onWeightChange}
        onDoneChange={vi.fn()}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Increase weight" }),
    );

    expect(onWeightChange).toHaveBeenCalledWith(12.5);
  });

  test("shows the done checkbox only when onDoneChange is given", () => {
    const props = {
      setNumber: 1,
      reps: 10,
      weight: 10,
      onRepsChange: vi.fn(),
      onWeightChange: vi.fn(),
    };
    const { rerender } = render(<SetRow {...props} />);

    expect(screen.queryByRole("checkbox")).toBeNull();

    rerender(<SetRow {...props} onDoneChange={vi.fn()} />);

    expect(screen.getByRole("checkbox", { name: "Done, set 1" })).toBeTruthy();
  });

  test("calls onRemove when the remove button is clicked", async () => {
    const onRemove = vi.fn();
    render(
      <SetRow
        setNumber={1}
        reps={10}
        weight={10}
        onRepsChange={vi.fn()}
        onWeightChange={vi.fn()}
        onRemove={onRemove}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Remove set" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test("shows the error message only when error is given", () => {
    const props = {
      setNumber: 1,
      reps: 0,
      weight: 10,
      onRepsChange: vi.fn(),
      onWeightChange: vi.fn(),
    };
    const { rerender } = render(<SetRow {...props} />);

    expect(screen.queryByText("Reps must be at least 1")).toBeNull();

    rerender(<SetRow {...props} error="Reps must be at least 1" />);

    expect(screen.getByText("Reps must be at least 1")).toBeTruthy();
  });
});
