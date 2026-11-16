import { AuthProvider } from "./features/auth/components/AuthProvider/AuthProvider";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
