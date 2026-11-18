import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { ExerciseCard } from "./ExerciseCard";

const exercise = {
  name: "Bench press",
  sets: [{ reps: 10, weight: 50, done: false }],
};

describe("ExerciseCard", () => {
  test("shows steppers only after unlocking", async () => {
    render(<ExerciseCard exercise={exercise} onChange={vi.fn()} />);
    const lock = screen.getByRole("button", { name: "Unlock exercise" });

    expect(lock.getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByText("50 kg × 10")).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();

    await userEvent.click(lock);

    expect(lock.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("textbox", { name: "Weight, set 1" })).toBeTruthy();
  });
});
