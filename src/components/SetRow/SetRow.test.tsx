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
});
