import styles from "./WeekdayPicker.module.css";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type WeekdayPickerProps = {
  value: number;
  onChange: (weekday: number) => void;
};

export function WeekdayPicker({ value, onChange }: WeekdayPickerProps) {
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>Day of the week</legend>
      {weekdayLabels.map((label, index) => {
        const weekday = index + 1;
        const isSelected = value === weekday;

        return (
          <label
            key={label}
            className={
              isSelected ? `${styles.option} ${styles.selected}` : styles.option
            }
          >
            <input
              className={styles.input}
              type="radio"
              name="weekday"
              checked={isSelected}
              onChange={() => onChange(weekday)}
            />
            {label}
          </label>
        );
      })}
    </fieldset>
  );
}
