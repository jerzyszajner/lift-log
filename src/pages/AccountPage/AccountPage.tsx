import { Button } from "../../components/Button/Button";
import { ScreenHeader } from "../../components/ScreenHeader/ScreenHeader";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { logOut } from "../../features/auth/services/authService";
import styles from "./AccountPage.module.css";

export function AccountPage() {
  const { user } = useAuth();

  async function handleLogOut() {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.page}>
      <ScreenHeader title="Account" />
      <div className={styles.card}>
        <p className={styles.label}>Signed in as</p>
        <p className={styles.email}>{user?.email}</p>
      </div>
      <Button variant="secondary" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
