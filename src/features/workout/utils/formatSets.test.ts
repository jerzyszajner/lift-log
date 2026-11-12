import { describe, expect, test } from "vitest";
import { formatSets } from "./formatSets";

describe("formatSets", () => {
  test("uses singular for one set", () => {
    expect(formatSets(1)).toBe("1 set");
  });

  test("uses plural for other counts", () => {
    expect(formatSets(0)).toBe("0 sets");
    expect(formatSets(2)).toBe("2 sets");
  });
});
