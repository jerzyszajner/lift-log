import { useParams } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { ScreenHeader } from "../../components/ScreenHeader/ScreenHeader";
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
          <ScreenHeader
            title="Day not found"
            back={<BackLink to="/" label="Days" />}
          />
        </div>
        <div className={styles.summary}>
          <p className={styles.message}>This workout day does not exist.</p>
        </div>
      </main>
    );
  }

  return <WorkoutSession day={day} />;
}
