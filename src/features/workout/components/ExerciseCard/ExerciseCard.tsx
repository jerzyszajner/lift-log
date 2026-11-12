import { Plus } from "lucide-react";
import { useState } from "react";
import { SetRow } from "../../../../components/SetRow/SetRow";
import type { DayExercise, SetEntry } from "../../schemas/workoutSchemas";

type ExerciseCardProps = {
  exercise: DayExercise;
};

type WorkoutSet = SetEntry & { done: boolean };

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [sets, setSets] = useState<WorkoutSet[]>(
    exercise.sets.map((set) => ({ ...set, done: false })),
  );

  function updateSet(index: number, changes: Partial<WorkoutSet>) {
    setSets(sets.map((set, i) => (i === index ? { ...set, ...changes } : set)));
  }

  function addSet() {
    const lastSet = sets.at(-1);
    if (!lastSet) return;
    setSets([...sets, { ...lastSet, done: false }]);
  }

  return (
    <div>
      <h2>{exercise.name}</h2>
      <div>
        <span>#</span>
        <span>Reps</span>
        <span>Kg</span>
        <span>Done</span>
      </div>
      {sets.map((set, index) => (
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
      <button type="button" onClick={addSet}>
        <Plus />
        Add set (copies the last one)
      </button>
    </div>
  );
}
