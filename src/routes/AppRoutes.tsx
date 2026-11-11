import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "../pages/HomePage/HomePage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
