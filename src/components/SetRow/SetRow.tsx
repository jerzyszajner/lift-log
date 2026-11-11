import { Minus, Plus } from "lucide-react";

import { getNextWeight } from "../../utils/getNextWeight";

import styles from "./SetRow.module.css";

type SetRowProps = {
  reps: number;
  weight: number;
  onRepsChange: (reps: number) => void;
  onWeightChange: (weight: number) => void;
};

export function SetRow({
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
        value={reps}
        onChange={(e) => onRepsChange(Number(e.target.value))}
      />
      <button
        className={styles.button}
        type="button"
        onClick={() => onWeightChange(getNextWeight(weight, "down"))}
      >
        <Minus />
      </button>
      <input
        className={styles.input}
        type="text"
        inputMode="decimal"
        value={weight}
        onChange={(e) => onWeightChange(Number(e.target.value))}
      />
      <button
        className={styles.button}
        type="button"
        onClick={() => onWeightChange(getNextWeight(weight, "up"))}
      >
        <Plus />
      </button>
    </div>
  );
}
