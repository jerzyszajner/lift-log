import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ConfirmBar } from "../../components/ConfirmBar/ConfirmBar";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { DayForm } from "../../features/days/components/DayForm/DayForm";
import { DeleteDay } from "../../features/days/components/DeleteDay/DeleteDay";
import { useDays } from "../../features/days/hooks/useDays";
import { deleteDay, updateDay } from "../../features/days/services/daysService";
import type { MouseEvent } from "react";
import type { DayFormValues } from "../../features/days/schemas/daysSchemas";
import styles from "./EditDayPage.module.css";

type ConfirmStep = "editing" | "deleting" | "leaving";

export function EditDayPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { dayId } = useParams();
  const { days, isLoading, hasError } = useDays();
  const day = days.find((item) => item.id === dayId);
  const [isDirty, setIsDirty] = useState(false);
  const [confirmStep, setConfirmStep] = useState<ConfirmStep>("editing");

  async function handleSubmit(values: DayFormValues) {
    if (!user || !day) {
      throw new Error("Cannot edit a day without a signed in user and a day");
    }
    await updateDay(user.uid, day.id, values);
    navigate("/");
  }

  async function handleDelete() {
    if (!user || !day) {
      throw new Error("Cannot delete a day without a signed in user and a day");
    }
    await deleteDay(user.uid, day.id);
    navigate("/");
  }

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (!isDirty) return;
    event.preventDefault();
    setConfirmStep("leaving");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <ErrorMessage>Could not load your day.</ErrorMessage>;
  }

  if (!day) {
    return (
      <div className={styles.page}>
        <div className={styles.top}>
          <BackLink to="/" label="Days" />
          <h1 className={styles.title}>Day not found</h1>
          <p className={styles.message}>This workout day does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.header}>
          <BackLink to="/" label="Days" onClick={handleBack} />
          <button
            className={styles.delete}
            type="button"
            onClick={() => setConfirmStep("deleting")}
          >
            Delete day
          </button>
        </div>
        <h1 className={styles.title}>Edit day</h1>
      </div>
      <DayForm
        onSubmit={handleSubmit}
        onDirtyChange={setIsDirty}
        confirmBar={
          confirmStep === "deleting" ? (
            <DeleteDay
              onCancel={() => setConfirmStep("editing")}
              onDelete={handleDelete}
            />
          ) : confirmStep === "leaving" ? (
            <ConfirmBar
              message="Leave without saving?"
              cancelLabel="Stay"
              confirmLabel="Leave"
              onCancel={() => setConfirmStep("editing")}
              onConfirm={() => navigate("/")}
            />
          ) : undefined
        }
        defaultValues={{
          name: day.name,
          weekday: day.weekday,
          exercises: day.exercises,
        }}
      />
    </div>
  );
}
