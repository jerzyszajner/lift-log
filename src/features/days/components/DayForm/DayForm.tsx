import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button/Button";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { addDaySchema } from "../../schemas/daysSchemas";
import type { AddDayFormValues } from "../../schemas/daysSchemas";
import styles from "./DayForm.module.css";

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
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <div className={styles.fields}>
        <Field label="Day name" error={errors.name?.message}>
          {(controlProps) => (
            <Input {...controlProps} {...register("name")} type="text" />
          )}
        </Field>
      </div>
      <div className={styles.actions}>
        {submitError && <ErrorMessage role="alert">{submitError}</ErrorMessage>}
        <Button type="submit" disabled={isSubmitting}>
          Save day
        </Button>
      </div>
    </form>
  );
}
