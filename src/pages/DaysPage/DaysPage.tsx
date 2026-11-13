import { Link } from "react-router";
import { days } from "../../features/days/data/days";

export function DaysPage() {
  const sortedDays = [...days].sort((a, b) => a.order - b.order);

  return (
    <div>
      <h1>Your days</h1>
      <ul>
        {sortedDays.map((day) => (
          <li key={day.id}>
            <span>{day.name}</span>
            <Link to="/workout">Start</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
