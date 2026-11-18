import { useParams } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useDays } from "../../features/days/hooks/useDays";
import { WorkoutSession } from "../../features/workout/components/WorkoutSession/WorkoutSession";
import styles from "./WorkoutPage.module.css";

export function WorkoutPage() {
  const { dayId } = useParams();
  const { days, isLoading, hasError } = useDays();
  const day = days.find((item) => item.id === dayId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError && !day) {
    return <ErrorMessage>Could not load your day.</ErrorMessage>;
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

  return <WorkoutSession day={day} />;
}
