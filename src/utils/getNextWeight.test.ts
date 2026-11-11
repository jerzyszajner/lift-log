import { describe, expect, test } from "vitest";

import { getNextWeight } from "./getNextWeight";

describe("getNextWeight", () => {
  test("adds 1 kg below 10 kg", () => {
    expect(getNextWeight(1, "up")).toBe(2);
  });

  test("adds 1 kg below 10 kg", () => {
    expect(getNextWeight(9, "up")).toBe(10);
  });

  test("adds 2.5 kg above 10 kg", () => {
    expect(getNextWeight(10, "up")).toBe(12.5);
  });

  test("takes 1 kg at 1 kg", () => {
    expect(getNextWeight(1, "down")).toBe(0);
  });

  test("takes 1 kg at 0 kg", () => {
    expect(getNextWeight(0, "down")).toBe(0);
  });

  test("takes 1 kg at 10 kg", () => {
    expect(getNextWeight(10, "down")).toBe(9);
  });

  test("takes 2.5 kg at 12.5 kg", () => {
    expect(getNextWeight(12.5, "down")).toBe(10);
  });
});
