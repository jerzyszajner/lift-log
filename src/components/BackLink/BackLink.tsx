import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import styles from "./BackLink.module.css";

type BackLinkProps = {
  to: string;
  label: string;
};

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link className={styles.link} to={to}>
      <ChevronLeft />
      {label}
    </Link>
  );
}
