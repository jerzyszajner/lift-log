import type { DayExercise } from "../../days/schemas/daysSchemas";
import type { WorkoutExercise } from "../schemas/workoutSchemas";

export function applyToPlan(
  plan: DayExercise[],
  workout: WorkoutExercise[],
): DayExercise[] {
  return plan.map((exercise, index) => {
    const workoutSets = workout[index].sets;

    const updatedSets = exercise.sets.map((set, setIndex) => {
      const workoutSet = workoutSets[setIndex];
      return workoutSet.done
        ? { reps: workoutSet.reps, weight: workoutSet.weight }
        : set;
    });

    const extraSets = workoutSets
      .slice(exercise.sets.length)
      .filter((set) => set.done)
      .map(({ reps, weight }) => ({ reps, weight }));

    return { ...exercise, sets: [...updatedSets, ...extraSets] };
  });
}
