import { Field } from "../../../../components/Field/Field";
import { Input } from "../../../../components/Input/Input";
import type { UseFormRegister } from "react-hook-form";
import type { DayFormValues } from "../../schemas/daysSchemas";

type ExerciseFieldsProps = {
  index: number;
  register: UseFormRegister<DayFormValues>;
  error?: string;
};

export function ExerciseFields({
  index,
  register,
  error,
}: ExerciseFieldsProps) {
  return (
    <Field label="Exercise name" error={error}>
      {(controlProps) => (
        <Input
          {...controlProps}
          {...register(`exercises.${index}.name`)}
          type="text"
        />
      )}
    </Field>
  );
}
