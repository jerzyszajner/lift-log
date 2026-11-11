import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { HomePage } from "../pages/HomePage/HomePage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
