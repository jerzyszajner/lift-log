import { describe, expect, test } from "vitest";
import { dayFormSchema } from "./daysSchemas";

const validDay = { name: "Legs", weekday: 1, exercises: [] };
const validExercise = { name: "Squat", sets: [{ reps: 8, weight: 60 }] };

describe("dayFormSchema", () => {
  test("accepts a name, a weekday and exercises", () => {
    const day = {
      name: "Chest and biceps",
      weekday: 1,
      exercises: [validExercise],
    };

    expect(dayFormSchema.parse(day)).toEqual(day);
  });

  test("trims spaces around the name", () => {
    expect(dayFormSchema.parse({ ...validDay, name: "  Legs  " }).name).toBe(
      "Legs",
    );
  });

  test("rejects an empty name", () => {
    expect(dayFormSchema.safeParse({ ...validDay, name: "" }).success).toBe(
      false,
    );
  });

  test("rejects a name with only spaces", () => {
    expect(dayFormSchema.safeParse({ ...validDay, name: "   " }).success).toBe(
      false,
    );
  });

  test("accepts the first and the last weekday", () => {
    expect(dayFormSchema.safeParse({ ...validDay, weekday: 1 }).success).toBe(
      true,
    );
    expect(dayFormSchema.safeParse({ ...validDay, weekday: 7 }).success).toBe(
      true,
    );
  });

  test("rejects a weekday below 1 or above 7", () => {
    expect(dayFormSchema.safeParse({ ...validDay, weekday: 0 }).success).toBe(
      false,
    );
    expect(dayFormSchema.safeParse({ ...validDay, weekday: 8 }).success).toBe(
      false,
    );
  });

  test("rejects a weekday that is not a whole number", () => {
    expect(dayFormSchema.safeParse({ ...validDay, weekday: 1.5 }).success).toBe(
      false,
    );
  });

  test("rejects a missing weekday", () => {
    expect(
      dayFormSchema.safeParse({ name: "Legs", exercises: [] }).success,
    ).toBe(false);
  });

  test("rejects missing exercises", () => {
    expect(dayFormSchema.safeParse({ name: "Legs", weekday: 1 }).success).toBe(
      false,
    );
  });

  test("trims spaces around an exercise name", () => {
    const day = {
      ...validDay,
      exercises: [{ ...validExercise, name: "  Squat  " }],
    };

    expect(dayFormSchema.parse(day).exercises[0].name).toBe("Squat");
  });

  test("rejects an exercise name with only spaces", () => {
    const day = {
      ...validDay,
      exercises: [{ ...validExercise, name: "   " }],
    };
    const result = dayFormSchema.safeParse(day);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["exercises", 0, "name"]);
    expect(result.error?.issues[0].message).toBe("Enter an exercise name");
  });

  test("reports a set error at the path of the field", () => {
    const day = {
      ...validDay,
      exercises: [
        {
          name: "Squat",
          sets: [
            { reps: 8, weight: 60 },
            { reps: 0, weight: 60 },
          ],
        },
      ],
    };
    const result = dayFormSchema.safeParse(day);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual([
      "exercises",
      0,
      "sets",
      1,
      "reps",
    ]);
  });
});
