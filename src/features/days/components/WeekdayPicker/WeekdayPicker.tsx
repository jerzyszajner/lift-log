const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type WeekdayPickerProps = {
  value: number;
  onChange: (weekday: number) => void;
};

export function WeekdayPicker({ onChange }: WeekdayPickerProps) {
  return (
    <div>
      {weekdayLabels.map((label, index) => (
        <button key={label} type="button" onClick={() => onChange(index + 1)}>
          {label}
        </button>
      ))}
    </div>
  );
}
