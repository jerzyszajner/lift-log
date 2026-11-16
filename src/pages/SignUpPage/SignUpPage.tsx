import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import { Logo } from "../../components/Logo/Logo";
import { SignUpForm } from "../../features/auth/components/SignUpForm/SignUpForm";

export function SignUpPage() {
  return (
    <main>
      <header>
        <Logo />
        <h1>Lift Log</h1>
        <p>Plan your training days and log every set.</p>
      </header>
      <SignUpForm />
      <ButtonLink to="/login" variant="secondary">
        I already have an account
      </ButtonLink>
    </main>
  );
}
