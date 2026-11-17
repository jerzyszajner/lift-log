import { describe, expect, test } from "vitest";
import { getSetError } from "./getSetError";

describe("getSetError", () => {
  test("returns nothing when the set has no errors", () => {
    expect(getSetError(undefined)).toBeUndefined();
    expect(getSetError({})).toBeUndefined();
  });

  test("returns the reps message", () => {
    expect(
      getSetError({
        reps: { type: "too_small", message: "Reps must be at least 1" },
      }),
    ).toBe("Reps must be at least 1");
  });

  test("returns the weight message when only the weight is wrong", () => {
    expect(
      getSetError({
        weight: { type: "too_big", message: "Weight must be 999 kg or less" },
      }),
    ).toBe("Weight must be 999 kg or less");
  });

  test("returns the reps message first when both are wrong", () => {
    expect(
      getSetError({
        reps: { type: "too_small", message: "Reps must be at least 1" },
        weight: { type: "too_big", message: "Weight must be 999 kg or less" },
      }),
    ).toBe("Reps must be at least 1");
  });
});
