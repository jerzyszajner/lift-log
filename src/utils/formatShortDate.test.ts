import { describe, expect, test } from "vitest";
import { formatShortDate } from "./formatShortDate";

describe("formatShortDate", () => {
  test("shows day and short month", () => {
    expect(formatShortDate(new Date(2026, 10, 12))).toBe("12 Nov");
  });

  test("has no leading zero in the day", () => {
    expect(formatShortDate(new Date(2026, 0, 5))).toBe("5 Jan");
  });
});
