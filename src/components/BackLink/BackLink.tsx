import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import type { MouseEvent } from "react";
import styles from "./BackLink.module.css";

type BackLinkProps = {
  to: string;
  label: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function BackLink({ to, label, onClick }: BackLinkProps) {
  return (
    <Link className={styles.link} to={to} onClick={onClick}>
      <ChevronLeft />
      {label}
    </Link>
  );
}
