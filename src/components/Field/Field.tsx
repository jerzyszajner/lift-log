import { useId } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import type { ReactNode } from "react";
import styles from "./Field.module.css";

type FieldControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

type FieldProps = {
  label: string;
  hideLabel?: boolean;
  error?: string;
  children: (controlProps: FieldControlProps) => ReactNode;
};

export function Field({ label, hideLabel, error, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={hideLabel ? styles.hidden : styles.label} htmlFor={id}>
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      )}
    </div>
  );
}
