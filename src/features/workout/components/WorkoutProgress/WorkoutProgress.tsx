import { formatSets } from "../../utils/formatSets";
import styles from "./WorkoutProgress.module.css";

type WorkoutProgressProps = {
  done: number;
  total: number;
};

export function WorkoutProgress({ done, total }: WorkoutProgressProps) {
  return (
    <div className={styles.row}>
      <progress
        className={styles.progress}
        value={done}
        max={total}
        aria-label="Sets done"
      />
      <p className={styles.count} aria-live="polite">
        {done} of {formatSets(total)}
      </p>
    </div>
  );
}
