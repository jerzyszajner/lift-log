import { days } from "../data/days";

export function getDayById(dayId: string | undefined) {
  return days.find((day) => day.id === dayId);
}
