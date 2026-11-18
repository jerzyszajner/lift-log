import type { DayExercise } from "../../days/schemas/daysSchemas";
import type { WorkoutExercise } from "../schemas/workoutSchemas";

export function getDoneExercises(workout: WorkoutExercise[]): DayExercise[] {
  return workout
    .map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets
        .filter((set) => set.done)
        .map(({ reps, weight }) => ({ reps, weight })),
    }))
    .filter((exercise) => exercise.sets.length > 0);
}
