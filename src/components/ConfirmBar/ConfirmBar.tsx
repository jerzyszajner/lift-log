import { useId } from "react";
import styles from "./ConfirmBar.module.css";

type ConfirmBarProps = {
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmBar({
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmBarProps) {
  const messageId = useId();

  return (
    <div className={styles.bar} role="alertdialog" aria-labelledby={messageId}>
      <p id={messageId} className={styles.message}>
        {message}
      </p>
      <button
        className={styles.cancelButton}
        type="button"
        autoFocus
        onClick={onCancel}
      >
        {cancelLabel}
      </button>
      <button
        className={styles.confirmButton}
        type="button"
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
    </div>
  );
}
