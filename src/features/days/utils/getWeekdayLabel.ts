const weekdayLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getWeekdayLabel(weekday: number) {
  return weekdayLabels[weekday - 1];
}
