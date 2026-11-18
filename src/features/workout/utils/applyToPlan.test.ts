import { describe, expect, test } from "vitest";
import { applyToPlan } from "./applyToPlan";
import type { DayExercise } from "../../days/schemas/daysSchemas";

const plan: DayExercise[] = [
  {
    name: "Bench press",
    sets: [
      { reps: 10, weight: 60 },
      { reps: 8, weight: 65 },
    ],
  },
];

describe("applyToPlan", () => {
  test("changes only the done sets", () => {
    const workout = [
      {
        name: "Bench press",
        sets: [
          { reps: 10, weight: 62.5, done: true },
          { reps: 6, weight: 70, done: false },
        ],
      },
    ];

    expect(applyToPlan(plan, workout)[0].sets).toEqual([
      { reps: 10, weight: 62.5 },
      { reps: 8, weight: 65 },
    ]);
  });

  test("appends a done extra set and skips an undone one", () => {
    const workout = [
      {
        name: "Bench press",
        sets: [
          { reps: 10, weight: 60, done: true },
          { reps: 8, weight: 65, done: true },
          { reps: 8, weight: 65, done: false },
          { reps: 6, weight: 67.5, done: true },
        ],
      },
    ];

    expect(applyToPlan(plan, workout)[0].sets).toEqual([
      { reps: 10, weight: 60 },
      { reps: 8, weight: 65 },
      { reps: 6, weight: 67.5 },
    ]);
  });

  test("keeps the plan length when the last set is skipped", () => {
    const workout = [
      {
        name: "Bench press",
        sets: [
          { reps: 10, weight: 60, done: true },
          { reps: 8, weight: 65, done: false },
        ],
      },
    ];

    expect(applyToPlan(plan, workout)[0].sets).toHaveLength(2);
  });

  test("does not change the plan", () => {
    const workout = [
      {
        name: "Bench press",
        sets: [
          { reps: 12, weight: 70, done: true },
          { reps: 12, weight: 70, done: true },
        ],
      },
    ];

    applyToPlan(plan, workout);
    expect(plan[0].sets[0]).toEqual({ reps: 10, weight: 60 });
  });
});
