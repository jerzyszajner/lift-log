import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ConfirmBar } from "../../components/ConfirmBar/ConfirmBar";
import { getDayById } from "../../features/days/utils/getDayById";
import { ExerciseCard } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import { WorkoutProgress } from "../../features/workout/components/WorkoutProgress/WorkoutProgress";
import { createWorkout } from "../../features/workout/utils/createWorkout";
import { formatSets } from "../../features/workout/utils/formatSets";
import { formatShortDate } from "../../utils/formatShortDate";
import type { MouseEvent } from "react";
import type { WorkoutExercise } from "../../features/workout/components/ExerciseCard/ExerciseCard";
import styles from "./WorkoutPage.module.css";

type WorkoutStep = "working" | "confirming" | "leaving" | "finished";

export function WorkoutPage() {
  const navigate = useNavigate();
  const { dayId } = useParams();
  const day = getDayById(dayId);

  const [date] = useState(() => new Date());
  const [exercises, setExercises] = useState(() =>
    createWorkout(day?.exercises ?? []),
  );
  const [step, setStep] = useState<WorkoutStep>("working");

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
      <main className={styles.page}>
        <div className={styles.summary}>
          <h1 className={styles.title}>Workout finished</h1>
          <p className={styles.message}>{formatSets(doneCount)} done</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.mainButton} to="/history">
            View in History
          </Link>
        </div>
      </main>
    );
  }

  if (!day) {
    return (
      <main className={styles.page}>
        <div className={styles.top}>
          <header className={styles.header}>
            <BackLink to="/" label="Days" />
          </header>
        </div>
        <div className={styles.summary}>
          <h1 className={styles.title}>Day not found</h1>
          <p className={styles.message}>This workout day does not exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <header className={styles.header}>
          <BackLink to="/" label="Days" onClick={handleBack} />
          <p className={styles.date}>{formatShortDate(date)}</p>
        </header>
        <WorkoutProgress done={doneCount} total={allSets.length} />
      </div>
      <div className={styles.content}>
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
    </main>
  );
}
