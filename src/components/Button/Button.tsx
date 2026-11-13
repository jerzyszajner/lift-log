import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      {...props}
    />
  );
}
