import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, test, vi } from "vitest";
import { ExerciseFields } from "./ExerciseFields";
import type { DayFormValues, SetEntry } from "../../schemas/daysSchemas";

function FormWithExercise({
  sets,
  onInsertBelow = () => {},
}: {
  sets: SetEntry[];
  onInsertBelow?: () => void;
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<DayFormValues>({
    defaultValues: {
      name: "Legs",
      weekday: 1,
      exercises: [{ name: "Squat", sets }],
    },
  });

  return (
    <ExerciseFields
      index={0}
      control={control}
      register={register}
      errors={errors}
      onInsertBelow={onInsertBelow}
    />
  );
}

function getInput(name: string) {
  return screen.getByRole("textbox", { name }) as HTMLInputElement;
}

describe("ExerciseFields", () => {
  test("adds a set that copies the current values of the last one", async () => {
    render(<FormWithExercise sets={[{ reps: 8, weight: 60 }]} />);

    await userEvent.clear(getInput("Reps, set 1"));
    await userEvent.type(getInput("Reps, set 1"), "12");
    await userEvent.click(screen.getByRole("button", { name: "Add set" }));

    expect(getInput("Reps, set 2").value).toBe("12");
    expect(getInput("Weight, set 2").value).toBe("60");
  });

  test("removes the chosen set and keeps the last one", async () => {
    render(
      <FormWithExercise
        sets={[
          { reps: 8, weight: 60 },
          { reps: 10, weight: 70 },
        ]}
      />,
    );

    await userEvent.click(
      screen.getAllByRole("button", { name: "Remove set" })[0],
    );

    expect(getInput("Reps, set 1").value).toBe("10");
    expect(screen.queryByRole("textbox", { name: "Reps, set 2" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Remove set" })).toBeNull();
  });

  test("asks to insert an exercise below", async () => {
    const onInsertBelow = vi.fn();
    render(
      <FormWithExercise
        sets={[{ reps: 8, weight: 60 }]}
        onInsertBelow={onInsertBelow}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Add exercise below" }),
    );

    expect(onInsertBelow).toHaveBeenCalledTimes(1);
  });
});
