import { ExerciseCard } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import type { DayExercise } from "../../features/workout/schemas/workoutSchemas";

const exercise: DayExercise = {
  name: "Bench press",
  sets: [
    { reps: 10, weight: 60 },
    { reps: 8, weight: 65 },
    { reps: 6, weight: 70 },
  ],
};

export function HomePage() {
  return (
    <div>
      <div>HomePage</div>
      <ExerciseCard exercise={exercise} />
    </div>
  );
}
