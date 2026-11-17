import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute/ProtectedRoute";
import { PublicRoute } from "../features/auth/components/PublicRoute/PublicRoute";
import { DaysPage } from "../pages/DaysPage/DaysPage";
import { EditDayPage } from "../pages/EditDayPage/EditDayPage";
import { NewDayPage } from "../pages/NewDayPage/NewDayPage";
import { WorkoutPage } from "../pages/WorkoutPage/WorkoutPage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DaysPage />}></Route>
            <Route path="/history" element={<HistoryPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
          <Route path="/days/new" element={<NewDayPage />}></Route>
          <Route path="/days/:dayId" element={<EditDayPage />}></Route>
          <Route path="/workout/:dayId" element={<WorkoutPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
