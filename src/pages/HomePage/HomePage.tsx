import { useState } from "react";
import { Link } from "react-router";
import { ConfirmBar } from "../../components/ConfirmBar/ConfirmBar";
import { ExerciseCard } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import { createWorkout } from "../../features/workout/utils/createWorkout";
import { formatSets } from "../../features/workout/utils/formatSets";
import type { WorkoutExercise } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import type { DayExercise } from "../../features/workout/schemas/workoutSchemas";
import styles from "./HomePage.module.css";

const plan: DayExercise[] = [
  {
    name: "Bench press",
    sets: [
      { reps: 10, weight: 60 },
      { reps: 8, weight: 65 },
      { reps: 6, weight: 70 },
    ],
  },
  {
    name: "Biceps curl",
    sets: [
      { reps: 12, weight: 10 },
      { reps: 10, weight: 12.5 },
      { reps: 8, weight: 15 },
    ],
  },
];

export function HomePage() {
  const [exercises, setExercises] = useState(() => createWorkout(plan));
  const [step, setStep] = useState<"working" | "confirming" | "finished">(
    "working",
  );

  function updateExercise(index: number, updated: WorkoutExercise) {
    setStep("working");
    setExercises((current) =>
      current.map((exercise, i) => (i === index ? updated : exercise)),
    );
  }

  const allSets = exercises.flatMap((exercise) => exercise.sets);
  const doneCount = allSets.filter((set) => set.done).length;

  function handleFinish() {
    setStep(doneCount < allSets.length ? "confirming" : "finished");
  }

  if (step === "finished") {
    return (
      <div>
        <h1>Workout finished</h1>
        <p>{formatSets(doneCount)} done</p>
        <Link to="/history">View in History</Link>
      </div>
    );
  }

  return (
    <div>
      <p>
        {doneCount} of {allSets.length} sets
      </p>
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={exercise}
          onChange={(updated) => updateExercise(index, updated)}
        />
      ))}
      {step === "confirming" ? (
        <ConfirmBar
          message={`${formatSets(allSets.length - doneCount)} not done. Finish anyway?`}
          cancelLabel="Back"
          confirmLabel="Finish"
          onCancel={() => setStep("working")}
          onConfirm={() => setStep("finished")}
        />
      ) : (
        <button
          className={styles.finishButton}
          type="button"
          disabled={doneCount === 0}
          onClick={handleFinish}
        >
          Finish workout
        </button>
      )}
    </div>
  );
}
