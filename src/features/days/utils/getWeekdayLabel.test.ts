import { describe, expect, test } from "vitest";
import { getWeekdayLabel } from "./getWeekdayLabel";

describe("getWeekdayLabel", () => {
  test("returns Monday for 1", () => {
    expect(getWeekdayLabel(1)).toBe("Monday");
  });

  test("returns Sunday for 7", () => {
    expect(getWeekdayLabel(7)).toBe("Sunday");
  });
});
