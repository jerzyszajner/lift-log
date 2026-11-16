import type { ComponentProps } from "react";
import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = ComponentProps<"p">;

export function ErrorMessage(props: ErrorMessageProps) {
  return <p className={styles.error} {...props} />;
}
