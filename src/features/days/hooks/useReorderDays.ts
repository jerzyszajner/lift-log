import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { moveDay } from "../services/daysService";
import type { Day } from "../schemas/daysSchemas";

export function useReorderDays(days: Day[]) {
  const { user } = useAuth();
  const [isReordering, setIsReordering] = useState(false);
  const [moveError, setMoveError] = useState("");
  const [moveMessage, setMoveMessage] = useState("");

  function toggleReordering() {
    setIsReordering((value) => !value);
    setMoveError("");
    setMoveMessage("");
  }

  async function move(id: string, direction: "up" | "down") {
    if (!user) {
      return;
    }
    setMoveError("");
    setMoveMessage("");
    try {
      await moveDay(user.uid, days, id, direction);
      const name = days.find((day) => day.id === id)?.name;
      setMoveMessage(`${name} moved ${direction}`);
    } catch (err) {
      console.error(err);
      setMoveError("Could not move the day. Try again.");
    }
  }

  return { isReordering, toggleReordering, moveError, moveMessage, move };
}
