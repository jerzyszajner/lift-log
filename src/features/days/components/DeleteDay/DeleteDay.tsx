import { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { ConfirmBar } from "../../../../components/ConfirmBar/ConfirmBar";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

type DeleteDayProps = {
  onDelete: () => Promise<void>;
};

export function DeleteDay({ onDelete }: DeleteDayProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState("");

  async function confirm() {
    setError("");
    try {
      await onDelete();
    } catch (err) {
      console.error(err);
      setError("Could not delete the day. Try again.");
      setIsConfirming(false);
    }
  }

  if (isConfirming) {
    return (
      <ConfirmBar
        message="Delete this day?"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={() => setIsConfirming(false)}
        onConfirm={confirm}
      />
    );
  }

  return (
    <div>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      <Button variant="secondary" onClick={() => setIsConfirming(true)}>
        Delete day
      </Button>
    </div>
  );
}
