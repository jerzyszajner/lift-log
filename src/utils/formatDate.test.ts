import { describe, expect, test } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  test("uses the local day late in the evening", () => {
    expect(formatDate(new Date(2026, 10, 18, 23, 30))).toBe("2026-11-18");
  });

  test("pads the month and the day with a zero", () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});
