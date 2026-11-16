import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button/Button";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { addDaySchema } from "../../schemas/daysSchemas";
import type { AddDayFormValues } from "../../schemas/daysSchemas";

type DayFormProps = {
  onSubmit: (values: AddDayFormValues) => Promise<void>;
};

export function DayForm({ onSubmit }: DayFormProps) {
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddDayFormValues>({
    resolver: zodResolver(addDaySchema),
  });

  async function submit(values: AddDayFormValues) {
    setSubmitError("");
    try {
      await onSubmit(values);
    } catch (err) {
      console.error(err);
      setSubmitError("Could not save the day. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Field label="Day name" error={errors.name?.message}>
        {(controlProps) => (
          <Input {...controlProps} {...register("name")} type="text" />
        )}
      </Field>
      {submitError && <ErrorMessage role="alert">{submitError}</ErrorMessage>}
      <Button type="submit" disabled={isSubmitting}>
        Save day
      </Button>
    </form>
  );
}
