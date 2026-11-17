import { z } from "zod";

export const setEntrySchema = z.object({
  reps: z
    .number()
    .int("Reps must be a whole number")
    .min(1, "Reps must be at least 1")
    .max(999, "Reps must be 999 or fewer"),
  weight: z.number().min(0).max(999, "Weight must be 999 kg or less"),
});

export type SetEntry = z.infer<typeof setEntrySchema>;

export const dayExerciseSchema = z.object({
  name: z.string().trim().min(1, "Enter an exercise name"),
  sets: z.array(setEntrySchema),
});

export type DayExercise = z.infer<typeof dayExerciseSchema>;

export const daySchema = z.object({
  name: z.string().min(1, "Name is required"),
  weekday: z.number().int().min(1).max(7),
  exercises: z.array(dayExerciseSchema),
});

export type DayData = z.infer<typeof daySchema>;

export type Day = DayData & { id: string };

export const dayFormSchema = z.object({
  name: z.string().trim().min(1, "Enter a day name"),
  weekday: z
    .number()
    .int("Weekday must be a whole number")
    .min(1, "Weekday must be 1 or more")
    .max(7, "Weekday must be 7 or less"),
  exercises: z.array(dayExerciseSchema),
});

export type DayFormValues = z.infer<typeof dayFormSchema>;
