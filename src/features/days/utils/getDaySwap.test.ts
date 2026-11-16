import { describe, expect, test } from "vitest";
import { getDaySwap } from "./getDaySwap";

const days = [
  { id: "a", order: 1 },
  { id: "b", order: 2 },
  { id: "c", order: 3 },
];

describe("getDaySwap", () => {
  test("swaps a day with the one above it", () => {
    expect(getDaySwap(days, "b", "up")).toEqual([
      { id: "b", order: 1 },
      { id: "a", order: 2 },
    ]);
  });

  test("swaps a day with the one below it", () => {
    expect(getDaySwap(days, "b", "down")).toEqual([
      { id: "b", order: 3 },
      { id: "c", order: 2 },
    ]);
  });

  test("returns null for the first day going up", () => {
    expect(getDaySwap(days, "a", "up")).toBeNull();
  });

  test("returns null for the last day going down", () => {
    expect(getDaySwap(days, "c", "down")).toBeNull();
  });

  test("returns null for an unknown id", () => {
    expect(getDaySwap(days, "x", "down")).toBeNull();
  });

  test("finds neighbours in an unsorted list", () => {
    const unsorted = [days[2], days[0], days[1]];
    expect(getDaySwap(unsorted, "b", "up")).toEqual([
      { id: "b", order: 1 },
      { id: "a", order: 2 },
    ]);
  });

  test("swaps the real order values when there are gaps", () => {
    const gaps = [
      { id: "a", order: 1 },
      { id: "b", order: 5 },
    ];
    expect(getDaySwap(gaps, "a", "down")).toEqual([
      { id: "a", order: 5 },
      { id: "b", order: 1 },
    ]);
  });
});
