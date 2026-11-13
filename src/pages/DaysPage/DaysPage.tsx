import { Link } from "react-router";
import { Pencil, Play, Plus } from "lucide-react";
import { days } from "../../features/days/data/days";
import styles from "./DaysPage.module.css";

export function DaysPage() {
  const sortedDays = [...days].sort((a, b) => a.order - b.order);

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
        {sortedDays.map((day) => (
          <li key={day.id} className={styles.item}>
            <div className={styles.info}>
              <p className={styles.name}>{day.name}</p>
              <p className={styles.meta}>
                {day.exercises.length}{" "}
                {day.exercises.length === 1 ? "exercise" : "exercises"}
              </p>
            </div>
            <div className={styles.actions}>
              <Link className={styles.editLink} to={`/days/${day.id}`}>
                <Pencil size={20} />
              </Link>
              <Link className={styles.startLink} to="/workout">
                <Play size={16} fill="currentColor" />
                Start
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
