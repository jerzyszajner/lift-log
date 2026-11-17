import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, test } from "vitest";
import { ExerciseFields } from "./ExerciseFields";
import type { DayFormValues } from "../../schemas/daysSchemas";

function FormWithExercise() {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<DayFormValues>({
    defaultValues: {
      name: "Legs",
      weekday: 1,
      exercises: [{ name: "Squat", sets: [{ reps: 8, weight: 60 }] }],
    },
  });

  return (
    <ExerciseFields
      index={0}
      control={control}
      register={register}
      errors={errors}
    />
  );
}

function getInput(name: string) {
  return screen.getByRole("textbox", { name }) as HTMLInputElement;
}

describe("ExerciseFields", () => {
  test("adds a set that copies the current values of the last one", async () => {
    render(<FormWithExercise />);

    await userEvent.clear(getInput("Reps, set 1"));
    await userEvent.type(getInput("Reps, set 1"), "12");
    await userEvent.click(
      screen.getByRole("button", { name: "Add set (copies the last one)" }),
    );

    expect(getInput("Reps, set 2").value).toBe("12");
    expect(getInput("Weight, set 2").value).toBe("60");
  });
});
