import { useId } from "react";
import { Button } from "../Button/Button";
import styles from "./ConfirmBar.module.css";

type ConfirmBarProps = {
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  confirmVariant?: "primary" | "danger";
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmBar({
  message,
  cancelLabel,
  confirmLabel,
  confirmVariant = "primary",
  onCancel,
  onConfirm,
}: ConfirmBarProps) {
  const messageId = useId();

  return (
    <div className={styles.bar} role="alertdialog" aria-labelledby={messageId}>
      <p id={messageId} className={styles.message}>
        {message}
      </p>
      <Button variant="secondary" autoFocus onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button variant={confirmVariant} onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </div>
  );
}
