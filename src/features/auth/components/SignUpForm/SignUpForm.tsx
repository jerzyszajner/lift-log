import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button/Button";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { PasswordInput } from "../../../../components/PasswordInput/PasswordInput";
import { signUpSchema } from "../../schemas/authSchemas";
import { signUp } from "../../services/authService";
import { getAuthErrorMessage } from "../../utils/getAuthErrorMessage";
import type { SignUpFormValues } from "../../schemas/authSchemas";

export function SignUpForm() {
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit({ email, password }: SignUpFormValues) {
    setAuthError("");
    try {
      await signUp(email, password);
    } catch (err) {
      console.error(err);
      setAuthError(getAuthErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            autoComplete="new-password"
          />
        )}
      </Field>
      {authError && <ErrorMessage role="alert">{authError}</ErrorMessage>}
      <Button type="submit" disabled={isSubmitting}>
        Create account
      </Button>
    </form>
  );
}
