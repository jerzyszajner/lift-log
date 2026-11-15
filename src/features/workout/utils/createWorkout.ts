import type { DayExercise } from "../../days/schemas/daysSchemas";
import type { WorkoutExercise } from "../schemas/workoutSchemas";

export function createWorkout(plan: DayExercise[]): WorkoutExercise[] {
  return plan.map((exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set) => ({ ...set, done: false })),
  }));
}
