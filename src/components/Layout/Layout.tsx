import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.layout}>
      <main>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
