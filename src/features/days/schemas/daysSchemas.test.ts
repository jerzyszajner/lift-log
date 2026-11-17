import { describe, expect, test } from "vitest";
import { addDaySchema } from "./daysSchemas";

describe("addDaySchema", () => {
  test("accepts a name and a weekday", () => {
    expect(
      addDaySchema.parse({ name: "Chest and biceps", weekday: 1 }),
    ).toEqual({
      name: "Chest and biceps",
      weekday: 1,
    });
  });

  test("trims spaces around the name", () => {
    expect(addDaySchema.parse({ name: "  Legs  ", weekday: 3 })).toEqual({
      name: "Legs",
      weekday: 3,
    });
  });

  test("rejects an empty name", () => {
    expect(addDaySchema.safeParse({ name: "", weekday: 1 }).success).toBe(
      false,
    );
  });

  test("rejects a name with only spaces", () => {
    expect(addDaySchema.safeParse({ name: "   ", weekday: 1 }).success).toBe(
      false,
    );
  });

  test("accepts the first and the last weekday", () => {
    expect(addDaySchema.safeParse({ name: "Legs", weekday: 1 }).success).toBe(
      true,
    );
    expect(addDaySchema.safeParse({ name: "Legs", weekday: 7 }).success).toBe(
      true,
    );
  });

  test("rejects a weekday below 1 or above 7", () => {
    expect(addDaySchema.safeParse({ name: "Legs", weekday: 0 }).success).toBe(
      false,
    );
    expect(addDaySchema.safeParse({ name: "Legs", weekday: 8 }).success).toBe(
      false,
    );
  });

  test("rejects a weekday that is not a whole number", () => {
    expect(addDaySchema.safeParse({ name: "Legs", weekday: 1.5 }).success).toBe(
      false,
    );
  });

  test("rejects a missing weekday", () => {
    expect(addDaySchema.safeParse({ name: "Legs" }).success).toBe(false);
  });
});
