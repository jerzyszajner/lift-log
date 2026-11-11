import { z } from "zod";

export const setEntrySchema = z.object({
  reps: z
    .number()
    .min(1, "Reps must be at least 1")
    .max(999, "Reps must be 999 or fewer"),
  weight: z.number().min(0).max(999, "Weight must be 999 kg or less"),
});

export type SetEntry = z.infer<typeof setEntrySchema>;

export const dayExerciseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sets: z.array(setEntrySchema),
});

export type DayExercise = z.infer<typeof dayExerciseSchema>;
