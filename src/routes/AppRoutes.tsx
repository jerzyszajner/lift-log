import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute/ProtectedRoute";
import { PublicRoute } from "../features/auth/components/PublicRoute/PublicRoute";
import { DaysPage } from "../pages/DaysPage/DaysPage";
import { WorkoutPage } from "../pages/WorkoutPage/WorkoutPage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DaysPage />}></Route>
            <Route path="/history" element={<HistoryPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
          <Route path="/workout/:dayId" element={<WorkoutPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
