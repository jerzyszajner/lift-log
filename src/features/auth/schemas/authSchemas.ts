import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Enter a password")
    .min(6, "Use at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
