import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ConfirmBar } from "../../components/ConfirmBar/ConfirmBar";
import { ExerciseCard } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import { WorkoutProgress } from "../../features/workout/components/WorkoutProgress/WorkoutProgress";
import { createWorkout } from "../../features/workout/utils/createWorkout";
import { formatSets } from "../../features/workout/utils/formatSets";
import { formatShortDate } from "../../utils/formatShortDate";
import type { MouseEvent } from "react";
import type { WorkoutExercise } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import type { DayExercise } from "../../features/workout/schemas/workoutSchemas";
import styles from "./WorkoutPage.module.css";

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
  {
    name: "Incline dumbbell press",
    sets: [
      { reps: 10, weight: 20 },
      { reps: 8, weight: 22.5 },
      { reps: 8, weight: 22.5 },
    ],
  },
  {
    name: "Hammer curl",
    sets: [
      { reps: 12, weight: 12 },
      { reps: 10, weight: 14 },
      { reps: 8, weight: 14 },
    ],
  },
  {
    name: "Cable fly",
    sets: [
      { reps: 15, weight: 15 },
      { reps: 12, weight: 17.5 },
      { reps: 12, weight: 17.5 },
    ],
  },
];

export function WorkoutPage() {
  const navigate = useNavigate();
  const [date] = useState(() => new Date());
  const [exercises, setExercises] = useState(() => createWorkout(plan));
  const [step, setStep] = useState<
    "working" | "confirming" | "leaving" | "finished"
  >("working");

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

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (doneCount === 0) return;
    event.preventDefault();
    setStep("leaving");
  }

  if (step === "finished") {
    return (
      <div className={styles.page}>
        <div className={styles.summary}>
          <h1 className={styles.title}>Workout finished</h1>
          <p className={styles.message}>{formatSets(doneCount)} done</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.mainButton} to="/history">
            View in History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <BackLink to="/" label="Days" onClick={handleBack} />
          <p className={styles.date}>{formatShortDate(date)}</p>
        </header>
        <WorkoutProgress done={doneCount} total={allSets.length} />
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            onChange={(updated) => updateExercise(index, updated)}
          />
        ))}
      </div>
      <div className={styles.actions}>
        {step === "working" && (
          <button
            className={styles.mainButton}
            type="button"
            disabled={doneCount === 0}
            onClick={handleFinish}
          >
            Finish workout
          </button>
        )}
        {step === "confirming" && (
          <ConfirmBar
            message={`${formatSets(allSets.length - doneCount)} not done. Finish anyway?`}
            cancelLabel="Back"
            confirmLabel="Finish"
            onCancel={() => setStep("working")}
            onConfirm={() => setStep("finished")}
          />
        )}
        {step === "leaving" && (
          <ConfirmBar
            message="Leave without saving?"
            cancelLabel="Stay"
            confirmLabel="Leave"
            onCancel={() => setStep("working")}
            onConfirm={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
}
