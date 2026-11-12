import { Minus, Plus } from "lucide-react";
import { getNextWeight } from "../../utils/getNextWeight";
import { parseDigits } from "../../utils/parseDigits";
import styles from "./SetRow.module.css";

type SetRowProps = {
  setNumber: number;
  reps: number;
  weight: number;
  done: boolean;
  onRepsChange: (reps: number) => void;
  onWeightChange: (weight: number) => void;
  onDoneChange: (done: boolean) => void;
};

export function SetRow({
  setNumber,
  reps,
  weight,
  done,
  onRepsChange,
  onWeightChange,
  onDoneChange,
}: SetRowProps) {
  return (
    <div className={done ? `${styles.row} ${styles.done}` : styles.row}>
      <span className={styles.number}>{setNumber}</span>
      <input
        className={styles.input}
        type="text"
        inputMode="numeric"
        aria-label={`Reps, set ${setNumber}`}
        value={reps}
        onFocus={(e) => e.target.select()}
        onChange={(e) => onRepsChange(parseDigits(e.target.value))}
      />
      <button
        className={styles.button}
        type="button"
        aria-label="Decrease weight"
        onClick={() => onWeightChange(getNextWeight(weight, "down"))}
      >
        <Minus />
      </button>
      <input
        className={styles.input}
        type="text"
        inputMode="numeric"
        aria-label={`Weight, set ${setNumber}`}
        value={weight}
        onFocus={(e) => e.target.select()}
        onChange={(e) => onWeightChange(parseDigits(e.target.value))}
      />
      <button
        className={styles.button}
        type="button"
        aria-label="Increase weight"
        onClick={() => onWeightChange(getNextWeight(weight, "up"))}
      >
        <Plus />
      </button>
      <input
        className={styles.checkbox}
        type="checkbox"
        aria-label={`Done, set ${setNumber}`}
        checked={done}
        onChange={(e) => onDoneChange(e.target.checked)}
      />
    </div>
  );
}
