import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./ReorderButtons.module.css";

type ReorderButtonsProps = {
  name: string;
  isFirst: boolean;
  isLast: boolean;
  isDisabled: boolean;
  onMove: (direction: "up" | "down") => void;
};

export function ReorderButtons({
  name,
  isFirst,
  isLast,
  isDisabled,
  onMove,
}: ReorderButtonsProps) {
  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-label={`Move ${name} up`}
        disabled={isDisabled || isFirst}
        onClick={() => onMove("up")}
      >
        <ChevronUp size={20} />
      </button>
      <button
        type="button"
        className={styles.button}
        aria-label={`Move ${name} down`}
        disabled={isDisabled || isLast}
        onClick={() => onMove("down")}
      >
        <ChevronDown size={20} />
      </button>
    </>
  );
}
