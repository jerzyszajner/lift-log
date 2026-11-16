import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { moveDay } from "../services/daysService";
import type { Day } from "../schemas/daysSchemas";

export function useReorderDays(days: Day[]) {
  const { user } = useAuth();
  const [isReordering, setIsReordering] = useState(false);
  const [moveError, setMoveError] = useState("");

  function toggleReordering() {
    setIsReordering((value) => !value);
    setMoveError("");
  }

  async function move(id: string, direction: "up" | "down") {
    if (!user) {
      return;
    }
    setMoveError("");
    try {
      await moveDay(user.uid, days, id, direction);
    } catch (err) {
      console.error(err);
      setMoveError("Could not move the day. Try again.");
    }
  }

  return { isReordering, toggleReordering, moveError, move };
}
