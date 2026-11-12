import { describe, expect, test } from "vitest";
import type { DayExercise } from "../schemas/workoutSchemas";
import { createWorkout } from "./createWorkout";

const plan: DayExercise[] = [
  {
    name: "Bench press",
    sets: [
      { reps: 10, weight: 60 },
      { reps: 8, weight: 65 },
    ],
  },
];

describe("createWorkout", () => {
  test("marks every set as not done and keeps the plan values", () => {
    expect(createWorkout(plan)).toEqual([
      {
        name: "Bench press",
        sets: [
          { reps: 10, weight: 60, done: false },
          { reps: 8, weight: 65, done: false },
        ],
      },
    ]);
  });

  test("does not change the plan", () => {
    createWorkout(plan);
    expect(plan[0].sets[0]).toEqual({ reps: 10, weight: 60 });
  });
});
