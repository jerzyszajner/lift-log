import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonProps = ComponentProps<"button">;

export function Button({ type = "button", ...props }: ButtonProps) {
  return <button className={styles.button} type={type} {...props} />;
}
