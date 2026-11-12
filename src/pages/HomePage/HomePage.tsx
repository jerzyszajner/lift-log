import { useState } from "react";
import { ExerciseCard } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import type { WorkoutExercise } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import type { DayExercise } from "../../features/workout/schemas/workoutSchemas";

const plan: DayExercise[] = [
  {
    name: "Bench press",
    sets: [
      { reps: 10, weight: 60 },
      { reps: 8, weight: 65 },
      { reps: 6, weight: 70 },
    ],
  },
  {
    name: "Biceps curl",
    sets: [
      { reps: 12, weight: 10 },
      { reps: 10, weight: 12.5 },
      { reps: 8, weight: 15 },
    ],
  },
];

export function HomePage() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>(
    plan.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({ ...set, done: false })),
    })),
  );

  function updateExercise(index: number, updated: WorkoutExercise) {
    setExercises((current) =>
      current.map((exercise, i) => (i === index ? updated : exercise)),
    );
  }

  const allSets = exercises.flatMap((exercise) => exercise.sets);
  const doneCount = allSets.filter((set) => set.done).length;

  return (
    <div>
      <p>
        {doneCount} of {allSets.length} sets
      </p>
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={exercise}
          onChange={(updated) => updateExercise(index, updated)}
        />
      ))}
    </div>
  );
}
