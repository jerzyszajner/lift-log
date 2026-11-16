import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { Logo } from "../../components/Logo/Logo";
import { LoginForm } from "../../features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <main>
      <Logo />
      <h1>Lift Log</h1>
      <p>Plan your training days and log every set.</p>
      <LoginForm />
      <ButtonLink to="/signup" variant="secondary">
        Create account
      </ButtonLink>
    </main>
  );
}
