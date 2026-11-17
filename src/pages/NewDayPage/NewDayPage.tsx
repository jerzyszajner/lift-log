import { useNavigate } from "react-router";
import { BackLink } from "../../components/BackLink/BackLink";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { DayForm } from "../../features/days/components/DayForm/DayForm";
import { addDay } from "../../features/days/services/daysService";
import type { AddDayFormValues } from "../../features/days/schemas/daysSchemas";
import styles from "./NewDayPage.module.css";

export function NewDayPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(values: AddDayFormValues) {
    if (!user) {
      throw new Error("Cannot add a day without a signed in user");
    }
    await addDay(user.uid, values);
    navigate("/");
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
