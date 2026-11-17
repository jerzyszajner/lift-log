import { Minus, Plus, X } from "lucide-react";
import { getNextWeight } from "../../utils/getNextWeight";
import { parseDigits } from "../../utils/parseDigits";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./SetRow.module.css";

type SetRowProps = {
  setNumber: number;
  reps: number;
  weight: number;
  done?: boolean;
  onRepsChange: (reps: number) => void;
  onWeightChange: (weight: number) => void;
  onDoneChange?: (done: boolean) => void;
  onRemove?: () => void;
  error?: string;
};

export function SetRow({
  setNumber,
  reps,
  weight,
  done = false,
  onRepsChange,
  onWeightChange,
  onDoneChange,
  onRemove,
  error,
}: SetRowProps) {
  return (
    <div>
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
        {onDoneChange && (
          <input
            className={styles.checkbox}
            type="checkbox"
            aria-label={`Done, set ${setNumber}`}
            checked={done}
            onChange={(e) => onDoneChange(e.target.checked)}
          />
        )}
        {onRemove && (
          <button
            className={styles.button}
            type="button"
            aria-label="Remove set"
            onClick={onRemove}
          >
            <X />
          </button>
        )}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
