import { describe, expect, test } from "vitest";
import { addDaySchema } from "./daysSchemas";

describe("addDaySchema", () => {
  test("accepts a name", () => {
    expect(addDaySchema.parse({ name: "Chest and biceps" })).toEqual({
      name: "Chest and biceps",
    });
  });

  test("trims spaces around the name", () => {
    expect(addDaySchema.parse({ name: "  Legs  " })).toEqual({ name: "Legs" });
  });

  test("rejects an empty name", () => {
    expect(addDaySchema.safeParse({ name: "" }).success).toBe(false);
  });

  test("rejects a name with only spaces", () => {
    expect(addDaySchema.safeParse({ name: "   " }).success).toBe(false);
  });
});
