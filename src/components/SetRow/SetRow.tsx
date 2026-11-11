import { getNextWeight } from "../../utils/getNextWeight";

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
    <div>
      <input
        type="text"
        inputMode="numeric"
        value={reps}
        onChange={(e) => onRepsChange(Number(e.target.value))}
      />
      <button
        type="button"
        onClick={() => onWeightChange(getNextWeight(weight, "down"))}
      >
        -
      </button>
      <input
        type="text"
        inputMode="decimal"
        value={weight}
        onChange={(e) => onWeightChange(Number(e.target.value))}
      />
      <button
        type="button"
        onClick={() => onWeightChange(getNextWeight(weight, "up"))}
      >
        +
      </button>
    </div>
  );
}
