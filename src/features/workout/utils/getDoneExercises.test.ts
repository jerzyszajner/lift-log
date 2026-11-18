import { describe, expect, test } from "vitest";
import { getDoneExercises } from "./getDoneExercises";
import type { WorkoutExercise } from "../schemas/workoutSchemas";

describe("getDoneExercises", () => {
  test("keeps only done sets without the done field", () => {
    const workout: WorkoutExercise[] = [
      {
        name: "Bench press",
        sets: [
          { reps: 10, weight: 60, done: true },
          { reps: 8, weight: 65, done: false },
        ],
      },
    ];

    expect(getDoneExercises(workout)).toEqual([
      { name: "Bench press", sets: [{ reps: 10, weight: 60 }] },
    ]);
  });

  test("skips an exercise with no done sets", () => {
    const workout: WorkoutExercise[] = [
      { name: "Bench press", sets: [{ reps: 10, weight: 60, done: true }] },
      { name: "Curls", sets: [{ reps: 12, weight: 10, done: false }] },
    ];

    expect(getDoneExercises(workout)).toEqual([
      { name: "Bench press", sets: [{ reps: 10, weight: 60 }] },
    ]);
  });
});
