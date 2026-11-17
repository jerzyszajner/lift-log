import { useState } from "react";
import { Plus } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button/Button";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { dayFormSchema, defaultSet } from "../../schemas/daysSchemas";
import { ExerciseFields } from "../ExerciseFields/ExerciseFields";
import { WeekdayPicker } from "../WeekdayPicker/WeekdayPicker";
import type { DayFormValues } from "../../schemas/daysSchemas";
import styles from "./DayForm.module.css";

type DayFormProps = {
  onSubmit: (values: DayFormValues) => Promise<void>;
  defaultValues?: DayFormValues;
};

const emptyExercise = { name: "", sets: [defaultSet] };

export function DayForm({ onSubmit, defaultValues }: DayFormProps) {
  const [submitError, setSubmitError] = useState("");
  const exercises = defaultValues?.exercises.length
    ? defaultValues.exercises
    : [emptyExercise];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DayFormValues>({
    resolver: zodResolver(dayFormSchema),
    defaultValues: { name: "", weekday: 1, ...defaultValues, exercises },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
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
        {fields.map((field, index) => (
          <ExerciseFields
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            onRemove={fields.length > 1 ? () => remove(index) : undefined}
          />
        ))}
        <Button variant="add" onClick={() => append(emptyExercise)}>
          <Plus />
          Add exercise
        </Button>
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
