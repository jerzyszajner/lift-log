import { describe, expect, test } from "vitest";
import { dayFormSchema } from "./daysSchemas";

describe("dayFormSchema", () => {
  test("accepts a name and a weekday", () => {
    expect(
      dayFormSchema.parse({ name: "Chest and biceps", weekday: 1 }),
    ).toEqual({
      name: "Chest and biceps",
      weekday: 1,
    });
  });

  test("trims spaces around the name", () => {
    expect(dayFormSchema.parse({ name: "  Legs  ", weekday: 3 })).toEqual({
      name: "Legs",
      weekday: 3,
    });
  });

  test("rejects an empty name", () => {
    expect(dayFormSchema.safeParse({ name: "", weekday: 1 }).success).toBe(
      false,
    );
  });

  test("rejects a name with only spaces", () => {
    expect(dayFormSchema.safeParse({ name: "   ", weekday: 1 }).success).toBe(
      false,
    );
  });

  test("accepts the first and the last weekday", () => {
    expect(dayFormSchema.safeParse({ name: "Legs", weekday: 1 }).success).toBe(
      true,
    );
    expect(dayFormSchema.safeParse({ name: "Legs", weekday: 7 }).success).toBe(
      true,
    );
  });

  test("rejects a weekday below 1 or above 7", () => {
    expect(dayFormSchema.safeParse({ name: "Legs", weekday: 0 }).success).toBe(
      false,
    );
    expect(dayFormSchema.safeParse({ name: "Legs", weekday: 8 }).success).toBe(
      false,
    );
  });

  test("rejects a weekday that is not a whole number", () => {
    expect(
      dayFormSchema.safeParse({ name: "Legs", weekday: 1.5 }).success,
    ).toBe(false);
  });

  test("rejects a missing weekday", () => {
    expect(dayFormSchema.safeParse({ name: "Legs" }).success).toBe(false);
  });
});
