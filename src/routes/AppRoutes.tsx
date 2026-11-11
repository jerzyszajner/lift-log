import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "../pages/HomePage/HomePage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
