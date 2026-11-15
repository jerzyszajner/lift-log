import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Enter your password")
    .max(50, "Use 50 characters or fewer"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
