import type { WorkoutExercise } from "../components/ExerciseCard/ExerciseCard";
import type { DayExercise } from "../schemas/workoutSchemas";

export function createWorkout(plan: DayExercise[]): WorkoutExercise[] {
  return plan.map((exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set) => ({ ...set, done: false })),
  }));
}
