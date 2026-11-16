import { useEffect, useState } from "react";

type Subscribe<T> = (
  onData: (items: T[]) => void,
  onError: (error: Error) => void,
) => () => void;

export function useCollection<T>(subscribe: Subscribe<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return subscribe(
      (data) => {
        setItems(data);
        setHasError(false);
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        setHasError(true);
        setIsLoading(false);
      },
    );
  }, [subscribe]);

  return { items, isLoading, hasError };
}
