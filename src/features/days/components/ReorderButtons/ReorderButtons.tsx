import { ChevronDown, ChevronUp } from "lucide-react";

type ReorderButtonsProps = {
  isFirst: boolean;
  isLast: boolean;
  isDisabled: boolean;
  onMove: (direction: "up" | "down") => void;
};

export function ReorderButtons({
  isFirst,
  isLast,
  isDisabled,
  onMove,
}: ReorderButtonsProps) {
  return (
    <>
      <button
        type="button"
        disabled={isDisabled || isFirst}
        onClick={() => onMove("up")}
      >
        <ChevronUp size={20} />
      </button>
      <button
        type="button"
        disabled={isDisabled || isLast}
        onClick={() => onMove("down")}
      >
        <ChevronDown size={20} />
      </button>
    </>
  );
}
