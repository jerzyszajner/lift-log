import { useNavigate, useParams } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { DayForm } from "../../features/days/components/DayForm/DayForm";
import { useDays } from "../../features/days/hooks/useDays";
import { updateDay } from "../../features/days/services/daysService";
import type { DayFormValues } from "../../features/days/schemas/daysSchemas";
import styles from "./EditDayPage.module.css";

export function EditDayPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { dayId } = useParams();
  const { days, isLoading, hasError } = useDays();
  const day = days.find((item) => item.id === dayId);

  async function handleSubmit(values: DayFormValues) {
    if (!user || !day) {
      throw new Error("Cannot edit a day without a signed in user and a day");
    }
    await updateDay(user.uid, day.id, values);
    navigate("/");
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
        <BackLink to="/" label="Days" />
        <h1 className={styles.title}>Edit day</h1>
      </div>
      <DayForm
        onSubmit={handleSubmit}
        defaultValues={{
          name: day.name,
          weekday: day.weekday,
          exercises: day.exercises,
        }}
      />
    </div>
  );
}
