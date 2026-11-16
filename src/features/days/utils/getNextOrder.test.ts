import { describe, expect, test } from "vitest";
import { getNextOrder } from "./getNextOrder";

describe("getNextOrder", () => {
  test("gives 1 for an empty list", () => {
    expect(getNextOrder([])).toBe(1);
  });

  test("adds 1 to the highest order", () => {
    expect(getNextOrder([{ order: 1 }, { order: 2 }])).toBe(3);
  });

  test("finds the highest order in an unsorted list", () => {
    expect(getNextOrder([{ order: 3 }, { order: 1 }, { order: 2 }])).toBe(4);
  });

  test("starts after the highest order when there are gaps", () => {
    expect(getNextOrder([{ order: 1 }, { order: 5 }])).toBe(6);
  });
});
