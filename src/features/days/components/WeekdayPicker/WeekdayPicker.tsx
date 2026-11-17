const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type WeekdayPickerProps = {
  value: number;
  onChange: (weekday: number) => void;
};

export function WeekdayPicker({ value, onChange }: WeekdayPickerProps) {
  return (
    <fieldset>
      <legend>Day of the week</legend>
      {weekdayLabels.map((label, index) => {
        const weekday = index + 1;

        return (
          <label key={label}>
            <input
              type="radio"
              name="weekday"
              checked={value === weekday}
              onChange={() => onChange(weekday)}
            />
            {label}
          </label>
        );
      })}
    </fieldset>
  );
}
