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

export const logSchema = z.object({
  date: z.iso.date(),
  dayName: z.string().min(1),
  exercises: z.array(dayExerciseSchema),
});

export type LogData = z.infer<typeof logSchema>;
