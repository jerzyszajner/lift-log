import { z } from "zod";
import { dayExerciseSchema } from "../../workout/schemas/workoutSchemas";

export const workoutDaySchema = z.object({
  name: z.string().min(1, "Name is required"),
  order: z.number().min(1),
  exercises: z.array(dayExerciseSchema),
});

export type WorkoutDay = z.infer<typeof workoutDaySchema>;
