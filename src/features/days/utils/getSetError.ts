import type { FieldErrors } from "react-hook-form";
import type { SetEntry } from "../schemas/daysSchemas";

export function getSetError(setErrors?: FieldErrors<SetEntry>) {
  return setErrors?.reps?.message ?? setErrors?.weight?.message;
}
