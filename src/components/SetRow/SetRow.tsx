import { Minus, Plus, X } from "lucide-react";
import { useId } from "react";
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
  const hasError = Boolean(error);
  const errorId = useId();
  const describedBy = hasError ? errorId : undefined;

  return (
    <div className={done ? `${styles.set} ${styles.done}` : styles.set}>
      <span className={styles.label}>Set {setNumber}</span>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          inputMode="numeric"
          aria-label={`Reps, set ${setNumber}`}
          aria-invalid={hasError}
          aria-describedby={describedBy}
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
          aria-invalid={hasError}
          aria-describedby={describedBy}
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
            className={`${styles.button} ${styles.remove}`}
            type="button"
            aria-label="Remove set"
            onClick={onRemove}
          >
            <X />
          </button>
        )}
      </div>
      {error && (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      )}
    </div>
  );
}
