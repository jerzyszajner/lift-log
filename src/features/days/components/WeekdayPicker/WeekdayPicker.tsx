import { getWeekdayLabel } from "../../utils/getWeekdayLabel";
import styles from "./WeekdayPicker.module.css";

const weekdays = [1, 2, 3, 4, 5, 6, 7];

type WeekdayPickerProps = {
  value: number;
  onChange: (weekday: number) => void;
};

export function WeekdayPicker({ value, onChange }: WeekdayPickerProps) {
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>Day of the week</legend>
      {weekdays.map((weekday) => {
        const isSelected = value === weekday;
        const label = getWeekdayLabel(weekday);

        return (
          <label
            key={weekday}
            className={
              isSelected ? `${styles.option} ${styles.selected}` : styles.option
            }
          >
            <input
              className={styles.input}
              type="radio"
              name="weekday"
              aria-label={label}
              checked={isSelected}
              onChange={() => onChange(weekday)}
            />
            {label.slice(0, 3)}
          </label>
        );
      })}
    </fieldset>
  );
}
