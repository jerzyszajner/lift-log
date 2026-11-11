import { NavLink } from "react-router";

export function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>
        Days
      </NavLink>
      <NavLink to="/history">History</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav>
  );
}
