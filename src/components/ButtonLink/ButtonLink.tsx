import { Link } from "react-router";
import type { ComponentProps } from "react";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  size?: "default" | "small";
};

export function ButtonLink({
  variant = "primary",
  size = "default",
  ...props
}: ButtonLinkProps) {
  const sizeClass = size === "small" ? styles.small : "";

  return (
    <Link
      className={`${styles.link} ${sizeClass} ${styles[variant]}`}
      {...props}
    />
  );
}
