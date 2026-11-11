import { NavLink } from "react-router";
import { CalendarDays, Clock, User } from "lucide-react";
import styles from "./Navbar.module.css";

function getLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={getLinkClassName}>
        <CalendarDays />
        Days
      </NavLink>
      <NavLink to="/history" className={getLinkClassName}>
        <Clock />
        History
      </NavLink>
      <NavLink to="/account" className={getLinkClassName}>
        <User />
        Account
      </NavLink>
    </nav>
  );
}
