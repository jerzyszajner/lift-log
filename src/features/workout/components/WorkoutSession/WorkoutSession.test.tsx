import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useAuth } from "../../../auth/hooks/useAuth";
import { finishWorkout } from "../../services/workoutService";
import { WorkoutSession } from "./WorkoutSession";
import type { User } from "firebase/auth";
import type { Day } from "../../../days/schemas/daysSchemas";

vi.mock("../../../auth/hooks/useAuth");
vi.mock("../../services/workoutService", () => ({ finishWorkout: vi.fn() }));

const day: Day = {
  id: "day1",
  name: "Chest",
  weekday: 1,
  exercises: [
    {
      name: "Bench press",
      sets: [
        { reps: 10, weight: 50 },
        { reps: 8, weight: 60 },
      ],
    },
  ],
};

async function finishFirstSet() {
  render(
    <MemoryRouter>
      <WorkoutSession day={day} />
    </MemoryRouter>,
  );

  await userEvent.click(
    screen.getByRole("button", { name: "Unlock Bench press" }),
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: "Weight, set 1" }),
    "70",
  );
  await userEvent.click(screen.getByRole("checkbox", { name: "Done, set 1" }));
  await userEvent.click(screen.getByRole("button", { name: "Finish workout" }));
  await userEvent.click(screen.getByRole("button", { name: "Finish" }));
}

describe("WorkoutSession", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 18));
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: "abc123" } as User,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("saves only done sets and updates the plan", async () => {
    vi.mocked(finishWorkout).mockResolvedValue(undefined);

    await finishFirstSet();

    expect(finishWorkout).toHaveBeenCalledWith(
      "abc123",
      "day1",
      {
        date: "2026-11-18",
        dayName: "Chest",
        exercises: [{ name: "Bench press", sets: [{ reps: 10, weight: 70 }] }],
      },
      [
        {
          name: "Bench press",
          sets: [
            { reps: 10, weight: 70 },
            { reps: 8, weight: 60 },
          ],
        },
      ],
    );
    expect(await screen.findByText("Workout finished")).toBeTruthy();
  });

  test("shows an error when saving fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(finishWorkout).mockRejectedValue(new Error("offline"));

    await finishFirstSet();

    expect((await screen.findByRole("alert")).textContent).toBe(
      "Could not save the workout. Try again.",
    );
  });
});
