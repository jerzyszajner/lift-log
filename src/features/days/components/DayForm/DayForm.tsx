import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button/Button";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { dayFormSchema } from "../../schemas/daysSchemas";
import { WeekdayPicker } from "../WeekdayPicker/WeekdayPicker";
import type { DayFormValues } from "../../schemas/daysSchemas";
import styles from "./DayForm.module.css";

type DayFormProps = {
  onSubmit: (values: DayFormValues) => Promise<void>;
  defaultValues?: DayFormValues;
};

export function DayForm({ onSubmit, defaultValues }: DayFormProps) {
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DayFormValues>({
    resolver: zodResolver(dayFormSchema),
    defaultValues: defaultValues ?? { name: "", weekday: 1 },
  });

  async function submit(values: DayFormValues) {
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
        <Controller
          name="weekday"
          control={control}
          render={({ field }) => (
            <WeekdayPicker value={field.value} onChange={field.onChange} />
          )}
        />
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
