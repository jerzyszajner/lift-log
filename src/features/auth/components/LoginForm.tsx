import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/Button/Button";
import { Field } from "../../../components/Field/Field";
import { Input } from "../../../components/Input/Input";
import { PasswordInput } from "../../../components/PasswordInput/PasswordInput";
import { loginSchema } from "../schemas/authSchemas";
import { signIn } from "../services/authService";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage";
import type { LoginFormValues } from "../schemas/authSchemas";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit({ email, password }: LoginFormValues) {
    setAuthError("");
    try {
      await signIn(email, password);
    } catch (err) {
      console.error(err);
      setAuthError(getAuthErrorMessage(err));
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Field label="Email" error={errors.email?.message}>
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register("email")}
            type="email"
            autoComplete="email"
          />
        )}
      </Field>
      <Field label="Password" error={errors.password?.message}>
        {(controlProps) => (
          <PasswordInput
            {...controlProps}
            {...register("password")}
            autoComplete="current-password"
          />
        )}
      </Field>
      {authError && <p>{authError}</p>}
      <Button type="submit" disabled={isSubmitting}>
        Log in
      </Button>
    </form>
  );
}
