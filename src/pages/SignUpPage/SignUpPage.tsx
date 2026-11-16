import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { Logo } from "../../components/Logo/Logo";
import { SignUpForm } from "../../features/auth/components/SignUpForm/SignUpForm";
import styles from "./SignUpPage.module.css";

export function SignUpPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <h1 className={styles.title}>Lift Log</h1>
        <p className={styles.tagline}>
          Plan your training days and log every set.
        </p>
      </header>
      <SignUpForm />
      <ButtonLink to="/login" variant="secondary">
        I already have an account
      </ButtonLink>
    </main>
  );
}
