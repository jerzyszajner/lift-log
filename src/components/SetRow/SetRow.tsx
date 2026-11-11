import { Minus, Plus } from "lucide-react";

import { getNextWeight } from "../../utils/getNextWeight";

import styles from "./SetRow.module.css";

type SetRowProps = {
  setNumber: number;
  reps: number;
  weight: number;
  onRepsChange: (reps: number) => void;
  onWeightChange: (weight: number) => void;
};

export function SetRow({
  setNumber,
  reps,
  weight,
  onRepsChange,
  onWeightChange,
}: SetRowProps) {
  return (
    <div className={styles.row}>
      <input
        className={styles.input}
        type="text"
        inputMode="numeric"
        aria-label={`Reps, set ${setNumber}`}
        value={reps}
        onFocus={(e) => e.target.select()}
        onChange={(e) => onRepsChange(Number(e.target.value))}
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
        inputMode="decimal"
        aria-label={`Weight, set ${setNumber}`}
        value={weight}
        onFocus={(e) => e.target.select()}
        onChange={(e) => onWeightChange(Number(e.target.value))}
      />
      <button
        className={styles.button}
        type="button"
        aria-label="Increase weight"
        onClick={() => onWeightChange(getNextWeight(weight, "up"))}
      >
        <Plus />
      </button>
    </div>
  );
}
