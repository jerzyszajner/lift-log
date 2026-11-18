import type { ReactNode } from "react";
import styles from "./ScreenHeader.module.css";

type ScreenHeaderProps = {
  title: string;
  back?: ReactNode;
  children?: ReactNode;
};

export function ScreenHeader({ title, back, children }: ScreenHeaderProps) {
  return (
    <header className={styles.header}>
      <div>{back}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.action}>{children}</div>
    </header>
  );
}
