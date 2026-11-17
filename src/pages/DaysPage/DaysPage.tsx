import { Link } from "react-router";
import { Pencil, Play, Plus } from "lucide-react";
import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useDays } from "../../features/days/hooks/useDays";
import { getWeekdayLabel } from "../../features/days/utils/getWeekdayLabel";
import styles from "./DaysPage.module.css";

export function DaysPage() {
  const { days, isLoading, hasError } = useDays();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <ErrorMessage>Could not load your days.</ErrorMessage>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your days</h1>
        <Link className={styles.addLink} to="/days/new">
          <Plus size={18} />
          Add day
        </Link>
      </header>
      <ul className={styles.list}>
        {days.map((day) => (
          <li key={day.id} className={styles.item}>
            <div className={styles.info}>
              <p className={styles.weekday}>{getWeekdayLabel(day.weekday)}</p>
              <p className={styles.name}>{day.name}</p>
              <p className={styles.meta}>
                {day.exercises.length}{" "}
                {day.exercises.length === 1 ? "exercise" : "exercises"}
              </p>
            </div>
            <div className={styles.actions}>
              <Link
                className={styles.editLink}
                to={`/days/${day.id}`}
                aria-label={`Edit ${day.name}`}
              >
                <Pencil size={20} />
              </Link>
              <ButtonLink
                size="small"
                to={`/workout/${day.id}`}
                aria-label={`Start ${day.name}`}
              >
                <Play size={16} fill="currentColor" />
                Start
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
