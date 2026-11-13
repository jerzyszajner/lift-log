import { Link } from "react-router";
import type { ComponentProps } from "react";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({ variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={`${styles.link} ${styles[variant]}`} {...props} />;
}
