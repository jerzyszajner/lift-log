import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "../pages/HomePage/HomePage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
