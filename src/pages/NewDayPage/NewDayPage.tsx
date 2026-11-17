import { useState } from "react";
import { useNavigate } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ConfirmBar } from "../../components/ConfirmBar/ConfirmBar";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { DayForm } from "../../features/days/components/DayForm/DayForm";
import { addDay } from "../../features/days/services/daysService";
import type { MouseEvent } from "react";
import type { DayFormValues } from "../../features/days/schemas/daysSchemas";
import styles from "./NewDayPage.module.css";

export function NewDayPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  async function handleSubmit(values: DayFormValues) {
    if (!user) {
      throw new Error("Cannot add a day without a signed in user");
    }
    await addDay(user.uid, values);
    navigate("/");
  }

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (!isDirty) return;
    event.preventDefault();
    setIsLeaving(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <BackLink to="/" label="Days" onClick={handleBack} />
        <h1 className={styles.title}>Add day</h1>
      </div>
      <DayForm
        onSubmit={handleSubmit}
        onDirtyChange={setIsDirty}
        confirmBar={
          isLeaving ? (
            <ConfirmBar
              message="Leave without saving?"
              cancelLabel="Stay"
              confirmLabel="Leave"
              onCancel={() => setIsLeaving(false)}
              onConfirm={() => navigate("/")}
            />
          ) : undefined
        }
      />
    </div>
  );
}
