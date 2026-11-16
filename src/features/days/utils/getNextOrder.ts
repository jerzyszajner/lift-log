export function getNextOrder(days: { order: number }[]) {
  return Math.max(0, ...days.map((day) => day.order)) + 1;
}
