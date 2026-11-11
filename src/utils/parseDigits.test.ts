import { describe, expect, test } from "vitest";
import { parseDigits } from "./parseDigits";

describe("parseDigits", () => {
  test("keeps digits", () => {
    expect(parseDigits("12")).toBe(12);
  });

  test("drops letters and signs", () => {
    expect(parseDigits("5a")).toBe(5);
    expect(parseDigits("-5")).toBe(5);
  });

  test("drops the decimal separator", () => {
    expect(parseDigits("1.5")).toBe(15);
    expect(parseDigits("1,5")).toBe(15);
  });

  test("returns 0 for an empty or non-digit value", () => {
    expect(parseDigits("")).toBe(0);
    expect(parseDigits("abc")).toBe(0);
  });
});
