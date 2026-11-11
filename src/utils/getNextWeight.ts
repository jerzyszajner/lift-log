export function getNextWeight(
  current: number,
  direction: "up" | "down",
): number {
  if (direction === "up") {
    if (current < 10) {
      return current + 1;
    }
    return current + 2.5;
  }

  if (current > 10) {
    return current - 2.5;
  }
  return Math.max(0, current - 1);
}
