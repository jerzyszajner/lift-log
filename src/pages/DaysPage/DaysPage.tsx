import { Link } from "react-router";
import { ArrowUpDown, Pencil, Play, Plus } from "lucide-react";
import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { ReorderButtons } from "../../features/days/components/ReorderButtons/ReorderButtons";
import { useDays } from "../../features/days/hooks/useDays";
import { useReorderDays } from "../../features/days/hooks/useReorderDays";
import styles from "./DaysPage.module.css";

export function DaysPage() {
  const { days, isLoading, hasError } = useDays();
  const { isReordering, toggleReordering, moveError, move } =
    useReorderDays(days);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <ErrorMessage>Could not load your days.</ErrorMessage>;
  }

  const sortedDays = [...days].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your days</h1>
        <div className={styles.headerActions}>
          {(sortedDays.length > 1 || isReordering) && (
            <button
              type="button"
              className={styles.toggle}
              onClick={toggleReordering}
            >
              {!isReordering && <ArrowUpDown size={18} />}
              {isReordering ? "Done" : "Reorder"}
            </button>
          )}
          {!isReordering && (
            <Link className={styles.addLink} to="/days/new">
              <Plus size={18} />
              Add day
            </Link>
          )}
        </div>
      </header>
      {moveError && <ErrorMessage role="alert">{moveError}</ErrorMessage>}
      <ul className={styles.list}>
        {sortedDays.map((day, index) => {
          const isFirst = index === 0;
          const isLast = index === sortedDays.length - 1;

          return (
            <li key={day.id} className={styles.item}>
              <div className={styles.info}>
                <p className={styles.name}>{day.name}</p>
                <p className={styles.meta}>
                  {day.exercises.length}{" "}
                  {day.exercises.length === 1 ? "exercise" : "exercises"}
                </p>
              </div>
              <div className={styles.actions}>
                {isReordering ? (
                  <ReorderButtons
                    name={day.name}
                    isFirst={isFirst}
                    isLast={isLast}
                    onMove={(direction) => move(day.id, direction)}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
