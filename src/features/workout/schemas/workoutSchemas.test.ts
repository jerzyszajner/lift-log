import { describe, expect, test } from "vitest";
import { logSchema } from "./workoutSchemas";

const validLog = {
  date: "2026-11-18",
  dayName: "Chest and biceps",
  exercises: [{ name: "Bench press", sets: [{ reps: 10, weight: 60 }] }],
};

describe("logSchema", () => {
  test("accepts a date, a day name and exercises", () => {
    expect(logSchema.parse(validLog)).toEqual(validLog);
  });

  test("rejects a date without leading zeros", () => {
    expect(
      logSchema.safeParse({ ...validLog, date: "2026-11-5" }).success,
    ).toBe(false);
  });

  test("rejects a date with a time", () => {
    expect(
      logSchema.safeParse({ ...validLog, date: "2026-11-18T23:30:00Z" })
        .success,
    ).toBe(false);
  });
});
