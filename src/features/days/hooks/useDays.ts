import { useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCollection } from "../../../hooks/useCollection";
import { subscribeToDays } from "../services/daysService";
import type { Day } from "../schemas/daysSchemas";

export function useDays() {
  const { user } = useAuth();
  const uid = user?.uid;

  const subscribe = useCallback(
    (onData: (days: Day[]) => void, onError: (error: Error) => void) => {
      if (!uid) {
        return () => {};
      }
      return subscribeToDays(uid, onData, onError);
    },
    [uid],
  );

  const { items, isLoading, hasError } = useCollection(subscribe);

  return { days: items, isLoading, hasError };
}
