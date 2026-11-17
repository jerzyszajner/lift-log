import { useState } from "react";
import { ConfirmBar } from "../../../../components/ConfirmBar/ConfirmBar";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

type DeleteDayProps = {
  onCancel: () => void;
  onDelete: () => Promise<void>;
};

export function DeleteDay({ onCancel, onDelete }: DeleteDayProps) {
  const [error, setError] = useState("");

  async function confirm() {
    setError("");
    try {
      await onDelete();
    } catch (err) {
      console.error(err);
      setError("Could not delete the day. Try again.");
    }
  }

  return (
    <>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      <ConfirmBar
        message="Delete this day?"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={onCancel}
        onConfirm={confirm}
      />
    </>
  );
}
