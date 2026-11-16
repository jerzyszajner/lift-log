import { useNavigate } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { DayForm } from "../../features/days/components/DayForm/DayForm";
import { useDays } from "../../features/days/hooks/useDays";
import { addDay } from "../../features/days/services/daysService";
import type { AddDayFormValues } from "../../features/days/schemas/daysSchemas";
import styles from "./NewDayPage.module.css";

export function NewDayPage() {
  const { user } = useAuth();
  const { days, isLoading, hasError } = useDays();
  const navigate = useNavigate();

  async function handleSubmit({ name }: AddDayFormValues) {
    if (!user) {
      throw new Error("Cannot add a day without a signed in user");
    }
    await addDay(user.uid, name, days);
    navigate("/");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <ErrorMessage>Could not load your days.</ErrorMessage>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <BackLink to="/" label="Days" />
        <h1 className={styles.title}>Add day</h1>
      </div>
      <DayForm onSubmit={handleSubmit} />
    </div>
  );
}
