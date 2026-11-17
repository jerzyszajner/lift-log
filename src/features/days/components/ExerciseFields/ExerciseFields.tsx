import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "../../../../components/Button/Button";
import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import { SetRow } from "../../../../components/SetRow/SetRow";
import { getSetError } from "../../utils/getSetError";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { DayFormValues } from "../../schemas/daysSchemas";

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
  const { fields, append } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });
  const sets = useWatch({ control, name: `exercises.${index}.sets` });
  const exerciseErrors = errors.exercises?.[index];

  function addSet() {
    append({ ...(sets.at(-1) ?? { reps: 10, weight: 0 }) });
  }

  return (
    <>
      <Field label="Exercise name" error={exerciseErrors?.name?.message}>
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register(`exercises.${index}.name`)}
            type="text"
          />
        )}
      </Field>
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
    </>
  );
}
