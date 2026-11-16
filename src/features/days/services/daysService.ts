import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { daySchema } from "../schemas/daysSchemas";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import type { Day } from "../schemas/daysSchemas";

export function toDay(snapshot: QueryDocumentSnapshot): Day {
  return { id: snapshot.id, ...daySchema.parse(snapshot.data()) };
}

export function subscribeToDays(
  uid: string,
  onData: (days: Day[]) => void,
  onError: (error: Error) => void,
) {
  return onSnapshot(
    collection(db, "users", uid, "days"),
    (snapshot) => onData(snapshot.docs.map(toDay)),
    onError,
  );
}
