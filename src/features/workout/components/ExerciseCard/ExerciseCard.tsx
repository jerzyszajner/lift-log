import { useState } from "react";
import { SetRow } from "../../../../components/SetRow/SetRow";
import type { DayExercise, SetEntry } from "../../schemas/workoutSchemas";

type ExerciseCardProps = {
  exercise: DayExercise;
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [sets, setSets] = useState(exercise.sets);

  function updateSet(index: number, changes: Partial<SetEntry>) {
    setSets(sets.map((set, i) => (i === index ? { ...set, ...changes } : set)));
  }

  return (
    <div>
      <h2>{exercise.name}</h2>
      {sets.map((set, index) => (
        <SetRow
          key={index}
          setNumber={index + 1}
          reps={set.reps}
          weight={set.weight}
          onRepsChange={(reps) => updateSet(index, { reps })}
          onWeightChange={(weight) => updateSet(index, { weight })}
        />
      ))}
    </div>
  );
}
