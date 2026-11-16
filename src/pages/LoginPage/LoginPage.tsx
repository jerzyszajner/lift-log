import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { Logo } from "../../components/Logo/Logo";
import { LoginForm } from "../../features/auth/components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <h1 className={styles.title}>Lift Log</h1>
        <p className={styles.tagline}>
          Plan your training days and log every set.
        </p>
      </header>
      <LoginForm />
      <ButtonLink to="/signup" variant="secondary">
        Create account
      </ButtonLink>
    </main>
  );
}
