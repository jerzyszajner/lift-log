import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "../../../../components/Button/Button";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { SetRow } from "../../../../components/SetRow/SetRow";
import { SetRowLabels } from "../../../../components/SetRowLabels/SetRowLabels";
import { defaultSet } from "../../schemas/daysSchemas";
import { getSetError } from "../../utils/getSetError";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { DayFormValues } from "../../schemas/daysSchemas";
import styles from "./ExerciseFields.module.css";

type ExerciseFieldsProps = {
  index: number;
  control: Control<DayFormValues>;
  register: UseFormRegister<DayFormValues>;
  errors: FieldErrors<DayFormValues>;
};

export function ExerciseFields({
  index,
  control,
  register,
  errors,
}: ExerciseFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });
  const sets = useWatch({ control, name: `exercises.${index}.sets` });
  const exerciseErrors = errors.exercises?.[index];

  function addSet() {
    append({ ...(sets.at(-1) ?? defaultSet) });
  }

  return (
    <div className={styles.card}>
      <Field label="Exercise name" error={exerciseErrors?.name?.message}>
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register(`exercises.${index}.name`)}
            type="text"
          />
        )}
      </Field>
      <SetRowLabels />
      {fields.map((field, setIndex) => (
        <Controller
          key={field.id}
          name={`exercises.${index}.sets.${setIndex}`}
          control={control}
          render={({ field: set }) => (
            <SetRow
              setNumber={setIndex + 1}
              reps={set.value.reps}
              weight={set.value.weight}
              error={getSetError(exerciseErrors?.sets?.[setIndex])}
              onRemove={fields.length > 1 ? () => remove(setIndex) : undefined}
              onRepsChange={(reps) => set.onChange({ ...set.value, reps })}
              onWeightChange={(weight) =>
                set.onChange({ ...set.value, weight })
              }
            />
          )}
        />
      ))}
      <Button variant="secondary" onClick={addSet}>
        Add set (copies the last one)
      </Button>
    </div>
  );
}
