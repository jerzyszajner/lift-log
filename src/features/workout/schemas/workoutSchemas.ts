import { z } from "zod";
import {
  dayExerciseSchema,
  setEntrySchema,
} from "../../days/schemas/daysSchemas";

export const workoutSetSchema = setEntrySchema.extend({
  done: z.boolean(),
});

export type WorkoutSet = z.infer<typeof workoutSetSchema>;

export const workoutExerciseSchema = dayExerciseSchema.extend({
  sets: z.array(workoutSetSchema),
});

export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
