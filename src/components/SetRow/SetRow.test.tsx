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
  test("names the set group by its label", () => {
    render(<SetRow {...baseProps} />);

    expect(screen.getByRole("group", { name: "Set 1" })).toBeTruthy();
  });

  test("increases weight by 2.5 kg from 10 kg", async () => {
    const onWeightChange = vi.fn();
    render(<SetRow {...baseProps} onWeightChange={onWeightChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Increase weight" }),
    );

    expect(onWeightChange).toHaveBeenCalledWith(12.5);
  });

  test("does not decrease reps below 1", async () => {
    const onRepsChange = vi.fn();
    render(<SetRow {...baseProps} reps={1} onRepsChange={onRepsChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Decrease reps" }),
    );

    expect(onRepsChange).toHaveBeenCalledWith(1);
  });

  test("shows the done checkbox only when onDoneChange is given", () => {
    const { rerender } = render(<SetRow {...baseProps} />);

    expect(screen.queryByRole("checkbox")).toBeNull();

    rerender(<SetRow {...baseProps} onDoneChange={vi.fn()} />);

    expect(screen.getByRole("checkbox", { name: "Done, set 1" })).toBeTruthy();
  });

  test("shows values as text when locked", () => {
    render(<SetRow {...baseProps} locked onDoneChange={vi.fn()} />);

    expect(screen.getByText("10 kg × 10")).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByRole("checkbox", { name: "Done, set 1" })).toBeEnabled();
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

  test("announces the error and marks both inputs invalid", () => {
    const { rerender } = render(<SetRow {...baseProps} reps={0} />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(
      screen.getByRole("textbox", { name: "Reps, set 1" }).ariaInvalid,
    ).toBe("false");

    rerender(
      <SetRow {...baseProps} reps={0} error="Reps must be at least 1" />,
    );

    expect(screen.getByRole("alert").textContent).toBe(
      "Reps must be at least 1",
    );
    expect(
      screen.getByRole("textbox", { name: "Reps, set 1" }).ariaInvalid,
    ).toBe("true");
    expect(
      screen.getByRole("textbox", { name: "Weight, set 1" }).ariaInvalid,
    ).toBe("true");
  });

  test("links both inputs to the error message", () => {
    const { rerender } = render(<SetRow {...baseProps} reps={0} />);
    const reps = screen.getByRole("textbox", { name: "Reps, set 1" });
    const weight = screen.getByRole("textbox", { name: "Weight, set 1" });

    expect(reps.getAttribute("aria-describedby")).toBeNull();

    rerender(
      <SetRow {...baseProps} reps={0} error="Reps must be at least 1" />,
    );
    const errorId = screen.getByRole("alert").id;

    expect(errorId).not.toBe("");
    expect(reps.getAttribute("aria-describedby")).toBe(errorId);
    expect(weight.getAttribute("aria-describedby")).toBe(errorId);
  });
});
