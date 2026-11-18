import { Lock, LockOpen, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { SetRow } from "../../../../components/SetRow/SetRow";
import { SetRowLabels } from "../../../../components/SetRowLabels/SetRowLabels";
import type { WorkoutExercise, WorkoutSet } from "../../schemas/workoutSchemas";
import styles from "./ExerciseCard.module.css";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  onChange: (exercise: WorkoutExercise) => void;
};

export function ExerciseCard({ exercise, onChange }: ExerciseCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

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
      <div className={styles.header}>
        <h2 className={styles.title}>{exercise.name}</h2>
        <button
          className={styles.lock}
          type="button"
          aria-label={`Unlock ${exercise.name}`}
          aria-pressed={isUnlocked}
          onClick={() => setIsUnlocked(!isUnlocked)}
        >
          {isUnlocked ? <LockOpen /> : <Lock />}
        </button>
      </div>
      {isUnlocked && <SetRowLabels lastLabel="Done" />}
      {exercise.sets.map((set, index) => (
        <SetRow
          key={index}
          setNumber={index + 1}
          reps={set.reps}
          weight={set.weight}
          done={set.done}
          locked={!isUnlocked || set.done}
          onRepsChange={(reps) => updateSet(index, { reps })}
          onWeightChange={(weight) => updateSet(index, { weight })}
          onDoneChange={(done) => updateSet(index, { done })}
        />
      ))}
      {isUnlocked && (
        <Button variant="addNeutral" onClick={addSet}>
          <Plus />
          Add set
        </Button>
      )}
    </div>
  );
}
