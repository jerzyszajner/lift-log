import { Button } from "../../components/Button/Button";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { logOut } from "../../features/auth/services/authService";

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
    <div>
      <h1>Account</h1>
      <div>
        <p>Signed in as</p>
        <p>{user?.email}</p>
      </div>
      <Button variant="secondary" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
