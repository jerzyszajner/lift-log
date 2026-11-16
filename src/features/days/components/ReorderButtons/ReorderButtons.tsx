import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./ReorderButtons.module.css";

type ReorderButtonsProps = {
  name: string;
  isFirst: boolean;
  isLast: boolean;
  onMove: (direction: "up" | "down") => void;
};

export function ReorderButtons({
  name,
  isFirst,
  isLast,
  onMove,
}: ReorderButtonsProps) {
  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-label={`Move ${name} up`}
        disabled={isFirst}
        onClick={() => onMove("up")}
      >
        <ChevronUp size={20} />
      </button>
      <button
        type="button"
        className={styles.button}
        aria-label={`Move ${name} down`}
        disabled={isLast}
        onClick={() => onMove("down")}
      >
        <ChevronDown size={20} />
      </button>
    </>
  );
}
