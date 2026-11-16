type OrderedDay = { id: string; order: number };

export function getDaySwap(
  days: OrderedDay[],
  id: string,
  direction: "up" | "down",
) {
  const sorted = [...days].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((day) => day.id === id);
  if (index === -1) {
    return null;
  }

  const day = sorted[index];
  const neighbour = sorted[direction === "up" ? index - 1 : index + 1];
  if (!neighbour) {
    return null;
  }

  return [
    { id: day.id, order: neighbour.order },
    { id: neighbour.id, order: day.order },
  ];
}
