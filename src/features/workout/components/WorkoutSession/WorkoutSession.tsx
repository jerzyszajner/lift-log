import { useState } from "react";
import { useNavigate } from "react-router";
import { BackLink } from "../../../../components/BackLink/BackLink";
import { Button } from "../../../../components/Button/Button";
import { ButtonLink } from "../../../../components/ButtonLink/ButtonLink";
import { ConfirmBar } from "../../../../components/ConfirmBar/ConfirmBar";
import { formatShortDate } from "../../../../utils/formatShortDate";
import { createWorkout } from "../../utils/createWorkout";
import { formatSets } from "../../utils/formatSets";
import { ExerciseCard } from "../ExerciseCard/ExerciseCard";
import { WorkoutProgress } from "../WorkoutProgress/WorkoutProgress";
import type { MouseEvent } from "react";
import type { Day } from "../../../days/schemas/daysSchemas";
import type { WorkoutExercise } from "../../schemas/workoutSchemas";
import styles from "./WorkoutSession.module.css";

type WorkoutStep = "working" | "confirming" | "leaving" | "finished";

type WorkoutSessionProps = {
  day: Day;
};

export function WorkoutSession({ day }: WorkoutSessionProps) {
  const navigate = useNavigate();

  const [date] = useState(() => new Date());
  const [exercises, setExercises] = useState(() =>
    createWorkout(day.exercises),
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
          <ButtonLink to="/history">View in History</ButtonLink>
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
          <Button disabled={doneCount === 0} onClick={handleFinish}>
            Finish workout
          </Button>
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
