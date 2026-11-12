import { Plus } from "lucide-react";
import { SetRow } from "../../../../components/SetRow/SetRow";
import type { DayExercise, SetEntry } from "../../schemas/workoutSchemas";
import styles from "./ExerciseCard.module.css";

export type WorkoutSet = SetEntry & { done: boolean };
export type WorkoutExercise = Omit<DayExercise, "sets"> & {
  sets: WorkoutSet[];
};

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  onChange: (exercise: WorkoutExercise) => void;
};

export function ExerciseCard({ exercise, onChange }: ExerciseCardProps) {
  function updateSet(index: number, changes: Partial<WorkoutSet>) {
    onChange({
      ...exercise,
      sets: exercise.sets.map((set, i) =>
        i === index ? { ...set, ...changes } : set,
      ),
    });
  }

  function addSet() {
    const lastSet = exercise.sets.at(-1);
    if (!lastSet) return;
    onChange({
      ...exercise,
      sets: [...exercise.sets, { ...lastSet, done: false }],
    });
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{exercise.name}</h2>
      <div className={styles.labels}>
        <span>#</span>
        <span>Reps</span>
        <span className={styles.weightLabel}>Kg</span>
        <span className={styles.doneLabel}>Done</span>
      </div>
      {exercise.sets.map((set, index) => (
        <SetRow
          key={index}
          setNumber={index + 1}
          reps={set.reps}
          weight={set.weight}
          done={set.done}
          onRepsChange={(reps) => updateSet(index, { reps })}
          onWeightChange={(weight) => updateSet(index, { weight })}
          onDoneChange={(done) => updateSet(index, { done })}
        />
      ))}
      <button className={styles.addButton} type="button" onClick={addSet}>
        <Plus />
        Add set (copies the last one)
      </button>
    </div>
  );
}
