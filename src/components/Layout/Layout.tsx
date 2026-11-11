import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";

export function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
